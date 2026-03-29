import portfolio1 from "../assets/images/back-training-reel-cover-design.jpg";
import portfolio2 from "../assets/images/bodybuilder-motivational-reel-thumbnail.jpg";
import portfolio3 from "../assets/images/personal-trainer-hip-thrust-tutorial.jpg";
import portfolio4 from "../assets/images/male-athlete-talking-video-with-mic.jpg";
import portfolio5 from "../assets/images/fitness-model-gym-portrait.jpg";
import portfolio6 from "../assets/images/fitness-friends-gym-candid.jpg";
import portfolio7 from "../assets/images/fitness-content-creator-gym-shoot.jpg";
import portfolio8 from "../assets/images/gym-coaching-session-behind-the-scenes.jpg";
import portfolio9 from "../assets/images/fitness-creator-with-mic-portrait.jpg";
import portfolio10 from "../assets/images/athlete-laughing-gym-hoodie-portrait.jpg";
import portfolio11 from "../assets/images/muscular-athlete-gym-portrait.jpg";
import portfolio12 from "../assets/images/fitness-influencer-motivational-content.jpg";
import portfolio13 from "../assets/images/male-athlete-gym-content-shoot.jpg";
import portfolio14 from "../assets/images/gym-floor-portrait-behind-the-scenes.jpg";
import portfolio15 from "../assets/images/trainer-leg-press-coaching-reel.jpg";

const allItems = [
  { src: portfolio7, alt: "Fitness content creator laughing during gym shoot" },
  { src: portfolio1, alt: "Back training reel cover design for fitness content" },
  { src: portfolio5, alt: "Fitness model portrait shot at the gym" },
  { src: portfolio9, alt: "Fitness creator with wireless mic portrait" },
  { src: portfolio3, alt: "Personal trainer hip thrust tutorial video" },
  { src: portfolio2, alt: "Bodybuilder motivational reel thumbnail" },
  { src: portfolio8, alt: "Behind the scenes gym coaching session" },
  { src: portfolio6, alt: "Fitness friends candid moment during gym session" },
  { src: portfolio10, alt: "Athlete laughing in hoodie at the gym" },
  { src: portfolio4, alt: "Male athlete talking video with wireless microphone" },
  { src: portfolio11, alt: "Muscular athlete portrait at the gym" },
  { src: portfolio12, alt: "Fitness influencer creating motivational content" },
  { src: portfolio13, alt: "Male athlete during gym content shoot" },
  { src: portfolio14, alt: "Behind the scenes gym floor portrait session" },
  { src: portfolio15, alt: "Trainer coaching leg press form during reel shoot" },
];

function distributeItems(items: typeof allItems, colCount: number) {
  const columns: (typeof allItems)[] = Array.from({ length: colCount }, () => []);
  items.forEach((item, i) => {
    columns[i % colCount].push(item);
  });
  return columns;
}

export default function Portfolio() {
  const columns = distributeItems(allItems, 4);

  return (
    <section id="work" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 text-accent font-bold uppercase tracking-widest mb-4 text-sm">
          <span className="w-8 h-[2px] bg-accent"></span> Portfolio
        </div>
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Featured Work</h2>
        <p className="text-neutral-400 max-w-2xl mx-auto">Real content from real shoots — reels, thumbnails, promos, and branded fitness media.</p>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
        {columns.map((col, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-2">
            {col.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden group relative"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
