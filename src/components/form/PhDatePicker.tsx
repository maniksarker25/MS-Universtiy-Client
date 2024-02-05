import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";

type TDatePickerProps = {
  name: string;
  label?: string;
};
const PhDatePicker = ({ name, label }: TDatePickerProps) => {
  //   const { register } = useFormContext();

  return (
    <div style={{ marginBottom: "15px" }}>
      {/* {label ? <p style={{ marginBottom: "5px" }}>{label}</p> : null} */}
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <DatePicker {...field} size="large" style={{ width: "100%" }} />
            {error && <p style={{ color: "red" }}>{error.message}</p>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PhDatePicker;
