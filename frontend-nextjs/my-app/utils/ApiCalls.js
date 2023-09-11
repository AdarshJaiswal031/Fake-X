


export const deployMedia = async (data, userdata, isWeb3Enabled) => {
  if (isWeb3Enabled) {
    console.log(isWeb3Enabled);
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
      onSuccess: (result) => handleListSuccess(result, ipfsUrl),
      onError: (error) => {
        console.log(error);
      },
    });
  } else {
    console.log("first enable web3");
  }
};
export async function handleListSuccess(mintTx, ipfsUrl, userdata) {
  console.log("safely minted..");
  const txReceipt = await mintTx.wait(1);
  console.log(txReceipt);
  if (txReceipt.events.length >= 2) {
    const tokenId = txReceipt.events[1].args.tokenId.toString();
    const mediaUri = txReceipt.events[1].args.mediaURI.toString();
    console.log(tokenId);

    if (mediaUri === ipfsUrl) {
      const url = "http://localhost:8000/addData";
      const data = {
        userIdHash: userdata.userIdHash,
        userId: userdata.userId,
        tokenId: tokenId,
        mediaUri: mediaUri,
        userData: {
          displayName: userdata.displayName,
          photoUrl: userdata.photoURL,
        },
      };
      console.log(data);
      await addData(url, data);
    } else {
      console.log("not equal");
    }
  }
  else {
    console.log("No args found")
  }
}

export async function postData(url, data) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Check if the request was successful
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const responseData = await response.json();
    console.log("Response from the server:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error sending POST request:", error);
  }
}
async function addData(url, data) {
  try {
    console.log(data)
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      return true

    }
  } catch (error) {
    console.error("Error sending POST request:", error);
  }
}
export async function getProfile(url, data) {
  try {
    if (data) {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const responseData = await response.json();
      console.log("Response from the server:", responseData);
      return responseData;
    }
  } catch (error) {
    console.error("Error sending POST request:", error);
  }
}
export async function getWithTokenId(url, data) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    // Check if the request was successful
    // if (!response.ok) {
    //   throw new Error("Network response was not ok.");
    // }

    const responseData = JSON.parse(await response.json());
    console.log("Response from the server:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error sending POST request:", error);
  }
}
