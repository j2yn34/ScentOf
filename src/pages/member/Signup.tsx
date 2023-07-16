import { ChangeEvent, useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  where,
  getDocs,
  query,
} from "firebase/firestore";
import { auth } from "../../database/initialize";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState("");

  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [nicknameMessage, setNicknameMessage] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isEmailAvailable, setIsEmailAvailable] = useState(false);
  const [isEmailAvailableChecked, setIsEmailAvailableChecked] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [isNicknameValid, setIsNicknameValid] = useState(false);

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const navigate = useNavigate();

  const db = getFirestore();

  const saveNicknameToFirestore = async (userId: string, nickname: string) => {
    try {
      const usersRef = collection(db, "users");
      const newDocument = {
        userId,
        nickname,
      };
      await addDoc(usersRef, newDocument);
      console.log("닉네임이 Firestore에 저장되었습니다.");
    } catch (error) {
      console.error("닉네임 저장 중 오류가 발생했습니다:", error);
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        await updateProfile(user, { displayName: nickname });
        await saveNicknameToFirestore(userId, nickname);
      }
      alert("센트오브의 회원이 되신 걸 환영합니다!");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
      checkEmailValid(value);
      setIsEmailAvailableChecked(false);
    } else if (name === "password") {
      setPassword(value);
      checkPasswordValid(value);
    } else if (name === "passwordConfirm") {
      setPasswordConfirm(value);
    } else if (name === "nickname") {
      setNickname(value);
      checkNicknameValue(value);
    }
  };

  const checkEmailValid = (emailvalue: string) => {
    if (emailvalue.length > 0) {
      const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      if (!emailRegex.test(emailvalue)) {
        setEmailMessage("올바른 이메일 형식을 입력해 주세요.");
        setIsEmailValid(false);
      } else {
        setEmailMessage("올바른 이메일 형식이에요.");
        setIsEmailValid(true);
      }
    }
  };

  const checkEmailAvailability = async () => {
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length === 0) {
        setEmailMessage("사용 가능한 이메일이에요.");
        setIsEmailAvailable(true);
      } else {
        setEmailMessage("이미 가입된 이메일이에요");
        setIsEmailAvailable(false);
      }
      setIsEmailAvailableChecked(true);
    } catch (error) {
      console.error("이메일 중복 확인 중 오류 발생:", error);
    }
  };

  const checkPasswordValid = (passwordValue: string) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/;
    if (!passwordRegex.test(passwordValue)) {
      setPasswordMessage(
        "숫자+영문+특수문자 조합으로 8자리 이상 입력해주세요."
      );
      setIsPasswordValid(false);
    } else {
      setPasswordMessage("안전한 비밀번호예요.");
      setIsPasswordValid(true);
    }
  };

  useEffect(() => {
    if (passwordConfirm.length > 0 || password.length > 0) {
      setIsPasswordMatch(passwordConfirm === password);
      setPasswordConfirmMessage(
        passwordConfirm === password
          ? "비밀번호가 일치해요."
          : "비밀번호가 일치하지 않아요."
      );
    }
  }, [passwordConfirm, password]);

  const checkNicknameValue = async (nickname: string) => {
    try {
      if (nickname.length < 2 || nickname.length > 5) {
        setNicknameMessage("닉네임은 2~5자로 설정해 주세요.");
        setIsNicknameValid(false);
      } else if (nickname.includes(" ")) {
        setNicknameMessage("닉네임은 공백 없이 입력해 주세요.");
        setIsNicknameValid(false);
      } else {
        const querySnapshot = await getDocs(
          query(collection(db, "users"), where("nickname", "==", nickname))
        );

        if (querySnapshot.size > 0) {
          setNicknameMessage("이미 사용 중인 닉네임이에요.");
          setIsNicknameValid(false);
        } else {
          setNicknameMessage("사용 가능한 닉네임이에요.");
          setIsNicknameValid(true);
        }
      }
    } catch (error) {
      console.error("닉네임 중복 확인 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    if (nickname.length > 0) {
      checkNicknameValue(nickname);
    }
  }, [nickname]);

  useEffect(() => {
    setIsSubmitDisabled(
      !isEmailValid ||
        !isEmailAvailable ||
        !isEmailAvailableChecked ||
        !isPasswordValid ||
        !isPasswordMatch ||
        !isNicknameValid
    );
  }, [
    isEmailValid,
    isEmailAvailable,
    isEmailAvailableChecked,
    isPasswordValid,
    isPasswordMatch,
    isNicknameValid,
  ]);

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
          <div className="flex items-center">
            <input
              name="email"
              type="email"
              placeholder="이메일을 입력해 주세요."
              className="input w-full placeholder:text-sm"
              required
              value={email}
              onChange={onChange}
            />
            <button
              className={`custom-button ml-2 btn bg-brown-200 text-brown hover:bg-brown-300 cursor-pointer ${
                !isEmailValid || isEmailAvailableChecked ? "disabled" : ""
              }`}
              type="button"
              onClick={checkEmailAvailability}
              disabled={!isEmailValid || isEmailAvailableChecked}
            >
              중복 확인
            </button>
          </div>
          <label className="label p-1">
            <span
              className={`label-text-alt ${
                emailMessage.includes("주세요") || emailMessage.includes("이미")
                  ? "text-red"
                  : "text-green"
              }`}
            >
              {emailMessage}
            </span>
          </label>

          <label className="label p-1">
            <span className="label-text text-base font-bold">비밀번호</span>
          </label>
          <input
            name="password"
            type="password"
            placeholder="비밀번호를 입력해 주세요. (8자 이상)"
            className="input w-full placeholder:text-sm"
            required
            value={password}
            onChange={onChange}
          />
          <label className="label p-1">
            <span
              className={`label-text-alt ${
                isPasswordValid ? "text-green" : "text-red"
              }`}
            >
              {passwordMessage}
            </span>
          </label>

          <label className="label p-1">
            <span className="label-text text-base font-bold">
              비밀번호 확인
            </span>
          </label>
          <input
            name="passwordConfirm"
            type="password"
            placeholder="비밀번호를 한 번 더 입력해 주세요."
            className="input w-full placeholder:text-sm"
            required
            value={passwordConfirm}
            onChange={onChange}
          />

          <label className="label p-1">
            {passwordConfirm && (
              <span
                className={`label-text-alt ${
                  isPasswordMatch ? "text-green" : "text-red"
                }`}
              >
                {passwordConfirmMessage}
              </span>
            )}
          </label>

          <label className="label p-1">
            <span className="label-text text-base font-bold">닉네임</span>
          </label>
          <input
            name="nickname"
            type="text"
            placeholder="닉네임을 입력해 주세요. (2~5자)"
            className="input w-full placeholder:text-sm"
            required
            value={nickname}
            onChange={onChange}
          />
          <label className="label p-1">
            <span
              className={`label-text-alt ${
                isNicknameValid ? "text-green" : "text-red"
              }`}
            >
              {nicknameMessage}
            </span>
          </label>

          <button
            className={`custom-button mt-2 btn bg-brown-500 text-white hover:bg-brown-600 ${
              isSubmitDisabled
                ? "disabled bg-brown border-brown/[0.5] hover:border-brown/[0.5] !text-brown"
                : ""
            }`}
            type="submit"
            disabled={isSubmitDisabled}
          >
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
