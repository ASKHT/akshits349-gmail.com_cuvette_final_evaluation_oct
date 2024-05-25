import React, { useState } from "react";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import styles from "./styles/Common.module.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));

    // Trigger validation for the changed field
    validateField(name, value);
  };

  const validateField = async (fieldName, value) => {
    try {
      await Yup.reach(validationSchema, fieldName).validate(value);
      setErrors((prev) => ({ ...prev, [fieldName]: "" }));
    } catch (error) {
      setErrors((prev) => ({ ...prev, [fieldName]: error.message }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(userInfo, { abortEarly: false });
      // console.log(userInfo);
    } catch (validationErrors) {
      const formattedErrors = {};
      validationErrors.inner.forEach((error) => {
        formattedErrors[error.path] = error.message;
      });
      setErrors(formattedErrors);
      Object.values(formattedErrors).forEach((errorMessage) => {
        toast.error(errorMessage);
      });
    }
  };

  return (
    <div className={styles.formWrapper}>
      <div className={styles.Form}>
        <div className={styles.inputEntry}>
          <div className={styles.inputTitle}>Email</div>
          <div className={styles.errorcolumn}>
            <input
              type="text"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              className={errors.email ? styles.inputError : ""}
            />
            {errors.email && <div className={styles.error}>{errors.email}</div>}
          </div>
        </div>
        <div className={styles.inputEntry}>
          <div className={styles.inputTitle}>Password</div>
          <div className={styles.errorcolumn}>
            <input
              type="password"
              name="password"
              value={userInfo.password}
              onChange={handleChange}
              className={errors.password ? styles.inputError : ""}
            />
            {errors.password && (
              <div className={styles.error}>{errors.password}</div>
            )}
          </div>
        </div>

        <button className={styles.button} onClick={handleSubmit}>
          Log in
        </button>
      </div>
    </div>
  );
};

export default Login;
