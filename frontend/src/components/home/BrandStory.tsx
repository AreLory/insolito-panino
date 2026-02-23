import { ChevronRight } from 'lucide-react';

interface Props {
  title: string;
  story: string;
  imageUrl: string;
}

export default function BrandStory({ title, story, imageUrl }: Props) {
  return (
    <div className="mx-4 mt-8 mb-8">
      <div className="bg-linear-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden shadow-xl">
        <div className="relative h-48">
          <img
            src={imageUrl}
            alt="Brand Story"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-linear-to-t from-gray-900 to-transparent" />
          <div className="absolute bottom-4 left-6">
            <h2 className="text-2xl font-bold text-white mb-1">{title}</h2>
          </div>
        </div>

        <div className="p-6">
          <p className="text-gray-300 text-sm mb-4 leading-relaxed">{story}</p>

          <button className="bg-white text-gray-800 px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:gap-3 transition-all group">
            Scopri la nostra storia
            <ChevronRight size={20} className="group-hover:translate-x-1 transition" />
          </button>
        </div>
      </div>
    </div>
  );
}
