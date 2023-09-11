import React, { useEffect, useState } from "react";
import { Form, Loading } from "web3uikit";
import { handleClickTabs } from "../utils/frontendMethods";
import { getProfile, handleListSuccess, postData } from "../utils/ApiCalls";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../components/config";
import { useMoralis, useWeb3Contract } from "react-moralis";
import FakeMedia from "../constants/FakeMedia.json";
import FakeXnetworkMapping from "../constants/FakeXnetworkMapping.json";
import { generateSHA256Hash } from "../utils/cryptoHash";
import { useNotification } from "web3uikit";

const Tabs = ({ userdata }) => {
  const dispatch = useNotification();

  const { runContractFunction } = useWeb3Contract();
  const { chainId, account, isWeb3Enabled } = useMoralis();
  const [published, setpublished] = useState({});
  const chainString = chainId ? parseInt(chainId).toString() : "31337";
  const marketplaceAddress = FakeXnetworkMapping[chainString].FakeMedia[0];

  const deployMedia = async (data) => {
    if (isWeb3Enabled) {
      const media_data = {
        name: data.data[0].inputResult,
        description: data.data[1].inputResult,
        url: data.data[2].inputResult,
        userName: userdata.displayName,
        userId: userdata.userIdHash,
      };
      const url = "http://localhost:8000/createJson";
      const ipfsUrl = (await postData(url, media_data)).url;

      console.log("Ok! Now time to mint", ipfsUrl);
      const mintOption = {
        abi: FakeMedia,
        contractAddress: marketplaceAddress,
        functionName: "mintNft",
        params: {
          mediaURI: ipfsUrl,
        },
      };
      await runContractFunction({
        params: mintOption,
        onSuccess: (result) => {
          if (handleListSuccess(result, ipfsUrl, userdata)) {
            dispatch({
              type: "success",
              message: "Your data is added successfully",
              title: "Listed",
              position: "topR",
            });
          }
        },
        onError: (error) => {
          dispatch({
            type: "error",
            message: "Failed to List",
            title: "Not Listed",
            position: "topR",
          });
        },
      });
    } else {
      console.log("first enable web3");
    }
  };

  useEffect(() => {
    const url = "http://localhost:8000/getUserProfile";
    (async () => {
      if (userdata.userIdHash) {
        console.log(userdata.userIdHash, "***************")
        const profileData = await getProfile(url, {
          userIdHash:
            userdata.userIdHash
        });
        if (profileData) {
          setpublished(profileData.published);
        }
      }
    })();
  }, [userdata.userIdHash]);

  return (
    <div className=" cursor-pointer" style={{ width: "75%" }}>
      <div
        className="m-5 h-full transition duration-200 shadow-xl rounded-md border border-black-100 bg-white"
        style={{ height: "43vw", width: "100%" }}
      >
        <ul className="flex ">
          <li
            id="publishedTab"
            onClick={() => {
              handleClickTabs(
                "published",
                "upload",
                "publishedTab",
                "uploadTab",
                "#1f2937",
                "white",
                "black"
              );
            }}
            className="w-45 h-50 p-5 mx-5 my-3 bg-gray-800 text-white hover:bg-violet-50 hover:text-black transition duration-200 shadow-md rounded-md border border-gray-200 border-2 flex justify-between"
          >
            Published
          </li>
          <li
            id="uploadTab"
            onClick={() => {
              handleClickTabs(
                "upload",
                "published",
                "uploadTab",
                "publishedTab",
                "#1f2937",
                "white",
                "black"
              );
            }}
            className="w-45 h-50 p-5  my-3 px-8 hover:bg-violet-50 transition duration-200 shadow-md rounded-md border border-gray-200 border-2 flex justify-between"
          >
            Upload
          </li>
        </ul>
        <ul
          id="published"
          className="overflow-y-scroll scrollbar-hidden "
          style={{ height: "83%" }}
        >
          {published ? (
            Object.keys(published).map((item) => {
              return (
                <li className="w-45 h-50 p-5 mx-5 my-3 bg-white hover:bg-violet-50 transition duration-200 shadow-md rounded-md border bg-yellow-400 text-black border-2  border-gray-200 border-2 flex justify-between">
                  <span>{item}</span>
                  <a href={published[item].mediaUri} target="/">
                    {published[item].mediaUri}
                  </a>
                  <span>{published[item].timestamp}</span>
                </li>
              );
            })
          ) : (
            <div
              style={{
                backgroundColor: "#ECECFE",
                borderRadius: "8px",
                padding: "20px",
              }}
              className="m-5"
            >
              <Loading size={12} spinnerColor="#2E7DAF" spinnerType="wave" />
            </div>
          )}
        </ul>
        <ul id="upload" className="bg-black-400" style={{ display: "none" }}>
          <Form
            onSubmit={deployMedia}
            data={[
              {
                name: "Name",
                type: "text",
                inputWidth: "50%",
                value: "",
                key: "nftAddress",
              },
              {
                name: "Description",
                type: "text",
                value: "",
                key: "tokenId",
              },
              {
                name: "Media Url",
                type: "text",
                value: "",
                key: "price",
              },
            ]}
            title="Mint your media"
            id="Main Form"
          />
        </ul>
      </div>
    </div>
  );
};
export default Tabs;
