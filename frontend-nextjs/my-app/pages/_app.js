import Header from "../components/Header";
import { MoralisProvider } from "react-moralis";
import Head from "next/head";
import "../styles/globals.css";
import { NotificationProvider } from "web3uikit";
function MyApp({ Component, pageProps }) {
  return (
    <div className="">
      <Head>
        <title>NFT Marketplace</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MoralisProvider initializeOnMount={false}>
        <NotificationProvider>
          <Header />
          <Component {...pageProps} />
        </NotificationProvider>
      </MoralisProvider>
    </div>
  );
}

export default MyApp;
