import React from "react";
import { useForm } from "react-hook-form";
import Button from "../components/button/Button";
import Field from "../components/field/Field";
import Input from "../components/input/Input";
import Label from "../components/label/Label";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import http from "../config/axiosConfig";

const RegisterPage = () => {
  const navigate = useNavigate();
  const schema = yup
    .object({
      username: yup.string().required("Please enter your username"),
      email: yup
        .string()
        .email("Please enter valid email address")
        .required("Please enter your email address"),
      password: yup
        .string()
        .min(8, "Your password must be at least 8 characters or greater")
        .required("Please enter your password"),
      confirmpassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    })
    .required();
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      username: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmpassword: "",
    },
  });
  const onSubmit = (data) => {
    const customer = {
      email: data.email,
      customerName: data.username,
      phoneNumber: data.phoneNumber,
      password: data.password,
      roleId: "IT04ZnPgBYSf3Qm",
    };
    http
      .post("customers", customer)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    navigate("/");
  };
  return (
    <div className="minH-[100vh] h-[100vh] w-[100%]  pt-10">
      <div className="max-w-[1000px] mx-auto px-5">
        <h1 className="font-bungee text-5xl text-center mb-7 text-primary">
          Coworking
        </h1>
        <form
          className="mx-auto max-w-[600px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Field>
            <Label name="email">Email</Label>
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
            <Label name="username">Username</Label>
            <Input
              type="username"
              name="username"
              placeholder="Enter your username"
              control={control}
            ></Input>
            {errors.username && (
              <p className="text-sm text-red-500 color-red">
                {errors.username.message}
              </p>
            )}
          </Field>
          <Field>
            <Label name="phoneNumber">Phone number</Label>
            <Input
              type="text"
              name="phoneNumber"
              placeholder="Enter your phone number"
              control={control}
            ></Input>
            {errors.username && (
              <p className="text-sm text-red-500 color-red">
                {errors.username.message}
              </p>
            )}
          </Field>
          <Field>
            <Label name="number">Password</Label>
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
          <Field>
            <Label name="number">Confirm password</Label>
            <Input
              type="password"
              name="confirmpassword"
              placeholder="Enter your confirm password"
              control={control}
            ></Input>
            {errors.confirmpassword && (
              <p className="text-sm text-red-500 color-red">
                {errors.confirmpassword.message}
              </p>
            )}
          </Field>
          <div className="w-full flex justify-center gap-10 mb-4">
            <Button styleClass={"w-full"}>Submit</Button>
          </div>
          <div className="text-sm justify-center flex text-grayCustom">
            <span className="inline-block mr-1">Already have an account? </span>
            <NavLink to={"/login"} className="font-semibold cursor-pointer">
              Sign in
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
