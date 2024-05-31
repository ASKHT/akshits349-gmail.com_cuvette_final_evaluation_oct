import { IoEyeSharp } from "react-icons/io5";
import styles from "./TrendingCard.module.css";

const TrendingCard = () => {
  return (
    <div className={styles.trendingCard}>
      <div className={styles.trendingTop}>
        <h2 className="">Quiz name</h2>
        <div className={styles.quizImpression}>
          <span className="">3</span>
          <IoEyeSharp className={styles.eyes} />
        </div>
      </div>
      <div className={styles.trendingBottom}>
        <span className="">Created on:</span>
        <span className="">7 Sept 2024</span>
      </div>
    </div>
  );
};
export default TrendingCard;
