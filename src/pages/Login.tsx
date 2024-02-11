import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PhForm from "../components/form/PhForm";
import PhInput from "../components/form/PhInput";

const Login = () => {
  const dispatch = useAppDispatch();
  // const { register, handleSubmit } = useForm();
  // const { register } = useFormContext();
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  // console.log("data", data);
  // console.log("err", error);
  const defaultValues = {
    id: "2024010001",
    password: "student123",
  };
  const onSubmit = async (data: FieldValues) => {
    // console.log(data);
    const toastId = toast.loading("Login in..");
    try {
      const userInfo = {
        id: data.id,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      // console.log(res);
      const user = verifyToken(res.data.accessToken) as TUser;
      // console.log(user);
      dispatch(setUser({ user, token: res.data.accessToken }));
      toast.success("Login successful", { id: toastId, duration: 2000 });
      //check the password change is need
      if (res?.data?.needsPasswordChange) {
        navigate("/change-password");
      } else {
        navigate(`/${user?.role}/dashboard`);
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };
  return (
    <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
      <PhForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <PhInput type={"text"} name={"id"} label={"Your id"} />

        <PhInput type={"text"} name={"password"} label="Password" />

        <Button htmlType="submit">Login</Button>
      </PhForm>
    </Row>
  );
};

export default Login;
