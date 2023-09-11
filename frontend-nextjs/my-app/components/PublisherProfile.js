import React from "react";
import { HideButton, Button } from "web3uikit";
const PublisherProfile = ({ published }) => {
  return (
    <div className="bg-black-400 cursor-pointer" style={{ width: "75%" }}>
      <div
        className="m-5 h-full transition duration-200 shadow-xl rounded-md border border-black-100"
        style={{ height: "43vw", width: "100%" }}
      >
        <ul className="flex">
          <li
            id="publishedTab"
            className="w-45 h-50 p-5 mx-5 my-3 bg-gray-800 text-white hover:bg-violet-50 hover:text-black transition duration-200 shadow-md rounded-md border border-gray-200 border-2 flex justify-between"
          >
            Published
          </li>
          <a
            target="/"
            href="https://sepolia.etherscan.io/address/0x4Ea82f53c7332A9430276B27964F85f74d94Ce75"
            className="w-45 h-50 p-5 my-3 hover:bg-gray-800 hover:text-white transition duration-200 shadow-md rounded-md border border-gray-200 border-2 flex justify-between"
          >
            Etherscan
          </a>
        </ul>
        <ul
          id="published"
          className="overflow-y-scroll scrollbar-hidden"
          style={{ height: "83%" }}
        >
          {published
            ? Object.keys(published).map((item) => {
              return (
                <li className="w-45 h-50 p-5 mx-5 my-3 hover:bg-violet-50 transition duration-200 shadow-md rounded-md border bg-yellow-400 text-black border-gray-200 border-2 flex justify-between">
                  <span>{item}</span>
                  <a href={published[item].mediaUri} target="/">
                    {published[item].mediaUri}
                  </a>
                  <span>{published[item].timestamp}</span>
                </li>
              );
            })
            : "No data found"}
        </ul>
      </div>
    </div>
  );
};

export default PublisherProfile;
export async function getServerSideProps(context) {
  const { slug } = context.query;
  console.log(slug.toString());
  const url = "http://localhost:8000/getUserProfile";
  const data = await getProfile(url, { userIdHash: slug.toString() });

  data.userIdHash = slug;
  // Pass data to the page via props
  return { props: { data } };
}
