import React from 'react';
import ResultCard from './ResultCard';

export default function TrainResults({ trains = [], onSelectTrain }) {
  if (!trains.length) return null;

  return (
    <div className="space-y-6">
      {trains.map((train) => (
        <ResultCard
          key={train.id}
          title={train.name}
          subtitle={`${train.operator} · Train ${train.trainNumber}`}
          badge={train.coachClass}
          price={train.price}
          rating="4.94"
          features={train.amenities || []}
          actionLabel="Book Luxury Carriage"
          onAction={() => onSelectTrain && onSelectTrain(train)}
        >
          <div className="my-4 bg-[#FFFAF0] border border-[#F5E6D3] rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-base font-bold text-luxury-dark">{train.origin?.city}</p>
              <p className="text-xs text-luxury-brown font-semibold">{train.origin?.time}</p>
              <span className="text-[10px] text-gray-500">{train.origin?.station}</span>
            </div>

            <div className="text-center px-4">
              <span className="text-xs font-semibold text-gray-500">{train.duration}</span>
              <div className="flex items-center gap-1 text-luxury-brown text-sm">
                ― 🚆 ―
              </div>
            </div>

            <div className="text-right">
              <p className="text-base font-bold text-luxury-dark">{train.destination?.city}</p>
              <p className="text-xs text-luxury-brown font-semibold">{train.destination?.time}</p>
              <span className="text-[10px] text-gray-500">{train.destination?.station}</span>
            </div>
          </div>
        </ResultCard>
      ))}
    </div>
  );
}
