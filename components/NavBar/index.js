import styles from "./NavBar.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect } from "react";
import netflixLogo from "../../public/static/netflix.svg";
import DropDownIcon from "../../public/static/dropDown.png";
import { magicLinkMetaData, signOut } from "../../lib/magic-client/index";

const NavBar = () => {
  const [username, setUsername] = useState("");
  const [dIdToken, setDidToken] = useState("");

  const router = useRouter();

  const [navDropDown, setNavDropDown] = useState(false);

  useEffect(() => {
    async function getToken() {
      const dIdToken = await magicLinkMetaData();
      if (dIdToken) {
        setUsername(dIdToken.email);
        setDidToken(dIdToken);
      }
    }
    getToken()
  }, []);

  const handleOnclickHome = (e) => {
    e.preventDefault();
    router.push("/");
  };
  const handleOnclickMyList = (e) => {
    e.preventDefault();
    router.push("/browse/my-list");
  };

  const handleDropDown = () => {
    setNavDropDown(!navDropDown);
  };

  const handleSignOut = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${dIdToken}`,
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();
    } catch (error) {
      console.error("Error logging out", error);
      router.push("/login");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href="/">
          <a className={styles.logoLink}>
            <div className={styles.logoWrapper}>
              <Image
                src={netflixLogo}
                width="128px"
                height="34px"
                alt="netflix logo"
              />
            </div>
          </a>
        </Link>
        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnclickHome}>
            Home
          </li>
          <li className={styles.navItem2} onClick={handleOnclickMyList}>
            List
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button onClick={handleDropDown} className={styles.usernameBtn}>
              <p className={styles.username}>{username}</p>
              <Image
                src={DropDownIcon}
                width={24}
                height={24}
                alt="expand-Icon"
              />
            </button>
            {navDropDown && (
              <div className={styles.navDropDown}>
                <div>
                  <a className={styles.linkName} onClick={handleSignOut}>
                    Log Out
                  </a>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
