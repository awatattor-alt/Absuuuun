interface EmptyStateProps {
  suggestions: string[];
}

export const EmptyState = ({ suggestions }: EmptyStateProps) => (
  <section className="state empty">
    <h2>Your compass is ready</h2>
    <p>Ask a question to get a step-by-step roadmap with practical next actions.</p>
    <ul>
      {suggestions.map((suggestion) => (
        <li key={suggestion}>{suggestion}</li>
      ))}
    </ul>
  </section>
);
