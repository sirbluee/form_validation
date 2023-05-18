'use client'
import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

const LoginForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState("");

  const validationSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(8),
    confirmPassword: yup.string().required().oneOf([password]),
    file: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      name,
      email,
      password,
      confirmPassword,
      file,
    },
    validationSchema,
  });

  const handleSubmit = () => {
    // TODO: Submit form data
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={formik.handleChange}
        />
        {formik.errors.name && <p>{formik.errors.name}</p>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={formik.handleChange}
        />
        {formik.errors.email && <p>{formik.errors.email}</p>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={formik.handleChange}
        />
        {formik.errors.password && <p>{formik.errors.password}</p>}
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={confirmPassword}
          onChange={formik.handleChange}
        />
        {formik.errors.confirmPassword && <p>{formik.errors.confirmPassword}</p>}
      </div>
      <div>
        <label htmlFor="file">File</label>
        <input
          type="file"
          name="file"
          id="file"
          onChange={formik.handleChange}
        />
        {formik.errors.file && <p>{formik.errors.file}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginForm;


