export default function Stats() {
  const stats = [
    { label: "Videos Delivered", value: "500+" },
    { label: "Fitness Shoots", value: "100+" },
    { label: "Brands Worked With", value: "50+" },
    { label: "Organic Views", value: "10M+" },
  ];

  return (
    <section className="py-12 px-6 border-y border-neutral-800 bg-neutral-950/50 backdrop-blur-sm relative z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-neutral-800">
        {stats.map((stat, index) => (
          <div key={index} className="text-center px-4">
            <div className="text-4xl lg:text-5xl font-bold text-white mb-2">{stat.value}</div>
            <div className="text-neutral-400 text-sm uppercase tracking-wider font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
