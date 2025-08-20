import Image from 'next/image';

export default function Certificates() {
  return (
    <section id="certifications" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-slate-800 dark:text-white mb-16">
          🏆 Certifications
        </h2>
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 card-hover max-w-md animate-glow">
            <div className="text-center">
              <div className="w-30 h-30 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg relative overflow-hidden">
                <Image
                  src="/cka.png"
                  alt="CKA Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Certified Kubernetes Administrator
              </h3>
              <p className="text-green-100 mb-4 text-lg">The Linux Foundation</p>
              <p className="text-white font-semibold text-lg">Sep 2024 – Sep 2026</p>
              <a
                href="https://www.credly.com/badges/b075342a-283a-4067-a2d6-cf4c7b114a26"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                View Certificate
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}