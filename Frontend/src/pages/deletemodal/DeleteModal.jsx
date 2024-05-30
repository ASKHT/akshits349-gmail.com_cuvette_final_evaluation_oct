import { deletePollApi } from "../../api/Poll.api";
import { deleteQuizApi } from "../../api/Quiz.api";
import Modal from "../../components/Modal/Modal";
import styles from "./Delete.module.css";

const DeleteModal = ({ showDeleteModal, setShowDeleteModal }) => {
  const handleDelete = () => {
    if (showDeleteModal.type === "qa") {
      deleteQuizApi(showDeleteModal.id);
    } else {
      deletePollApi(showDeleteModal.id);
    }

    setShowDeleteModal({
      type: "",
      id: "",
      status: false,
    });
  };

  return (
    <Modal>
      <div className={styles.container}>
        <h1 className="">Are you confirm you want to delete ?</h1>
        <div className={styles.btnContainer}>
          <button className={styles.confirm} onClick={handleDelete}>
            Confirm Delete
          </button>
          <button
            className={styles.cancel}
            onClick={() =>
              setShowDeleteModal({ ...showDeleteModal, status: false })
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default DeleteModal;