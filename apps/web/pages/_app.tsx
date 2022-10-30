import type { AppProps } from "next/app";
import "ui/styles/base.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
