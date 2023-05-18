"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const FILE_SIZE = 1024 * 1024 * 10; // 10MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password must be 6 characters or longer")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
  description: Yup.string().required("Required"),
  file: Yup.mixed()
    .test("fileSize", "File too large", (value) => {
      console.log("value", value);
      if (!value) {
        return true;
      }
      return value.size <= FILE_SIZE;
    }).test("fileFormat", "Unsupported Format", (value) => {
      if (!value) {
        return true;
      }
      return SUPPORTED_FORMATS.includes(value.type);
    }).required("Required")
});
// oneOf([Yup.ref('password'), null], 'Passwords must match') is used to compare the password and confirmPassword fields. Yup.ref('password') is used to reference the password field.
// oneOf is used to compare the password and confirmPassword fields. Yup.ref is used to reference the password field.

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  // handle submit to send data to the server

  const sendToServer = async (values) => {
    setIsLoading(true);
    let { name, email, password, avatar, role } = values;
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      name,
      email,
      password,
      avatar,
      role,
    });

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch("https://api.escuelajs.co/api/v1/users", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setIsLoading(false);
        alert("User created successfully");
        console.log(result);
      })
      .catch((error) => {
        setIsLoading(false);
        alert(error.message);
      });
  };

  const uploadImage = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://api.escuelajs.co/api/v1/files/upload",
        values.file
      );
      console.log(response);
      setIsLoading(false);
      return response.data.location;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "customer",
          description: "",
          file: null,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const formData = new FormData();
          formData.append("file", values.file);

          const avatar = await uploadImage({ file: formData });
          console.log("avatar", avatar);

          values.avatar = avatar;
          setTimeout(() => {

            sendToServer(values);
            setSubmitting(false);
          }, 500);
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <div className="max-w-6xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Form className="flex flex-col items-center justify-center text-white">
              <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
              <div className="flex flex-col mb-4">
                <label htmlFor="name" className="mb-1">
                  Name*
                </label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  className="border border-gray-500 rounded px-4 py-2 text-black" placeholder="Username"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="email" className="mb-1">
                  Email*
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="border border-gray-500 rounded px-4 py-2 text-black" placeholder="name@gmail.com"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="password" className="mb-1">
                  Password*
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="border border-gray-500 rounded px-4 py-2 text-black" placeholder="password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="confirmPassword" className="mb-1">
                  Confirm Password*
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className="border border-gray-500 rounded px-4 py-2 text-black" placeholder="password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="flex flex-col mb-4">
                {/* <label htmlFor="description" className="mb-1">
                  Description*
                </label>
                <Field
                  as="textarea"
                  name="description"
                  id="description"
                  className="border border-gray-500 rounded px-4 py-2 text-black" placeholder="Text somthing"
                /> */}

                <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description*</label>
                <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>

                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="file" className="mb-1">
                  Avatar
                </label>
                <Field
                  type="file"
                  name="file"
                  id="file"
                  setFieldValue={setFieldValue}
                  component={FileUpload}
                  className="border border-gray-500 rounded px-4 py-2 text-black"
                />
                <ErrorMessage
                  name="file"
                  component="div"
                  className="text-red-500"
                />


              </div>
              <button
                disabled={isSubmitting}
                type="submit"
                className={`${isSubmitting
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-700"
                  } text-white font-bold py-2 px-4 rounded`}
              >
                Submit
              </button>
            </Form>
          </div>
        )}
      </Formik>

      {/* Overlay Loading */}
      {isLoading && (
        <section className="absolute w-screen top-0 h-screen bg-center bg-no-repeat bg-opacity-70 bg-gray-700 bg-blend-multiply">
          <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
              Loading...
            </h1>
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4"></div>
          </div>
        </section>
      )}
    </main>
  );
}

function FileUpload({ field, form, setFieldValue }) {
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (event) => {
    const file = event.currentTarget.files[0];
    form.setFieldValue(field.name, file);
    setPreviewImage(URL.createObjectURL(file));
  };

  return (
    <>
      <input
        type="file"
        onChange={handleChange}
        className="border border-gray-500 rounded px-4 py-2 text-black"
      />
      {previewImage && (
        <img src={previewImage} alt="preview" className="mt-4 h-20 w-20" />
      )}
    </>
  );
}
