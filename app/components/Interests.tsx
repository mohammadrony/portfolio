export default function Interests() {
  const interests = [
    { text: "Contributing to open-source DevOps tools", icon: "🔧" },
    { text: "Building Kubernetes lab environments", icon: "☸️" },
    { text: "Cloud computing communities", icon: "☁️" },
    { text: "Continuous learning & certifications", icon: "📖" },
    { text: "Programming challenges (LeetCode, HackerRank)", icon: "💻" },
    { text: "AI integrations in DevOps workflows", icon: "🤖" }
  ];

  return (
    <section id="interests" className="py-20 px-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-slate-800 dark:text-white mb-16">
          ❤️ Interests & Passion
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interests.map((interest, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 card-hover"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{interest.icon}</span>
                <p className="text-slate-700 dark:text-slate-300 font-medium">{interest.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}