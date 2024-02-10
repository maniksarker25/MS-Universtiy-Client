import { Form, Select } from "antd";
import { Controller, useFormContext, useWatch } from "react-hook-form";
export type TSelectProps = {
  label: string;
  name: string;
  options: { label: string; value: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
  mode?: "multiple" | undefined;
};
const PhSelectWithWatch = ({
  label,
  name,
  options,
  disabled,
  mode,
}: TSelectProps) => {
  const { control } = useFormContext();
  const inputValue = useWatch({
    control,
    name,
  });
  console.log(inputValue);
  return (
    <div>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Select
              mode={mode}
              style={{ width: "100%" }}
              {...field}
              options={options}
              size="large"
              disabled={disabled}
            />
            {error && <p style={{ color: "red" }}>{error.message}</p>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PhSelectWithWatch;
