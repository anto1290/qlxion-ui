import fs from 'fs';
import path from 'path';

const OUT = 'e:/qlxion/qlxion-ui/apps/docs-site/pages/components';

function ensureDir(name) {
  const d = path.join(OUT, name);
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
  return d;
}

function writePage(name, content) {
  const dir = ensureDir(name);
  fs.writeFileSync(path.join(dir, 'index.tsx'), content);
  console.log(`wrote ${name}`);
}

// Simple template
function makePage(name, meta) {
  const title = name.split('-').map(s => s[0].toUpperCase() + s.slice(1)).join('');
  const fn = title + 'Doc';
  const propsTable = meta.props?.length 
    ? `<div className="overflow-x-auto"><table className="w-full border-collapse text-sm"><thead><tr className="bg-muted"><th className="border border-border px-3 py-2 text-left font-semibold">Prop</th><th className="border border-border px-3 py-2 text-left font-semibold">Type</th><th className="border border-border px-3 py-2 text-left font-semibold">Default</th><th className="border border-border px-3 py-2 text-left font-semibold">Description</th></tr></thead><tbody>${meta.props.map(([n,t,d,desc]) => `<tr><td className="border border-border px-3 py-2 font-mono text-sm">${n}</td><td className="border border-border px-3 py-2 text-sm text-muted-foreground">${t.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</td><td className="border border-border px-3 py-2 text-sm">${d}</td><td className="border border-border px-3 py-2 text-sm">${desc}</td></tr>`).join('\n')}</tbody></table></div>`
    : '<p className="text-sm text-muted-foreground">Extends HTML attributes.</p>';
  
  const variantsList = meta.variants?.length
    ? `<ul className="list-disc pl-6 space-y-1 text-sm">${meta.variants.map(v => `<li><code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">${v}</code></li>`).join('\n')}</ul>`
    : '<p className="text-sm text-muted-foreground">No variants.</p>';
  
  const statesList = meta.states?.length
    ? `<ul className="list-disc pl-6 space-y-1 text-sm">${meta.states.map(s => `<li>${s}</li>`).join('\n')}</ul>`
    : '<p className="text-sm text-muted-foreground">No special states.</p>';
  
  const subList = `<ul className="list-disc pl-6 space-y-1 text-sm">${(meta.sub || []).map(s => `<li><code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">${s}</code></li>`).join('\n')}</ul>`;
  const a11yList = `<ul className="list-disc pl-6 space-y-1 text-sm">${(meta.a11y || []).map(a => `<li>${a}</li>`).join('\n')}</ul>`;
  const importLine = meta.sub?.length ? `import { ${(meta.sub).join(', ')} } from "@/components/ui/${name}";` : '';
  
  return `import { Layout } from "@/components/Layout";

export default function ${fn}() {
  return (
    <Layout>
      <div className="mx-auto max-w-3xl space-y-8 p-6">
        <div>
          <h1 className="text-3xl font-bold">${title}</h1>
          <p className="mt-2 text-lg text-muted-foreground">${meta.desc}</p>
        </div>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Installation</h2>
          <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm"><code>npx qlxion-ui add ${name}</code></pre>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Usage</h2>
          <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm"><code>{\`${importLine}\`}</code></pre>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Preview</h2>
          <div className="rounded-md border border-border bg-muted/30 p-6 flex items-center justify-center min-h-24">
            <p className="text-sm text-muted-foreground">Interactive preview â€” use the <a href="/playground" className="underline hover:text-foreground">Playground</a>.</p>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Variants</h2>
          ${variantsList}
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">States</h2>
          ${statesList}
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Examples</h2>
          <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm"><code>{\`${meta.ex.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`}</code></pre>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">API</h2>
          <h3 className="mb-2 text-base font-medium">Sub-components</h3>
          ${subList}
          <h3 className="mb-4 mt-4 text-base font-medium">Props</h3>
          ${propsTable}
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Accessibility</h2>
          ${a11yList}
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Framework Support</h2>
          <p className="text-sm">${(meta.fw || ['React']).join(', ')}</p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Source</h2>
          <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm"><code>{\`npx qlxion-ui add ${name}\`}</code></pre>
        </section>
      </div>
    </Layout>
  );
}
`;
}

// Component metadata
const COMPONENTS = {
  "accordion": {
    desc: "Panel terlipat vertikal untuk menampilkan/menyembunyikan konten.",
    sub: ["Accordion", "AccordionItem", "AccordionTrigger", "AccordionContent"],
    props: [["type", '"single" | "multiple"', '"single"', "Mode seleksi panel."], ["value", "string | string[]", "-", "Nilai terbuka (controlled)."], ["defaultValue", "string | string[]", '""', "Nilai awal (uncontrolled)."], ["onValueChange", "(value) => void", "-", "Callback saat nilai berubah."], ["collapsible", "boolean", "true", "Izinkan panel aktif ditutup kembali."]],
    variants: [], sizes: [], states: ["default", "open", "closed", "disabled"],
    a11y: ["aria-expanded pada AccordionTrigger", "Keyboard: Enter/Space toggle"],
    ex: '<Accordion type="single" collapsible>\n  <AccordionItem value="item-1">\n    <AccordionTrigger>Is it accessible?</AccordionTrigger>\n    <AccordionContent>Yes. WAI-ARIA standards.</AccordionContent>\n  </AccordionItem>\n</Accordion>',
    fw: ["react"]
  },
  "alert": {
    desc: "Kotak notifikasi untuk pesan status, peringatan, atau error.",
    sub: ["Alert", "AlertTitle", "AlertDescription"],
    props: [["variant", '"default" | "destructive" | "info" | "success" | "warning"', '"default"', "Gaya visual alert."]],
    variants: ["default", "destructive", "info", "success", "warning"], sizes: [], states: ["default"],
    a11y: ['role="alert" pada elemen root', "Kontras warna WCAG AA di semua varian"],
    ex: '<Alert variant="destructive">\n  <AlertTitle>Error</AlertTitle>\n  <AlertDescription>Something went wrong.</AlertDescription>\n</Alert>',
    fw: ["react"]
  },
  "alert-dialog": {
    desc: "Modal dialog untuk konfirmasi tindakan krusial atau destruktif.",
    sub: ["AlertDialog", "AlertDialogTrigger", "AlertDialogContent", "AlertDialogHeader", "AlertDialogFooter", "AlertDialogTitle", "AlertDialogDescription", "AlertDialogAction", "AlertDialogCancel"],
    props: [["open", "boolean", "-", "Status buka/tutup (controlled)."], ["defaultOpen", "boolean", "false", "Status awal (uncontrolled)."], ["onOpenChange", "(open: boolean) => void", "-", "Callback saat status berubah."]],
    variants: [], sizes: [], states: ["open", "closed"],
    a11y: ['role="alertdialog"', "aria-modal=true", "Focus trap saat dialog terbuka", "Escape menutup dialog"],
    ex: '<AlertDialog>\n  <AlertDialogTrigger>Delete</AlertDialogTrigger>\n  <AlertDialogContent>\n    <AlertDialogHeader>\n      <AlertDialogTitle>Are you sure?</AlertDialogTitle>\n    </AlertDialogHeader>\n    <AlertDialogFooter>\n      <AlertDialogCancel>Cancel</AlertDialogCancel>\n      <AlertDialogAction>Delete</AlertDialogAction>\n    </AlertDialogFooter>\n  </AlertDialogContent>\n</AlertDialog>',
    fw: ["react"]
  }
};

// Remaining components - batch 2
const MORE2 = {
  "breadcrumb": {
    desc: "Navigasi hierarki jalur halaman untuk orientasi pengguna.",
    sub: ["Breadcrumb", "BreadcrumbList", "BreadcrumbItem", "BreadcrumbLink", "BreadcrumbPage", "BreadcrumbSeparator", "BreadcrumbEllipsis"],
    props: [["separator", "ReactNode", '"/"', "Karakter pemisah antar item."]],
    variants: [], sizes: [], states: [],
    a11y: ['aria-label="breadcrumb" pada nav', 'aria-current="page" pada item aktif'],
    ex: '<Breadcrumb>\n  <BreadcrumbList>\n    <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem><BreadcrumbPage>Components</BreadcrumbPage></BreadcrumbItem>\n  </BreadcrumbList>\n</Breadcrumb>',
    fw: ["react"]
  },
  "bubble": {
    desc: "Gelembung pesan percakapan untuk antarmuka chat.",
    sub: ["Bubble"],
    props: [["side", '"left" | "right"', '"left"', "Posisi bubble."], ["variant", '"default" | "primary"', '"default"', "Gaya visual bubble."]],
    variants: ["default", "primary"], sizes: [], states: [],
    a11y: ["Gunakan struktur semantik yang tepat dalam list pesan"],
    ex: '<Bubble side="right" variant="primary">Hello!</Bubble>\n<Bubble side="left">Hi there!</Bubble>',
    fw: ["react"]
  },
  "button": {
    desc: "Elemen interaktif untuk memicu aksi.",
    sub: ["Button"],
    props: [["variant", '"default" | "destructive" | "outline" | "ghost" | "link"', '"default"', "Gaya visual tombol."], ["size", '"default" | "sm" | "lg" | "icon"', '"default"', "Ukuran tombol."], ["disabled", "boolean", "false", "Menonaktifkan interaksi."], ["loading", "boolean", "false", "Tampilkan indikator loading."], ["asChild", "boolean", "false", "Render sebagai elemen lain."]],
    variants: ["default", "destructive", "outline", "ghost", "link"], sizes: ["sm", "default", "lg", "icon"],
    states: ["default", "hover", "focus-visible", "active", "disabled", "loading"],
    a11y: ["Elemen dasar native button", "aria-busy=true saat loading", "aria-disabled saat disabled"],
    ex: '<Button variant="default">Save Changes</Button>\n<Button variant="destructive">Delete</Button>',
    fw: ["react", "vue"]
  },
  "calendar": {
    desc: "Grid kalender bulanan interaktif.",
    sub: ["Calendar"],
    props: [["selected", "Date | undefined", "-", "Tanggal yang dipilih (controlled)."], ["onSelect", "(date: Date) => void", "-", "Callback saat tanggal dipilih."], ["month", "Date", "today", "Bulan yang ditampilkan."]],
    variants: [], sizes: [], states: ["default", "selected", "today", "disabled"],
    a11y: ["role=grid", "Keyboard: Arrow navigasi, Enter pilih"],
    ex: '<Calendar selected={date} onSelect={(d) => setDate(d)} />',
    fw: ["react"]
  },
  "card": {
    desc: "Container untuk visual grouping konten.",
    sub: ["Card"],
    props: [["variant", '"default" | "outline"', '"default"', "Style visual card."], ["padding", '"sm" | "md" | "lg"', '"md"', "Inner spacing."], ["radius", '"sm" | "md" | "lg"', '"md"', "Border radius."]],
    variants: ["default", "outline"], sizes: [], states: ["default", "hover"],
    a11y: ["Tidak interaktif secara default"],
    ex: '<Card variant="outline" padding="lg">\n  <h3>Card Title</h3>\n  <p>Card content.</p>\n</Card>',
    fw: ["react"]
  }
};
Object.assign(COMPONENTS, MORE2);

// Batch 3
const MORE3 = {
  "data-table": { desc: "Tabel data dengan sorting, filtering, dan pagination bawaan.", sub: ["DataTable"], props: [["columns", "ColumnDef[]", "-", "Definisi kolom tabel."], ["data", "T[]", "-", "Array data."], ["pageSize", "number", "10", "Jumlah baris per halaman."]], variants: [], sizes: [], states: ["default", "loading", "empty"], a11y: ["Gunakan <table> semantik"], ex: '<DataTable columns={columns} data={data} pageSize={10} />', fw: ["react"] },
  "date-picker": { desc: "Input tanggal dengan popup kalender terintegrasi.", sub: ["DatePicker"], props: [["value", "Date | undefined", "-", "Tanggal yang dipilih."], ["onValueChange", "(date: Date) => void", "-", "Callback saat tanggal dipilih."], ["placeholder", "string", '"Pick a date"', "Teks placeholder."]], variants: [], sizes: [], states: ["default", "open", "selected", "disabled"], a11y: ['aria-haspopup="dialog" pada trigger'], ex: '<DatePicker value={date} onValueChange={setDate} placeholder="Select date" />', fw: ["react"] },
  "dialog": { desc: "Modal dialog untuk konten overlay.", sub: ["Dialog", "DialogTrigger", "DialogContent", "DialogHeader", "DialogFooter", "DialogTitle", "DialogDescription", "DialogClose"], props: [["open", "boolean", "-", "Status buka/tutup (controlled)."], ["defaultOpen", "boolean", "false", "Status awal (uncontrolled)."], ["onOpenChange", "(open: boolean) => void", "-", "Callback saat status berubah."]], variants: [], sizes: [], states: ["open", "closed"], a11y: ['role="dialog"', "aria-modal=true", "Escape menutup dialog"], ex: '<Dialog><DialogTrigger>Open</DialogTrigger><DialogContent><DialogHeader><DialogTitle>Title</DialogTitle></DialogHeader><DialogFooter><DialogClose>Close</DialogClose></DialogFooter></DialogContent></Dialog>', fw: ["react"] },
  "dropdown": { desc: "Menu dropdown kontekstual.", sub: ["Dropdown", "DropdownTrigger", "DropdownContent", "DropdownItem"], props: [["open", "boolean", "-", "Status buka/tutup."], ["onOpenChange", "(open: boolean) => void", "-", "Callback saat status berubah."]], variants: [], sizes: [], states: ["open", "closed"], a11y: ['role="menu" pada DropdownContent', "Keyboard: Arrow navigasi, Escape tutup"], ex: '<Dropdown><DropdownTrigger>Options</DropdownTrigger><DropdownContent><DropdownItem>Edit</DropdownItem></DropdownContent></Dropdown>', fw: ["react"] }
};
Object.assign(COMPONENTS, MORE3);

// Batch 4
const MORE4 = {
  "empty": { desc: "Tampilan kosong (empty state).", sub: ["Empty"], props: [["icon", "ReactNode", "-", "Ikon dekoratif."], ["title", "string", "-", "Judul empty state."], ["description", "string", "-", "Deskripsi tambahan."]], variants: [], sizes: [], states: [], a11y: ["Teks harus informatif dan actionable"], ex: '<Empty title="No results found" description="Try adjusting your search." />', fw: ["react"] },
  "field": { desc: "Wrapper form field dengan label, helper text, dan error message.", sub: ["Field", "FieldLabel", "FieldHelper", "FieldError"], props: [["label", "string", "-", "Label field."], ["required", "boolean", "false", "Tandai sebagai field wajib."], ["error", "string", "-", "Pesan error."], ["helper", "string", "-", "Teks bantuan."]], variants: [], sizes: [], states: ["default", "error", "disabled"], a11y: ["Label terhubung via htmlFor/id", "aria-invalid=true saat error"], ex: '<Field label="Email" required error="Email is required"><Input type="email" /></Field>', fw: ["react"] },
  "input": { desc: "Input teks dengan dukungan label, error, prefix, suffix.", sub: ["Input"], props: [["variant", '"default" | "destructive"', '"default"', "Gaya visual input."], ["size", '"default" | "sm" | "lg"', '"default"', "Ukuran input."], ["label", "string", "-", "Label teks."], ["error", "string", "-", "Pesan error validasi."], ["disabled", "boolean", "false", "Menonaktifkan input."], ["required", "boolean", "false", "Field wajib diisi."]], variants: ["default", "destructive"], sizes: ["sm", "default", "lg"], states: ["default", "hover", "focus", "disabled", "error"], a11y: ["Label terhubung via htmlFor/id", "aria-invalid=true saat error"], ex: '<Input label="Username" placeholder="Enter username" required />', fw: ["react"] },
  "message": { desc: "Komponen pesan dengan avatar dan metadata waktu.", sub: ["Message"], props: [["avatar", "ReactNode", "-", "Avatar pengirim."], ["author", "string", "-", "Nama pengirim."], ["timestamp", "string", "-", "Waktu pesan."], ["side", '"left" | "right"', '"left"', "Posisi pesan."]], variants: [], sizes: [], states: [], a11y: ["Gunakan landmark atau list untuk grup pesan"], ex: '<Message author="Alice" timestamp="12:30 PM" side="left">Hello!</Message>', fw: ["react"] }
};
Object.assign(COMPONENTS, MORE4);

// Batch 5
const MORE5 = {
  "message-scroller": { desc: "Container scroll otomatis untuk list pesan chat.", sub: ["MessageScroller"], props: [["autoScroll", "boolean", "true", "Scroll otomatis ke pesan terbaru."]], variants: [], sizes: [], states: [], a11y: ['aria-live="polite" untuk pengumuman pesan baru'], ex: '<MessageScroller>{messages.map((msg) => <Message key={msg.id} {...msg} />)}</MessageScroller>', fw: ["react"] },
  "pagination": { desc: "Navigasi halaman dengan tombol prev/next.", sub: ["Pagination", "PaginationContent", "PaginationItem", "PaginationLink", "PaginationPrevious", "PaginationNext"], props: [["isActive", "boolean", "false", "Tandai halaman aktif."]], variants: [], sizes: [], states: ["default", "active"], a11y: ['role="navigation" aria-label="pagination"', 'aria-current="page" pada halaman aktif'], ex: '<Pagination><PaginationContent><PaginationItem><PaginationLink isActive>1</PaginationLink></PaginationItem><PaginationItem><PaginationNext href="#" /></PaginationItem></PaginationContent></Pagination>', fw: ["react"] },
  "scroll-area": { desc: "Area scroll kustom.", sub: ["ScrollArea"], props: [["className", "string", "-", "Class tambahan."]], variants: [], sizes: [], states: [], a11y: ["Konten harus tetap keyboard-navigable"], ex: '<ScrollArea className="h-64">{items.map((item) => <div key={item.id}>{item.label}</div>)}</ScrollArea>', fw: ["react"] },
  "select": { desc: "Dropdown select dengan dukungan keyboard.", sub: ["Select", "SelectTrigger", "SelectValue", "SelectContent", "SelectItem"], props: [["value", "string", "-", "Nilai terpilih."], ["onValueChange", "(value: string) => void", "-", "Callback saat nilai berubah."]], variants: [], sizes: [], states: ["default", "open", "selected", "disabled"], a11y: ['role="combobox" pada trigger', 'role="listbox" pada content', "Keyboard: Arrow navigasi"], ex: '<Select onValueChange={(val) => console.log(val)}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="react">React</SelectItem></SelectContent></Select>', fw: ["react"] }
};
Object.assign(COMPONENTS, MORE5);

// Batch 6
const MORE6 = {
  "sidebar": { desc: "Navigasi sidebar dengan dukungan collapsible.", sub: ["Sidebar", "SidebarItem", "SidebarGroup"], props: [["collapsed", "boolean", "false", "Status collapsed (controlled)."], ["onCollapsedChange", "(collapsed: boolean) => void", "-", "Callback saat status berubah."]], variants: [], sizes: [], states: ["expanded", "collapsed"], a11y: ['role="navigation"', 'aria-expanded pada toggle'], ex: '<Sidebar><SidebarGroup label="Main"><SidebarItem href="/dashboard">Dashboard</SidebarItem></SidebarGroup></Sidebar>', fw: ["react"] },
  "skeleton": { desc: "Placeholder loading dengan animasi pulse.", sub: ["Skeleton"], props: [["className", "string", "-", "Class untuk ukuran dan bentuk."]], variants: [], sizes: [], states: ["loading"], a11y: ['aria-busy="true" pada container', "Skeleton bersifat dekoratif"], ex: '<Skeleton className="h-4 w-full" />', fw: ["react"] },
  "slider": { desc: "Input range slider.", sub: ["Slider"], props: [["value", "number[]", "-", "Nilai slider."], ["min", "number", "0", "Nilai minimum."], ["max", "number", "100", "Nilai maksimum."], ["step", "number", "1", "Langkah increment."], ["disabled", "boolean", "false", "Menonaktifkan slider."]], variants: [], sizes: [], states: ["default", "hover", "focus", "disabled"], a11y: ['role="slider"', "Keyboard: Arrow increment/decrement"], ex: '<Slider defaultValue={[50]} min={0} max={100} step={1} />', fw: ["react"] },
  "spinner": { desc: "Indikator loading berputar.", sub: ["Spinner"], props: [["size", '"sm" | "default" | "lg" | "xl"', '"default"', "Ukuran spinner."]], variants: [], sizes: ["sm (16px)", "default (24px)", "lg (32px)", "xl (48px)"], states: [], a11y: ['role="status"', 'aria-label="Loading"'], ex: '<Spinner size="default" />', fw: ["react"] },
  "switch": { desc: "Toggle switch dua kondisi.", sub: ["Switch"], props: [["checked", "boolean", "-", "Status switch."], ["defaultChecked", "boolean", "false", "Status awal."], ["onCheckedChange", "(checked: boolean) => void", "-", "Callback saat berubah."], ["disabled", "boolean", "false", "Menonaktifkan switch."]], variants: [], sizes: [], states: ["checked", "unchecked", "disabled"], a11y: ['role="switch"', "Keyboard: Space toggle"], ex: '<Switch checked={enabled} onCheckedChange={setEnabled} />', fw: ["react"] }
};
Object.assign(COMPONENTS, MORE6);

// Batch 7
const MORE7 = {
  "table": { desc: "Komponen tabel semantik.", sub: ["Table", "TableHeader", "TableBody", "TableRow", "TableHead", "TableCell"], props: [], variants: [], sizes: [], states: ["default", "hover"], a11y: ["Gunakan thead, tbody, th scope yang benar"], ex: '<Table><TableHeader><TableRow><TableHead>Name</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>Alice</TableCell></TableRow></TableBody></Table>', fw: ["react"] },
  "tabs": { desc: "Tab panel navigasi.", sub: ["Tabs", "TabsList", "TabsTrigger", "TabsContent"], props: [["value", "string", "-", "Tab aktif."], ["defaultValue", "string", '""', "Tab aktif awal."], ["onValueChange", "(value: string) => void", "-", "Callback saat tab berubah."]], variants: [], sizes: [], states: ["active", "inactive", "disabled"], a11y: ['role="tablist"', 'role="tab"', "Keyboard: Arrow navigasi antar tab"], ex: '<Tabs defaultValue="react"><TabsList><TabsTrigger value="react">React</TabsTrigger></TabsList><TabsContent value="react">React content.</TabsContent></Tabs>', fw: ["react"] },
  "textarea": { desc: "Area input teks multibaris.", sub: ["Textarea"], props: [["placeholder", "string", "-", "Teks placeholder."], ["disabled", "boolean", "false", "Menonaktifkan."], ["rows", "number", "-", "Jumlah baris."]], variants: [], sizes: [], states: ["default", "hover", "focus", "disabled"], a11y: ["Wajib punya label", "Placeholder bukan pengganti label"], ex: '<Textarea placeholder="Enter your message..." rows={4} />', fw: ["react"] },
  "toast": { desc: "Notifikasi pop-up non-blocking.", sub: ["Toast", "ToastTitle", "ToastDescription", "ToastClose"], props: [["variant", '"default" | "destructive" | "success"', '"default"', "Gaya visual toast."], ["open", "boolean", "true", "Visibility toast."], ["onOpenChange", "(open: boolean) => void", "-", "Callback saat toast ditutup."]], variants: ["default", "destructive", "success"], sizes: [], states: ["open", "closed"], a11y: ['role="status"', 'ToastClose dengan aria-label=Close'], ex: '<Toast variant="success" open={open} onOpenChange={setOpen}><ToastTitle>Success!</ToastTitle><ToastClose /></Toast>', fw: ["react"] },
  "toggle": { desc: "Tombol dua kondisi yang dapat ditekan.", sub: ["Toggle"], props: [["pressed", "boolean", "-", "Status pressed."], ["defaultPressed", "boolean", "false", "Status awal."], ["onPressedChange", "(pressed: boolean) => void", "-", "Callback saat berubah."], ["variant", '"default" | "outline"', '"default"', "Gaya visual."], ["size", '"default" | "sm" | "lg"', '"default"', "Ukuran."]], variants: ["default", "outline"], sizes: ["sm", "default", "lg"], states: ["pressed", "unpressed", "disabled"], a11y: ["aria-pressed menunjukkan status", "Keyboard: Space atau Enter untuk toggle"], ex: '<Toggle variant="outline" onPressedChange={(p) => console.log(p)}>Bold</Toggle>', fw: ["react"] }
};
Object.assign(COMPONENTS, MORE7);

// Batch 8 - remaining
const MORE8 = {
  "toggle-group": { desc: "Kumpulan toggle untuk seleksi.", sub: ["ToggleGroup", "ToggleGroupItem"], props: [["type", '"single" | "multiple"', '"single"', "Mode seleksi."], ["value", "string | string[]", "-", "Nilai terpilih."], ["onValueChange", "(value) => void", "-", "Callback saat nilai berubah."]], variants: [], sizes: [], states: ["selected", "unselected", "disabled"], a11y: ['role="group"', "aria-pressed pada setiap item"], ex: '<ToggleGroup type="single"><ToggleGroupItem value="left">Left</ToggleGroupItem><ToggleGroupItem value="center">Center</ToggleGroupItem></ToggleGroup>', fw: ["react"] },
  "tooltip": { desc: "Popup info mengambang.", sub: ["Tooltip", "TooltipTrigger", "TooltipContent"], props: [["delayDuration", "number", "0", "Delay sebelum tooltip muncul (ms)."], ["side", '"top"|"bottom"|"left"|"right"', '"top"', "Posisi tooltip."]], variants: [], sizes: [], states: ["open", "closed"], a11y: ['role="tooltip" pada TooltipContent', "Tooltip tidak boleh berisi konten interaktif"], ex: '<Tooltip><TooltipTrigger>Hover me</TooltipTrigger><TooltipContent side="top">This is a tooltip</TooltipContent></Tooltip>', fw: ["react"] },
  "typography": { desc: "Koleksi komponen tipografi semantik.", sub: ["TypographyH1", "TypographyH2", "TypographyP", "TypographyMuted"], props: [["className", "string", "-", "Class tambahan."]], variants: [], sizes: [], states: [], a11y: ["Gunakan heading sesuai hierarki dokumen"], ex: '<TypographyH1>Heading 1</TypographyH1>\n<TypographyP>Regular paragraph.</TypographyP>', fw: ["react"] }
};
Object.assign(COMPONENTS, MORE8);

// Generate all pages
for (const [name, meta] of Object.entries(COMPONENTS)) {
  const dir = ensureDir(name);
  const content = makePage(name, meta);
  fs.writeFileSync(path.join(dir, 'index.tsx'), content);
  console.log(`wrote ${name}`);
}

console.log('Done generating docs pages');
