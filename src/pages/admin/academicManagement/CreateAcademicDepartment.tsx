import { FieldValues, SubmitHandler } from "react-hook-form";
import PhForm from "../../../components/form/PhForm";
import PhInput from "../../../components/form/PhInput";
import { Button, Col, Row } from "antd";
import {
  useCreateAcademicDepartmentMutation,
  useGetAllAcademicFacultyQuery,
} from "../../../redux/features/admin/academicManagement.api";
import PhSelect from "../../../components/form/PhSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicDepartmentSchema } from "../../../schemas/academicManagement.schema";
import { TApiResponse } from "../../../types";
import { TAcademicDepartment } from "../../../types/academicManagement.type";
import { toast } from "sonner";

const CreateAcademicDepartment = () => {
  const { data: academicFacultyData } =
    useGetAllAcademicFacultyQuery(undefined);
  const [createAcademicDepartment] = useCreateAcademicDepartmentMutation();

  const academicFacultyOptions = academicFacultyData?.data?.map((item) => ({
    label: item.name,
    value: item._id,
  }));
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    const academicDepartmentData = {
      name: data.name,
      academicFaculty: data.academicFaculty,
    };
    try {
      const res = (await createAcademicDepartment(
        academicDepartmentData
      )) as TApiResponse<TAcademicDepartment>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Academic department created successfully", {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };
  return (
    <div>
      <Row justify="center">
        <Col span={6}>
          <PhForm
            onSubmit={onSubmit}
            resolver={zodResolver(academicDepartmentSchema)}
          >
            <PhInput type="text" name="name" label="Name" />
            <PhSelect
              label="Select Academic Faculty"
              name="academicFaculty"
              options={academicFacultyOptions!}
            />
            <Button htmlType="submit">Submit</Button>
          </PhForm>
        </Col>
      </Row>
    </div>
  );
};

export default CreateAcademicDepartment;
