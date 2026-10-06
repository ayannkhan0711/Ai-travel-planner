import React from 'react';
import { formatCurrency } from '../../utils/formatters';

export default function BudgetTracker({ budget = { total: 25000, spent: 12450, currency: 'USD' } }) {
  const percentage = Math.min(100, Math.round((budget.spent / budget.total) * 100));

  return (
    <div className="bg-white border border-[#F5E6D3] rounded-2xl p-6 shadow-luxury">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-luxury-brown font-serif">✦</span>
          <h4 className="font-serif text-base font-bold text-luxury-dark">
            Trip Budget & Escrow Ledger
          </h4>
        </div>
        <span className="text-xs bg-[#FFFAF0] text-luxury-brown font-semibold px-2.5 py-1 rounded-md border border-luxury-beige">
          {percentage}% Allocated
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4 text-xs">
        <div>
          <span className="text-gray-400 block text-[10px] uppercase font-semibold">Total Budget</span>
          <span className="font-serif text-lg font-bold text-luxury-dark">
            {formatCurrency(budget.total)}
          </span>
        </div>
        <div>
          <span className="text-gray-400 block text-[10px] uppercase font-semibold">Committed Spend</span>
          <span className="font-serif text-lg font-bold text-luxury-brown">
            {formatCurrency(budget.spent)}
          </span>
        </div>
        <div>
          <span className="text-gray-400 block text-[10px] uppercase font-semibold">Available Liquidity</span>
          <span className="font-serif text-lg font-bold text-green-700">
            {formatCurrency(budget.total - budget.spent)}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2.5 bg-luxury-beigeLight rounded-full overflow-hidden">
        <div
          className="h-full bg-gold-gradient rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
