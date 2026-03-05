import { MapPin, Navigation, Clock } from "lucide-react";

interface Location {
  id: string;
  name: string;
  address: string;
  distance: string;
  openUntil: string;
  isOpen: boolean;
}

export default function LocationSection() {
  const location: Location = {
    id: "1",
    name: "Largo Pertini",
    address: "Via Pasolini, 20, 64025 Pineto TE",
    distance: "0.5 km",
    openUntil: "22:00",
    isOpen: true,
  };

  return (
    <div className="mx-4 mt-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="text-orange-500" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">Where we are</h2>
        </div>
        <button className="text-orange-500 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
          <Navigation size={16} />
          Map
        </button>
      </div>

      <div className="space-y-3">
        <a href="https://maps.app.goo.gl/pVMBdQ1yoBVn6aAX8" target="_blank">
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-800">{location.name}</h3>
                  {location.isOpen ? (
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">
                      OPEN
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-bold">
                      CLOSE
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-2">{location.address}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Navigation size={12} />
                    <span>{location.distance}</span>
                  </div>
                  {location.isOpen && (
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>Aperto fino alle {location.openUntil}</span>
                    </div>
                  )}
                </div>
              </div>
              <button className="bg-orange-500 text-white p-2 rounded-full hover:scale-105 transition">
                <Navigation size={18} />
              </button>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
