import { Button, TextInput } from "flowbite-react";
import React from "react";
import { useSelector } from "react-redux";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="w-full max-w-lg p-3 mx-auto">
      <h1 className="font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <div className="self-center w-32 h-32 overflow-hidden shadow-md cursor-pointer">
          <img
            src={currentUser.profilePicture}
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
