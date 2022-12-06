import React from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import Dropdown from "../../components/dropdown/Dropdown";
import Select from "../../components/dropdown/Select";
import List from "../../components/dropdown/List";
import Option from "../../components/dropdown/Option";
import { useState } from "react";
import { useEffect } from "react";
import http from "../../config/axiosConfig";
import Button from "../../components/button/Button";

const FilterSpace = ({ handleFilter }) => {
  const { handleSubmit, control, setValue, reset } = useForm({
    mode: "onSubmit",
    defaultValues: {
      minPrice: "",
      maxPrice: "",
      city: "",
      roomName: "",
      typeRoomId: "",
    },
  });
  const [cities, setCites] = useState([]);
  const [cityName, setCityName] = useState("");
  const [roomTypes, setRoomTypes] = useState([]);
  const [roomTypesName, setRoomTypesName] = useState();
  const handleClickCity = (city) => {
    setValue("city", city.code);
    setCityName(city.name);
  };
  const handleClickRoomType = (room) => {
    setRoomTypesName(room.roomTypeName);
    setValue("typeRoomId", room.id);
  };
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
  const clearFilter = () => {
    reset({
      minPrice: "",
      maxPrice: "",
      city: "",
      roomName: "",
      typeRoomId: "",
    });
    setCityName("");
    setRoomTypesName("");
  };
  return (
    <div className="w-full h-full pt-10 flex items-center justify-center z-30 relative">
      <form
        onSubmit={handleSubmit(handleFilter)}
        className="bg-white bg-opacity-80 w-full max-w-[350px] mx-auto grid grid-cols-1 gap-6 px-5 py-5 rounded-2xl border "
      >
        <Input
          type="text"
          name="roomName"
          placeholder="Search"
          control={control}
        ></Input>

        <div>
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
        </div>
        <div>
          <Dropdown>
            <Select placeholder={roomTypesName || "Room Types"}></Select>
            <List>
              {roomTypes.map((room) => (
                <Option key={room.id} onClick={() => handleClickRoomType(room)}>
                  {room.roomTypeName}
                </Option>
              ))}
            </List>
          </Dropdown>
        </div>
        <div className="">
          <Label>Price</Label>
          <div className="flex flex-row gap-5 mt-3">
            <Input
              type="number"
              control={control}
              placeholder="min"
              name="minPrice"
            ></Input>
            <Input
              type="number"
              control={control}
              placeholder="max"
              name="maxPrice"
            ></Input>
          </div>
        </div>
        <div className="flex flex-row gap-2 items-center justify-center">
          <Button type="submit">Search</Button>

          <Button onClick={clearFilter}>Clear</Button>
        </div>
      </form>
    </div>
  );
};

export default FilterSpace;
