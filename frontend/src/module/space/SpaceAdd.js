import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Field from "../../components/field/Field";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import Dropdown from "../../components/dropdown/Dropdown";
import Select from "../../components/dropdown/Select";
import List from "../../components/dropdown/List";
import Option from "../../components/dropdown/Option";
import useUtilities from "../../hooks/useUtilities";
import { AiFillMinusCircle } from "react-icons/ai";
import Button from "../../components/button/Button";

const schema = yup
  .object({
    name: yup.string().required("Please enter your name location"),
    address: yup.string().required("Please enter your address of location"),
  })
  .required();
const SpaceAdd = () => {
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
    unregister,
    register,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {},
  });
  const { utilities, handleAddUtility, handleClearUtility } =
    useUtilities(unregister);

  const onSubmit = (values) => {
    console.log("values ", values);
  };
  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-10">ADD NEW SPACE</h1>
      <form
        className="w-full grid grid-cols-2 gap-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="">
          <Field>
            <Label name="name" className="name">
              Name
            </Label>
            <Input
              type="text"
              name="name"
              placeholder="Enter name location"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label name="address">Address</Label>
            <Dropdown>
              <Select placeholder={"City"}></Select>
              <List>
                {/* {cities.map((city) => (
                <Option key={city.id} onClick={() => handleClickCity(city)}>
                  {city.name}
                </Option>
              ))} */}
                <Option>Da Nang</Option>
              </List>
            </Dropdown>
            <Dropdown>
              <Select placeholder={"District"}></Select>
              <List>
                {/* {districts.map((district) => (
                <Option
                  key={district.id}
                  onClick={() => handleClickDistrict(district)}
                >
                  {district.name}
                </Option>
              ))} */}
              </List>
            </Dropdown>
            <Dropdown>
              <Select placeholder={"Wards"}></Select>
              {/* <List>
              {wards.map((ward) => (
                <Option key={ward.id} onClick={() => handleClickWard(ward)}>
                  {ward.name}
                </Option>
              ))}
            </List> */}
            </Dropdown>
            <Input
              type="text"
              name="address"
              placeholder="Enter address of location"
              control={control}
            ></Input>
          </Field>
          <h2 className="font-semibold text-xl text-primary mb-5">Price</h2>

          <div className="grid grid-cols-3 gap-3">
            <Field>
              <Label>Year Price</Label>
              <Input type="text" name="yearPrice" control={control}></Input>
            </Field>
            <Field>
              <Label>Month Price</Label>
              <Input type="text" name="monthPrice" control={control}></Input>
            </Field>
            <Field>
              <Label>Day Price</Label>
              <Input type="text" name="dayPrice" control={control}></Input>
            </Field>
          </div>
        </div>
        <div className="pt-[100px]">
          <Field>
            <Label name="desc">Description</Label>
            <textarea
              id="desc"
              name="description"
              className="w-full max-w-[500px] min-h-[200px] outline-none border border-slate-200 bg-slate-100 focus:border-primary rounded-xl p-4"
              {...register("desc")}
            ></textarea>
          </Field>

          <div className="flex flex-col gap-5">
            <div>
              <h2 className="font-semibold text-xl text-primary mb-5">
                Utilities
              </h2>

              {utilities.map((utility, index) => {
                return (
                  <div key={index} className="flex flex-row gap-2 items-center">
                    <div
                      className="mb-5 grid grid-cols-2 gap-3"
                      key={utility.index}
                    >
                      <Field>
                        <Label name={`nameUtility${utility.index}`}>Name</Label>
                        <Input
                          type="text"
                          name={`nameUtility${utility.index}`}
                          control={control}
                        />
                      </Field>
                      <Field>
                        <Label name={`priceUtility${utility.index}`}>
                          Price
                        </Label>
                        <Input
                          type="text"
                          name={`priceUtility${utility.index}`}
                          control={control}
                        />
                      </Field>
                    </div>
                    {index !== 0 && index === utilities.length - 1 && (
                      <AiFillMinusCircle
                        className="w-9 h-9 text-primary cursor-pointer"
                        onClick={() => handleClearUtility(utility)}
                      />
                    )}
                  </div>
                );
              })}

              <h2
                className=" text-primary mb-5 font-semibold cursor-pointer"
                onClick={handleAddUtility}
              >
                Add more Utilities
              </h2>
            </div>
          </div>
        </div>
        <div className="text-center">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default SpaceAdd;
