require("dotenv").config();
const pinataSdk = require("@pinata/sdk");
const path = require("path");
const fs = require("fs");

const pinataApiKey = process.env.PINATA_API_KEY;
const pinataApiSecretKey = process.env.PINATA_API_SECRET_KEY;
const pinata = new pinataSdk(pinataApiKey, pinataApiSecretKey);
async function storeImages(imagesFilePath) {
  const fullImagesPath = path.resolve(imagesFilePath);
  const files = fs.readdirSync(imagesFilePath);
  let responses = [];
  console.log("Uploading to Pinata......");
  for (fileIndex in files) {
    console.log(`working on file ${fileIndex}`);
    const readableStreamForFile = fs.createReadStream(
      `${fullImagesPath}/${files[fileIndex]}`
    );
    const options = {
      pinataMetadata: {
        name: files[fileIndex],
      },
    };
    try {
      await pinata
        .pinFileToIPFS(readableStreamForFile, options)
        .then((result) => {
          responses.push(result);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }
  return { responses, files };
}
async function storeTokenUriMetadata(metadata) {
  try {
    const response = await pinata.pinJSONToIPFS(metadata);
    return response;
  } catch (error) {
    console.log(error);
  }
  return null;
}

module.exports = { storeImages, storeTokenUriMetadata };
