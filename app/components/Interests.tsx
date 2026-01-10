import ScrollReveal from './ScrollReveal';

export default function Interests() {
  const interests = [
    { text: "Open-source contributions", icon: "🌍" },
    { text: "Building lab environments", icon: "☸️" },
    { text: "Cloud computing", icon: "☁️" },
    { text: "Continuous learning", icon: "📖" },
    { text: "Programming challenges", icon: "💻" },
    { text: "AI in technology", icon: "🤖" }
  ];

  return (
    <section id="interests" className="py-20 px-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-16">
            ❤️ Interests & Passion
          </h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interests.map((interest, index) => (
            <ScrollReveal key={index} delay={index * 0.1} width="100%">
              <div
                key={index}
                className="bg-white dark:bg-slate-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 card-hover h-full"
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{interest.icon}</span>
                  <p className="text-slate-700 dark:text-slate-300 font-medium">{interest.text}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}