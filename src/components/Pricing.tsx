import Button from "./Button";
import { Check } from "lucide-react";

export default function Pricing() {
  const packages = [
    { name: "Starter", target: "For personal trainers", price: "$999", features: ["1 short shoot session", "4 edited reels", "Branded photos", "Content clips"] },
    { name: "Brand", target: "For gyms & studios", price: "$2,499", features: ["Half-day session", "10 edited reels", "Professional photo assets", "Promo content video"] },
    { name: "Growth", target: "For serious brands", price: "$4,999", features: ["Recurring monthly content", "Multiple shoots", "Ongoing reels", "Campaign assets"] },
  ];

  return (
    <section id="pricing" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Simple Pricing</h2>
        <p className="text-neutral-400 max-w-2xl mx-auto">Transparent packages designed to scale with your fitness business.</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 items-center">
        {packages.map((pkg, i) => {
          const isPopular = i === 1;
          return (
            <div key={i} className={`p-8 rounded-3xl border ${isPopular ? "bg-neutral-900 border-plum shadow-[0_0_40px_rgba(74,20,140,0.3)] transform md:-translate-y-4" : "bg-neutral-950 border-neutral-800"}`}>
              {isPopular && <div className="bg-plum text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full inline-block mb-4">Most Popular</div>}
              <h3 className="text-3xl font-bold text-white mb-2">{pkg.name}</h3>
              <p className="text-neutral-400 text-sm mb-6">{pkg.target}</p>
              <div className="text-4xl font-bold text-lime mb-8">{pkg.price}<span className="text-lg text-neutral-500 font-normal">/mo</span></div>
              
              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-neutral-300">
                    <Check size={18} className="text-lime" /> {feature}
                  </li>
                ))}
              </ul>
              
              <Button variant={isPopular ? "primary" : "outline"} className="w-full">Book {pkg.name}</Button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
