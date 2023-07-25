import { useSetRecoilState } from "recoil";
import { auth } from "../../database/initialize";
import { useNavigate } from "react-router-dom";
import { isLoggedInState } from "../../state/authState";

const Mypage = () => {
  const navigate = useNavigate();
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const currentUser = auth.currentUser;

  const onLogOutClick = () => {
    const ok = confirm("로그아웃 할까요?");
    if (ok) {
      auth.signOut();
      alert("로그아웃 되었습니다. 또 만나요!");
      setIsLoggedIn(false);
      navigate("/");
    }
  };

  return (
    <>
      {currentUser && (
        <div className="pt-14 px-4">
          <div className="flex justify-between items-center mb-5 lg:mb-8 ">
            <div className="text-2xl text-left font-bold">
              <span>{currentUser.displayName} 님의</span>
              <button className="ml-3 underline underline-offset-8">
                향기 리뷰
              </button>
              <button className="ml-3 text-brown-200">추천 문의</button>
            </div>
            <button
              onClick={onLogOutClick}
              className="btn border-0 p-0 underline underline-offset-4"
            >
              로그아웃
            </button>
          </div>
          <div className="flex flex-col justify-center items-center w-full bg-beige min-h-[200px] rounded-2xl">
            <span>아직 작성한 글이 없어요.</span>
            <button className="btn primary-btn mt-4">글쓰기</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Mypage;
