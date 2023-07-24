import { FormEvent, useState } from "react";
import { useRecoilValue } from "recoil";
import { isLoggedInState } from "../../state/authState";
import { auth, db } from "../../database/initialize";
import { addDoc, collection } from "firebase/firestore";

interface CommentInputProps {
  postId: string;
}

const CommentInput: React.FC<CommentInputProps> = ({ postId }) => {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const [comment, setComment] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const docRef = await addDoc(collection(db, "comments"), {
          postId: postId,
          content: comment,
          nickname: currentUser.displayName,
          userId: currentUser.uid,
          createdDate: new Date(),
        });
        setComment("");
        console.log("댓글 id: ", docRef.id);
      } else {
        alert("로그인 후 이용해 주세요.");
      }
    } catch (error) {
      console.error("댓글 저장 중 오류: ", error);
    }
  };

  return (
    <div className="mt-12 p-4 pb-2 min-h-[130px] bg-beige rounded-lg">
      <div className="text-brown-500">닉네임</div>
      <form className="flex flex-col" onSubmit={onSubmit}>
        <textarea
          className="my-2 p-2 w-full bg-beige placeholder:text-brown-300 placeholder:italic"
          placeholder={
            isLoggedIn ? "댓글을 남겨보세요." : "로그인 후 이용해주세요."
          }
          value={comment}
          onChange={onChange}
          disabled={!isLoggedIn}
        />
        <div className="flex justify-end">
          <button type="submit" className="btn btn-sm submit-btn">
            등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentInput;
