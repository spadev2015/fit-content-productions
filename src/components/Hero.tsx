import Button from "./Button";
import { Activity, Video } from "lucide-react";
import heroImg from "../assets/images/female-athlete-dumbbell-training-shoot.jpg";

export default function Hero() {
  return (
    <section className="relative px-6 py-12 lg:py-24 max-w-7xl mx-auto overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 border border-neutral-800 text-accent text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            Premium Content Agency
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] mb-6 text-white">
            Your Fitness <br/>Brand <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-red-900">Amplified</span>
          </h1>
          <p className="text-lg text-neutral-400 mb-8 max-w-lg">
            Fit Content Productions helps gyms, trainers, and wellness businesses create short-form video, reels, and social media assets that build authority and drive clients.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#contact">
              <Button variant="primary" className="flex items-center gap-2">
                Book a Shoot <Video size={18} />
              </Button>
            </a>
            <a href="#work">
              <Button variant="outline">See My Work</Button>
            </a>
          </div>
        </div>

        <div className="order-1 lg:order-2 relative">
          <div className="relative rounded-3xl overflow-hidden aspect-[3/4]">
            <img
              src={heroImg}
              alt="Fitness content creator laughing during a gym photo shoot"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80"></div>
          </div>
          
          {/* Floating Badge 1 */}
          <div className="absolute top-32 lg:top-10 left-4 bg-neutral-800/90 backdrop-blur-md border border-neutral-700 p-2.5 lg:p-4 rounded-xl lg:rounded-2xl shadow-2xl flex items-center gap-2.5 lg:gap-4 animate-[bounce_4s_infinite] z-20">
            <div className="bg-accent p-2 lg:p-3 rounded-full text-white">
              <Activity className="size-4 lg:size-6" />
            </div>
            <div>
              <div className="text-[10px] lg:text-xs text-neutral-400 font-medium uppercase tracking-wider">High Impact</div>
              <div className="text-sm lg:text-lg font-bold text-white">Content</div>
            </div>
          </div>

          {/* Floating Badge 2 */}
          <div className="absolute bottom-2 right-2 bg-neutral-900/90 backdrop-blur-md border border-neutral-800 p-2.5 lg:p-4 rounded-xl lg:rounded-2xl shadow-2xl flex items-center gap-2.5 lg:gap-4 animate-[bounce_5s_infinite_reverse] z-20">
            <div className="text-2xl lg:text-4xl font-bold text-accent">10x</div>
            <div>
              <div className="text-[10px] lg:text-xs text-neutral-400 font-medium uppercase tracking-wider">More</div>
              <div className="text-sm lg:text-lg font-bold text-white">Engagement</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
    </section>
  );
}
