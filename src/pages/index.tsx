import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const buttons_home =
    "w-72 h-20 border rounded-lg flex flex-row items-center justify-center hover:bg-white/10 duration-150";

  return (
    <div className="container ">
      <img
        style={{ position: "absolute", right: 0, zIndex: -1 }}
        src="/assets/sismo-landing-art.svg"
        alt="sismo art"
      />
      <h1 className="">Secret Angels</h1>
      <div className="relative">
        <svg
          width="48"
          height="52"
          viewBox="0 0 117 122"
          fill="none"
          className="absolute bottom-0 left-0 "
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.00001 112.5V8.50009C29.5 -31.5 12 93.5001 20.5 103.5C29 113.5 99.5 100.5 111 107.5C120.2 113.1 114.833 119.5 111 122H9.00001C1.80001 122 0.666674 115.667 1.00001 112.5Z"
            fill="url(#paint0_linear_40_10)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_40_10"
              x1="64"
              y1="52.5"
              x2="-19.5"
              y2="158"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#0066FF" />
              <stop offset="1" stop-color="#0066FF" stop-opacity="0" />
            </linearGradient>
          </defs>
        </svg>
        <svg
          width="48"
          height="52"
          viewBox="0 0 117 122"
          fill="none"
          className="absolute top-0 right-0 rotate-180"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.00001 112.5V8.50009C29.5 -31.5 12 93.5001 20.5 103.5C29 113.5 99.5 100.5 111 107.5C120.2 113.1 114.833 119.5 111 122H9.00001C1.80001 122 0.666674 115.667 1.00001 112.5Z"
            fill="url(#paint0_linear_40_10)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_40_10"
              x1="64"
              y1="52.5"
              x2="-19.5"
              y2="158"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#0066FF" />
              <stop offset="1" stop-color="#0066FF" stop-opacity="0" />
            </linearGradient>
          </defs>
        </svg>
        {/* <BorderCorner _className="absolute bottom-0 left-0" /> */}
        <p className="text-center px-5 pt-3">
          Embrace the power of community-driven protection and secure your
          assets like never before.
        </p>
      </div>
      <section>
        <ul>
          <button
            onClick={() => router.push("/angels")}
            className={buttons_home}
          >
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
