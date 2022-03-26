import "../styles/globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isLoggedIn } from "../lib/magic-Link";
import Loading from "../components/Loading";

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    //helps with my flickering
    function handleComplete() {
      setIsLoading(false);
    }
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return isLoading ? <Loading /> : <Component {...pageProps} />;
}

export default MyApp;
