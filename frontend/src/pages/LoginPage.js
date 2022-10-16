import React from "react";
import { useForm } from "react-hook-form";
import Button from "../components/button/Button";
import Field from "../components/field/Field";
import Input from "../components/input/Input";
import Label from "../components/label/Label";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { NavLink } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const schema = yup
    .object({
      email: yup
        .string()
        .email("Please enter valid email address")
        .required("Please enter your email address"),
      password: yup
        .string()
        .min(2, "Your password must be at least 8 characters or greater")
        .required("Please enter your password"),
    })
    .required();
  const {
    handleSubmit,
    control,
    formState: { errors },
    // watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (e) => {
    login(e);
  };

  function login(value) {
    axios
      .post("auth/login", value)
      .then((res) => {
        console.log("login success: ", res);
        localStorage.setItem("token", res.data.token);
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  }

  // function get  room status when login success!
  // move this function when UI Success!
  const getRoomStatus = () => {
    const token = localStorage.getItem("token");
    axios
      .get("roomStatuses", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        console.log("response: ", res);
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  }
  return (
    <div className="minH-[100vh] h-[100vh] w-full flex justify-center items-center bg-grayLight">
      <div className="w-[70%] h-[90%] shadow-2xl flex flex-row bg-white">
        <div className="w-[50%] h-[100%] ">
          <img
            src="https://images.unsplash.com/photo-1661961112134-fbce0fdf3d99?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-[50%] h-[100%] flex flex-col px-8 justify-center">
          <h1 className="font-bungee text-5xl text-center mb-7 text-primary">
            Coworking
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Field>
              <Label name="username">Email</Label>
              <Input
                type="text"
                name="email"
                placeholder="Enter your email"
                control={control}
              ></Input>
              {errors.email && (
                <p className="text-sm text-red-500 color-red">
                  {errors.email.message}
                </p>
              )}
            </Field>
            <Field>
              <Label name="password">Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="Enter your password"
                control={control}
              ></Input>
              {errors.password && (
                <p className="text-sm text-red-500 color-red">
                  {errors.password.message}
                </p>
              )}
            </Field>
            <div className="w-full flex justify-center pb-6">
              <Button styleClass="w-[100%]">Sign In</Button>
            </div>
          </form>
          <div className="text-sm flex justify-center text-gray">
            <span className="inline-block mr-1">Don't have an account?</span>
            <NavLink to={"/register"} className="font-semibold cursor-pointer">
              Sign up
            </NavLink>
 {/* delete this code when have UI  */}
            <div className="w-full flex justify-center pb-6">
              <button onClick={() => getRoomStatus()}>
                Get Customer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
