import React from 'react';
import './SectionDivider.css';

interface Props {
  text?: string;
  reverse?: boolean;
  accent?: boolean;
}

const DEFAULT = 'REACT · TYPESCRIPT · NODE.JS · NEXT.JS · TAILWIND · SUPABASE · POSTGRESQL · FIGMA ·';

const SectionDivider: React.FC<Props> = ({ text = DEFAULT, reverse, accent }) => (
  <div className={`sdiv${accent ? ' sdiv--accent' : ''}`} aria-hidden="true">
    <div className={`sdiv-track${reverse ? ' sdiv-track--reverse' : ''}`}>
      {[text, text, text].map((t, i) => (
        <span key={i}>{t}&nbsp;&nbsp;</span>
      ))}
    </div>
  </div>
);

export default SectionDivider;
