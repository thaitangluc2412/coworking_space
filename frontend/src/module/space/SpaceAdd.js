import React, { useEffect, useState } from "react";
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
import http from "../../config/axiosConfig";
import { useAuth } from "../../context/auth-context";
import UploadImage from "../../components/uploadImage/UploadImage";
import { toast } from "react-toastify";

const schema = yup
  .object({
    roomName: yup.string().required("Please enter your name location"),
    address: yup.string().required("Please enter your address of location"),
    dayPrice: yup.string().required("Please enter day price of location"),
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
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {},
  });
  const { utilities, handleAddUtility, handleClearUtility, setUtilities } =
    useUtilities(unregister);
  const [cities, setCites] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [roomTypesName, setRoomTypesName] = useState();
  const [cityName, setCityName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [wardsName, setWardsName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [imageFiles, setImageFiles] = useState([]);

  const { user } = useAuth();
  useEffect(() => {
    http
      .get(`address/provinces`)
      .then((res) => {
        setCites(res?.data);
      })
      .catch((err) => {
        console.error("cities err", err);
      });
    http
      .get(`roomTypes`)
      .then((res) => {
        console.log(res);
        setRoomTypes(res?.data);
      })
      .catch((err) => {
        console.error("roomTypes err", err);
      });
  }, []);

  const handleClickRoomType = (room) => {
    setRoomTypesName(room.roomTypeName);
    setValue("roomTypeId", room.id);
  };
  useEffect(() => {
    const errorsList = Object.values(errors);
    if (errorsList.length > 0) {
      toast.error(errorsList[0]?.message);
    }
  }, [errors]);

  const handleClickCity = async (city) => {
    setValue("city", city.code);
    setCityName(city.name);
    const res = await http.get(`address/districts/${city.code}`);
    setDistricts(res?.data);
  };
  const handleClickDistrict = async (district) => {
    setValue("district", district.code);
    setDistrictName(district.name);
    const res = await http.get(`address/wards/${district.code}`);
    setWards(res?.data);
  };
  const handleClickWard = (ward) => {
    console.log(ward);
    setWardsName(ward.name);
    setValue("wards", ward.code);
  };

  const onSubmit = (value) => {
    console.log("values ", value);
    let checkError = false;

    for (let i = 0; i < utilities.length; i++) {
      const name = getValues(`${utilities[i].name}`);
      const price = getValues(`${utilities[i].price}`);
      if (!name || !price || isNaN(price)) {
        checkError = !checkError;
        break;
      }
    }
    if (checkError) {
      toast.error("Utility name required and price must be number");
      return;
    }
    const utilitiesAdd = [];
    utilities.forEach((item) => {
      utilitiesAdd.push({
        name: getValues(`${item.name}`),
        value: getValues(`${item.price}`),
      });
    });

    const roomsAdd = {
      address: `${value.address}, ${wardsName}, ${districtName}`,
      provinceId: value.city,
      districtId: value.district,
      wardId: value.wards,
      roomName: value.roomName,
      dayPrice: value.dayPrice,
      monthPrice: value.monthPrice,
      yearPrice: value.yearPrice,
      description: value.desc,
      utilities: utilitiesAdd,
      roomTypeId: value.roomTypeId,
      customerId: user.id,
    };
    console.log(roomsAdd);
    const formData = new FormData();

    formData.append(
      "roomCreateDto",
      new Blob([JSON.stringify(roomsAdd)], {
        type: "application/json",
      })
    );
    imageFiles.forEach((item) => formData.append("files", item.file));
    setIsLoading(true);
    http
      .post("rooms", formData)
      .then((res) => {
        console.log(res);
        toast.success("success");
        reset({
          address: "",
          roomName: "",
          dayPrice: "",
          monthPrice: "",
          yearPrice: "",
          desc: "",
          roomTypeId: "",
          city: "",
          district: "",
          wards: "",
        });
        setWardsName("");
        setDistrictName("");
        setCityName("");
        setUtilities([
          {
            name: `nameUtility0`,
            price: `priceUtility0`,
            index: 0,
          },
        ]);
        setRoomTypesName("");
        setImageFiles([]);
        setIsLoading(false);
      })

      .catch((err) => {
        setIsLoading(false);
        console.error("err", err);
      });
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
            <Label name="roomName" className="name">
              Room Name
            </Label>
            <Input
              type="text"
              name="roomName"
              placeholder="Enter name location"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label name="address">Address</Label>
            <Dropdown>
              <Select placeholder={cityName || "City"}></Select>
              <List>
                {cities.map((city) => (
                  <Option key={city.code} onClick={() => handleClickCity(city)}>
                    {city.name}
                  </Option>
                ))}
              </List>
            </Dropdown>
            <Dropdown>
              <Select placeholder={districtName || "District"}></Select>
              <List>
                {districts.map((district) => (
                  <Option
                    key={district.code}
                    onClick={() => handleClickDistrict(district)}
                  >
                    {district.name}
                  </Option>
                ))}
              </List>
            </Dropdown>
            <Dropdown>
              <Select placeholder={wardsName || "Wards"}></Select>
              <List>
                {wards.map((ward) => (
                  <Option key={ward.code} onClick={() => handleClickWard(ward)}>
                    {ward.name}
                  </Option>
                ))}
              </List>
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
            {/* <Field>
              <Label>Year Price</Label>
              <Input type="text" name="yearPrice" control={control}></Input>
            </Field>
            <Field>
              <Label>Month Price</Label>
              <Input type="text" name="monthPrice" control={control}></Input>
            </Field> */}
            <Field>
              <Label>Day Price ($)</Label>
              <Input type="text" name="dayPrice" control={control}></Input>
            </Field>
          </div>
          <div className="w-full h-[400px]">
            <UploadImage
              imageFiles={imageFiles}
              setImageFiles={setImageFiles}
            />
          </div>
        </div>
        <div className="">
          <div className="max-w-[500px]">
            <Field>
              <Label>Room Type</Label>
              <Dropdown>
                <Select placeholder={roomTypesName || "Room Types"}></Select>
                <List>
                  {roomTypes.map((room) => (
                    <Option
                      key={room.id}
                      onClick={() => handleClickRoomType(room)}
                    >
                      {room.roomTypeName}
                    </Option>
                  ))}
                </List>
              </Dropdown>
            </Field>
          </div>
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
                          Value
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
          <Button type="submit" isLoading={isLoading}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SpaceAdd;
