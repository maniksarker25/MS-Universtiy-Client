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

import { useCreateAdminMutation } from "../../../../redux/features/admin/userManagement.api";

import { toast } from "sonner";
import { TApiResponse } from "../../../../types";
import { TAdmin } from "../../../../types/userManagement.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAdminValidationSchema } from "../../../../schemas/userManagementSchema/AdminManagement.schema";
import { useState } from "react";

//! this is only for development
//! should be removed in a future release
const adminDefaultValues = {
  designation: "Administrator",
  name: {
    firstName: "Manik",
    middleName: "Chandra",
    lastName: "Saker",
  },
  gender: "male",
  // dateOfBirth: "1985-08-20T00:00:00.000Z",
  email: "maniksarker265@gmail.com",
  contactNo: "9876543210",
  emergencyContactNo: "1234567890",
  bloodGroup: "AB+",
  // presentAddress: "789 Elm Street, City",
  // permanentAddress: "567 Oak Avenue, Town",
  profileImg: "https://example.com/emily_profile.jpg",
  isDeleted: false,
};

const CreateAdmin = () => {
  const [success, setSuccess] = useState(false);
  const [createAdmin, { data, error }] = useCreateAdminMutation();
  console.log({ data, error });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log(data);
    // data.dateOfBirth = data.dateOfBirth.toDate();
    const toastId = toast.loading("Creating...");
    const facultyData = {
      password: "faculty123",
      admin: data,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(facultyData));
    formData.append("file", data.profileImage);
    try {
      const res = (await createAdmin(formData)) as TApiResponse<TAdmin>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
        setSuccess(true);
      } else {
        toast.success("Admin created successfully", { id: toastId });
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
          defaultValues={adminDefaultValues}
          success={success}
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
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PhForm>
      </Col>
    </Row>
  );
};

export default CreateAdmin;
