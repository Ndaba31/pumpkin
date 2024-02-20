// components/LoginModal.js
import React, { useState } from "react";
import styles from "@/styles/SignupModal.module.css";
import { useDateContext } from "@/context/dateContext";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const LoginModal = ({ isOpen, onClose, openSignUp }) => {
  const { setError, error } = useDateContext();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      const err = "Incorrect Email/Password";
      setError(`Authentication Failed: ${err}`);
    } else {
      setError("");
      router.push("/home");
    }
  };

  return (
    <div
      className={`${styles.modal} ${
        isOpen ? styles.showModal + "display: block" : "display: none"
      }`}
    >
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <h2>Login</h2>
        {error !== "" && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles.formField}>
            <input
              type="email"
              name="email"
              className={styles.input}
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              className={styles.input}
              placeholder="Password"
              value={formData.password}
              required
              onChange={handleChange}
            />
          </div>
          <p className={styles.signupText}>
            Don&apos;t have an account?{" "}
            <span onClick={openSignUp}>Sign Up</span>
          </p>
          <div className={styles.formAction}>
            <button
              type="submit"
              className={styles.createAccountButton + " " + styles.button}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
