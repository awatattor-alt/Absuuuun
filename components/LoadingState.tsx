import { UI_TEXT } from '../constants';

export const LoadingState = () => (
  <section className="state loading" aria-live="polite">
    <div className="compass-spinner" aria-hidden="true" />
    <p>{UI_TEXT.loading}</p>
  </section>
);
