import { APP_CONTENT } from '../constants';

export default function CompassHeader() {
  return (
    <header className="compass-header">
      <h1>{APP_CONTENT.title}</h1>
      <p>{APP_CONTENT.subtitle}</p>
    </header>
  );
}
