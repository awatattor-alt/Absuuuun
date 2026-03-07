import type { CompassResponse } from '../types';

interface CompassResultsProps {
  response: CompassResponse;
}

export const CompassResults = ({ response }: CompassResultsProps) => (
  <section className="results" aria-live="polite">
    <article className="result-card">
      <h2 className="results-title">{response.title}</h2>
    </article>

    {response.steps.map((step, index) => (
      <article className="result-card" key={`${step.title}-${index}`}>
        <p className="step-label">Step {index + 1}</p>
        <h3>{step.title}</h3>
        <p>{step.body}</p>
      </article>
    ))}

    <article className="result-card">
      <h3>Helpful tips</h3>
      <ul className="tips-list">
        {response.tips.map((tip, index) => (
          <li key={`${tip}-${index}`}>{tip}</li>
        ))}
      </ul>
    </article>
  </section>
);
