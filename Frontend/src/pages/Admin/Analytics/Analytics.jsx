import React from "react";
import edit from "../../../assets/edit.svg";
import remove from "../../../assets/delete.svg";
import share from "../../../assets/share.svg";
import styles from "./Analytics.module.css";
const Analytics = () => {
  const analyticsData = [1, 3, 4];
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.quizheading}>Quiz Analysis</h1>
      <div className={styles.tablewrapper}>
        <table>
          <thead>
            <tr>
              <th scope="col">S.No.</th>
              <th scope="col">Quiz Name</th>
              <th scope="col">Created On</th>
              <th scope="col">Impression</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Quiz name</td>
              <td>23 April 2023</td>
              <td>0</td>
              <td>
                <img src={edit} alt="edit" />
                <img src={remove} alt="remove" />
                <img src={share} alt="share" />
              </td>
              <td>Question with Analysis</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Analytics;
