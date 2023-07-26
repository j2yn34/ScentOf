import { useNavigate } from "react-router-dom";

interface LineButtonProps {
  children: React.ReactNode;
  className?: string;
  path?: string;
  onClick?: () => void;
}

const LineButton: React.FC<LineButtonProps> = ({
  children,
  className,
  path,
  onClick,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (path) {
      navigate(path);
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={`btn border-0 h-8 m-h-0 text-base underline underline-offset-4 ${className}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default LineButton;
