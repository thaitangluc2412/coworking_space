import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth-context";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "../components/button/Button";
import Field from "../components/field/Field";
import Input from "../components/input/Input";
import Label from "../components/label/Label";
import { FaUserAlt } from "react-icons/fa";
import http from "../config/axiosConfig";
import Statics from "../components/statics/Statics";
const schema = yup.object({
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Please enter your email"),
  name: yup.string().required("Please enter your firstName"),
  phone: yup.string().matches(/^\d+$/, "Phone must be number"),
  //   password: yup
  //     .string()
  //     .required("Please enter your password")
  //     .min(8, "min 8")
  //     .max(20),
});
const UserPage = () => {
  const [changePassword, setChangePassword] = useState(false);
  const [edit, setEdit] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useAuth();

  const {
    handleSubmit,
    control,
    getValues,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      password: "",
    },
  });
  const watchpasswordConfirm = watch("passwordConfirm");
  useEffect(() => {
    reset({
      name: user.customerName,
      email: user.email,
      phone: user.phoneNumber,
    });
  }, [reset, user]);
  useEffect(() => {
    const errorsList = Object.values(errors);
    if (errorsList.length > 0) {
      toast.error(errorsList[0]?.message);
    }
  }, [errors]);

  const onSubmit = async (values) => {
    setIsLoading(true);
    let customer = {};
    if (getValues("password")) {
      customer = {
        id: user.id,
        customerName: values.name,
        phoneNumber: values.phone,
        email: values.email,
        password: values.password,
      };
    } else {
      customer = {
        id: user.id,
        customerName: values.name,
        phoneNumber: values.phone,
        email: values.email,
      };
    }
    try {
      await http.put(`customers/${user.id}`, customer);

      const newUser = await (await http.get(`customers/me`)).data;
      setUser(newUser);
      reset({
        name: newUser.customerName,
        email: newUser.email,
        phone: newUser.phoneNumber,
      });
      toast.success("Update success");
    } catch (error) {
      console.log(error);
      toast.error("error");
    }
    setEdit(true);
    setIsLoading(false);
  };
  return (
    <div className="p-8 w-full">
      <div className="flex flex-row items-center gap-8">
        <div className="w-20 h-20">
          <FaUserAlt className="w-full h-full text-primary" />
        </div>
        <h1 className="font-semibold text-2xl text-primary">{user?.email}</h1>
        <div className="ml-auto">
          <Button
            onClick={() => {
              setEdit(!edit);
            }}
          >
            Edit
          </Button>
        </div>
      </div>
      <div className="w-full flex flexr-row">
        <form
          className="w-[60%] max-w-[1000px] mt-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full max-w-[500px] grid grid-cols-3 gap-3 items-center mb-10">
            <Label name="name">Name:</Label>
            <div className="col-span-2">
              <Input
                type="text"
                name="name"
                control={control}
                edit={edit}
              ></Input>
            </div>

            <Label name="email" className="email">
              Email:
            </Label>
            <div className="col-span-2">
              <Input
                type="email"
                name="email"
                control={control}
                edit={edit}
                readOnly={true}
              ></Input>
            </div>

            <Label name="phone">Phone Number:</Label>
            <div className="col-span-2">
              <Input
                type="text"
                name="phone"
                control={control}
                edit={edit}
              ></Input>
            </div>
          </div>
          {!edit && (
            <>
              <span
                onClick={() => setChangePassword(!changePassword)}
                className="px-2 py-2 border inline-block rounded-md cursor-pointer mb-4 border-primary"
              >
                Change Password
              </span>
              {changePassword && (
                <div className="w-full grid grid-cols-1 gap-4 max-w-[500px]">
                  <Field row={true}>
                    <Label name="password">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      control={control}
                    ></Input>
                  </Field>
                  <Field row={true}>
                    <Label name="passwordConfirm">Password Confirm</Label>
                    <Input
                      type="password"
                      name="passwordConfirm"
                      control={control}
                    ></Input>

                    {getValues("password") &&
                      watchpasswordConfirm !== getValues("password") && (
                        <div className="text-red-500">Not match</div>
                      )}
                  </Field>
                </div>
              )}
              <div className="">
                <Button type="submit" isLoading={isLoading}>
                  Submit
                </Button>
              </div>
            </>
          )}
        </form>
        <div className="w-[40%] h-[500px]">
          <Statics></Statics>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
