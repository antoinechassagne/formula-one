import type { AppProps } from "next/app";
import BaseHeader from "../components/BaseHeader";
import "../styles/index.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <BaseHeader />
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}
