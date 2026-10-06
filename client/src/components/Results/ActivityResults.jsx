import React from 'react';
import ResultCard from './ResultCard';

export default function ActivityResults({ activities = [], onSelectActivity }) {
  if (!activities.length) return null;

  return (
    <div className="space-y-6">
      {activities.map((act) => (
        <ResultCard
          key={act.id}
          title={act.title}
          subtitle={`${act.category} · Duration: ${act.duration}`}
          badge="Curated Experience"
          price={act.price}
          rating={act.rating}
          image={act.image}
          features={act.highlights || []}
          actionLabel="Add Experience to Dossier"
          onAction={() => onSelectActivity && onSelectActivity(act)}
        />
      ))}
    </div>
  );
}
