import styles from "./Analytics.module.css";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaShareNodes } from "react-icons/fa6";
import { userpollandquiz } from "../../../api/User.api";
import { useEffect, useState, useContext } from "react";
import Usercontext from "../../../Context/Usercontext";
const Analytics = () => {
  const [data, setData] = useState([]);
  const { quizcreated, setQuizCreated } = useContext(Usercontext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await userpollandquiz();
        setData(data);
        // setQuizCreated(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [quizcreated]);
  const formatDate = (createdAt) => {
    const newformat = new Date(createdAt).toLocaleDateString("en-IN", {
      year: "numeric",
      day: "numeric",
      month: "short",
    });

    return newformat;
  };
  return (
    <div className={styles.analyticsContainer}>
      <h1 className={styles.heading}>Quiz Analysis</h1>
      <div className={styles.tablewrapper}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th scope="col" className="px-2 py-3">
                S.No.
              </th>
              <th scope="col" className="px-6 py-3">
                Quiz Name
              </th>
              <th scope="col" className="px-6 py-3">
                Created On
              </th>
              <th scope="col" className="px-6 py-3">
                Impression
              </th>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr className="" key={index}>
                <td scope="row" className="">
                  {index + 1}
                </td>
                <td className="">{item.title}</td>
                <td className="">{formatDate(item.createdAt)}</td>
                <td className="">0</td>
                <td className={styles.userAction}>
                  <FiEdit className={styles.edit} />
                  <RiDeleteBin6Fill className={styles.delete} />
                  <FaShareNodes className={styles.share} />
                </td>
                <td className={styles.analysis}>Question with Analysis</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Analytics;
