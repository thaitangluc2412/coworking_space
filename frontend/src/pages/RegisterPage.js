import React from "react";
import { useForm } from "react-hook-form";
import Button from "../components/button/Button";
import Field from "../components/field/Field";
import Input from "../components/input/Input";
import Label from "../components/label/Label";

const RegisterPage = () => {
  const { handleSubmit, control, formState, watch } = useForm({});
  const onSubmit = (e) => {
    console.log("sign up");
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
            <Label name="fullname">Fullname</Label>
            <Input
              type="text"
              name="fullname"
              placeholder="Enter your fullname"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label name="number">Phone number</Label>
            <Input
              type="text"
              name="number"
              placeholder="Enter your phone number"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label name="username">Username</Label>
            <Input
              type="email"
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
          <div className="w-full flex justify-center">
            <Button styleClass="w-[30%]">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
