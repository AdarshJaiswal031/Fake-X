import React from "react";
import { useRouter } from "next/router";
import { Avatar, Card, Form } from "web3uikit";
import PublisherProfile from "../../components/PublisherProfile";
import { getProfile } from "../../utils/ApiCalls";
const slug = (props) => {
  let router, userIdHash, userData, published;
  if (!props.data.found) {
    router = useRouter();
    userIdHash = router.query.slug;
    userData = props.data.userData;
    published = props.data.published;
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
                <span onClick={copyId}>{userIdHash ? userIdHash.substring(0, 10) + "..." + userIdHash.substring(userIdHash.length - 10) : ""}
                  <span id="copiedMsg"></span>
                </span>
              }
              title={userData.displayName}
              tooltipText={<span style={{ width: 200 }}>Not Verified</span>}
            >
              <div className="flex justify-center align-middle my-10">
                <Avatar
                  // image={userData.photoUrl}
                  isRounded
                  theme="image"
                  size={150}
                />
              </div>
            </Card>
          </div>
          <PublisherProfile published={published} />
        </div>
      ) : (
        <span className="m-10">Not Found</span>
      )}
    </div>
  );
};
export default slug;
export async function getServerSideProps(context) {
  const { slug } = context.query;
  console.log(slug.toString());
  const url = "http://localhost:8000/getUserProfile";
  const data = await getProfile(url, { userIdHash: slug.toString() });
  console.log(data);
  if (!data.found) {
    data.userIdHash = slug;
  }

  return { props: { data } };
}
