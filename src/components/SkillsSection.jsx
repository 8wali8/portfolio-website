import { useState } from "react";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

// Convert percentage to 5-star rating
const getStarRating = (level) => {
  if (level >= 90) return 5;
  if (level >= 80) return 4;
  if (level >= 70) return 3;
  if (level >= 60) return 2;
  return 1;
};

// Get appropriate logo URL for each skill
const getSkillLogo = (skillName) => {
  const logoMap = {
    // Languages
    "Python": "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
    "C++": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    "Rust": "https://www.rust-lang.org/static/images/rust-logo-blk.svg",
    "Java": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    "SQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    "R": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg",

    // Web Development
    "React": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    "Flask": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
    "Streamlit": "https://docs.streamlit.io/logo.svg",
    "REST APIs": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
    "WebSockets": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg",
    "GraphQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",

    // Distributed Systems & Microservices
    "Spring Boot": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
    "Apache Kafka": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg",
    "Microservices": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    "Circuit Breakers": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
    "Eureka": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
    "API Gateway": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",
    "Event-Driven Architecture": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg",

    // AI & Computer Vision
    "YOLO v8": "https://avatars.githubusercontent.com/u/26833433?s=200&v=4",
    "CLIP": "https://raw.githubusercontent.com/openai/CLIP/main/CLIP.png",
    "OpenAI Whisper": "https://avatars.githubusercontent.com/u/14957082?s=200&v=4",
    "LSTM Networks": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
    "OpenCV": "https://raw.githubusercontent.com/opencv/opencv/master/doc/opencv-logo-white.png",
    "Computer Vision": "https://raw.githubusercontent.com/opencv/opencv/master/doc/opencv-logo-white.png",
    "NLP": "https://huggingface.co/front/assets/huggingface_logo-noborder.svg",

    // Data & ML
    "PyTorch": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
    "TensorFlow": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
    "Linear Programming": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    "PuLP Optimization": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    "Pandas": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
    "Scikit-Learn": "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg",
    "Web Scraping": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    "Cython": "https://avatars.githubusercontent.com/u/11897326?s=200&v=4",

    // Tools & Systems
    "Docker": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    "Kubernetes": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
    "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    "PostgreSQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    "Redis": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    "Cassandra": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cassandra/cassandra-original.svg",
    "Linux": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    "AWS/GCP": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
    "FFmpeg": "https://upload.wikimedia.org/wikipedia/commons/7/76/FFmpeg_icon.svg",
    "Prometheus": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg",
    "Grafana": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg",
  };

  return logoMap[skillName] || "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/code/code-original.svg";
};

