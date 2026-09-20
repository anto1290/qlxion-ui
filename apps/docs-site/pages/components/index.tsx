import { Layout } from "@/components/Layout";
import Link from "next/link";

const categories = [
  { name: "actions", label: "Actions" },
  { name: "layout", label: "Layout" },
  { name: "forms", label: "Forms" },
  { name: "feedback", label: "Feedback" },
  { name: "navigation", label: "Navigation" },
  { name: "data-display", label: "Data Display" },
  { name: "uncategorized", label: "Other" },
];

const componentRegistry = [
  { name: "accordion", category: "layout", description: "Panel terlipat vertikal untuk menampilkan/menyembunyikan konten", frameworks: ["react"] },
  { name: "alert", category: "feedback", description: "Kotak notifikasi untuk pesan status, peringatan, atau error", frameworks: ["react"] },
  { name: "alert-dialog", category: "feedback", description: "Dialog konfirmasi untuk aksi kritis", frameworks: ["react"] },
  { name: "aspect-ratio", category: "layout", description: "Container untuk menjaga rasio aspek konten", frameworks: ["react"] },
  { name: "attachment", category: "data-display", description: "Komponen untuk menampilkan file attachment", frameworks: ["react"] },
  { name: "avatar", category: "data-display", description: "Gambar profil pengguna dengan fallback", frameworks: ["react"] },
  { name: "badge", category: "data-display", description: "Label kecil untuk status atau metadata", frameworks: ["react"] },
  { name: "breadcrumb", category: "navigation", description: "Navigasi hierarkis untuk menunjukkan lokasi", frameworks: ["react"] },
  { name: "bubble", category: "data-display", description: "Komponen bubble untuk chat atau notifikasi", frameworks: ["react"] },
  { name: "button", category: "actions", description: "Elemen interaktif untuk memicu aksi", frameworks: ["react", "vue"] },
  { name: "calendar", category: "data-display", description: "Komponen kalender untuk pemilihan tanggal", frameworks: ["react"] },
  { name: "card", category: "layout", description: "Container untuk visual grouping konten", frameworks: ["react"] },
  { name: "data-table", category: "data-display", description: "Tabel data dengan sorting, filtering, pagination", frameworks: ["react"] },
  { name: "date-picker", category: "forms", description: "Input untuk memilih tanggal dengan kalender", frameworks: ["react"] },
  { name: "dialog", category: "feedback", description: "Modal dialog untuk konten overlay", frameworks: ["react"] },
  { name: "dropdown", category: "navigation", description: "Menu dropdown untuk aksi kontekstual", frameworks: ["react"] },
  { name: "empty", category: "feedback", description: "State kosong untuk menampilkan tidak ada data", frameworks: ["react"] },
  { name: "field", category: "forms", description: "Wrapper untuk form field dengan label dan error", frameworks: ["react"] },
  { name: "input", category: "forms", description: "Elemen input teks standar", frameworks: ["react"] },
  { name: "message", category: "data-display", description: "Komponen pesan untuk chat atau notifikasi", frameworks: ["react"] },
  { name: "message-scroller", category: "data-display", description: "Container scrollable untuk daftar pesan", frameworks: ["react"] },
  { name: "pagination", category: "navigation", description: "Navigasi halaman untuk data berhalaman", frameworks: ["react"] },
  { name: "scroll-area", category: "layout", description: "Area scroll dengan scrollbar kustom", frameworks: ["react"] },
  { name: "select", category: "forms", description: "Dropdown select untuk pemilihan opsi", frameworks: ["react"] },
  { name: "sidebar", category: "navigation", description: "Panel navigasi sisi", frameworks: ["react"] },
  { name: "skeleton", category: "feedback", description: "Placeholder loading untuk konten", frameworks: ["react"] },
  { name: "slider", category: "forms", description: "Input range slider", frameworks: ["react"] },
  { name: "spinner", category: "feedback", description: "Indikator loading berputar", frameworks: ["react"] },
  { name: "switch", category: "forms", description: "Toggle switch untuk on/off", frameworks: ["react"] },
  { name: "table", category: "data-display", description: "Tabel data dasar", frameworks: ["react"] },
  { name: "tabs", category: "navigation", description: "Tab panel untuk konten terorganisir", frameworks: ["react"] },
  { name: "textarea", category: "forms", description: "Input teks multi-baris", frameworks: ["react"] },
  { name: "toast", category: "feedback", description: "Notifikasi toast sementara", frameworks: ["react"] },
  { name: "toggle", category: "actions", description: "Toggle button untuk state on/off", frameworks: ["react"] },
  { name: "toggle-group", category: "actions", description: "Grup toggle buttons", frameworks: ["react"] },
  { name: "tooltip", category: "feedback", description: "Tooltip untuk informasi tambahan", frameworks: ["react"] },
  { name: "typography", category: "data-display", description: "Komponen tipografi untuk konten teks", frameworks: ["react"] },
];
export default function ComponentsIndex() {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Components</h1>
        <p className="text-muted-foreground">
          Browse all available components organized by category.
        </p>
      </div>
      
      {categories.map((cat) => {
        const components = componentRegistry.filter((c) => c.category === cat.name);
        if (components.length === 0) return null;
        
        return (
          <section key={cat.name} className="mb-12">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-foreground">{cat.label}</span>
              <span className="text-sm text-muted-foreground px-2 py-0.5 bg-muted rounded">
                {components.length}
              </span>
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {components.map((comp) => (
                <Link
                  key={comp.name}
                  href={`/components/${comp.name}`}
                  className="p-4 border rounded-lg hover:border-primary/50 hover:bg-accent transition-colors group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-medium group-hover:text-primary transition-colors">
                        {comp.name.charAt(0).toUpperCase() + comp.name.slice(1)}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {comp.description}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      {comp.frameworks.map((fw) => (
                        <span
                          key={fw}
                          className={`text-xs px-2 py-0.5 rounded ${
                            fw === "react" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" :
                            fw === "vue" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" :
                            "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {fw}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </Layout>
  );
}