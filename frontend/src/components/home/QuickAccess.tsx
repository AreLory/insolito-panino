import { User, History, Heart, Settings } from 'lucide-react';

interface QuickAccessItem {
  id: string;
  icon: 'user' | 'history' | 'heart' | 'settings';
  label: string;
  count?: number;
  color: string;
}

interface QuickAccessProps {
  items: QuickAccessItem[];
}

const iconMap = {
  user: User,
  history: History,
  heart: Heart,
  settings: Settings,
};

export default function QuickAccess({ items }: QuickAccessProps) {
  return (
    <div className="mx-4 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Accesso Rapido</h2>

      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <button
              key={item.id}
              className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition group"
            >
              <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition`}>
                <Icon size={24} className="text-white" />
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-800">{item.label}</p>
                {item.count !== undefined && (
                  <p className="text-sm text-gray-500 mt-1">{item.count} elementi</p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
