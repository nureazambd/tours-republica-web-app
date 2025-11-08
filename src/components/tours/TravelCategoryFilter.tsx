'use client';

import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

interface FilterItem {
  id: number;
  label: string;
}

const filters: FilterItem[] = [
  { id: 1, label: 'Cultural' },
  { id: 2, label: 'Nature & Adventure' },
  { id: 3, label: 'Marine' },
  { id: 4, label: 'Independent' },
  { id: 5, label: 'Activities' },
  { id: 6, label: 'Festival & Events' },
  { id: 7, label: 'Special Interest' },
];

export default function CollapsibleFilter() {
  const [selected, setSelected] = useState<number[]>([]);
  const [open, setOpen] = useState(true);

  const toggleCheck = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-72 bg-[#F9FAFB] border border-[#BECCE8] rounded-lg flex flex-col">
      {/* Header */}
      <div
        className="flex items-center justify-between p-5 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <h3 className="text-lg font-medium text-[#1A202C]">Filter by Category</h3>
        <ChevronDown
          className={`w-5 h-5 text-[#1A202C] transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </div>

      {/* Filter items */}
      {open && (
        <div className="flex flex-col gap-2 px-5 pb-5">
          {filters.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 cursor-pointer relative"
              onClick={() => toggleCheck(item.id)}
            >
              <div
                className={`w-6 h-6 rounded-md border-2 flex items-center justify-center ${
                  selected.includes(item.id)
                    ? 'border-[#4B5563] bg-[#4B5563]'
                    : 'border-[#BECCE8] bg-white'
                }`}
              >
                {selected.includes(item.id) && <Check className="w-3 h-3 text-white" />}
              </div>
              <span className="text-sm text-[#4B5563]">{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
