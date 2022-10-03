import React from "react";
import { useForm } from "react-hook-form";
import Button from "../components/button/Button";
import Field from "../components/field/Field";
import Input from "../components/input/Input";
import Label from "../components/label/Label";

const LoginPage = () => {
  const { handleSubmit, control, formState, watch } = useForm({});
  const onSubmit = (e) => {
    console.log("login");
  };
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
              <Label name="username">Username</Label>
              <Input
                type="text"
                name="username"
                placeholder="Enter your username"
                control={control}
              ></Input>
            </Field>
            <Field>
              <Label name="password">Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="Enter your password"
                control={control}
              ></Input>
            </Field>
            <div className="w-full flex justify-center pb-6">
              <Button styleClass="w-[100%]">Sign In</Button>
            </div>
          </form>
          <div className="text-sm flex justify-center text-gray">
            <span className="inline-block mr-1">Don't have an account?</span>
            <span className="font-semibold cursor-pointer">Sign up</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
