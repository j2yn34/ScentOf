import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules } from "../quillModules";
import { auth, db } from "../../database/initialize";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { PostData } from "../../types";

const RecommendWrite = () => {
  const QuillRef = useRef<ReactQuill | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const { postId } = useParams<{ postId: string }>();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (postId) {
      getRecommendData();
    }
  }, [postId]);

  const getRecommendData = async () => {
    try {
      if (!postId) {
        return;
      }
      const docRef = doc(db, "recommendations", postId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const postData = docSnap.data() as PostData;
        setTitle(postData.title);
        setContent(postData.content);
        setIsEditing(true);
      } else {
        console.log("문서가 존재하지 않습니다.");
      }
    } catch (error) {
      console.error("문서를 불러오는 중 오류 발생:", error);
    }
  };

  const isContentEmpty = (htmlContent: string): boolean => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const textContent = doc.body.textContent || "";
    return textContent.trim() === "";
  };

  const handleUpdate = async () => {
    try {
      if (!postId) {
        return;
      }
      if (isContentEmpty(content)) {
        alert("내용을 입력해 주세요.");
        return;
      }
      const docRef = doc(db, "recommendations", postId);
      await updateDoc(docRef, {
        title: title,
        content: content,
      });
      console.log("수정 완료");
      navigate(-1);
    } catch (error) {
      console.error("수정 오류:", error);
    }
  };

  const handleAdd = async () => {
    try {
      if (isContentEmpty(content)) {
        alert("내용을 입력해 주세요.");
        return;
      }
      const currentUser = auth.currentUser;
      if (currentUser) {
        const docRef = await addDoc(collection(db, "recommendations"), {
          nickname: currentUser.displayName,
          userId: currentUser.uid,
          title: title,
          content: content,
          postedDate: new Date(),
        });
        console.log("새로운 문서 ID:", docRef.id);
        navigate(-1);
      }
    } catch (error) {
      console.error("Firestore 저장 오류:", error);
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isEditing) {
      handleUpdate();
    } else {
      handleAdd();
    }
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTitle(value);
  };

  const onChangeContent = (value: string) => {
    setContent(value);
  };

  return (
    <div className="pt-14 xl:px-32 lg:px-20 md:px-12 sm:px-6 px-4">
      <div className="flex items-center mb-5 lg:mb-8">
        <h2 className="text-2xl lg:text-2xl text-left font-bold">추천 문의</h2>
        <span className="ml-3.5 text-brown-400">
          추천 받고 싶은 제품이 있나요?
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-xs text-brown-400 text-right">*필수입력</span>
        <h4 className="font-bold mb-4">문의 작성*</h4>
        <form onSubmit={onSubmit}>
          <input
            name="title"
            placeholder="제목을 입력해 주세요."
            value={title}
            onChange={onChangeTitle}
            className="w-full text-base bg-beige mb-4 p-3 placeholder:text-brown-300 placeholder:italic placeholder:text-sm"
            required
          />
          <ReactQuill
            ref={(element: null) => {
              if (element !== null) {
                QuillRef.current = element;
              }
            }}
            value={content}
            modules={modules}
            onChange={onChangeContent}
            placeholder="추천 받고 싶은 제품이나 향에 대해 작성해 주세요."
            className="w-full bg-beige"
          />
          <div className="flex justify-center">
            <button
              className="mt-8 btn white-btn"
              onClick={() => {
                navigate(-1);
              }}
            >
              취소
            </button>
            <button type="submit" className="mt-8 ml-4 btn primary-btn">
              {isEditing ? "수정 완료" : "작성 완료"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecommendWrite;
