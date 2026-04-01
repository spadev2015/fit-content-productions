import { Instagram } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-white py-12 px-6 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <Logo className="h-12 w-auto" />
          <div className="font-display uppercase leading-none">
            <div className="text-xl tracking-tight text-white font-extrabold">
              <span className="text-[var(--color-accent)]">Fit</span>Content
            </div>
            <div className="text-[0.65rem] font-semibold tracking-[0.3em] text-[var(--color-accent)] text-center">
              Productions
            </div>
          </div>
        </div>
        <a href="#" className="text-neutral-400 hover:text-accent transition-colors duration-200">
          <Instagram size={24} />
        </a>
        <div className="text-sm text-neutral-500">© 2026 Fit Content Productions.</div>
      </div>
    </footer>
  );
}
