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
    "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",

    "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    "Flask": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
    "Streamlit": "https://docs.streamlit.io/logo.svg",
    "REST APIs": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
    "WebSockets": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg",
    "Kafka": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg",
    "Spring Boot": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
    "Kubernetes": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
    "Prometheus": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg",
    "Grafana": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg",
    "Zipkin": "https://zipkin.io/public/favicon.ico",
    "ONNX Runtime": "https://upload.wikimedia.org/wikipedia/commons/d/d2/ONNX_logo_main.svg",

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
    "CUDA": "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg",

    // Tools & Systems
    "Docker": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    "PostgreSQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    "Linux": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    "AWS/GCP": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
    "FFmpeg": "https://upload.wikimedia.org/wikipedia/commons/7/76/FFmpeg_icon.svg",
    "OpenTelemetry": "https://opentelemetry.io/img/logos/opentelemetry-logo.svg",
  };

  return logoMap[skillName] || "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/code/code-original.svg";
};

const skills = [
  { name: "C++", level: 90, category: "languages", experience: "Physics and optimization code where memory locality and predictable latency mattered." },
  { name: "Rust", level: 85, category: "languages", experience: "Concurrent services and tooling that benefited from safe parallelism." },
  { name: "Python", level: 95, category: "languages", experience: "Modeling, pipeline automation, and orchestration across large datasets." },
  { name: "SQL", level: 90, category: "languages", experience: "Query planning, indexing, and data access on 9M+ record workloads." },
  { name: "TypeScript", level: 85, category: "languages", experience: "Systems UIs and control surfaces where typed contracts reduced errors." },
  { name: "Java", level: 80, category: "languages", experience: "General application development and structured backend work." },

  { name: "CUDA", level: 85, category: "runtime", experience: "GPU profiling and kernel-level performance tuning." },
  { name: "Node.js", level: 85, category: "runtime", experience: "Event-driven APIs and orchestration layers." },
  { name: "REST APIs", level: 90, category: "runtime", experience: "Latency-sensitive service boundaries with instrumentation." },
  { name: "WebSockets", level: 85, category: "runtime", experience: "Low-latency event delivery for live dashboards." },
  { name: "Flask", level: 85, category: "runtime", experience: "Optimization APIs and fast prototype services." },
  { name: "Docker", level: 85, category: "runtime", experience: "Reproducible environments for profiling and deployment." },
  { name: "Kafka", level: 85, category: "runtime", experience: "Event streaming pipelines with durable ingestion and replay." },
  { name: "Spring Boot", level: 80, category: "runtime", experience: "Microservices for distributed analytics and APIs." },

  { name: "PyTorch", level: 90, category: "ml", experience: "Training and inference workflows under compute constraints." },
  { name: "TensorFlow", level: 85, category: "ml", experience: "Real-time classification and multimodal experiments." },
  { name: "ONNX Runtime", level: 85, category: "ml", experience: "Execution-graph optimization and embedded inference tuning." },
  { name: "Computer Vision", level: 90, category: "ml", experience: "Frame-level analysis where runtime and accuracy both mattered." },
  { name: "OpenCV", level: 90, category: "ml", experience: "Video preprocessing and frame extraction." },
  { name: "YOLO v8", level: 90, category: "ml", experience: "Real-time object detection with inference-path optimization." },
  { name: "CLIP", level: 85, category: "ml", experience: "Semantic matching across visual streams." },
  { name: "OpenAI Whisper", level: 85, category: "ml", experience: "Streaming speech-to-text transcription." },
  { name: "LSTM Networks", level: 80, category: "ml", experience: "Sequence modeling for sentiment and time-series signals." },

  { name: "Linear Programming", level: 85, category: "data", experience: "Constrained allocation and optimization under operational limits." },
  { name: "Cython", level: 80, category: "data", experience: "Hot-path acceleration in Python services." },
  { name: "Pandas", level: 90, category: "data", experience: "Large-scale data wrangling and feature preparation." },
  { name: "Scikit-Learn", level: 85, category: "data", experience: "Baseline modeling, benchmarking, and evaluation loops." },
  { name: "Web Scraping", level: 90, category: "data", experience: "High-volume data collection and normalization." },
  { name: "PostgreSQL", level: 85, category: "data", experience: "Index tuning and query-plan improvement on large tables." },

  { name: "Linux", level: 90, category: "infra", experience: "perf, tracing, and production debugging on Unix systems." },
  { name: "Git", level: 95, category: "infra", experience: "Versioned changes across fast-moving team environments." },
  { name: "FFmpeg", level: 75, category: "infra", experience: "Audio and video processing pipelines." },
  { name: "AWS/GCP", level: 75, category: "infra", experience: "Cloud deployment and hosted services." },
  { name: "OpenTelemetry", level: 80, category: "infra", experience: "Instrumentation and trace-driven debugging." },
  { name: "MongoDB", level: 80, category: "infra", experience: "Document storage for rapid application iteration." },
  { name: "Kubernetes", level: 80, category: "infra", experience: "Container orchestration for scalable services." },
  { name: "Prometheus", level: 80, category: "infra", experience: "Metrics collection and SLO-oriented monitoring." },
  { name: "Grafana", level: 80, category: "infra", experience: "Operational dashboards for system health and latency trends." },
  { name: "Zipkin", level: 75, category: "infra", experience: "Distributed tracing for request-path diagnosis." },
];

const categories = ["all", "languages", "runtime", "ml", "data", "infra"];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );
  return (
    <section id="capabilities" className="py-16 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Technical <span className="text-primary"> Skills</span>
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
                  : "bg-secondary/70 text-foreground hover:bg-secondary"
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
              const isTopRow = key < 3;

              return (
                <div
                  key={key}
                  className="bg-card p-4 rounded-lg shadow-xs card-hover relative group hover:z-50 flex items-center"
                  title={skill.experience}
                >
                  <div className="flex-1 pr-4">
                    <h3 className="font-semibold text-base text-left mb-3">{skill.name}</h3>

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

                  <div className={`absolute left-1/2 transform -translate-x-1/2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-[9999] w-64 text-center ${isTopRow
                    ? 'top-full mt-2'
                    : 'bottom-full mb-2'
                    }`}>
                    <div className="font-medium mb-1">Experience:</div>
                    <div>{skill.experience}</div>
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
