import ScrollReveal from './ScrollReveal';

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6 bg-linear-to-r from-blue-600 to-purple-600">
      <div className="max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-4xl font-bold text-white mb-8">
            📞 Let&apos;s Build Something Amazing Together
          </h2>
          <p className="text-xl text-blue-100 mb-12">
            Interested in DevOps solutions, cloud infrastructure, or Automated solutions?
            Let&apos;s connect and discuss how we can optimize your software delivery processes.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <ScrollReveal delay={0.1} width="100%">
            <a href="mailto:mohammadronyku@gmail.com" target="_blank" rel="noopener noreferrer" className="block h-full">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 hover:bg-white/20 transition-all duration-300 h-full flex flex-col items-center justify-center hover:scale-105 cursor-pointer">
                <div className="text-4xl mb-3">✉</div>
                <h3 className="text-white font-semibold mb-2">Email</h3>
                <p className="text-blue-100 break-all">mohammadronyku@gmail.com</p>
              </div>
            </a>
          </ScrollReveal>

          <ScrollReveal delay={0.2} width="100%">
            <a href="https://wa.me/8801521255638" target="_blank" rel="noopener noreferrer" className="block h-full">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 hover:bg-white/20 transition-all duration-300 h-full flex flex-col items-center justify-center hover:scale-105 cursor-pointer">
                <div className="text-4xl mb-3">☎</div>
                <h3 className="text-white font-semibold mb-2">Phone</h3>
                <p className="text-blue-100">(880) 1521-255638</p>
              </div>
            </a>
          </ScrollReveal>

          <ScrollReveal delay={0.3} width="100%">
            <a href="https://maps.app.goo.gl/GKsPZwzoCxZH8KYP7" target="_blank" rel="noopener noreferrer" className="block h-full">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 hover:bg-white/20 transition-all duration-300 h-full flex flex-col items-center justify-center hover:scale-105 cursor-pointer">
                <div className="text-4xl mb-3">🕈</div>
                <h3 className="text-white font-semibold mb-2">Location</h3>
                <p className="text-blue-100">Dhaka, Bangladesh</p>
              </div>
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}