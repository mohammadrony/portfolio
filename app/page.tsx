import Hero from './components/Hero';
import Journey from './components/Journey';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Interests from './components/Interests'
import Skills from './components/Skills';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 overflow-x-hidden">
      <Hero />
      <Journey />
      <Projects />
      <Certificates />
      <Skills />
      <Interests />
      <Contact />
      <Footer />
    </main>
  );
}