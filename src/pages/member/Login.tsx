import { Link } from "react-router-dom";
import { useState, ChangeEvent, FormEvent } from "react";
import { auth } from "../../database/initialize";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    } catch (error) {
      console.log(error);
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
          <label className="label">
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
          <label className="label">
            <span className="label-text-alt">Bottom Left label</span>
          </label>

          <button
            className="btn bg-brown-500 text-white hover:bg-brown-600"
            type="submit"
          >
            로그인
          </button>
        </form>

        <div className="mt-3 w-full max-w-xs">
          <button className="btn bg-white text-brown hover:bg-beige w-full">
            구글 로그인
          </button>

          <p className="mt-8 mb-3 text-sm">
            아직 <b>센트오브</b>의 회원이 아니신가요?
          </p>
          <Link
            to="/signup"
            className="btn bg-brown-200 text-brown-900 hover:bg-brown-300/[0.8] w-full"
          >
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
