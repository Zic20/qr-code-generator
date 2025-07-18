import { useRef } from "react";
import { toast } from "react-toastify";
import { storeImage } from "../modules/storeImage";
import { auth, db } from "../firebase/firebase";
import { addDoc, serverTimestamp, collection } from "firebase/firestore";
import { useAuth } from "../firebase/auth";

const ImageForm = ({ submitHandler }) => {
  const imageRef = useRef();
  const sizeRef = useRef();
  const nameRef = useRef();
  const authUser = useAuth();
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const imageInput = document.getElementById("image");
    const size = sizeRef.current.value;
    const name = nameRef.current.value;

    if (name === "" || size === "" || imageInput.files.length === 0) {
      toast.error("Please provide all necessary information");
      return;
    }
    const image = imageInput.files[0];
    const imageURL = storeImage(image).catch(() => {
      toast.error("Could not upload image");
      return;
    });

    const downloadURL = await imageURL;
    const data = {
      name,
      url: downloadURL,
      user: auth.currentUser.uid,
      timestamp: serverTimestamp(),
    };

    await addDoc(collection(db, "files"), data);

    submitHandler({ name, size, url: downloadURL });
  };
  return (
    <form className={"p-5 space-y-2 w-full  card"} onSubmit={onSubmitHandler}>
      <div className="w-full">
        <div className="mb-2">
          <input
            type="text"
            id="fileName"
            ref={nameRef}
            className="mt-2 w-full border border-gray-800 rounded-sm p-2 bg-white"
            placeholder="Enter name for QR Code here"
          />
        </div>
        <div className="mb-2">
          <input
            type="file"
            id="image"
            ref={imageRef}
            className="mt-2 w-full border border-gray-800 rounded-sm p-2 bg-white"
            multiple={false}
            accept="*"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="size" className="mb-2 text-black">
            Size:
          </label>
          <select
            id="size"
            ref={sizeRef}
            className="mt-2 w-full border text-black border-gray-800 rounded-sm p-2 bg-white"
          >
            <option value="100">100x100</option>
            <option value="200">200x200</option>
            <option value="300">300x300</option>
            <option value="400">400x400</option>
            <option value="500">500x500</option>
            <option value="600">600x600</option>
            <option value="700">700x700</option>
          </select>
        </div>
        {auth.currentUser ? (
          <button className="text-white bg-black p-2 rounded-sm w-full md:w-6/12 mx-auto block">
            Generate QR Code
          </button>
        ) : (
          <p className="text-center font-semibold ">
            Please sign in to generate QR Code for images.
          </p>
        )}
      </div>
    </form>
  );
};

export default ImageForm;
