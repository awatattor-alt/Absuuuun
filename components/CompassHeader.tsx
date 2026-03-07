interface CompassHeaderProps {
  title: string;
  description: string;
}

export const CompassHeader = ({ title, description }: CompassHeaderProps) => (
  <header className="compass-header">
    <h1 className="compass-title">{title}</h1>
    <p className="compass-subtitle">{description}</p>
  </header>
);
