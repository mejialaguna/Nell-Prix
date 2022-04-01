import styles from "./NavBar.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect } from "react";
import netflixLogo from "../../public/static/netflix.svg";
import DropDownIcon from "../../public/static/dropDown.png";
import { magicLink } from "../../lib/magic-client/index";

const NavBar = () => {
  const [navDropDown, setNavDropDown] = useState(false);
  const [username, setUsername] = useState("");
  const [didToken, setDidToken] = useState("");
  const router = useRouter();

  useEffect(async () => {
    try {
      const { email, issuer } = await magicLink.user.getMetadata();
      const didToken = await magicLink.user.getIdToken();
      if (email) {
        setUsername(email);
        setDidToken(didToken);
      }
    } catch (error) {
      console.error("Error retrieving email", error);
    }
  }, []);

  const handleOnClickHome = (e) => {
    e.preventDefault();
    router.push("/");
  };

  const handleOnClickMyList = (e) => {
    e.preventDefault();
    router.push("/browse/my-list");
  };

  const handleShowDropdown = (e) => {
    e.preventDefault();
    setNavDropDown(!navDropDown);
  };

  const handleSignOut = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${didToken}`,
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
          <li className={styles.navItem} onClick={handleOnClickHome}>
            Home
          </li>
          <li className={styles.navItem2} onClick={handleOnClickMyList}>
            List
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button onClick={handleShowDropdown} className={styles.usernameBtn}>
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