import Button from "./Button";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-neutral-950 sticky top-0 z-50 border-b border-neutral-800">
      <a href="#" className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity">
        <Logo className="h-10 md:h-12 w-auto" />
        <div className="font-display uppercase leading-none">
          <div className="text-base md:text-xl tracking-tight text-white font-extrabold">
            <span className="text-[var(--color-accent)]">Fit</span>Content
          </div>
          <div className="text-[0.5rem] md:text-[0.65rem] font-semibold tracking-[0.3em] text-[var(--color-accent)] text-center">
            Productions
          </div>
        </div>
      </a>
      <div className="hidden md:flex gap-8 text-neutral-300 font-medium text-sm uppercase tracking-wider">
        <a href="#services" className="hover:text-accent transition-colors">Services</a>
        <a href="#work" className="hover:text-accent transition-colors">Work</a>
        <a href="#about" className="hover:text-accent transition-colors">About</a>
      </div>
      <Button variant="primary" className="hidden md:flex px-5 py-2 text-sm">Book a Shoot</Button>
    </nav>
  );
}
