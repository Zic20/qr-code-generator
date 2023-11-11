import { useRef } from "react";

const LinkForm = ({ submitHandler }) => {
  const urlRef = useRef();
  const sizeRef = useRef();
  const nameRef = useRef();
  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (
      urlRef.current.value.trim() === "" ||
      sizeRef.current.value === "" ||
      nameRef.current.value === ""
    )
      alert("Please provide all necessary information");
    submitHandler({
      url: urlRef.current.value,
      size: sizeRef.current.value,
      name: nameRef.current.value,
    });
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
            type="url"
            id="link"
            ref={urlRef}
            className="mt-2 w-full border border-gray-800 rounded-sm p-2 bg-white"
            placeholder="Enter a url"
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

        <button className="text-white bg-black p-2 rounded-sm w-full md:w-6/12 mx-auto block">
          Generate QR Code
        </button>
      </div>
    </form>
  );
};

export default LinkForm;
