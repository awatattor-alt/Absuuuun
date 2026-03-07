import { CompassResponse } from '../types';

interface CompassResultsProps {
  result: CompassResponse;
  onReset: () => void;
}

export default function CompassResults({ result, onReset }: CompassResultsProps) {
  return (
    <section className="results fade-in">
      <article className="result-card summary-card">
        <h2>Summary</h2>
        <p>{result.summary}</p>
      </article>

      {result.steps.map((step, index) => (
        <article className="result-card" key={`${step.title}-${index}`}>
          <p className="step-label">Step {index + 1}</p>
          <h3>{step.title}</h3>
          <p>{step.explanation}</p>
          <p className="action">Action: {step.action}</p>
        </article>
      ))}

      <article className="result-card safety-card">
        <h2>Safety note</h2>
        <p>{result.safetyNote}</p>
      </article>

      <button type="button" className="reset-button" onClick={onReset}>
        ↩ Ask another question
      </button>
    </section>
  );
}
