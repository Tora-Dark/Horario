import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import TutorialsSection from './components/TutorialsSection';
import SupportSection from './components/SupportSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
    {/*   <Header /> */}
      <HeroSection />
      <FeaturesSection />
      <TutorialsSection />
      <SupportSection />
      <Footer />
    </>
  );
}
