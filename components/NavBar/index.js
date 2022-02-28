import styles from "./NavBar.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState , useEffect } from "react";
import netflixLogo from "../../public/static/netflix.svg"
import DropDownIcon from "../../public/static/dropDown.png"
import {magicLinkMetaData} from "../../lib/magic-Link/index"

const NavBar = (props) => {
  const { username } = props;

  const router = useRouter();

  const [ navDropDown , setNavDropDown] =  useState(false)


  // useEffect(() => {
  //   magicLinkMetaData();
  // }, [magicLinkMetaData]);
  
  console.log(magicLinkMetaData);

  const handleOnclickHome = (e) => {
    e.preventDefault();
    router.push("/");
  };
  const handleOnclickMyList = (e) => {
    e.preventDefault();
    router.push("/browse/my-list");
  };

  const handleDropDown = () => {
    setNavDropDown(!navDropDown)
  }
  // <img src= />;
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
                  <Link href="/login">
                    <a className={styles.linkName}>Log Out</a>
                  </Link>
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
