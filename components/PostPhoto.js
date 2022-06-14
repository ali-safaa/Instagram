import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useSession } from 'next-auth/react';

import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

function PostPhoto({ setPostPhoto }) {
  const refFile = useRef(null);
  const captionRef = useRef(null);
  const [selectFiles, setSelectFiles] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const addPhotoToFeed = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectFiles(readerEvent.target.result);
    };
  };

  const onUploadPost = async () => {
    if (loading) {
      return;
    }
    setLoading(true);

    const docRef = await addDoc(collection(db, 'posts'), {
      userName: session.user.name,
      userProfile: session.user.image,
      userEmail: session.user.email,
      userCaption: captionRef.current.value,
      timestamp: serverTimestamp(),
    });
    console.log('new doc added to firebase db', docRef.id);

    const imageRef = ref(storage, `posts/${docRef.id}`);
    await uploadString(imageRef, selectFiles, 'data_url').then(
      async (snapshot) => {
        const downloadUrl = await getDownloadURL(imageRef);
        await updateDoc(doc(db, 'posts', docRef.id), {
          image: downloadUrl,
        });
      }
    );
    setLoading(false);
    setPostPhoto(false);
  };

  return (
    <div className="fixed bg-opacity-50 top-0 bg-black w-screen h-screen">
      <i
        onClick={() => setPostPhoto(false)}
        className="fas fa-close justify-end flex items-center cursor-pointer mt-3 mr-5 text-2xl text-white"
      ></i>
      <div className="bg-white rounded-md w-[350px] sm:w-[500px] mt-28 grid items-center justify-center m-auto">
        <h4 className="border-b py-3 font-semibold text-center">
          Create new post
        </h4>
        {selectFiles ? (
          <>
            <img
              className="w-[300px] sm:w-[400px] h-[200px] sm:h-[300px] object-cover rounded-md"
              src={selectFiles}
              alt=""
            />
            <div className="flex items-center">
              <input
                className="w-full text-sm pl-3 outline-none placeholder:text-gray-500"
                type="text"
                placeholder="Please select a caption"
                ref={captionRef}
                disabled={!captionRef}
              />
              <h3
                onClick={onUploadPost}
                className={`${
                  loading && 'cursor-not-allowed bg-blue-300'
                } bg-blue-500 rounded-md mr-2 cursor-pointer text-white text-sm px-3 font-semibold my-2 py-1`}
              >
                {loading ? 'loading...' : 'Post'}
              </h3>
            </div>
          </>
        ) : (
          <>
            <i className="far fa-file mx-auto text-4xl mt-16"></i>
            <h2 className="text-xl font-light mt-3">
              Drag video and photos here
            </h2>
            <input hidden type="file" ref={refFile} onChange={addPhotoToFeed} />
            <h3
              onClick={() => refFile.current.click()}
              className="mx-auto px-5 mb-32 mt-3 py-1 text-sm bg-blue-500 rounded-md cursor-pointer font-semibold text-white w-max"
            >
              Select from computer
            </h3>
          </>
        )}
      </div>
    </div>
  );
}

export default PostPhoto;
