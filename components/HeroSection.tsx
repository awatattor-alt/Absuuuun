import { HERO_IMAGES } from '../constants';

export default function HeroSection() {
  return (
    <section className="rounded-2xl overflow-hidden grid grid-cols-1 sm:grid-cols-3 gap-2">
      {HERO_IMAGES.map((src, index) => (
        <img key={src} src={src} alt={`hero-${index + 1}`} className="h-36 w-full object-cover" />
      ))}
    </section>
  );
}
