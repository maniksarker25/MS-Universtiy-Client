import { FieldValues, SubmitHandler } from "react-hook-form";
import PhForm from "../../../components/form/PhForm";
import PhInput from "../../../components/form/PhInput";
import { Button, Col, Row } from "antd";
import { useCreateAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TApiResponse } from "../../../types";
import { TAcademicFaculty } from "../../../types/academicManagement.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicFacultySchema } from "../../../schemas/academicManagement.schema";

const CreateAcademicFaculty = () => {
  const [createAcademicFaculty] = useCreateAcademicFacultyMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    const academicFacultyData = {
      name: data.name,
    };
    console.log(academicFacultyData);
    try {
      const res = (await createAcademicFaculty(
        academicFacultyData
      )) as TApiResponse<TAcademicFaculty>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Academic faculty created successfully", { id: toastId });
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  return (
    <div>
      <Row justify="center">
        <Col span={6}>
          <PhForm
            onSubmit={onSubmit}
            resolver={zodResolver(academicFacultySchema)}
          >
            <PhInput type="text" name="name" label="Name" />
            <Button htmlType="submit">Submit</Button>
          </PhForm>
        </Col>
      </Row>
    </div>
  );
};

export default CreateAcademicFaculty;
