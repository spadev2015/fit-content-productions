import { Video, Scissors, Share2, Image as ImageIcon, Camera, Lightbulb } from "lucide-react";

export default function Services() {
  const services = [
    { title: "Video Production", desc: "Professional video content for gyms, trainers, and wellness brands.", icon: Video },
    { title: "Custom Video Editing", desc: "Edited reels, promos, talking videos, training clips, and branded media.", icon: Scissors },
    { title: "Social Content Creation", desc: "Content designed for daily posting across Instagram, TikTok, and YouTube.", icon: Share2 },
    { title: "AI Thumbnail & Cover Design", desc: "Custom thumbnails, reel covers, and branded graphics for stronger performance.", icon: ImageIcon },
    { title: "Fitness Media Shoots", desc: "On-location filming and photography for the fitness industry.", icon: Camera },
    { title: "Content Strategy", desc: "Creative planning for what to film, post, and how to make it perform.", icon: Lightbulb },
  ];

  return (
    <section id="services" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Explore My Services</h2>
        <p className="text-neutral-400 max-w-2xl mx-auto">Content solutions built specifically for the fitness industry to help you stand out and convert followers into clients.</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => {
          const Icon = s.icon;
          
          return (
            <div key={i} className="group p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 bg-neutral-900 border border-neutral-800 text-white hover:bg-accent hover:text-neutral-950 hover:border-accent hover:shadow-[0_0_40px_rgba(185,28,28,0.15)]">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-neutral-800 text-accent group-hover:bg-neutral-950">
                <Icon size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3">{s.title}</h3>
              <p className="text-neutral-400 group-hover:text-neutral-800">{s.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
