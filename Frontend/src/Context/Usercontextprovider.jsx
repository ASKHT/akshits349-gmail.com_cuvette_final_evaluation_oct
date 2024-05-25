import { useState } from "react";
import Usercontext from "./Usercontext.js";

const Usercontextprovider = ({ children }) => {
  const [quiztype, setQuiztype] = useState("");
  const [inputdata, setInputdata] = useState("");
  const [optiontype, setOptiontype] = useState("text");
  return (
    <Usercontext.Provider
      value={{
        quiztype,
        setQuiztype,
        inputdata,
        setInputdata,
        optiontype,
        setOptiontype,
      }}
    >
      {children}
    </Usercontext.Provider>
  );
};

export default Usercontextprovider;