const skills = [
  // Languages
  { name: "Python", level: 95, category: "languages", experience: "NASA (240K+ files), CosmicBrain AI (robotics), Jumpseat (pricing), StreamSense (AI/ML)" },
  { name: "C++", level: 90, category: "languages", experience: "CosmicBrain AI (physics simulation), Systems programming" },
  { name: "Rust", level: 85, category: "languages", experience: "CosmicBrain AI (simulation tooling), GPU parallelization" },
  { name: "Java", level: 85, category: "languages", experience: "Android Studio interfaces, Enterprise development" },
  { name: "SQL", level: 90, category: "languages", experience: "Jumpseat (PostgreSQL 9M+ records), Database management" },
  { name: "JavaScript", level: 85, category: "languages", experience: "Jumpseat (React frontend), Medical Mutts (MERN stack)" },
  { name: "TypeScript", level: 85, category: "languages", experience: "MARA Hackathon (Bitcoin mining platform)" },
  { name: "R", level: 80, category: "languages", experience: "Purdue Statistics major, Data analysis" },

  // Web Development
  { name: "React", level: 90, category: "web", experience: "Jumpseat, MARA Hackathon, Medical Mutts (1000+ users), StreamSense production dashboard" },
  { name: "Node.js", level: 85, category: "web", experience: "Jumpseat backend, Medical Mutts, MARA Hackathon" },
  { name: "Flask", level: 85, category: "web", experience: "MARA Hackathon (optimization API server), StreamSense ML services" },
  { name: "Streamlit", level: 90, category: "web", experience: "StreamSense (analytics dashboard)" },
  { name: "REST APIs", level: 90, category: "web", experience: "Jumpseat (secure APIs), Medical Mutts" },
  { name: "WebSockets", level: 85, category: "web", experience: "Medical Mutts (real-time collaboration)" },
  { name: "GraphQL", level: 85, category: "web", experience: "StreamSense (federation & real-time subscriptions)" },

  // Distributed Systems & Microservices
  { name: "Spring Boot", level: 90, category: "distributed", experience: "StreamSense (8+ microservices ecosystem)" },
  { name: "Apache Kafka", level: 85, category: "distributed", experience: "StreamSense (10K+ events/sec processing)" },
  { name: "Microservices", level: 85, category: "distributed", experience: "StreamSense (service discovery, fault tolerance)" },
  { name: "Circuit Breakers", level: 80, category: "distributed", experience: "StreamSense (Hystrix for resilience)" },
  { name: "Eureka", level: 80, category: "distributed", experience: "StreamSense (service discovery)" },
  { name: "API Gateway", level: 80, category: "distributed", experience: "StreamSense (Zuul gateway with rate limiting)" },
  { name: "Event-Driven Architecture", level: 85, category: "distributed", experience: "StreamSense (Kafka-based event streaming)" },

  // AI & Computer Vision
  { name: "YOLO v8", level: 90, category: "ai", experience: "StreamSense (real-time logo detection)" },
  { name: "CLIP", level: 85, category: "ai", experience: "StreamSense (semantic logo matching)" },
  { name: "OpenAI Whisper", level: 85, category: "ai", experience: "StreamSense (speech-to-text transcription)" },
  { name: "LSTM Networks", level: 85, category: "ai", experience: "StreamSense (sentiment analysis)" },
  { name: "OpenCV", level: 90, category: "ai", experience: "StreamSense (video processing)" },
  { name: "Computer Vision", level: 90, category: "ai", experience: "NASA (75% precision boost), StreamSense" },
  { name: "NLP", level: 85, category: "ai", experience: "StreamSense (chat analysis, transcript processing)" },

  // Data & ML
  { name: "PyTorch", level: 90, category: "data", experience: "NASA (exoplanet models), CosmicBrain AI (trajectory optimization)" },
  { name: "TensorFlow", level: 85, category: "data", experience: "StreamSense (LSTM models), NASA workflows" },
  { name: "Linear Programming", level: 85, category: "data", experience: "MARA Hackathon (resource optimization)" },
  { name: "PuLP Optimization", level: 80, category: "data", experience: "MARA Hackathon (mining allocation solver)" },
  { name: "Pandas", level: 90, category: "data", experience: "NASA (240K+ files), Caterpillar (500K+ records)" },
  { name: "Scikit-Learn", level: 85, category: "data", experience: "NASA (model benchmarking), ML workflows" },
  { name: "Web Scraping", level: 90, category: "data", experience: "Jumpseat (9M+ Google Flights data points)" },
  { name: "Cython", level: 80, category: "data", experience: "Jumpseat (2K+ requests/sec optimization)" },

  // Tools & Systems
  { name: "Docker", level: 85, category: "tools", experience: "Containerization across projects, StreamSense microservices" },
  { name: "Kubernetes", level: 80, category: "tools", experience: "StreamSense (K8s deployment manifests)" },
  { name: "Git", level: 95, category: "tools", experience: "Version control (NASA, internships, hackathons)" },
  { name: "PostgreSQL", level: 85, category: "tools", experience: "Jumpseat (9M+ records, CRON automation), StreamSense" },
  { name: "MongoDB", level: 80, category: "tools", experience: "MARA Hackathon, Medical Mutts (MERN stack)" },
  { name: "Redis", level: 80, category: "tools", experience: "StreamSense (sub-millisecond caching)" },
  { name: "Cassandra", level: 75, category: "tools", experience: "StreamSense (distributed database)" },
  { name: "Linux", level: 90, category: "tools", experience: "CosmicBrain AI (system optimization), NASA supercomputer" },
  { name: "AWS/GCP", level: 75, category: "tools", experience: "Cloud computing, deployment platforms, StreamSense (EKS/GKE)" },
  { name: "FFmpeg", level: 75, category: "tools", experience: "StreamSense (audio/video processing)" },
  { name: "Prometheus", level: 75, category: "tools", experience: "StreamSense (metrics collection & monitoring)" },
  { name: "Grafana", level: 75, category: "tools", experience: "StreamSense (operational dashboards)" },
];

const categories = ["all", "languages", "web", "distributed", "ai", "data", "tools"];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );
  return (
    <section id="skills" className="py-16 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          My <span className="text-primary"> Skills</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 py-1.5 rounded-full transition-colors duration-300 capitalize text-sm",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-forefround hover:bd-secondary"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div
          className="h-[500px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-white/20 [&::-webkit-scrollbar-thumb]:bg-white/60 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/80"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255, 255, 255, 0.6) rgba(255, 255, 255, 0.2)',
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pr-2">
            {filteredSkills.map((skill, key) => {
              // Check if this is one of the top row skills - adjust tooltip position for 3 columns max
              const isTopRow = key < 3;

              return (
                <div
                  key={key}
                  className="bg-card p-4 rounded-lg shadow-xs card-hover relative group hover:z-50 flex items-center"
                  title={skill.experience}
                >
                  {/* Content section */}
                  <div className="flex-1 pr-4">
                    <h3 className="font-semibold text-base text-left mb-3">{skill.name}</h3>

                    {/* Space-themed 5-star rating */}
                    <div className="flex justify-start items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`transition-colors duration-300 ${i < getStarRating(skill.level)
                            ? 'text-primary fill-primary'
                            : 'text-muted-foreground/30'
                            }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Logo section - vertically centered to entire card */}
                  <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center bg-white/10 rounded-lg p-2">
                    <img
                      src={getSkillLogo(skill.name)}
                      alt={`${skill.name} logo`}
                      className="w-full h-full object-contain filter brightness-110 contrast-110"
                      style={{
                        filter: 'brightness(1.1) contrast(1.1) drop-shadow(0 0 4px rgba(255,255,255,0.1))'
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>

                  {/* Tooltip - positioned below for top row, above for others */}
                  <div className={`absolute left-1/2 transform -translate-x-1/2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-[9999] w-64 text-center ${isTopRow
                    ? 'top-full mt-2'
                    : 'bottom-full mb-2'
                    }`}>
                    <div className="font-medium mb-1">Experience:</div>
                    <div>{skill.experience}</div>
                    {/* Arrow pointing up for bottom tooltips, down for top tooltips */}
                    <div className={`absolute left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-transparent ${isTopRow
                      ? 'bottom-full border-b-4 border-b-gray-900'
                      : 'top-full border-t-4 border-t-gray-900'
                      }`}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
