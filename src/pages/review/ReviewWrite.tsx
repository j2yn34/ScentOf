import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules } from "../quillModules";
import { auth, db, storage } from "../../database/initialize";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import Rating from "../../components/common/Rating";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { PostData } from "../../types";

const ReviewWrite = () => {
  const QuillRef = useRef<ReactQuill | null>(null);
  const [brandName, setBrandName] = useState("");
  const [productName, setProductName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [attachment, setAttachment] = useState<string | undefined>(undefined);

  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (postId) {
      getReviewData();
    }
  }, [postId]);

  const getReviewData = async () => {
    try {
      if (!postId) {
        return;
      }
      const docRef = doc(db, "reviews", postId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const reviewData = docSnap.data() as PostData;
        setBrandName(reviewData.brandName);
        setProductName(reviewData.productName);
        setTitle(reviewData.title);
        setContent(reviewData.content);
        setRating(reviewData.rating);
        setIsEditing(true);
      } else {
        console.log("문서가 존재하지 않습니다.");
      }
    } catch (error) {
      console.error("문서를 불러오는 중 오류 발생:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      if (!postId) {
        return;
      }

      let imageUrl = "";

      if (attachment) {
        const storageRef = ref(storage, `reviewImages/${uuidv4()}`);
        const response = await uploadString(storageRef, attachment, "data_url");
        const attachmentUrl = await getDownloadURL(response.ref);
        imageUrl = attachmentUrl;
      }

      const docRef = doc(db, "reviews", postId);
      await updateDoc(docRef, {
        brandName: brandName,
        productName: productName,
        title: title,
        content: content,
        rating: rating,
        imageUrl,
      });
      console.log("수정 완료");
      navigate(-1);
    } catch (error) {
      console.error("수정 오류:", error);
    }
  };

  const handleAdd = async () => {
    try {
      const currentUser = auth.currentUser;

      if (currentUser) {
        let imageUrl = "";

        if (attachment) {
          const storageRef = ref(storage, `reviewImages/${uuidv4()}`);
          const response = await uploadString(
            storageRef,
            attachment,
            "data_url"
          );
          const attachmentUrl = await getDownloadURL(response.ref);
          imageUrl = attachmentUrl;
        }

        if (rating === null) {
          alert("별점을 선택해주세요.");
          return;
        }

        const docRef = await addDoc(collection(db, "reviews"), {
          userId: currentUser.uid,
          nickname: currentUser.displayName,
          brandName: brandName,
          productName: productName,
          title: title,
          content: content,
          rating: rating,
          postedDate: new Date(),
          imageUrl,
        });

        navigate(-1);
        console.log("문서 ID:", docRef.id);
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

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "brandName") {
      setBrandName(value);
    } else if (name === "title") {
      setTitle(value);
    } else if (name === "product") {
      setProductName(value);
    }
  };

  const handleRatingChange = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const theFile = event.target.files?.[0] || null;

    if (theFile) {
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(theFile);

      reader.onloadend = (finishedEvent: ProgressEvent<FileReader>) => {
        const { result } = finishedEvent.target as FileReader;
        if (result && typeof result === "string") {
          setAttachment(result);
        }
      };
    }
  };

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const onClearAttachment = () => {
    setAttachment(undefined);

    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  };

  return (
    <div className="pt-14 xl:px-32 lg:px-20 md:px-12 sm:px-6 px-4">
      <div className="flex items-center mb-5 lg:mb-8">
        <h2 className="text-2xl lg:text-2xl text-left font-bold">향기 리뷰</h2>
        <span className="ml-3.5 text-brown-400">
          향을 오래 기억할 수 있도록 기록해 볼까요?
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-xs text-brown-400 text-right">*필수입력</span>
        <form onSubmit={onSubmit}>
          <div className="flex md:flex-row flex-wrap">
            <div className="mr-6">
              <h4 className="font-bold mb-4">브랜드*</h4>
              <input
                name="brandName"
                placeholder="브랜드명을 입력해 주세요."
                value={brandName}
                onChange={onChange}
                className="text-base bg-beige mb-6 p-2.5 placeholder:text-brown-300 placeholder:italic placeholder:text-sm"
                required
              />
            </div>
            <div className="mr-6">
              <h4 className="font-bold mb-4">제품명*</h4>
              <input
                name="product"
                placeholder="제품명을 입력해 주세요."
                value={productName}
                onChange={onChange}
                className="text-base bg-beige mb-6 p-2.5 placeholder:text-brown-300 placeholder:italic placeholder:text-sm"
                required
              />
            </div>
            <div className="mb-6">
              <h4 className="font-bold mb-4">별점*</h4>
              <Rating
                rating={rating !== null ? rating : 0}
                setRating={handleRatingChange}
              />
            </div>
          </div>
          <div className="mb-6 flex flex-wrap">
            <div className="flex flex-col mr-6">
              <div className="flex items-center mb-4">
                <h4 className="font-bold mr-3 min-w-[70px]">제품 이미지</h4>
                <span className="text-sm text-brown-400">
                  제품의 이미지도 함께 기록해 보세요.
                </span>
              </div>
              <input
                ref={inputFileRef}
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className="file:text-sm bg-beige border-none rounded-none h-[44px] w-full min-w-[418px]"
              />
            </div>
            {attachment && (
              <div className="flex items-end">
                <img src={attachment} className="w-[84px] h-[84px]" />
                <button
                  onClick={onClearAttachment}
                  className="ml-4 text-sm text-brown-400 hover:text-red underline underline-offset-4"
                >
                  첨부 취소
                </button>
              </div>
            )}
          </div>
          <div>
            <h4 className="font-bold mb-4">리뷰 작성*</h4>
            <input
              name="title"
              placeholder="(제목) 한 줄 평을 입력해 주세요."
              value={title}
              onChange={onChange}
              className="w-full text-base bg-beige mb-4 p-2.5 placeholder:text-brown-300 placeholder:italic placeholder:text-sm"
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
              onChange={setContent}
              placeholder="향에 대한 생각을 자유롭게 작성해 주세요."
              className="w-full bg-beige"
            />
          </div>
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

export default ReviewWrite;
