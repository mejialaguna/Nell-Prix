import styles from "./SectionCard.module.css";
import Card from "../index";
import img from "../../../public/static/Demon-Slayer.png"

const SectionCard = (props) => {
const { title } = props

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        <Card id="0" imgUrl={img} size="large" />
        <Card imgUrl={img} size="large" />
        <Card imgUrl={img} size="large" />
        <Card imgUrl={img} size="large" />
        <Card imgUrl={img} size="large" />
        <Card imgUrl={img} size="large" />
        <Card imgUrl={img} size="large" />
        <Card imgUrl={img} size="large" />
        <Card imgUrl={img} size="large" />
        <Card imgUrl={img} size="large" />
      </div>
    </section>
  );
};

export default SectionCard;
