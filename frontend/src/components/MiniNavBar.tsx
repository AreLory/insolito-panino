import { Link } from "react-router";

interface Props {
    leftImg: string,
    rightImg: string,
    pageName: string,
    onClick?: ()=> void,
    linkTo: string
}

export default function MiniNavBar({leftImg, rightImg, pageName, onClick, linkTo}:Props) {
  return (
    <div className="flex w-full justify-between px-3">
      <Link to={linkTo} className="size-10 p-1">
        <img src={leftImg} alt="back" />
      </Link>
      <h1 className="text-xl font-semibold">{pageName}</h1>
      { onClick ?
      <button className="size-10 p-1" onClick={onClick}>
        <img src={rightImg} alt="cart" />
      </button> : <Link to={linkTo} className="size-10 p-1"><img src={rightImg} alt={rightImg} /></Link>}
    </div>
  );
}
