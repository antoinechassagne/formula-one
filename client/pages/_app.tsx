import BaseHeader from "../components/BaseHeader";
import "../styles/index.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <BaseHeader />
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}
