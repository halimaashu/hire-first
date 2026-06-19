// components/MetricCard.jsx
import React from 'react';
import { Card } from "@heroui/react";

export default function MetricCard({ title, value, icon: Icon }) {
  return (
    <Card 
      className="bg-[#121214] border border-[#1e1e22] shadow-sm hover:border-[#2a2a30] transition-colors duration-200"
      variant="default" 
    >
      <Card.Content className="p-5 flex flex-col justify-between min-h-[140px]">
        {/* Gravity UI Icon Box */}
        <div className="bg-[#1a1a1e] text-zinc-400 p-2.5 rounded-lg w-fit flex items-center justify-center border border-[#26262b]">
          {Icon && <Icon size={18} className="text-zinc-300" />}
        </div>
        
        {/* Metric Labels & Numbers */}
        <div className="mt-4 space-y-1">
          <p className="text-xs font-medium text-zinc-500 tracking-wide uppercase">
            {title}
          </p>
          <p className="text-2xl font-bold text-zinc-100 tracking-tight">
            {value}
          </p>
        </div>
      </Card.Content>
    </Card>
  );
}