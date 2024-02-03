import { Form, Select } from "antd";
import { Controller } from "react-hook-form";
type TSelectProps = {
  label: string;
  name: string;
  options: { label: string; value: string; disabled?: boolean }[];
};
const PhSelect = ({ label, name, options }: TSelectProps) => {
  return (
    <div>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Select
              style={{ width: "100%" }}
              {...field}
              options={options}
              size="large"
            />
            {error && <p style={{ color: "red" }}>{error.message}</p>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PhSelect;
