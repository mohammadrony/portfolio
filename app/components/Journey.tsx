export default function Journey() {
  const roadmapItems = [
    {
      key: "work",
      title: "Current Role",
      subtitle: "Junior DevOps Engineer",
      institution: "Dynamic Solution Innovators Ltd.",
      period: "Sep 2023 – Present",
      details: "Full-stack development, Cloud deployment, Container orchestration, Database administration, CI/CD automation, Monitoring & observability",
      icon: "💼",
    },
    {
      key: "training",
      title: "Training",
      subtitle: "Trainee DevOps and Cloud Engineer",
      institution: "BJIT Academy Ltd.",
      period: "Apr 2023 - Jul 2023",
      details: "Cloud Computing with AWS services, Docker & Kubernetes containerization, CI/CD pipelines with Jenkins & GitLab, Ansible automation",
      icon: "📚",
    },
    {
      key: "education",
      title: "Education",
      subtitle: "B.Sc. in Computer Science and Engineering",
      institution: "Khulna University",
      period: "Jan 2018 – Feb 2023",
      details: "GPA: 3.43/4.00 | Coursework: Data Structures, Algorithms, Database Systems, Operating Systems, Computer Networks, Software Engineering, AI, ML",
      icon: "🎓",
    },
  ];

  return (
    <section id="roadmap" className="py-12 sm:py-20 px-4 sm:px-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-slate-800 dark:text-white mb-8 sm:mb-12">
          🛤️ My Journey
        </h2>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600 rounded-full hidden md:block"></div>
          <div className="space-y-3 sm:space-y-4">
            {roadmapItems.map((item, index) => (
              <div key={item.key} className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-6 md:text-right' : 'md:pl-6 md:text-left'} mb-4 md:mb-0`}>
                  <div
                    className="w-full bg-white dark:bg-slate-700 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 card-hover text-left"
                  >
                    <div className="flex items-center gap-3 mb-3 justify-center md:justify-start">
                      <span className="text-2xl sm:text-3xl">{item.icon}</span>
                      <div className="text-center md:text-left">
                        <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white">{item.title}</h3>
                        <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm sm:text-base">{item.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-base sm:text-lg font-semibold text-purple-600 dark:text-purple-400 mb-2 text-center md:text-left">{item.institution}</p>
                    <p className="text-slate-600 dark:text-slate-300 font-medium mb-3 text-center md:text-left text-sm sm:text-base">{item.period}</p>
                    <p className="text-slate-700 dark:text-slate-300 text-center md:text-left text-sm sm:text-base">{item.details}</p>
                  </div>
                </div>
                <div className="relative z-10 hidden md:block">
                  <div className="w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-2 sm:border-4 border-white dark:border-slate-800 shadow-lg"></div>
                </div>
                <div className="w-full md:w-1/2 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}