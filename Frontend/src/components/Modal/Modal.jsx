import React from "react";
import styles from "./Modal.module.css";
import { IoClose } from "react-icons/io5";
import { useEffect } from "react";
const Modal = ({ children, setShowmodal, setQuiztype, setInputdata }) => {
  const resetquiz = () => {
    setShowmodal("");
    setQuiztype("");
    setInputdata("");
  };

  return (
    <div className={styles.container} onClick={() => resetquiz()}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
