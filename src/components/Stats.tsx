export default function Stats() {
  const stats = [
    { label: "Client Growth Rate", value: "3x" },
    { label: "Avg. Engagement Lift", value: "280%" },
    { label: "Turnaround Time", value: "48h" },
    { label: "Client Retention", value: "95%" },
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
