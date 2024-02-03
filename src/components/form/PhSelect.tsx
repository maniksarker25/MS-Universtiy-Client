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
        render={({ field }) => (
          <Form.Item label={label}>
            <Select
              style={{ width: "100%" }}
              {...field}
              options={options}
              size="large"
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PhSelect;
