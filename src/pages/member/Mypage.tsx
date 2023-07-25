import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { auth } from "../../database/initialize";
import { useNavigate } from "react-router-dom";
import { isLoggedInState } from "../../state/authState";
import Pagination from "../../components/common/Pagination";
import UserReviewPost from "../../components/posts/UserReviewPost";
import UserRecommendPost from "../../components/posts/UserRecommendPost";
import LineButton from "../../components/common/buttons/LineButton";

const Mypage = () => {
  const navigate = useNavigate();
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const currentUser = auth.currentUser;
  const [activeTab, setActiveTab] = useState("review");
  const [page, setPage] = useState(1);

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
          <div className="flex justify-end">
            <button
              onClick={onLogOutClick}
              className="btn btn-sm border-brown-300"
            >
              로그아웃
            </button>
          </div>
          <div className="mb-8 lg:mb-10 flex text-2xl text-left font-bold">
            <div className="mr-3">{currentUser.displayName} 님의</div>
            <button
              onClick={() => setActiveTab("review")}
              className={`mr-3 ${
                activeTab === "review"
                  ? "underline underline-offset-8"
                  : "text-brown-200"
              }`}
            >
              향기 리뷰
            </button>
            <button
              onClick={() => setActiveTab("recommend")}
              className={`${
                activeTab === "recommend"
                  ? "underline underline-offset-8"
                  : "text-brown-200"
              }`}
            >
              추천 문의
            </button>
          </div>
          {activeTab === "review" ? (
            <div className="flex flex-col">
              <UserReviewPost limit={6} userId={currentUser.uid} />
              <LineButton path={"/review/write"} className="flex justify-end">
                글쓰기
              </LineButton>
              <Pagination
                maxPage={5}
                currentPage={page}
                onClickPageButton={(pageNumber) => setPage(pageNumber)}
              />
            </div>
          ) : (
            <div className="flex flex-col">
              <UserRecommendPost limit={6} userId={currentUser.uid} />
              <LineButton
                path={"/recommend/write"}
                className="flex justify-end border-brown-300"
              >
                글쓰기
              </LineButton>
              <Pagination
                maxPage={5}
                currentPage={page}
                onClickPageButton={(pageNumber) => setPage(pageNumber)}
              />
            </div>
          )}
          {
            // <div className="flex flex-col justify-center items-center w-full bg-beige min-h-[200px] rounded-2xl">
            //   <span>아직 작성한 글이 없어요.</span>
            //   <button className="btn primary-btn mt-4">글쓰기</button>
            // </div>
          }
        </div>
      )}
    </>
  );
};

export default Mypage;
