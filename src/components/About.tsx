import { CheckCircle2 } from "lucide-react";
import trainerImg from "../assets/images/videographer-with-cinema-camera-gym.jpg";
import gymImg from "../assets/images/videographer-low-angle-gym-shoot.jpg";
import equipmentImg from "../assets/images/filmmaker-setting-up-camera-rig.jpg";

export default function About() {
  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
      {/* Masonry Image Grid */}
      <div className="grid grid-cols-2 gap-4 relative">
        <div className="space-y-4 mt-12">
          <img src={trainerImg} alt="Videographer with cinema camera at the gym" className="rounded-3xl object-cover aspect-square w-full" />
          <img src={gymImg} alt="Videographer shooting low angle during gym content production" className="rounded-3xl object-cover aspect-[4/5] w-full" />
        </div>
        <div className="space-y-4">
          <img src={equipmentImg} alt="Filmmaker setting up camera rig at the gym" className="rounded-3xl object-cover aspect-[4/5] w-full" />
          <div className="bg-neutral-900 rounded-3xl p-6 border border-neutral-800 flex flex-col justify-center items-center text-center aspect-square">
            <div className="text-5xl font-bold text-accent mb-2">100%</div>
            <div className="text-neutral-400 text-sm font-medium uppercase tracking-wider">Client Growth</div>
          </div>
        </div>
        
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-plum/20 rounded-full blur-[80px] -z-10 pointer-events-none"></div>
      </div>

      <div>
        <div className="inline-flex items-center gap-2 text-accent font-bold uppercase tracking-widest mb-4 text-sm">
          <span className="w-8 h-[2px] bg-accent"></span> About Me
        </div>
        <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">I create content that makes fitness brands impossible to ignore.</h2>
        <p className="text-neutral-400 mb-8 text-lg">Fit Content Productions helps gyms, trainers, and wellness brands create high-quality content that looks professional, builds trust, and performs on social media.</p>
        <ul className="space-y-4">
          {["Short-form video production", "Gym brand content shoots", "Personal brand content", "Promotional videos", "Content strategy"].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-neutral-300 font-medium">
              <CheckCircle2 className="text-accent" size={20} /> {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
