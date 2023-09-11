import React from "react";
import { useRouter } from "next/router";
import { Avatar, Card, Form } from "web3uikit";
import PublisherProfile from "../../components/PublisherProfile";
import { getWithTokenId } from "../../utils/ApiCalls";
import MediaInfo from "../../components/mediaInfo";
const MediaDeatils = (props) => {
  let router, tokenId, userName, userIdHash;
  if (!props.data.found) {
    router = useRouter();
    tokenId = router.query.slug;
    userName = props.data.tokenData.userName;
    userIdHash = props.data.userIdHash;
  }
  const copyId = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(userIdHash)
      copiedMsg.textContent = " Copied";
      copiedMsg.style.color = "black"
      setTimeout(() => {
        copiedMsg.textContent = "";
      }, 1000);
    }
  }
  return (
    <div>
      {!props.data.found ? (
        <div
          style={{
            width: "100vw",
          }}
          className="flex"
        >
          <div
            className="m-5 mr-0 flex"
            style={{ width: "20%", height: "20%" }}
          >
            <Card
              description={
                //   `Adarsh Jaiswal`
                userIdHash
                  ? <span onClick={copyId}>{userIdHash ? userIdHash.substring(0, 10) + "..." + userIdHash.substring(userIdHash.length - 10) : ""}
                    <span id="copiedMsg"></span>
                  </span>
                  : ""
              }
              title={userName}
              tooltipText={<span style={{ width: 200 }}>Not Verified</span>}
            >
              <div className="flex justify-center align-middle my-10">
                <Avatar isRounded theme="image" size={150} />
              </div>
            </Card>
          </div>
          <MediaInfo tokenData={props.data.tokenData} />
        </div>
      ) : (
        <span className="m-5 my-10">Not Found</span>
      )}
    </div>
  );
};
export default MediaDeatils;
export async function getServerSideProps(context) {

  const { slug } = context.query;
  const urlOfApi = "http://localhost:8000/getWithTokenId";
  const data = await getWithTokenId(urlOfApi, { tokenId: slug.toString() });
  const tokenUri = data.mediaUri
  if (tokenUri) {
    const response = await fetch(tokenUri);
    const tokenData = await response.json();
    data["tokenData"] = tokenData;
    data.tokenData["tokenId"] = slug;
    data.tokenData["timestamp"] = data.timestamp;
  }

  return { props: { data } };
}
