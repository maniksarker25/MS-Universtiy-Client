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
import { useGetAllAcademicDepartmentQuery } from "../../../../redux/features/admin/academicManagement.api";
import { useCreateFacultyMutation } from "../../../../redux/features/admin/userManagement.api";

import { toast } from "sonner";
import { TApiResponse } from "../../../../types";
import { TFaculty } from "../../../../types/userManagement.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFacultyValidationSchema } from "../../../../schemas/userManagementSchema/facultyManagement.schema";

//! this is only for development
//! should be removed in a future release
// const facultyDefaultValues = {
//   name: {
//     firstName: "Anik",
//     middleName: "Chandra",
//     lastName: "Biswas",
//   },
//   gender: "male",
//   designation: "professor",
//   // dateOfBirth: "1980-05-15T00:00:00.000Z",
//   email: "anik@example.com",
//   contactNo: "1234567890",
//   emergencyContactNo: "9876543210",
//   bloodGroup: "O+",
//   presentAddress: "123 Main Street, City",
//   permanentAddress: "456 Park Avenue, Town",
//   profileImg: "https://example.com/profile.jpg",
//   academicDepartment: "65ba1aa18a05588ffc6dfb22",
//   isDeleted: false,
// };
const CreateFaculty = () => {
  const [createFaculty, { data, error }] = useCreateFacultyMutation();
  console.log({ data, error });

  const { data: departmentData, isLoading: isDepartmentLoading } =
    useGetAllAcademicDepartmentQuery(undefined);
  const academicDepartmentOptions = departmentData?.data?.map((item) => ({
    label: item.name,
    value: item._id,
  }));
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("Ldkdjf");
    console.log(data);
    const toastId = toast.loading("Creating...");
    const facultyData = {
      password: "faculty123",
      faculty: data,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(facultyData));
    formData.append("file", data.profileImage);
    try {
      const res = (await createFaculty(formData)) as TApiResponse<TFaculty>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Faculty created successfully", { id: toastId });
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
        <PhForm
          onSubmit={onSubmit}
          // defaultValues={facultyDefaultValues}
          resolver={zodResolver(createFacultyValidationSchema)}
        >
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

            <Divider>Academic Information</Divider>

            <Col span={24} md={{ span: 12 }}>
              <PhInput type="text" name="designation" label="Designation" />
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

export default CreateFaculty;
