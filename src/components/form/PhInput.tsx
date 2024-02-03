import { Form, Input } from "antd";
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
      {/* {label ? <p style={{ marginBottom: "5px" }}>{label}</p> : null} */}
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <Input {...field} type={type} id={name} />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PhInput;
// import { Input } from "antd";
// import { Controller, useFormContext } from "react-hook-form";

// type TInputProps = {
//   type: string;
//   name: string;
//   label?: string;
//   required?: boolean;
// };

// const PhInput = ({ type, name, label, required }: TInputProps) => {
//   const {
//     control,
//     formState: { errors },
//   } = useFormContext();

//   return (
//     <div style={{ marginBottom: "15px" }}>
//       {label ? <p style={{ marginBottom: "5px" }}>{label}</p> : null}
//       <Controller
//         name={name}
//         control={control}
//         rules={required && { required: `Please enter ${label || name}` }}
//         render={({ field }) => (
//           <div>
//             <Input {...field} type={type} id={name} />
//             {errors[name] && (
//               <p style={{ color: "red" }}>
//                 {(errors[name]?.message as string) || "This field is required"}
//               </p>
//             )}
//           </div>
//         )}
//       />
//     </div>
//   );
// };

// export default PhInput;
