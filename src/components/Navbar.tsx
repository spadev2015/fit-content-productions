import Button from "./Button";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-neutral-950 sticky top-0 z-50 border-b border-neutral-800">
      <a href="#" className="text-2xl font-bold text-white flex items-center gap-2 hover:opacity-80 transition-opacity">
        <span className="text-accent">Fit</span>Content
      </a>
      <div className="hidden md:flex gap-8 text-neutral-300 font-medium text-sm uppercase tracking-wider">
        <a href="#services" className="hover:text-accent transition-colors">Services</a>
        <a href="#work" className="hover:text-accent transition-colors">Work</a>
        <a href="#about" className="hover:text-accent transition-colors">About</a>
      </div>
      <Button variant="primary" className="hidden md:flex">Book a Shoot</Button>
    </nav>
  );
}
