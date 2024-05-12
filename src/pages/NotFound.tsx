import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center mt-48">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold p-2">404</h1>
        <span className="text-xl">페이지를 찾을 수 없습니다</span>
        <Link className="btn mt-12 primary-btn" to={"/"}>
          메인페이지로 이동
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
