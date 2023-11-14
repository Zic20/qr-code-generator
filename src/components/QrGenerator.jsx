import { QRCodeCanvas } from "qrcode.react";
import { Share } from "lucide-react";
const QrGenerator = ({ url, qrCodeSize, fileName }) => {
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

  const handleShareClick = () => {
    const canvas = document.querySelector("canvas");
    canvas.toBlob(async (blob) => {
      const data = {
        files: [
          new File([blob], fileName + ".png", {
            type: blob.type,
          }),
        ],
        title: fileName,
        text: "QR Code",
      };

      if (navigator.canShare(data)) {
        await navigator.share(data);
      }
    });
  };
  return (
    <div>
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

      <div className="flex justify-center gap-4">
        <button
          onClick={handleDownloadClick}
          className="text-white bg-black p-2 rounded-sm"
        >
          Download QR Code
        </button>
        <button
          onClick={handleShareClick}
          className="text-black bg-transparent border border-black p-2 rounded-sm flex"
        >
          Share QR Code
          <Share className="ml-1 font-thin" />
        </button>
      </div>
    </div>
  );
};

export default QrGenerator;
