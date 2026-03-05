import { Star, ThumbsUp } from 'lucide-react';

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  likes: number;
  date: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

export default function ReviewSection({ reviews, averageRating, totalReviews }: ReviewsSectionProps) {
  return (
    <div className="mx-4 mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Customers Reviews</h2>
        <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full">
          <Star size={20} className="fill-yellow-400 text-yellow-400" />
          <span className="font-bold text-gray-800">{averageRating}</span>
          <span className="text-gray-500 text-sm">({totalReviews})</span>
        </div>
      </div>

      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex-linear-0 w-80 bg-white rounded-2xl p-5 shadow-lg snap-start"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-linear-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white font-bold">
                    {review.userName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{review.userName}</p>
                    <p className="text-xs text-gray-500">{review.date}</p>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-3 line-clamp-3">{review.comment}</p>

              <div className="flex items-center gap-1 text-gray-400 text-xs">
                <ThumbsUp size={14} />
                <span>{review.likes} people found this helpful</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
