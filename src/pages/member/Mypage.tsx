import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { auth } from "../../database/initialize";
import { useNavigate } from "react-router-dom";
import {
  isLoggedInState,
  hasUserReviewState,
  hasUserRecommendState,
} from "../../state/userState";
import ReviewCard from "../../components/posts/ReviewCard";
import RecommendCard from "../../components/posts/RecommendCard";
import LineButton from "../../components/common/buttons/LineButton";

const Mypage = () => {
  const navigate = useNavigate();
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const currentUser = auth.currentUser;
  const [activeTab, setActiveTab] = useState("review");
  const hasUserReview = useRecoilValue(hasUserReviewState);
  const hasUserRecommend = useRecoilValue(hasUserRecommendState);

  const onLogOutClick = () => {
    const ok = confirm("로그아웃 할까요?");
    if (ok) {
      auth.signOut();
      alert("로그아웃 되었습니다. 또 만나요!");
      setIsLoggedIn(false);
      navigate("/");
    } else return;
  };

  const onWriteClick = () => {
    if (activeTab === "review") {
      navigate("/review/write");
    } else if (activeTab === "recommend") {
      navigate("/recommend/write");
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
            <span className="mr-3">{currentUser.displayName} 님의</span>
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
            <>
              {hasUserReview ? (
                <div className="flex flex-col">
                  <ReviewCard
                    limit={6}
                    userId={currentUser.uid}
                    currentPage={1}
                  />
                  <LineButton
                    onClick={onWriteClick}
                    className="flex justify-end"
                  >
                    글쓰기
                  </LineButton>
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center w-full bg-beige min-h-[200px] rounded-2xl">
                  <span>아직 작성한 향기 리뷰가 없어요.</span>
                  <button
                    onClick={onWriteClick}
                    className="btn primary-btn mt-5"
                  >
                    글쓰기
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              {hasUserRecommend ? (
                <div className="flex flex-col">
                  <RecommendCard
                    limit={6}
                    userId={currentUser.uid}
                    currentPage={1}
                  />
                  <LineButton
                    onClick={onWriteClick}
                    className="flex justify-end border-brown-300"
                  >
                    글쓰기
                  </LineButton>
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center w-full bg-beige min-h-[200px] rounded-2xl">
                  <span>아직 작성한 추천 문의가 없어요.</span>
                  <button
                    onClick={onWriteClick}
                    className="btn primary-btn mt-5"
                  >
                    글쓰기
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Mypage;
