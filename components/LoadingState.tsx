import { APP_CONTENT } from '../constants';

export default function LoadingState() {
  return (
    <section className="state-panel">
      <h2>Generating guidance</h2>
      <p>{APP_CONTENT.loadingLabel}</p>
    </section>
  );
}
