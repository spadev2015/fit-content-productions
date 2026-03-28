export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-white py-12 px-6 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-2xl font-bold flex items-center gap-2">
          <span className="text-accent">Fit</span>Content
        </div>
        <div className="flex gap-6 text-sm text-neutral-400">
          <a href="#" className="hover:text-accent">Instagram</a>
          <a href="#" className="hover:text-accent">TikTok</a>
          <a href="#" className="hover:text-accent">YouTube</a>
        </div>
        <div className="text-sm text-neutral-500">© 2026 Fit Content Productions.</div>
      </div>
    </footer>
  );
}
