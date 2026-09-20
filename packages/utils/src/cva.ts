import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * cva-like variant resolver for Tailwind utility classes.
 * Minimal implementation — no runtime validation, no compound variants.
 * Upgrade path: swap to `class-variance-authority` when needed.
 */
export function cva<Props extends Record<string, unknown>>(
  base: string,
  options: {
    variants?: Record<string, Record<string, string>>;
    defaultVariants?: Partial<Record<keyof NonNullable<typeof options.variants>, string>>;
  }
) {
  return (props: Props & Record<string, string>) => {
    const classes = [base];
    if (options.variants) {
      for (const [variantKey, variantValue] of Object.entries(props)) {
        const variants = options.variants[variantKey];
        if (variants && typeof variantValue === "string" && variants[variantValue]) {
          classes.push(variants[variantValue]);
        }
      }
    }
    // Apply default variants for missing props
    if (options.defaultVariants) {
      for (const [key, value] of Object.entries(options.defaultVariants)) {
        if (props[key] === undefined && options.variants?.[key]?.[value as string]) {
          classes.push(options.variants[key][value as string]);
        }
      }
    }
    return classes.join(" ");
  };
}

/** Type extracted from cva return for typing component props. */
export type VariantProps<T extends (...args: unknown[]) => string> =
  Parameters<T>[0] extends Record<string, infer V> ? V : never;
