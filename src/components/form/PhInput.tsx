import { Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

const PhInput = ({ type, name, label }) => {
  //   const { register } = useFormContext();
  return (
    <>
      {label ? label : null}
      <Controller
        name={name}
        render={({ field }) => <Input {...field} type={type} id={name} />}
      />
    </>
  );
};

export default PhInput;
