'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="font-semibold text-lg">Md. Asaduzzaman Rony</p>
            <p className="text-slate-400 text-sm">
              DevOps Engineer · Bangladesh
            </p>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-slate-400 text-sm">
              &copy; {currentYear} All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
