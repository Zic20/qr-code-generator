import LinkForm from "../components/LinkForm";
import ImageForm from "../components/ImageForm";
import { useState } from "react";
import Navbar from "../components/Navbar";
import QrGenerator from "../components/QrGenerator";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const Home = () => {
  const [url, setUrl] = useState("");
  const [qrCodeSize, setQrCodeSize] = useState(153);
  const [fileName, setFileName] = useState("myqrcode");

  const onFormSubmitHandler = ({ url, size, name }) => {
    setUrl(url);
    setQrCodeSize(size);
    setFileName(name);
  };
  return (
    <>
      <Navbar />
      <div className="text-black min-w-full md:flex justify-center place-content-center">
        <div className="flex-1 w-full mx-auto my-2 px-10 py-5">
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
          <Tabs>
            <TabList>
              <Tab>Generate QR Code for Website</Tab>
              <Tab>Generate QR Code for Images</Tab>
            </TabList>
            <TabPanel>
              <LinkForm submitHandler={onFormSubmitHandler} />
            </TabPanel>
            <TabPanel>
              <ImageForm submitHandler={onFormSubmitHandler} />
            </TabPanel>
          </Tabs>
        </div>
        <div className="flex-1 w-full my-5 p-10">
          {url && (
            <QrGenerator
              url={url}
              fileName={fileName}
              qrCodeSize={qrCodeSize}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
