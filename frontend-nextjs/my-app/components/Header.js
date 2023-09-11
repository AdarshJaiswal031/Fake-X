import Link from "next/link";
import { ConnectButton } from "web3uikit";
import React, { useEffect, useState } from "react";
import { auth, provider } from "./config";
import { signInWithPopup } from "firebase/auth";
import { generateSHA256Hash } from "../utils/cryptoHash";

import { Button, ico } from "web3uikit";
export default function Header() {
  const [value, setvalue] = useState("");
  const handleClick = () => {
    signInWithPopup(auth, provider).then(async (data) => {
      setvalue(data.user.displayName);
      localStorage.setItem("fakexAuth", await generateSHA256Hash(data.user.uid));
    });
  };
  useEffect(() => {
    setvalue(localStorage.getItem("fakexAuth"));
  });

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log("Enter key pressed! Perform search here...");
      const val = event.target.value;
      if (val.length === 64) {
        window.location.href = `http://localhost:3000/publisher/${val}`;
      } else {
        window.location.href = `http://localhost:3000/mediaDetails/${val}`;
      }
    }
  };
  return (
    <nav className="p-5 border-b-2 flex flex-row justify-between items-center shadow-xl bg-gray-800 text-white">
      <h1 className="py-4 px-4 font-bold text-3xl">FAKE-X</h1>
      <div className="flex flex-row items-center">
        <div className="mx-auto max-w-md">
          <div className="relative mt-1 mr-5 ">
            <input
              type="text"
              placeholder="Enter token id or userId"
              className="px-10 py-2 text-l border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onKeyPress={handleKeyPress}
              style={{ width: "27.5vw" }}
            />
          </div>
        </div>
        <Link href="/">
          <a className="mr-4 p-6">Home</a>
        </Link>
        <Link href="/Listings">
          <a className="mr-4 p-6">Listings</a>
        </Link>
        <Link href="/Profile">
          <a className="mr-4 p-6">Profile</a>
        </Link>
        {value ? (
          <ConnectButton moralisAuth={false} />
        ) : (
          <Button
            onClick={handleClick}
            text="SignIn"
            size="large"
            theme="primary"
          />
        )}
      </div>
    </nav>
  );
}
