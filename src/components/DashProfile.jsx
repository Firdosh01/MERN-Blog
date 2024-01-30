import { Button, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
// import getStorage from "redux-persist/es/storage/getStorage";
import { app } from '../firebase'
import {getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null)
  const [imageFileUrl, setImageFileUrl] = useState(null)
  const filePictureRef = useRef()
  const [imgFileUploadProgress, setImgFileUploadProgress] = useState(0)
  const [imgFileUploadError, setImgFileUploadError] = useState(null)
  console.log(imgFileUploadProgress, imgFileUploadError )

  const handleImgChange = (e) => {
    const file = e.target.files[0]
    if(file){
      setImageFile(file)
      setImageFileUrl(URL.createObjectURL(file));
    }
  }
  // console.log(imageFile, imageFileUrl)

  useEffect(() => {
    if(imageFile){
      uploadImg()
    }
  },[imageFile])

  const uploadImg = async () => {
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow write: if
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }
    const storage = getStorage(app)
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, imageFile)
    
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = 
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgFileUploadProgress(progress.toFixed(0))
      },
      (error) => {
        setImgFileUploadError('Could not upload image (File must be less then 2MB)')
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

          setImageFileUrl(downloadURL)
        })
      }
    )
    
  }

  return (
    <div className="w-full max-w-lg p-3 mx-auto">
      <h1 className="font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input type="file" accept="image/*" onChange={handleImgChange} ref={filePictureRef} className="hidden" />
        <div className="self-center w-32 h-32 overflow-hidden shadow-md cursor-pointer" onClick={() => filePictureRef.current.click()}>
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className="w-full h-full border-4 rounded-full border-[lightGray] object-cover select-none"
          />
        </div>
         <TextInput type="text" id="username" placeholder="username" defaultValue={currentUser.username} />
         <TextInput type="text" id="email" placeholder="email" defaultValue={currentUser.email} />
         <TextInput type="password" id="password" placeholder="password" />
        <Button type="submit" gradientDuoTone='purpleToBlue' outline>
            Update
        </Button>
      </form>
      <div className="flex justify-between mt-5 text-red-500">
        <span className="cursor-pointer ">Delete Account</span>
        <span className="cursor-pointer ">Sign Out</span>
      </div>
    </div>
  );
}
