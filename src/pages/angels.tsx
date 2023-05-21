import router from "next/router";
import { useEffect, useRef, useState } from "react";
// import {
//   switchNetwork,
//   mumbaiFork,
//   getPublicClient,
//   handleVerifyErrors,
//   callContract,
//   signMessage,
//   publicWalletClient,
// } from "@/utils";
// import { transactions } from "../../../broadcast/Airdrop.s.sol/5151111/run-latest.json";
import { createWalletClient, http, custom, WalletClient, PublicClient, parseEther } from "viem";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import BackButton from "../components/BackButton";
import {
  SismoConnectButton, // the Sismo Connect React button displayed
  SismoConnectClientConfig, // the client config with your appId
  AuthType, // the authType enum, we will choose 'VAULT' in this tutorial
  ClaimType, // the claimType enum, we will choose 'GTE' in this tutorial, to check that the user has a value greater than a given threshold
} from "@sismo-core/sismo-connect-react";
import { goerli } from "viem/chains";
// import { devGroups } from "../config";
// import { polygon } from "viem/chains";

export enum APP_STATES {
  init,
  receivedProof,
  claimingNFT,
}

// The application calls contracts defined above
// const userChain = mumbaiFork;
// const contractAddress = transactions[0].contractAddress;

// you can create a new Sismo Connect app at https://factory.sismo.io
// The SismoConnectClientConfig is a configuration needed to connect to Sismo Connect and requests data from your users.
// You can find more information about the configuration here: https://docs.sismo.io/build-with-sismo-connect/technical-documentation/client

export const sismoConnectConfig: SismoConnectClientConfig = {
  appId: "0x233d8ed9e8c2c89ccc3bccdece915115",
  devMode: {
    enabled: true,
    // devGroups: [devGroups[0]],
  },
};

