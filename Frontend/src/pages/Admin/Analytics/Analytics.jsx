import React, { useState, useEffect, useContext } from "react";
import styles from "./Analytics.module.css";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaShareNodes } from "react-icons/fa6";
import { userpollandquiz } from "../../../api/User.api";
import Usercontext from "../../../Context/Usercontext";
import Quizform from "../Quizform/Quizform";
import Pollform from "../Pollform/Pollform";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DeleteModal from "../../deletemodal/DeleteModal";
// import { questionanalysis } from "../../../api/User.api";
import Sharequizmodal from "../../../components/Sharequiz/Sharequizmodal";
const Analytics = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const {
    quizcreated,
    modal,
    setShowmodal,
    editItem,
    setEditItem,
    isedit,
    setisEdit,
    deletequiz,
    setDeletequiz,
    setQuizcreated,
    shareid,
    setShareid,
  } = useContext(Usercontext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await userpollandquiz();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [quizcreated, deletequiz]);

  const formatDate = (createdAt) => {
    return new Date(createdAt).toLocaleDateString("en-IN", {
      year: "numeric",
      day: "numeric",
      month: "short",
    });
  };
  const [showDeleteModal, setShowDeleteModal] = useState({
    type: "",
    id: "",
    status: false,
  });

  const handleEdit = (item) => {
    if (item.category === "Q&A") {
      setShowmodal("Q&A");
      setEditItem(item);
      setisEdit("edit");
      // console.log(editItem);
    } else if (item.category === "poll") {
      setShowmodal("Poll");
      setEditItem(item);
      setisEdit("edit");
      // console.log(item);
    }
  };
  const copylinkid = (id) => {
    // navigate(`/quiz/${id}`);
    navigator.clipboard.writeText(`http://localhost:5173/quiz/${id}`);
    toast.success("link copied");
  };
  const handledelete = ({ status, type, id }) => {
    setShowDeleteModal({
      type: type,
      id: id,
      status: status,
    });
    setDeletequiz(true);
  };
  const questionwiseanalysis = async (id) => {
    navigate(`/analysis/${id}`);
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
                <td className="">{item.impression}</td>
                <td className={styles.userAction}>
                  <FiEdit
                    className={styles.edit}
                    onClick={() => handleEdit(item)}
                  />
                  <RiDeleteBin6Fill
                    className={styles.delete}
                    onClick={() =>
                      handledelete({
                        status: true,
                        type: item.category,
                        id: item._id,
                      })
                    }
                  />
                  <FaShareNodes
                    className={styles.share}
                    onClick={() => copylinkid(item._id)}
                  />
                </td>
                <td
                  className={styles.analysis}
                  onClick={() => questionwiseanalysis(item._id)}
                >
                  Question with Analysis
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal === "Q&A" && <Quizform prefilldata={editItem} />}
      {modal === "Poll" && <Pollform prefilldata={editItem} />}
      {showDeleteModal.status && (
        <DeleteModal
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
      {shareid === "share" && <Sharequizmodal />}
    </div>
  );
};

export default Analytics;
