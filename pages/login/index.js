import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/login.module.css";
import netflixLogo from "../../public/static/netflix.svg";
import { useState } from "react";
import clsx from "classnames";
import { useRouter } from "next/router";

const regex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const Login = function () {
  const [isValid, SetIsValid] = useState(false);
  const [userMsg, setUserMsg] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  function handleOnChange(e) {
    console.log("event", e.target.value);
    const email = e.target.value;
    validateEmail(email);
    setEmail(email);
  }

  function validateEmail(email) {
    if (regex.test(email)) {
      SetIsValid(true);
    } else {
      SetIsValid(false);
    }
  }

  function handleLogin(e) {
    e.preventDefault();

    if (isValid && email) {
      setUserMsg("welcome")
      // console.log(userMsg);
      router.push("/");
    } else if (!isValid) {
      setUserMsg("invalid Email address");
      // console.log(userMsg);
      setEmail("");
    }
  }

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
          <button
            onClick={handleLogin}
            className={clsx(styles.loginBtn, !email && styles.disabled)}
            disabled={!email}
          >
            SignIn
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
