import React from "react";
import styles from "./Modal.module.css";
import { IoClose } from "react-icons/io5";
const Modal = ({ children, setShowmodal }) => {
  return (
    <div className={styles.container} onClick={() => setShowmodal("")}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
