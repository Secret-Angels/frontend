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
import AddressSaver from "@/components/addressSaver";
// import { devGroups } from "../config";
// import { polygon } from "viem/chains";

export default function AngelsIdentification() {
    const [isReady, setIsReady] = useState(false);
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


    }, [address]);

    // solves hydration errors with wagmi
    useEffect(() => setIsReady(true), []);
    if (!isReady) return null;



    return (
        <>
            <BackButton />
            <div className="container">
                {!tokenId && (
                    <>
                        <h1 style={{ marginBottom: 10 }}>Wards</h1>
                        {address && isReady ? (
                            <AddressSaver />
                        ) : (
                            <div>
                                {connectors.map((connector) => (
                                    <button
                                        disabled={!connector.ready}
                                        key={connector.id}
                                        onClick={() => {
                                            router.push("/ward");
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

                    </>
                )}
            </div>

            {isConnected && (

                <div>

                    <button
                        className="wallet-button wallet-button--disconnect"
                        onClick={() => {
                            disconnect();
                            setContractError("");
                        }}
                    >
                        Disconnect
                    </button>

                </div>
            )}
        </>
    );
}
