import { FeaturesOverview } from "./components/Feature";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/Hero";
import Navbar from "./components/Navbar";
import { Testimonials } from "./components/Testimonials";


export default function App() {
  const navLinks = [
    { href: '#Home', label: 'Home' },
    { href: '#Feature', label: 'Features' },
    { href: '/calculators', label: 'Calculators' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/contact', label: 'Contact' },
  ];

  const ctaButton = {
    href: '/dashboard',
    label: 'Get Started',
  };

  return (
    <div>
      <Navbar navLinks={navLinks} ctaButton={ctaButton} />
      <HeroSection/>
      <FeaturesOverview/>
      <Testimonials/>
      <Footer/>
    </div>
  );
}
