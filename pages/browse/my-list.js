import NavBar from "../../components/NavBar";
import Head from "next/head";
import SectionCard from "../../components/Card/SectionCard";
import styles from "../../styles/myList.module.css";
import { myFavoriteVideos } from "../../lib";
import { verifyUser } from "../../lib/utils/verifyUser";

export async function getServerSideProps(context) {
  const { token, userId } = await verifyUser(context);
  const myListVideos = await myFavoriteVideos(userId, token);

  if (!token) {
    return {
      props: {},
      redirect: {
        destination: "/login", // using next.js middleware instead of this
        permanent: false,
      },
    };
  }

  return {
    props: { myListVideos },
  };
}

function myList({ myListVideos }) {
  return (
    <div>
      <Head>
        <title>My List</title>
      </Head>
      <main className={styles.main}>
        <NavBar />
        <div className={styles.sectionWrapper}>
          <SectionCard title="My List" videos={myListVideos} size="small" wrap/>
        </div>
      </main>
    </div>
  );
}

export default myList;
