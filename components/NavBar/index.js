import styles from "./NavBar.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
// import Link from "next/link";
import { useState, useEffect } from "react";
import netflixLogo from "../../public/static/netflix.svg";
import DropDownIcon from "../../public/static/dropDown.png";
import { magicLinkMetaData, signOut } from "../../lib/magic-Link/index";

const NavBar = () => {
  const [username, setUsername] = useState("");

  const router = useRouter();

  const [navDropDown, setNavDropDown] = useState(false);

  useEffect(async () => {
    const data = await magicLinkMetaData();
    console.log({data})
    if (data) {
      setUsername(data.email);
    }
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

  async function handleSignOut(e) {
    e.preventDefault();
    signOut();
    router.push("/login");
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
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
