import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {LoginValidation} from '../ValidationSchema/Login';

export default function Login() {
  let history = useNavigate();
  const initialValues = {
    UserName: "",
    Password: "",
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: LoginValidation,
      onSubmit: async (values, action) => {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            UserName: values.UserName,
            Password: values.Password,
          }),
        };
        var response = await fetch(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/login`,
          options
        );
        var json = await response.json();
        console.log(json);
        if (json.status) {
          localStorage.setItem("token", json.userToken);
          alert("Login Successfully");
          history("/");
        }
        if (!json.status) {
          alert(json.message);
        }
        action.resetForm();
      },
    });
  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label for="exampleInputEmail1">Username</label>
          <input
            type="text"
            class="form-control"
            id="UserName"
            name="UserName"
            value={values.UserName}
            described="emailHelp"
            placeholder="Enter username"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.UserName && touched.UserName ? (
            <p className="form-error text-danger">{errors.UserName}</p>
          ) : null}
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control"
            id="Password"
            name="Password"
            value={values.Password}
            placeholder="Password"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.Password && touched.Password ? (
            <p className="form-error text-danger">{errors.Password}</p>
          ) : null}
        </div>
        <button type="submit" class="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}
