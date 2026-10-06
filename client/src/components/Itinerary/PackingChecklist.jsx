import React, { useState } from 'react';

export default function PackingChecklist({ destination = 'Hernur Riviera' }) {
  const [items, setItems] = useState([
    { id: 1, text: 'Valid Passport & International Boarding Pass', category: 'Dossier', checked: true },
    { id: 2, text: 'Custom Tailored Linen Attire & Evening Cocktail Wear', category: 'Wardrobe', checked: true },
    { id: 3, text: 'Italian Designer Sunglasses & Mineral SPF 50', category: 'Wellness', checked: true },
    { id: 4, text: 'Centurion Black & Priority Pass Cards', category: 'Financial', checked: true },
    { id: 5, text: 'Allianz Premier Shield Insurance Card', category: 'Dossier', checked: false },
    { id: 6, text: 'Noise-Cancelling Headphones for Private Jet / First Suite', category: 'Aviation', checked: false },
  ]);

  const [newItemText, setNewItemText] = useState('');

  const toggleCheck = (id) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const addItem = (e) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    setItems((prev) => [
      ...prev,
      { id: Date.now(), text: newItemText.trim(), category: 'Custom', checked: false },
    ]);
    setNewItemText('');
  };

  const packedCount = items.filter((i) => i.checked).length;

  return (
    <div className="bg-white border border-[#F5E6D3] rounded-2xl p-6 shadow-luxury space-y-4">
      <div className="flex items-center justify-between border-b border-[#F5E6D3] pb-3">
        <div>
          <h4 className="font-serif text-base font-bold text-luxury-dark">
            Curated Packing Checklist
          </h4>
          <p className="text-[11px] text-gray-500">
            Tailored specifically for the climate & social calendar of {destination}.
          </p>
        </div>
        <span className="text-xs bg-luxury-cream text-luxury-brown font-semibold px-2.5 py-1 rounded-md border border-luxury-beige">
          {packedCount} / {items.length} Ready
        </span>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
        {items.map((item) => (
          <label
            key={item.id}
            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-luxury-beigeLight cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleCheck(item.id)}
                className="rounded text-luxury-brown focus:ring-luxury-brown w-4 h-4"
              />
              <span
                className={`text-xs font-medium ${
                  item.checked ? 'line-through text-gray-400' : 'text-luxury-dark'
                }`}
              >
                {item.text}
              </span>
            </div>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider bg-gray-100 px-2 py-0.5 rounded">
              {item.category}
            </span>
          </label>
        ))}
      </div>

      {/* Add custom item */}
      <form onSubmit={addItem} className="flex gap-2 pt-2 border-t border-gray-100">
        <input
          type="text"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          placeholder="Add custom luxury luggage item..."
          className="flex-1 bg-[#FFFAF0] border border-luxury-beige rounded-xl px-3 py-1.5 text-xs text-luxury-dark focus:outline-none focus:border-luxury-brown"
        />
        <button
          type="submit"
          className="btn-primary py-1.5 px-4 text-xs font-semibold"
        >
          Add
        </button>
      </form>
    </div>
  );
}
