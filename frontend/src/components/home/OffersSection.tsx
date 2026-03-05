import { Tag, Clock } from 'lucide-react';

interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  color: string;
}

interface OffersSectionProps {
  offers: Offer[];
}

export default function OffersSection({ offers }: OffersSectionProps) {
  return (
    <div className="mx-4 mt-8">
      <div className="flex items-center gap-2 mb-4">
        <Tag className="text-red-500" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Offerte Attive</h2>
      </div>

      <div className="space-y-3">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className={`${offer.color} rounded-2xl p-5 shadow-lg border-2 border-dashed border-white/30`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="inline-block bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold mb-2">
                  {offer.discount}
                </div>
                <h3 className="font-bold text-lg text-white mb-1">{offer.title}</h3>
                <p className="text-white/90 text-sm mb-3">{offer.description}</p>
                <div className="flex items-center gap-1 text-white/80 text-xs">
                  <Clock size={14} />
                  <span>Valido fino al {offer.validUntil}</span>
                </div>
              </div>
              <button className="bg-white text-gray-800 px-4 py-2 rounded-full font-bold text-sm hover:scale-105 transition shadow">
                Usa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
