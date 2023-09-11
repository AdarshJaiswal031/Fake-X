import React from "react";
const MediaInfo = ({ tokenData }) => {
  console.log(tokenData)
  const desc = tokenData.description;
  const tokenName = tokenData.name;
  const tokenId = tokenData.tokenId;
  const mediaUrl = tokenData.url;
  const date = tokenData.timestamp;
  return (
    <div className="bg-black-400 cursor-pointer" style={{ width: "75%" }}>
      <div
        className="m-5 h-full transition duration-200 shadow-xl rounded-md border border-black-100"
        style={{ height: "43vw", width: "100%" }}
      >
        <ul id="tokenData" className="text-black" style={{ height: "60%" }}>
          {tokenData ? (
            <div class=" mx-7 mt-10 text-black w-6/6 mr-8">
              <div class="border-b border-gray-200 pb-6">
                <h1 class="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 mt-5">
                  {tokenName}
                </h1>
              </div>
              <div class="py-4 border-b border-gray-200 flex">
                <p class="leading-4 w-2/6">Description: </p>
                <div class="flex w-4/6">
                  <p class="text-sm  ml-4">{`${desc}`}</p>
                </div>
              </div>
              <div class="py-4 border-b border-gray-200 flex">
                <p class="leading-4 w-2/6">TokenId: </p>
                <div class="flex w-4/6">
                  <p class="text-sm  ml-4">{`${tokenId}`}</p>
                </div>
              </div>
              <div class="py-4 border-b border-gray-200 flex">
                <p class="leading-4 w-2/6">Media Url: </p>
                <div class="flex w-4/6">
                  <p class="text-sm  ml-4"><a href={mediaUrl}>{`${mediaUrl}`}</a></p>
                </div>
              </div>
              <div class="py-4 border-b border-gray-200 flex">
                <p class="leading-4 w-2/6">Date </p>
                <div class="flex w-4/6">
                  <p class="text-sm  ml-4">{`${date}`}</p>
                </div>
              </div>
              <div class="py-4 border-b border-gray-200 flex">
                <p class="leading-4 w-2/6">Etherscan: </p>
                <div class="flex w-4/6">
                  <p class="text-sm  ml-4"><a href={"https://sepolia.etherscan.io/address/0x6f05bD8F8478c4A04566f394d79a0E0E284BB3fE"}>{`${"https://sepolia.etherscan.io/address/0x6f05bD8F8478c4A04566f394d79a0E0E284BB3fE"}`}</a></p>
                </div>
              </div>
            </div>
          ) : (
            "No data found"
          )}
        </ul>
      </div>
    </div>
  );
};

export default MediaInfo;
// export async function getServerSideProps(context) {
//   const { slug } = context.query;
//   console.log(slug.toString());
//   const url = "http://localhost:8000/getUserProfile";
//   const data = await getProfile(url, { userIdHash: slug.toString() });

//   data.userIdHash = slug;
//   // Pass data to the page via props
//   return { props: { data } };
// }
