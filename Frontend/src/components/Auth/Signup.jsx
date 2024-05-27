import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import styles from "./styles/Common.module.css";
import { useState } from "react";
import * as Yup from "yup";
import { register } from "../../api/Auth.api";
const Signup = ({ setLogin }) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be less than 20 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), userInfo.password], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
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
      const data = await register(userInfo);
      if (data?.token) {
        navigate("/auth");
        setLogin(true);
        // toast.success("you have sucessfully registered please login now!");
      } else {
        return;
      }
      // navigate("/");
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
          <div className={styles.inputTitle}>Name</div>
          <div className={styles.errorcolumn}>
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleInputChange}
              className={`${styles.input} ${errors.name && styles.inputError}`}
            />
            {errors.name && <div className={styles.error}>{errors.name}</div>}
          </div>
        </div>
        <div className={styles.inputEntry}>
          <div className={styles.inputTitle}>Email</div>
          <div className={styles.errorcolumn}>
            <input
              type="text"
              name="email"
              value={userInfo.email}
              onChange={handleInputChange}
              className={`${styles.input} ${errors.email && styles.inputError}`}
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
              onChange={handleInputChange}
              className={`${styles.input} ${
                errors.password && styles.inputError
              }`}
            />
            {errors.password && (
              <div className={styles.error}>{errors.password}</div>
            )}
          </div>
        </div>
        <div className={styles.inputEntry}>
          <div className={styles.inputTitle}>Confirm Password</div>
          <div className={styles.errorcolumn}>
            <input
              type="password"
              name="confirmPassword"
              value={userInfo.confirmPassword}
              onChange={handleInputChange}
              className={`${styles.input} ${
                errors.confirmPassword && styles.inputError
              }`}
            />
            {errors.confirmPassword && (
              <div className={styles.error}>{errors.confirmPassword}</div>
            )}
          </div>
        </div>

        <button className={styles.button} onClick={handleSubmit}>
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Signup;
