import { useState } from "react";
import Usercontext from "./Usercontext.js";

const Usercontextprovider = ({ children }) => {
  const [quiztype, setQuiztype] = useState("");
  const [inputdata, setInputdata] = useState("");
  const [optiontype, setOptiontype] = useState("text");
  const [quizcreated, setQuizcreated] = useState(false);
  const [updatequiz, setUpdatequiz] = useState("");
  const [modal, setShowmodal] = useState("");
  const [editItem, setEditItem] = useState("");
  const [isedit, setisEdit] = useState("");
  return (
    <Usercontext.Provider
      value={{
        quiztype,
        setQuiztype,
        inputdata,
        setInputdata,
        optiontype,
        setOptiontype,
        quizcreated,
        setQuizcreated,
        modal,
        setShowmodal,
        updatequiz,
        setUpdatequiz,
        editItem,
        setEditItem,
        isedit,
        setisEdit,
      }}
    >
      {children}
    </Usercontext.Provider>
  );
};

export default Usercontextprovider;
