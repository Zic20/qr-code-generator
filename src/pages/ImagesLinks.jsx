import Navbar from "../components/Navbar";
import {
  collection,
  query,
  where,
  getDocs,
  getDocsFromCache,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useEffect } from "react";
import { useAuth } from "../firebase/auth";
const ImagesLinks = () => {
  const { authUser } = useAuth();
  console.log(authUser);
  useEffect(() => {
    const fetchData = async () => {
      const docQuery = query(
        collection(db, "files"),
        where("user", "==", authUser.uid)
      );

      const querySnapshot = await getDocs(docQuery);
      const files = [];
      querySnapshot.forEach((doc) => {
        files.push(doc.data());
      });
     
    };

    const getCachedDocs = async () => {
      const docQuery = query(
        collection(db, "files"),
        where("user", "==", authUser.uid)
      );
      const querySnapshot = await getDocsFromCache(docQuery);
      const files = [];
      querySnapshot.forEach((doc) => {
        files.push(doc.data());
      });
      
      console.log(files);
    };

    getCachedDocs();

    // fetchData();
  }, []);
  return (
    <>
      <Navbar />
      <div className="text-black p-10">
        <ul className="bg-gray-500 text-center">
          <li>Hello World</li>
          <li>Hello World</li>
          <li>Hello World</li>
          <li>Hello World</li>
          <li>Hello World</li>
          <li>Hello World</li>
          <li>Hello World</li>
          <li>Hello World</li>
        </ul>
      </div>
    </>
  );
};

export default ImagesLinks;
