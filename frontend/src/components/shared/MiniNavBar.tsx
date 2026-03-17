import { Link } from "react-router";

type Props = {
  leftChild: any;
  rightChild?: any;
  badgeCount?: number;
  pageName: string;
  goTo?: string;
  goBack: string;
  onClickAction?: () => void;
};

export default function MiniNavBar({
  leftChild,
  rightChild,
  badgeCount,
  pageName,
  goBack,
  goTo,
  onClickAction,
}: Props) {
  if (!badgeCount) {
    badgeCount = 0;
  }

  return (
    <div className="fixed top-0 left-0 right-0 bg-linear-to-r from-black to-gray-900 shadow-sm z-10 text-white">
      <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to={goBack}
          className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          aria-label="Torna indietro"
        >
          {leftChild}
        </Link>
        <h2 className="text-xl font-semibold">{pageName}</h2>
        {onClickAction ? (
          <button
            className="p-2 hover:bg-gray-800 rounded-full transition-colors relative"
            onClick={onClickAction}
          >
            {rightChild}
          </button>
        ) : (
          <Link
            to={goTo || ''}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors relative"
          >
            {rightChild}
            {badgeCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-red-600 text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                {badgeCount}
              </span>
            )}
          </Link>
        )}
      </div>
    </div>
  );
}
