import React from "react";
import styles from "./Dashboard.module.css";
import TrendingCard from "../../../components/Trendingcard/TrendingCard";
import { getstats } from "../../../api/User.api";
import { useEffect, useState } from "react";
const Dashboard = () => {
  const arr = [1, 2, 2, 2, 2, 2, 2, 2, 2, 22, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getstats();
        setData(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.statsContainer}>
        <div className={`${styles.total} ${styles.totalQuiz}`}>
          <p className={styles.totalNumber}>{data?.stats?.totalquiz}</p>
          <p>Quiz created</p>
        </div>
        <div className={`${styles.total} ${styles.totalQuestion}`}>
          <p className={styles.totalNumber}>{data?.stats?.totalQuestions}</p>
          <p>Questions created</p>
        </div>
        <div className={`${styles.total} ${styles.totalImpression}`}>
          <p className={styles.totalNumber}>{data?.stats?.totalImpressions}</p>
          <p>Total Impressions</p>
        </div>
      </div>
      <h1 className={styles.heading}>Trending Quizzes</h1>
      {loading ? (
        <div>
          <p>loading...</p>
        </div>
      ) : (
        <div className={styles.trendingContainer}>
          {data?.trendingItems.length === 0 ? (
            <p style={{ color: "#ff5d01" }}>No trending quiz</p>
          ) : (
            data?.trendingItems.map((item, idx) => <TrendingCard item={item} />)
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
