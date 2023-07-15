import { ChangeEvent, useState, FormEvent } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../database/initialize";

const Signup = () => {
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
      await createUserWithEmailAndPassword(auth, email, password);
      alert("센트오브의 회원이 되신 걸 환영합니다!");
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
        <h1 className="text-2xl text-brown-900 mb-4">회원가입</h1>
        <form onSubmit={onSubmit} className="form-control w-full max-w-xs">
          <label className="label p-1">
            <span className="label-text text-base font-bold">이메일</span>
          </label>
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

          <label className="label p-1">
            <span className="label-text text-base font-bold">비밀번호</span>
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

          <label className="label p-1">
            <span className="label-text text-base font-bold">
              비밀번호 확인
            </span>
          </label>
          <input
            type="password"
            placeholder="비밀번호를 한 번 더 입력해 주세요."
            className="input w-full placeholder:text-sm"
            // required
          />
          <label className="label p-1">
            <span className="label-text-alt">Bottom Left label</span>
          </label>

          <label className="label p-1">
            <span className="label-text text-base font-bold">닉네임</span>
          </label>
          <input
            type="password"
            placeholder="닉네임을 입력해 주세요."
            className="input w-full placeholder:text-sm"
            // required
          />
          <label className="label p-1">
            <span className="label-text-alt">Bottom Left label</span>
          </label>

          <button
            className="mt-2 btn bg-brown-500 text-white hover:bg-brown-600 "
            type="submit"
          >
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
