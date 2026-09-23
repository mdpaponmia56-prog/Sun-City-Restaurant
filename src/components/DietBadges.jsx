import React from 'react';
import { cn } from '@/lib/utils';
import { Leaf, Sprout, Wheat } from 'lucide-react';

export default function DietBadges({ dish, size = 'sm' }) {
  const icons = [
    { key: 'is_vegetarian', label: 'Vegetarian', Icon: Leaf, color: 'text-green-700 bg-green-50' },
    { key: 'is_vegan', label: 'Vegan', Icon: Sprout, color: 'text-emerald-700 bg-emerald-50' },
    { key: 'is_gluten_free', label: 'Gluten Free', Icon: Wheat, color: 'text-amber-700 bg-amber-50' },
  ];
  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  const badgeSize = size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-1 text-xs';
  return (
    <div className="flex flex-wrap gap-1">
      {icons.map(({ key, label, Icon, color }) =>
        dish[key] ? (
          <span key={key} className={cn('inline-flex items-center gap-1 rounded-full font-medium', color, badgeSize)} title={label}>
            <Icon className={iconSize} /> {label}
          </span>
        ) : null
      )}
    </div>
  );
}