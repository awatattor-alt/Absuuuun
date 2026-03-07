interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => (
  <section className="state-panel error-state" role="alert">
    <h2>Something went wrong</h2>
    <p>{message}</p>
    <button type="button" className="retry-btn" onClick={onRetry}>
      Retry
    </button>
  </section>
);
