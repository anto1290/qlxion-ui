"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Index } from "flexsearch";

interface SearchIndexEntry {
  id: string;
  title: string;
  description: string;
  category: string;
  frameworks: string[];
  url: string;
  props?: string[];
  variants?: string[];
}

export function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchIndexEntry[]>([]);
  const [allEntries, setAllEntries] = useState<SearchIndexEntry[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<InstanceType<typeof Index> | null>(null);

  useEffect(() => {
    fetch("/search-index.json")
      .then((r) => r.json())
      .then((data: SearchIndexEntry[]) => {
        const idx = new Index({ tokenize: "forward", cache: true });
        for (const entry of data) {
          const text = [entry.title, entry.description, entry.category,
            ...(entry.frameworks ?? []), ...(entry.props ?? []), ...(entry.variants ?? [])]
            .join(" ").toLowerCase();
          idx.add(entry.id, text);
        }
        indexRef.current = idx;
        setAllEntries(data);
        setIsLoaded(true);
      })
      .catch(() => setIsLoaded(true));
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const doSearch = useCallback((q: string) => {
    if (!indexRef.current || !q.trim()) { setResults([]); return; }
    const ids = indexRef.current.search(q, 10) as string[];
    const map = new Map(allEntries.map((e) => [e.id, e]));
    setResults(ids.map((id) => map.get(id)).filter(Boolean) as SearchIndexEntry[]);
  }, [allEntries]);

  useEffect(() => {
    const t = setTimeout(() => doSearch(query), 120);
    return () => clearTimeout(t);
  }, [query, doSearch]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") { setIsOpen(false); setQuery(""); inputRef.current?.blur(); }
    if (e.key === "Enter" && results.length > 0) window.location.href = results[0].url;
  };

  const close = () => { setIsOpen(false); setQuery(""); };
  const quickLinks = ["button", "card", "input", "dialog", "select", "tabs", "tooltip", "badge"];

  return (
    <div ref={containerRef} className="relative">
      <label htmlFor="docs-search" className="sr-only">Search documentation</label>
      <div className="relative flex items-center">
        <svg className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground"
          fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input ref={inputRef} id="docs-search" type="search" value={query}
          onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={isLoaded ? "Search... (⌘K)" : "Loading..."}
          disabled={!isLoaded}
          autoComplete="off" spellCheck={false}
          className="h-9 w-full rounded-md border border-input bg-background pl-9 pr-4 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
        />
      </div>

      {isOpen && (
        <div role="dialog" aria-label="Search results"
          className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-md border border-border bg-popover shadow-lg">
          {query ? (
            results.length > 0 ? (
              <ul role="listbox" className="max-h-80 overflow-y-auto py-1">
                {results.map((entry) => (
                  <li key={entry.id} role="option">
                    <a href={entry.url} onClick={close}
                      className="flex flex-col gap-0.5 px-4 py-2.5 hover:bg-accent transition-colors">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">{entry.title}</span>
                        <span className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">{entry.category}</span>
                        {entry.frameworks.length > 0 && (
                          <span className="rounded bg-primary/10 px-1.5 py-0.5 text-xs text-primary">
                            {entry.frameworks.join(", ")}
                          </span>
                        )}
                      </div>
                      <span className="line-clamp-1 text-xs text-muted-foreground">{entry.description}</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                No results for <span className="font-medium">&ldquo;{query}&rdquo;</span>
              </div>
            )
          ) : (
            <div className="py-2">
              <p className="px-4 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Quick links</p>
              <ul>
                {quickLinks.map((name) => (
                  <li key={name}>
                    <a href={`/components/${name}`} onClick={close}
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent transition-colors">
                      <span className="text-muted-foreground">#</span>
                      {name.charAt(0).toUpperCase() + name.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}