import { Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
};
const PhInput = ({ type, name, label }: TInputProps) => {
  //   const { register } = useFormContext();
  return (
    <div style={{ marginBottom: "15px" }}>
      {label ? <p style={{ marginBottom: "5px" }}>{label}</p> : null}
      <Controller
        name={name}
        render={({ field }) => <Input {...field} type={type} id={name} />}
      />
    </div>
  );
};

export default PhInput;
