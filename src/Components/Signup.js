import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { SignupValidation } from "../ValidationSchema/Signup";

export default function Signup() {
  const initialValues= {
    Name: "",
    UserName: "",
    Email: "",
    Password: "",
  }

  const history = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: SignupValidation,
      onSubmit: async (values, action) => {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/createUser`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );
        const json = await response.json();
        console.log(json.token);
        if (json.success) {
          alert("User created successfully!");
          localStorage.setItem("token", json.token);
          history("/");
        } else {
          alert(json.message);
        }
        console.log(
          "🚀 ~ file: Registration.jsx ~ line 11 ~ Registration ~ values",
          values
        );
        action.resetForm();
      },
    });
  console.log(
    "🚀 ~ file: Registration.jsx ~ line 25 ~ Registration ~ errors",
    errors
  );

  return (
    <div className="container my-3">
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label for="exampleInputEmail1">Name</label>
          <input
            type="text"
            class="form-control"
            id="Name"
            described="Name"
            name="Name"
            placeholder="Enter name"
            value={values.Name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
           {errors.Name && touched.Name ? (
                      <p className="form-error text-danger">{errors.Name}</p>
                    ) : null}
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Username</label>
          <input
            type="text"
            class="form-control"
            id="UserName"
            described="UserName"
            name="UserName"
            placeholder="Enter user name"
            value={values.UserName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
           {errors.UserName && touched.UserName ? (
                      <p className="form-error text-danger">{errors.UserName}</p>
                    ) : null}
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Email</label>
          <input
            type="email"
            class="form-control"
            id="Email"
            described="Email"
            name="Email"
            placeholder="Enter email"
            value={values.Email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
           {errors.Email && touched.Email ? (
                      <p className="form-error text-danger">{errors.Email}</p>
                    ) : null}
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Password</label>
          <input
            type="password"
            class="form-control"
            id="Password"
            name="Password"
            described="Password"
            placeholder="Enter password"
            value={values.Password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
           {errors.Password && touched.Password ? (
                      <p className="form-error text-danger">{errors.Password}</p>
                    ) : null}
        </div>
        <button type="submit" class="btn btn-primary">
          Signup
        </button>
      </form>
    </div>
  );
}
