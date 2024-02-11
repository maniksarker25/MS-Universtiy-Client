import { Button, Row } from "antd";
import PhForm from "../components/form/PhForm";
import PhInput from "../components/form/PhInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useChangePasswordMutation } from "../redux/features/auth/authApi";
import { TApiResponse } from "../types";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { logout } from "../redux/features/auth/authSlice";
import { Navigate, useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [changePassword] = useChangePasswordMutation();
  const handlePasswordChange: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Changing...");
    try {
      const res = (await changePassword(data)) as TApiResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Password changed successfully", { id: toastId });
        dispatch(logout());
        navigate("/login");
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };
  return (
    <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
      <PhForm onSubmit={handlePasswordChange}>
        <h2 style={{ marginBottom: "10px" }}>Please Change Your Password</h2>
        <PhInput type={"text"} name={"oldPassword"} label={"Old Password"} />

        <PhInput type={"text"} name={"newPassword"} label="New Password" />

        <Button htmlType="submit">Submit</Button>
      </PhForm>
    </Row>
  );
};

export default ChangePassword;
