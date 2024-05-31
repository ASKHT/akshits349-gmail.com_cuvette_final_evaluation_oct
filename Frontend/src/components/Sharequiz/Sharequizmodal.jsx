import React from "react";
import Modal from "../Modal/Modal.jsx";
import { useContext } from "react";
import Usercontext from "../../Context/Usercontext.js";
const Sharequizmodal = ({ shareid }) => {
    const { modal, setShowmodal } = useContext(Usercontext);
  return (
    <Modal>
      <div>
        sharequiz
        <div>
          <p>Congrats your Quiz is</p>
          <p>Published</p>
        </div>
        <div>
          <p>Your link is here</p>
        </div>
        <div>
          <button>Share</button>
        </div>
      </div>
    </Modal>
  );
};

export default Sharequizmodal;
