import { useEffect, useState } from "react";
import { generateSHA256Hash } from "../utils/cryptoHash";
import { copyToClipboard } from "../utils/frontendMethods";
import { Loading } from "web3uikit";
import Link from 'next/link';
const Listings = () => {
  const [allData, setallData] = useState("");
  const handleInputChange = (e) => {
    setInputString(e.target.value);
  };

  useEffect(() => {
    (async () => {
      const url = "http://localhost:8000/getAllData";
      const response = await fetch(url);
      const data = JSON.parse(await response.json());
      console.log(data);
      setallData(data);
    })();
  }, []);

  return (
    <div>

      <ul>
        <li className="w-45 h-50 px-5 py-8 m-5 shadow-xl rounded-md border text-white border-gray-200 bg-yellow-500 text-black border-2 flex justify-between bg-violet-400">
          <span className="">TokenID</span>
          <span>TokenURI</span>
          <span>Owned By</span>
        </li>
      </ul>
      <ul>
        {allData ? (
          Object.keys(allData).map((item) => {
            return (
              <Link href={`/mediaDetails/${item}`} >
                <li className="w-45 h-50 p-5 mx-5 my-3 cursor-pointer hover:bg-violet-50 transition duration-200 shadow-md rounded-md border border-gray-200 border-2 flex justify-between">
                  <span>{item}</span>
                  <span>
                    {allData[item].mediaUri}
                  </span>
                  <span>
                    {allData[item].userIdHash.substring(0, 12)}
                  </span>

                </li>
              </Link>
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
    </div>
  );
};

export default Listings;

// export async function getServerSideProps() {
//   const url = "http://localhost:8000/getAllData";
//   const response = await fetch(url);
//   const allData = JSON.parse(await response.json());
//   return { props: { allData } };
// }
