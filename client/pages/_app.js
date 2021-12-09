import BaseHeader from "../components/BaseHeader";

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
