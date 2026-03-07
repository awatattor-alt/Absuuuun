import { UI_TEXT } from '../constants';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => (
  <section className="state error" role="alert">
    <h2>We hit a navigation issue</h2>
    <p>{message}</p>
    <button type="button" onClick={onRetry}>
      {UI_TEXT.retry}
    </button>
  </section>
);
