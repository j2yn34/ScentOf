import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { auth } from "../../database/initialize";
import { useNavigate } from "react-router-dom";
import {
  isLoggedInState,
  hasUserReviewState,
  hasUserRecommendState,
} from "../../state/userState";
import UserReviewList from "../../components/posts/UserReviewList";
import UserRecommendList from "../../components/posts/UserRecommendList";
import LineButton from "../../components/common/buttons/LineButton";
import { User, onAuthStateChanged } from "firebase/auth";

const Mypage = () => {
  const navigate = useNavigate();
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("review");
  const hasUserReview = useRecoilValue(hasUserReviewState);
  const hasUserRecommend = useRecoilValue(hasUserRecommendState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoggedIn(!!user);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [setIsLoggedIn]);

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

  if (isLoading) {
    return (
      <div className="min-h-[204px] flex items-center justify-center">
        <span className="loading loading-spinner loading-md text-brown-200"></span>
      </div>
    );
  }

  return (
    <>
      {currentUser && (
        <div className="pt-14 px-4">
          <div className="flex justify-end">
            <button
              onClick={onLogOutClick}
              className="btn btn-sm border-brown-300 mb-4"
            >
              로그아웃
            </button>
          </div>
          <div className="mb-8 lg:mb-10 flex flex-col md:flex-row justify-start text-2xl text-left font-bold">
            <span className="mr-3 mb-2">{currentUser.displayName} 님의</span>
            <div>
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
          </div>
          {activeTab === "review" ? (
            <>
              {hasUserReview ? (
                <div className="flex flex-col">
                  <UserReviewList
                    limit={6}
                    currentPage={1}
                    userId={currentUser.uid}
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
                  <UserRecommendList
                    limit={6}
                    currentPage={1}
                    userId={currentUser.uid}
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
