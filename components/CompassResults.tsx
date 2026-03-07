import { UI_TEXT } from '../constants';
import type { CompassResponse } from '../types';

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const applyInlineMarkdown = (line: string) => {
  const escaped = escapeHtml(line);
  return escaped
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>');
};

const markdownToHtml = (markdown: string) => {
  const lines = markdown.split('\n').map((line) => line.trim());
  const output: string[] = [];
  let inList = false;

  for (const line of lines) {
    if (!line) {
      if (inList) {
        output.push('</ul>');
        inList = false;
      }
      continue;
    }

    if (line.startsWith('## ')) {
      if (inList) {
        output.push('</ul>');
        inList = false;
      }
      output.push(`<h4>${applyInlineMarkdown(line.slice(3))}</h4>`);
      continue;
    }

    if (line.startsWith('# ')) {
      if (inList) {
        output.push('</ul>');
        inList = false;
      }
      output.push(`<h3>${applyInlineMarkdown(line.slice(2))}</h3>`);
      continue;
    }

    if (line.startsWith('- ') || /^\d+\.\s/.test(line)) {
      if (!inList) {
        output.push('<ul>');
        inList = true;
      }
      const itemText = line.startsWith('- ') ? line.slice(2) : line.replace(/^\d+\.\s/, '');
      output.push(`<li>${applyInlineMarkdown(itemText)}</li>`);
      continue;
    }

    if (inList) {
      output.push('</ul>');
      inList = false;
    }

    output.push(`<p>${applyInlineMarkdown(line)}</p>`);
  }

  if (inList) {
    output.push('</ul>');
  }

  return output.join('');
};

export const CompassResults = ({ response }: { response: CompassResponse }) => (
  <section className="results" aria-live="polite">
    <h2>{response.heading}</h2>
    <p className="summary">{response.summary}</p>

    <div className="result-card">
      <h3>{UI_TEXT.roadmapTitle}</h3>
      <ol>
        {response.steps.map((step) => (
          <li key={step.title}>
            <h4>{step.title}</h4>
            <p>{step.details}</p>
          </li>
        ))}
      </ol>
    </div>

    {response.tips.length > 0 && (
      <div className="result-card tips">
        <h3>Extra Tips</h3>
        <ul>
          {response.tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </div>
    )}

    {response.markdown && (
      <div className="result-card markdown" dangerouslySetInnerHTML={{ __html: markdownToHtml(response.markdown) }} />
    )}
  </section>
);
