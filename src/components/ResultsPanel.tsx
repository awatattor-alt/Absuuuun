import { motion } from 'framer-motion';
import { CompassResponse } from '../types/compass';

interface ResultsPanelProps {
  result: CompassResponse;
  onReset: () => void;
}

export const ResultsPanel = ({ result, onReset }: ResultsPanelProps) => (
  <motion.div
    className="compass-results"
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35 }}
  >
    <div className="surface">
      <h2 className="result-title">Your Path Forward</h2>
      <p className="step-body summary">{result.summary}</p>

      {result.steps.map((step, index) => (
        <div className="step-card" key={`${step.title}-${index}`}>
          <h3 className="step-title">{step.title}</h3>
          <p className="step-body">{step.body}</p>
        </div>
      ))}

      <div className="tips-section">
        <p className="step-body">
          <strong>Tip:</strong> {result.tip}
        </p>
      </div>

      <button className="reset-btn" onClick={onReset}>
        Start New Query
      </button>
    </div>
  </motion.div>
);
