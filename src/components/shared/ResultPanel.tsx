import { motion } from 'framer-motion';

const fallbackTip =
  'Always verify local regulations and tax requirements with a trusted legal advisor in Iraq.';

interface ResultPanelProps {
  result: string;
  onReset: () => void;
}

export function ResultPanel({ result, onReset }: ResultPanelProps) {
  return (
    <motion.section
      className="panel"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <h2 className="panel-title">Your Path Forward</h2>
      <article className="result-card">
        <h3>Step 1: Understand the Landscape</h3>
        <p>{result}</p>
      </article>
      <article className="tip-card">
        <p>
          <strong>Tip:</strong> {fallbackTip}
        </p>
      </article>
      <button className="secondary-btn" onClick={onReset}>
        Start New Query
      </button>
    </motion.section>
  );
}
