import React from 'react';
import './SectionDivider.css';

interface Props {
  text?: string;
  reverse?: boolean;
  accent?: boolean;
}

const DEFAULT_ITEMS = [
  'REACT', 'TYPESCRIPT', 'NODE.JS', 'NEXT.JS',
  'TAILWIND', 'SUPABASE', 'POSTGRESQL', 'FIGMA',
  'DOCKER', 'PRISMA', 'REST API', 'GIT',
];

const TrackContent: React.FC<{ items: string[]; accent?: boolean }> = ({ items, accent }) => (
  <>
    {items.map((item, i) => (
      <React.Fragment key={i}>
        <span className="sdiv-item">{item}</span>
        <span className={`sdiv-dot${accent ? ' sdiv-dot--accent' : ''}`} aria-hidden="true">◆</span>
      </React.Fragment>
    ))}
  </>
);

const SectionDivider: React.FC<Props> = ({ text, reverse, accent }) => {
  const items = text
    ? text.split('·').map(s => s.trim()).filter(Boolean)
    : DEFAULT_ITEMS;

  return (
    <div className={`sdiv${accent ? ' sdiv--accent' : ''}`} aria-hidden="true">
      {/* Row 1 */}
      <div className={`sdiv-track${reverse ? ' sdiv-track--reverse' : ''}`}>
        {[0, 1, 2].map(i => (
          <span key={i} className="sdiv-group">
            <TrackContent items={items} accent={accent} />
          </span>
        ))}
      </div>
      {/* Row 2 — opposite direction */}
      <div className={`sdiv-track sdiv-track-2${reverse ? '' : ' sdiv-track--reverse'}`}>
        {[0, 1, 2].map(i => (
          <span key={i} className="sdiv-group">
            <TrackContent items={items} accent={accent} />
          </span>
        ))}
      </div>
    </div>
  );
};

export default SectionDivider;
