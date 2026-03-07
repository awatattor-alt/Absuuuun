interface ErrorStateProps {
  message: string;
}

export default function ErrorState({ message }: ErrorStateProps) {
  return (
    <section className="state-panel error-state">
      <h2>Something went wrong</h2>
      <p>{message}</p>
    </section>
  );
}
