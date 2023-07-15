import { Link } from "react-router-dom";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { auth } from "../../database/initialize";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useSetRecoilState } from "recoil";
import { isLoggedInState } from "../../state/authState";

const Login = () => {
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, [setIsLoggedIn]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("안녕하세요! 로그인 되었습니다.");
      setIsLoggedIn(true);
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  const onGoogleClick: React.MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signOut(auth);
      await signInWithPopup(auth, provider);
      alert("안녕하세요! 구글 로그인 되었습니다.");
    } catch (error) {
      console.error("구글 로그인 실패:", error);
    }
  };

  return (
    <div
      className="flex items-center justify-center mx-auto text-center"
      style={{ minHeight: `calc(100vh - 64px - 4rem - 81px)` }}
    >
      <div className="flex flex-col items-center max-w-md w-full">
        <h1 className="text-2xl text-brown-900 mb-4">로그인</h1>
        <form onSubmit={onSubmit} className="form-control w-full max-w-xs">
          <input
            name="email"
            type="email"
            placeholder="이메일을 입력해 주세요."
            className="input w-full placeholder:text-sm"
            required
            value={email}
            onChange={onChange}
          />
          <label className="label p-1">
            <span className="label-text-alt">Bottom Left label</span>
          </label>

          <input
            name="password"
            type="password"
            placeholder="비밀번호를 입력해 주세요."
            className="input w-full placeholder:text-sm"
            required
            value={password}
            onChange={onChange}
          />
          <label className="label p-1">
            <span className="label-text-alt">Bottom Left label</span>
          </label>

          <button
            className="mt-1 btn bg-brown-500 text-white hover:bg-brown-600"
            type="submit"
          >
            로그인
          </button>
        </form>

        <div className="mt-4 w-full max-w-xs">
          <button
            onClick={onGoogleClick}
            className="mb-8 btn bg-white text-brown hover:bg-beige w-full"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.0135 8.67863C16.0136 8.11975 15.9637 7.56197 15.8645 7.01196H8.17041V10.1718H12.5675C12.4765 10.6716 12.285 11.1478 12.0048 11.5716C11.7246 11.9954 11.3614 12.358 10.9371 12.6375V14.6875H13.5773C14.3819 13.9126 15.0146 12.9773 15.4343 11.9421C15.854 10.9069 16.0514 9.79502 16.0135 8.67863Z"
                fill="#4285F4"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.16963 16.6626C10.1584 16.7165 12.0926 16.0084 13.5765 14.6832L10.9363 12.6332C10.3046 13.0395 9.58831 13.296 8.84226 13.3832C8.09621 13.4704 7.3401 13.3859 6.6317 13.1362C5.9233 12.8865 5.28135 12.4781 4.75489 11.9424C4.22844 11.4066 3.83141 10.7576 3.59414 10.0449H0.868652V12.1616C1.54851 13.5151 2.59138 14.6528 3.8807 15.4477C5.17003 16.2425 6.65499 16.6632 8.16963 16.6626Z"
                fill="#34A853"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.59449 10.0451C3.2528 9.03829 3.2528 7.94691 3.59449 6.94015V4.82446H0.869004C0.297572 5.96315 0 7.21956 0 8.49358C0 9.7676 0.297572 11.024 0.869004 12.1627L3.59449 10.0451Z"
                fill="#FBBC05"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.16963 3.5728C9.33102 3.55292 10.4534 3.99186 11.2932 4.79437L13.6363 2.45123C12.1573 1.06248 10.1983 0.300066 8.16963 0.323779C6.65499 0.323181 5.17003 0.743814 3.8807 1.53867C2.59138 2.33352 1.54851 3.47127 0.868652 4.82476L3.59414 6.94143C3.90814 5.97161 4.51863 5.12481 5.33953 4.52044C6.16043 3.91607 7.15032 3.58461 8.16963 3.5728Z"
                fill="#EA4335"
              />
            </svg>
            <span>구글 계정으로 로그인</span>
          </button>
          <p className="mb-3 text-sm">
            아직 <b>센트오브</b>의 회원이 아니신가요?
          </p>
          <Link
            to="/signup"
            className="btn bg-brown-200 text-brown-900 hover:bg-brown-300/[0.7] w-full"
          >
            이메일 회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
