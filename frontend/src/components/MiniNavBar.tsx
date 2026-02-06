import { Link } from "react-router";

type Props = {
  leftImg: string;
  rightImg: string;
  pageName: string;
  onClick?: () => void;
  linkTo: string;
  badgeCount?: number;
};

export default function MiniNavBar({
  leftImg,
  rightImg,
  pageName,
  onClick,
  linkTo,
  badgeCount = 0,
}: Props) {
  return (
    <div className="flex w-full items-center justify-between px-3">
      <Link to={linkTo} className="size-10 p-1">
        <img src={leftImg} alt="back" />
      </Link>

      <h1 className="text-xl font-semibold">{pageName}</h1>

      {onClick ? (
        <button className="relative size-10 p-1" onClick={onClick}>
          <img src={rightImg} alt="cart" />

          {badgeCount > 0 && (
            <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              {badgeCount}
            </span>
          )}
        </button>
      ) : (
        <Link to={linkTo} className="relative size-10 p-1">
          <img src={rightImg} alt="icon" />

          {badgeCount > 0 && (
            <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              {badgeCount}
            </span>
          )}
        </Link>
      )}
    </div>
  );
}
