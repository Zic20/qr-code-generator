import "./App.css";
import { QRCodeCanvas } from "qrcode.react";
import LinkForm from "./components/LinkForm";
import { useState } from "react";
import Navbar from "./components/Navbar";

function App() {
  const [url, setUrl] = useState("");
  const [qrCodeSize, setQrCodeSize] = useState(153);
  const [fileName, setFileName] = useState("myqrcode");

  const onFormSubmitHandler = ({ url, size, name }) => {
    setUrl(url);
    setQrCodeSize(size);
    setFileName(name);
  };

  const handleDownloadClick = () => {
    const canvas = document.querySelector("canvas");
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Navbar />
      <div className="text-black min-h-screen min-w-full md:flex justify-center place-content-center">
        <div className="flex-1 w-full mx-auto my-5 p-10">
          <div>
            <h1 className="mb-5 font-bold text-2xl">
              Instant QR Code Creation for All Your Needs
            </h1>

            <p className="mb-5 text-1xl">
              Link clients to your website or seamlessly share promotional
              flyers with our quick and easy QR code generator.
            </p>
            <p className="mb-2 text-1xl">
              Add your url or image and generate QR Code.
            </p>
          </div>
          <LinkForm submitHandler={onFormSubmitHandler} />
        </div>
        <div className="flex-1 w-full my-5 p-10">
          {url && (
            <>
              <QRCodeCanvas
                className="block mx-auto mb-5"
                value={url}
                size={qrCodeSize}
                bgColor={""}
                fgColor={"#ffffff"}
                level={"H"}
                includeMargin={false}
                style={{ width: "80%", height: "80%" }}
              />

              <button
                onClick={handleDownloadClick}
                className="text-white bg-black p-2 rounded-sm w-6/12 mx-auto block"
              >
                Download QR Code
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
