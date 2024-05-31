import React from "react";
import styles from "./Dashboard.module.css";
import TrendingCard from "../../../components/Trendingcard/TrendingCard";
const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.statsContainer}>
        <div className={`${styles.total} ${styles.totalQuiz}`}>
          <p className={styles.totalNumber}>{0}</p>
          <p>Quiz created</p>
        </div>
        <div className={`${styles.total} ${styles.totalQuestion}`}>
          <p className={styles.totalNumber}>{0}</p>
          <p>Questions created</p>
        </div>
        <div className={`${styles.total} ${styles.totalImpression}`}>
          <p className={styles.totalNumber}>{0}</p>
          <p>Total Impressions</p>
        </div>
      </div>
      <h1 className={styles.heading}>Trending Quizzes</h1>
      <div className={styles.trendingContainer}>
        <TrendingCard />
        <TrendingCard />
        <TrendingCard />
        <TrendingCard />
        <TrendingCard />
        <TrendingCard />
        <TrendingCard />
        <TrendingCard />
        <TrendingCard />
        <TrendingCard />
        <TrendingCard />
        <TrendingCard />
        <TrendingCard />
        <TrendingCard />
        <TrendingCard />
        <TrendingCard />
        <TrendingCard />
        <TrendingCard />
        <TrendingCard />
        <TrendingCard />
        <TrendingCard />
        <TrendingCard />
        <TrendingCard />
        <TrendingCard />
      </div>
    </div>
  );
};

export default Dashboard;
