import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const buttons_home =
    "w-72 h-20 border rounded-lg flex flex-row items-center justify-center hover:bg-white/10 duration-150";

  return (
    <div className="container">
      <img
        style={{ position: "absolute", right: 0, zIndex: -1 }}
        src="/assets/sismo-landing-art.svg"
        alt="sismo art"
      />
      <h1 className="">Secret Angels</h1>
      <section>
        <ul>
          <button onClick={() => router.push("/angels")} className={buttons_home}>
            <h3 className="">Angels</h3>
            <p></p>
            {/* replace with the title below */}
            {/* <h3>Claim an airdrop anonymously</h3>
            <p>Sign an address with Sismo Connect where you wish to receive the airdrop</p> */}
          </button>
          <button onClick={() => router.push("/ward")} className={buttons_home}>
            <h3>Ward</h3>
            <p></p>
            {/* replace with the title below */}
            {/* <h3>Claim an airdrop anonymously</h3>
            <p>Sign an address with Sismo Connect where you wish to receive the airdrop</p> */}
          </button>
        </ul>
      </section>
    </div>
  );
}
