import { UI_TEXT } from '../constants';

export const LoadingState = () => (
  <section className="state-panel" aria-live="polite" aria-busy="true">
    <div className="spinner" aria-hidden="true" />
    <p>{UI_TEXT.loading}</p>
  </section>
);
