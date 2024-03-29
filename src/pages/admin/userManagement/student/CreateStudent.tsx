import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PhForm from "../../../../components/form/PhForm";
import PhInput from "../../../../components/form/PhInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PhSelect from "../../../../components/form/PhSelect";
import {
  bloodGroupOptions,
  genderOptions,
} from "../../../../constant/userManagement";
import PhDatePicker from "../../../../components/form/PhDatePicker";
import {
  useGetAllAcademicDepartmentQuery,
  useGetAllSemestersQuery,
} from "../../../../redux/features/admin/academicManagement.api";
import { useCreateStudentMutation } from "../../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";
import { TApiResponse } from "../../../../types";
import { TStudent } from "../../../../types/userManagement.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentSchema } from "../../../../schemas/userManagementSchema/studentManagement.schema";

//! this is only for development
//! should be removed in a future release

const CreateStudent = () => {
  const [createStudent, { data, error }] = useCreateStudentMutation();
  console.log({ data, error });
  const { data: academicSemesterData, isLoading: isAcademicSemesterLoading } =
    useGetAllSemestersQuery(undefined);
  const admissionSemesterOptions = academicSemesterData?.data?.map((item) => ({
    label: `${item.name} - ${item.year}`,
    value: item._id,
  }));
  const { data: departmentData, isLoading: isDepartmentLoading } =
    useGetAllAcademicDepartmentQuery(undefined);
  const academicDepartmentOptions = departmentData?.data?.map((item) => ({
    label: item.name,
    value: item._id,
  }));
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log(data);
    const toastId = toast.loading("Creating...");
    const studentData = {
      password: "student123",
      student: data,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(studentData));
    formData.append("file", data.profileImage);
    try {
      const res = (await createStudent(formData)) as TApiResponse<TStudent>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Semester created successfully", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
    //! This is for development
    //! Only for checking
    // console.log(Object.fromEntries(formData));
  };
  return (
    <Row justify="center">
      <Col span={24}>
        <PhForm onSubmit={onSubmit} resolver={zodResolver(studentSchema)}>
          <Divider>Personal Information</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} xl={{ span: 8 }}>
              <PhInput type="text" name="name.firstName" label="First Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} xl={{ span: 8 }}>
              <PhInput type="text" name="name.middleName" label="Middle Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} xl={{ span: 8 }}>
              <PhInput type="text" name="name.lastName" label="Last Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} xl={{ span: 8 }}>
              <PhSelect name="gender" label="Gender" options={genderOptions} />
            </Col>
            <Col span={24} md={{ span: 12 }} xl={{ span: 8 }}>
              <PhDatePicker name="dateOfBirth" label="Date Of Birth" />
            </Col>
            <Col span={24} md={{ span: 12 }} xl={{ span: 8 }}>
              <PhSelect
                name="bloodGroup"
                label="Blood Group"
                options={bloodGroupOptions}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} xl={{ span: 8 }}>
              <Controller
                name="profileImage"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Profile Image">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
            <Divider>Contact Information</Divider>
            <Col span={24} md={{ span: 12 }} xl={{ span: 8 }}>
              <PhInput type="text" name="email" label="Email" />
            </Col>
            <Col span={24} md={{ span: 12 }} xl={{ span: 8 }}>
              <PhInput type="text" name="contactNo" label="Contact No" />
            </Col>
            <Col span={24} md={{ span: 12 }} xl={{ span: 8 }}>
              <PhInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact No"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} xl={{ span: 8 }}>
              <PhInput
                type="text"
                name="presentAddress"
                label="Present Address"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} xl={{ span: 8 }}>
              <PhInput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
              />
            </Col>
            <Divider>Guardian Info</Divider>
            <Col span={24} md={{ span: 12 }} xl={{ span: 8 }}>
              <PhInput
                type="text"
                name="guardian.fatherName"
                label="Father Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} xl={{ span: 8 }}>
              <PhInput
                type="text"
                name="guardian.fatherOccupation"
                label="Father Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} xl={{ span: 8 }}>
              <PhInput
                type="text"
                name="guardian.fatherContactNo"
                label="Father Contact No"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} xl={{ span: 8 }}>
              <PhInput
                type="text"
                name="guardian.motherName"
                label="Mother Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} xl={{ span: 8 }}>
              <PhInput
                type="text"
                name="guardian.motherOccupation"
                label="Mother Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} xl={{ span: 8 }}>
              <PhInput
                type="text"
                name="guardian.motherContactNo"
                label="Mother Contact No"
              />
            </Col>
            <Divider>Local Guardian Info</Divider>
            <Col span={24} md={{ span: 12 }} xl={{ span: 8 }}>
              <PhInput type="text" name="localGuardian.name" label="Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} xl={{ span: 8 }}>
              <PhInput
                type="text"
                name="localGuardian.occupation"
                label="Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} xl={{ span: 8 }}>
              <PhInput
                type="text"
                name="localGuardian.contactNo"
                label="Contact No"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} xl={{ span: 8 }}>
              <PhInput
                type="text"
                name="localGuardian.address"
                label="Address"
              />
            </Col>
            <Divider>Academic Information</Divider>

            <Col span={24} md={{ span: 12 }}>
              <PhSelect
                name="admissionSemester"
                label="Admission Semester"
                disabled={isAcademicSemesterLoading}
                options={admissionSemesterOptions!}
              />
            </Col>
            <Col span={24} md={{ span: 12 }}>
              <PhSelect
                name="academicDepartment"
                label="Academic Department"
                options={academicDepartmentOptions}
                disabled={isDepartmentLoading}
              />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PhForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;