export default function AngelsIdentification() {
  const [isReady, setIsReady] = useState(false);
  const [appState, setAppState] = useState<APP_STATES>(APP_STATES.init);
  const [responseBytes, setResponseBytes] = useState<string>("");
  const [contractError, setContractError] = useState<string>("");
  const [tokenId, setTokenId] = useState<{ id: string }>();
  const [walletClient, setWalletClient] = useState<WalletClient>(
    createWalletClient({
      chain: goerli,
      transport: http(),
    }) as WalletClient
  );
  // const publicClient: PublicClient = getPublicClient(userChain);

  const { address, isConnected } = useAccount();
  const lastAddress = useRef<string | null>(null);
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (typeof window === "undefined") return;
    setWalletClient(
      createWalletClient({
        chain: goerli,
        transport: custom((window as any).ethereum, {
          key: "windowProvider",
        }),
      }) as WalletClient
    );

    // const sendFund = async (address: `0x${string}`) => {
    //   await publicWalletClient.sendTransaction({
    //     to: address,
    //     value: parseEther("5"),
    //   });
    // };

    // if (address && address !== lastAddress.current) {
    //   lastAddress.current = address;
    //   sendFund(address as `0x${string}`);
    // }
  }, [address]);

  // solves hydration errors with wagmi
  useEffect(() => setIsReady(true), []);
  if (!isReady) return null;

  function setResponse(responseBytes: string) {
    setResponseBytes(responseBytes);
    if (appState !== 2) {
      setAppState(APP_STATES.receivedProof);
    }
  }

  // This function is called when the user is redirected from the Sismo Vault to the Sismo Connect app
  // It is called with the responseBytes returned by the Sismo Vault
  // The responseBytes is a string that contains plenty of information about the user proofs and additional parameters that should hold with respect to the proofs
  // You can learn more about the responseBytes format here: https://docs.sismo.io/build-with-sismo-connect/technical-documentation/client#getresponsebytes
  // async function claimWithSismo(responseBytes: string) {
  //   setAppState(APP_STATES.claimingNFT);
  //   // switch the network
  //   await switchNetwork(userChain);
  //   try {
  //     const tokenId = await callContract({
  //       contractAddress,
  //       responseBytes,
  //       userChain,
  //       address: address as `0x${string}`,
  //       publicClient,
  //       walletClient,
  //     });
  //     // If the proof is valid, we update the user react state to show the tokenId
  //     setTokenId({ id: tokenId });
  //   } catch (e) {
  //     setContractError(handleVerifyErrors(e));
  //   } finally {
  //     setAppState(APP_STATES.init);
  //   }
  // }

  console.log("Response Byte", responseBytes);
  console.log("config", sismoConnectConfig);

  return (
    <>
      <BackButton />
      <div className="container">
        {!tokenId && (
          <>
            <h1 style={{ marginBottom: 10 }}>Angels</h1>
            {address && isReady ? (
              <p style={{ marginBottom: 40 }}></p>
            ) : (
              <div>
                {connectors.map((connector) => (
                  <button
                    disabled={!connector.ready}
                    key={connector.id}
                    onClick={() => {
                      router.push("/angels");
                      connect({ connector });
                    }}
                    className="wallet-button"
                  >
                    Connect Wallet
                    {!connector.ready && " (unsupported)"}
                    {isLoading && connector.id === pendingConnector?.id && " (connecting)"}
                  </button>
                ))}

                {error && <div>{error.message}</div>}
              </div>
            )}

            {
              // This is the Sismo Connect button that will be used to create the requests and redirect the user to the Sismo Vault app to generate the proofs from his data
              // The different props are:
              // - config: the Sismo Connect client config that contains the Sismo Connect appId
              // - auths: the auth requests that will be used to generate the proofs, here we only use the Vault auth request
              // - signature: the signature request that will be used to sign an arbitrary message that will be checked onchain, here it is used to sign the airdrop address
              // - onResponseBytes: the callback that will be called when the user is redirected back from the his Sismo Vault to the Sismo Connect App with the Sismo Connect response as bytes
              // - verifying: a boolean that indicates if the Sismo Connect button is in the verifying state
              // - callbackPath: the path to which the user will be redirected back from the Sismo Vault to the Sismo Connect App
              // You can see more information about the Sismo Connect button in the Sismo Connect documentation: https://docs.sismo.io/build-with-sismo-connect/technical-documentation/react
            }
            {!contractError &&
              isConnected &&
              appState != APP_STATES.receivedProof &&
              appState != APP_STATES.claimingNFT && (
                <SismoConnectButton
                  // the client config created
                  config={sismoConnectConfig}
                  // the auth request we want to make
                  // here we want the proof of a Sismo Vault ownership from our users
                  auths={[{ authType: AuthType.VAULT }]}
                  claim={{ groupId: "0x3497b46c5dcd30bf8ee001fe3fdd0acd" }}
                  // we ask the user to sign a message
                  // it will be used onchain to prevent front running
                  //   signature={{ message: signMessage(address) }}
                  // onResponseBytes calls a 'setResponse' function with the responseBytes returned by the Sismo Vault
                  onResponseBytes={(responseBytes: string) => setResponse(responseBytes)}
                  // Some text to display on the button
                  text={"Connect with Sismo"}
                />
              )}

            {/** Simple button to call the smart contract with the response as bytes */}
            {/* {appState == APP_STATES.receivedProof && (
              <button
                className="wallet-button"
                onClick={async () => {
                  await claimWithSismo(responseBytes);
                }}
                value="Move funds"
              >
                {" "}
                Move funds{" "}
              </button>
            )} */}
            {/* {appState == APP_STATES.claimingNFT && (
              <p style={{ marginBottom: 40 }}>Claiming NFT...</p>
            )} */}
          </>
        )}

        {/* {tokenId && (
          <>
            <h1>Airdrop claimed!</h1>
            <p style={{ marginBottom: 20 }}>
              The user has chosen an address to receive the airdrop
            </p>
            <div className="profile-container">
              <div>
                <h2>NFT Claimed</h2>
                <b>tokenId: {tokenId?.id}</b>
                <p>Address used: {address}</p>
              </div>
            </div>
          </>
        )} */}

        {/* {contractError !== "" && (
          <>
            {contractError === "Airdrop already claimed!" ? (
              <h2>{contractError}</h2>
            ) : (
              <h4>{contractError}</h4>
            )}
          </>
        )} */}
      </div>

      {isConnected && (
        <button
          className="wallet-button wallet-button--disconnect"
          onClick={() => {
            disconnect();
            // setTokenId(undefined);
            setContractError("");
            // setAppState(APP_STATES.init);
          }}
        >
          Disconnect
        </button>
      )}
    </>
  );
}
