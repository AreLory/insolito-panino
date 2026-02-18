import React from 'react';

interface OrderInfoProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  iconBg: string;
  iconColor: string;
}

const OrderInfo= ({ icon, label, value, iconBg, iconColor }:OrderInfoProps) => {
  return (
    <div className="p-4 bg-slate-50 border border-slate-100/50 rounded-[2rem] flex flex-col items-start gap-2">
      <div className={`w-8 h-8 rounded-lg ${iconBg} ${iconColor} flex items-center justify-center`}>
        {icon}
      </div>
      <div className="mt-1">
        <p className="text-[9px] uppercase tracking-widest text-slate-400 font-bold leading-tight">{label}</p>
        <p className="text-[13px] font-bold text-slate-800 mt-0.5 leading-tight">{value}</p>
      </div>
    </div>
  );
};

export default OrderInfo;
