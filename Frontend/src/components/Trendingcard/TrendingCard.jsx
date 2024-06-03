import { IoEyeSharp } from "react-icons/io5";
import styles from "./TrendingCard.module.css";

const TrendingCard = ({ item }) => {
  // console.log(item);
  const formatDate = (createdAt) => {
    return new Date(createdAt).toLocaleDateString("en-IN", {
      year: "numeric",
      day: "numeric",
      month: "short",
    });
  };
  return (
    <div className={styles.trendingCard}>
      <div className={styles.trendingTop}>
        <h2 className="">{item?.title}</h2>
        <div className={styles.quizImpression}>
          <span className="">{item?.impression}</span>
          <IoEyeSharp className={styles.eyes} />
        </div>
      </div>
      <div className={styles.trendingBottom}>
        <span className="">Created on:</span>
        <span className="">{formatDate(item.createdAt)}</span>
      </div>
    </div>
  );
};
export default TrendingCard;
