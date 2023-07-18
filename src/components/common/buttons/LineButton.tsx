import { useNavigate } from "react-router-dom";

interface LineButtonProps {
  children: React.ReactNode;
  className?: string;
  path: string;
}

const LineButton: React.FC<LineButtonProps> = ({
  children,
  className,
  path,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
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
