export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-8">
          📞 Let&apos;s Build Something Amazing Together
        </h2>
        <p className="text-xl text-blue-100 mb-12">
          Interested in DevOps solutions, cloud infrastructure, or AI-powered software solutions? 
          Let&apos;s connect and discuss how we can optimize your software delivery processes.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 hover:bg-white/20 transition-all duration-300">
            <div className="text-4xl mb-3">📧</div>
            <h3 className="text-white font-semibold mb-2">Email</h3>
            <p className="text-blue-100">mohammadronyku@gmail.com</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 hover:bg-white/20 transition-all duration-300">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="text-white font-semibold mb-2">Phone</h3>
            <p className="text-blue-100">(880) 1521-255638</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 hover:bg-white/20 transition-all duration-300">
            <div className="text-4xl mb-3">📍</div>
            <h3 className="text-white font-semibold mb-2">Location</h3>
            <p className="text-blue-100">Dhaka, Bangladesh</p>
          </div>
        </div>
      </div>
    </section>
  );
}