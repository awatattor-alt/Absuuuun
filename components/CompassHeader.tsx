interface CompassHeaderProps {
  title: string;
  description: string;
}

export const CompassHeader = ({ title, description }: CompassHeaderProps) => (
  <header className="hero">
    <p className="eyebrow">AI Navigation Assistant</p>
    <h1>{title}</h1>
    <p>{description}</p>
  </header>
);
