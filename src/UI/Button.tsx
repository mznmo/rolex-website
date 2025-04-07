import { Link } from "react-router-dom";

type ButtonProps = {
  text: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  to?: string;
};

export default function Button({ text, onClick, to = "/" }: ButtonProps) {
  return (
    <Link
      className="mt-7 rounded p-1 px-2 text-xs sm:p-2 sm:px-5 transition-colors duration-300 hover:text-[#1e704d] sm:text-sm text-white"
      style={{
        background: "linear-gradient(to right, #0A3C1F, #145C36)",
      }}
      onClick={onClick}
      to={to}
    >
      {text}
    </Link>
  );
}
