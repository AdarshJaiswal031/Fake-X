const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const bodyP = require("body-parser");
const cors = require("cors");
const { storeTokenUriMetadata } = require("./uploadToPinata");
app.use(bodyP.json());
app.use(cors());
const admin = require("firebase-admin");
const serviceAccount = require("../credentials/firebase.json");

const crypto = require("crypto");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://fake-identification-blockchain-default-rtdb.firebaseio.com/",
});
const db = admin.database();

async function addDataToFirebaseDatabase(data) {
  const userRef = db.ref(`users/${data.userIdHash}`);
  if (!userRef.hasOwnProperty("userData")) {
    const userDataRef = db.ref(`users/${data.userIdHash}/userData`);
    await userDataRef.set(data.userData);
  }
  const mediaRef = db.ref(`users/${data.userIdHash}/media/${data.tokenId.toString()}`);
  const date = new Date(Date.now()).toISOString().split("T")[0];
  const dataToAdd = {
    mediaUri: data.mediaUri,
    timestamp: date,
  };
  mediaRef.set(dataToAdd);
}
async function addToAll(data) {
  const tokenRef = db.ref(`allData/${data.tokenId}`);
  const date = new Date(Date.now()).toISOString().split("T")[0];
  const dataToSave = {
    mediaUri: data.mediaUri,
    userIdHash: data.userIdHash,
    timestamp: date,
  };
  await tokenRef.update(dataToSave);
}
function generateSHA256Hash(inputString) {
  const encoder = new TextEncoder();
  const data = encoder.encode(inputString);
  const hashBuffer = crypto.createHash("sha256").update(data).digest();
  const hashHex = hashBuffer.toString("hex"); // Use toString('hex') to get the hexadecimal representation
  return hashHex;
}
app.post("/addData", async function (req, res) {
  try {
    const body = req.body;
    if (body.userIdHash === generateSHA256Hash(body.userId)) {
      await addDataToFirebaseDatabase(body);
      await addToAll(body);
      res.status(200)
    } else {
      res.status(401)
    }
  } catch (error) {
    res.status(500)
  }
});

app.post("/createJson", async function (req, res) {
  try {
    const body = req.body;
    const tokenUri = `https://ipfs.io/ipfs/${(await storeTokenUriMetadata(body)).IpfsHash
      }`;
    res.status(200).json({ url: tokenUri });
  } catch (error) {
    res.status(500).json({ message: "Failed to add data" });
  }
});

app.post("/getUserProfile", async function (req, res) {
  console.log(req.body, ";;;;;;;;;;;;;;;;;;;")
  db.ref("users")
    .child(req.body.userIdHash)
    .once("value")
    .then((snapshot) => {
      const dataSnapshot = snapshot.val();
      if (dataSnapshot) {
        const data = {};
        const userDataNode = dataSnapshot["userData"];
        const mediaNode = dataSnapshot["media"];
        console.log(mediaNode)
        data.userData = userDataNode;
        data.published = mediaNode;
        res.status(200).json(data);
      } else {
        res.status(200).json(JSON.stringify({ found: "not data found" }));
        console.log("'users' node is empty.");
      }
    })
    .catch((error) => {
      console.error("Error fetching collections:", error);
      res.status(200).json({ found: "error occured" });
    });
  // res.status(200).json(JSON.stringify({ message: "ok" }));
});

app.get("/getAllData", async function (req, res) {
  db.ref("allData")
    .once("value")
    .then((snapshot) => {
      const dataSnapshot = snapshot.val();
      if (dataSnapshot) {
        res.status(200).json(JSON.stringify(dataSnapshot));
      } else {
        res.status(200).json({ message: "not data found" });
        console.log("'users' node is empty.");
      }
    })
    .catch((error) => {
      console.error("Error fetching collections:", error);
      res.status(200).json({ message: "error occured" });
    });
});

app.post("/getWithTokenId", async function (req, res) {
  const tokenId = req.body.tokenId;
  const allDataRef = db.ref(`allData/${tokenId}`);
  console.log(allDataRef.hasOwnProperty(tokenId));
  allDataRef
    .once("value")
    .then((snapshot) => {
      const dataSnapshot = snapshot.val();
      if (dataSnapshot) {
        res.status(200).json(JSON.stringify(dataSnapshot));
      } else {
        res.status(200).json(JSON.stringify({ found: "not data found" }));
        console.log("'users' node is empty.");
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "error occured" });
    });
});

app.listen(8000);
