import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/login.module.css";
import netflixLogo from "../../public/static/netflix.svg";
import { useState } from "react";
import cls from "classnames";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { magicLink } from "../../lib/magic-Link/index";
import Loading from "../../components/Loading";
import { isLoggedIn } from "../../lib/magic-Link/index";

const regex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const Login = function () {
  const [loading, setLoading] = useState(false);
  const [isValid, SetIsValid] = useState(false);
  const [userMsg, setUserMsg] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  function handleOnChange(e) {
    const email = e.target.value;
    validateEmail(email);
    setEmail(email);
    setUserMsg("");
  }

  function validateEmail(email) {
    if (regex.test(email)) {
      SetIsValid(true);
    } else {
      SetIsValid(false);
    }
  }

  async function handleLogin(e) {
    e.preventDefault();

    if (isValid && email) {
      // log in a user by their email
      setLoading(true);
      const dIdToken = await magicLink(email);
      if (dIdToken) {
        router.push("/");
      }
    } else if (!isValid) {
      setUserMsg("invalid Email address");
      setEmail("");
      setLoading(false)
    }
  }


  // useEffect(() => {
  //   const loggedIn = isLoggedIn();
  //   if (loggedIn) {
  //     router.back();
  //   }
  // }, [])
  


  useEffect(() => {
    function handleComplete() {
      setLoading(false)
    }
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    }
  }, [router])
  
 
  

  return (
    <div className={styles.container}>
      <Head>
        <title> Netflix SignIn</title>
      </Head>

      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <a className={styles.logoLink} href="/">
            <div className={styles.logoWrapper}>
              <Image
                src={netflixLogo}
                width="128px"
                height="34px"
                alt="netflix logo"
              />
            </div>
          </a>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signInHeader}> Sign In</h1>
           <input
            onChange={handleOnChange}
            label="Email Address"
            name="Email Address"
            value={email}
            className={styles.emailInput}
            type="text"
            placeholder="Email address"
          />
          <p className={styles.userMsg}> {userMsg}</p>
          {loading ? (
            <Loading /> 
            
          ) : (
          <button
              onClick={handleLogin}
              className={cls(styles.loginBtn, !email && styles.disabled)}
              disabled={!email}
            >
              Sign In
            </button>
              
          )}
        </div>
      </main>
    </div>
  );
};

export default Login;


 