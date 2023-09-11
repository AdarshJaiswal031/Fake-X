import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../components/config";
import { Avatar, Card, Form } from "web3uikit";
import { useMoralis, useWeb3Contract } from "react-moralis";
import FakeMedia from "../constants/FakeMedia.json";
import FakeXnetworkMapping from "../constants/FakeXnetworkMapping.json";
import { generateSHA256Hash } from "../utils/cryptoHash";
import { handleListSuccess } from "../utils/ApiCalls";
import Tabs from "../components/Tabs";
import Message from "../components/Message";
const Profile = () => {
  const [userdata, setuserdata] = useState({});
  const { runContractFunction } = useWeb3Contract();
  const { chainId, account, isWeb3Enabled } = useMoralis();
  const chainString = chainId ? parseInt(chainId).toString() : "31337";
  const marketplaceAddress = FakeXnetworkMapping[chainString].FakeMedia[0];
  const [fakexAuth, setfakexAuth] = useState("")
  useEffect(() => {
    setfakexAuth(localStorage.getItem("fakexAuth"))
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userIdHash = await generateSHA256Hash(user.uid);
        const gotUserData = {
          displayName: user.displayName,
          photoURL: user.photoURL,
          userIdHash: userIdHash,
          userId: user.uid,
        };
        setuserdata(gotUserData);
      } else {
      }
    });

    return () => unsubscribe();
  }, []);
  const copyId = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(userdata.userIdHash)
      copiedMsg.textContent = " Copied";
      copiedMsg.style.color = "black"
      setTimeout(() => {
        copiedMsg.textContent = "";
      }, 1000);
    }
  }

  return (
    <>
      {
        fakexAuth ? (<div>
          <div
            style={{
              width: "100vw",
            }}
            className="flex"
          >
            <div className="m-5 mr-0 flex" style={{ width: "20%", height: "20%" }}>
              <Card
                description={
                  <span onClick={copyId}>{userdata.userIdHash ? userdata.userIdHash.substring(0, 10) + "..." + userdata.userIdHash.substring(userdata.userIdHash.length - 10) : ""}
                    <span id="copiedMsg"></span>
                  </span>

                }
                onClick={function noRefCheck() { }}
                setIsSelected={function noRefCheck() { }}
                title={userdata.displayName}
                tooltipText={<span style={{ width: 200 }}>Not Verified</span>}
              >
                <div className="flex justify-center align-middle my-10">
                  <Avatar
                    // image={userdata.photoURL}
                    image="data:image/jpeg;base64,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"
                    isRounded
                    theme="image"
                    size={150}
                  />
                </div>
              </Card>
            </div>
            {userdata ? (<Tabs userdata={userdata} />) : "User data not found !!"}

          </div>
        </div >) : (<Message msg={"First SignIn !!"} />)

      }
    </>
  );
};

export default Profile;
