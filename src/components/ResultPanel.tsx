import { motion } from 'framer-motion';
import { DEFAULT_FALLBACK_TIP } from '../features/compass/constants';

interface ResultPanelProps {
  result: string;
  onReset: () => void;
}

export function ResultPanel({ result, onReset }: ResultPanelProps) {
  return (
    <motion.div
      className="compass-results"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <div className="surface">
        <h2 className="result-title">Your Path Forward</h2>
        <div className="step-card">
          <h3 className="step-title">Step 1: Understand the Landscape</h3>
          <p className="step-body">{result}</p>
        </div>
        <div className="tips-section">
          <p className="step-body">
            <strong>Tip:</strong> {DEFAULT_FALLBACK_TIP}
          </p>
        </div>
        <button className="reset-btn" onClick={onReset}>
          Start New Query
        </button>
      </div>
    </motion.div>
  );
}
