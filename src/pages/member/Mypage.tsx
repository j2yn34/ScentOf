import { useSetRecoilState } from "recoil";
import { auth } from "../../database/initialize";
import { useNavigate } from "react-router-dom";
import { isLoggedInState } from "../../state/authState";

const Mypage = () => {
  const navigate = useNavigate();
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  const onLogOutClick = () => {
    auth.signOut();
    alert("로그아웃 되었습니다. 또 만나요!");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <button onClick={onLogOutClick}>로그아웃</button>
    </>
  );
};

export default Mypage;
