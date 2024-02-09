import { FieldValues, SubmitHandler } from "react-hook-form";
import PhForm from "../../../components/form/PhForm";

import { Button, Col, Flex } from "antd";
import PhSelect from "../../../components/form/PhSelect";
import { semesterStatusOptions } from "../../../constant/semester";

import { toast } from "sonner";

import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import PhDatePicker from "../../../components/form/PhDatePicker";
import PhInput from "../../../components/form/PhInput";
import { useCreateRegisterSemesterMutation } from "../../../redux/features/admin/courseManagement.api";
import { TApiResponse } from "../../../types";

const CreateCourse = () => {
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const courseData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
    };
    console.log(courseData);
    // try {
    //   const res = (await createRegisterSemester(
    //     semesterData
    //   )) as TApiResponse<any>;
    //   if (res.error) {
    //     toast.error(res.error.data.message, { id: toastId });
    //   } else {
    //     toast.success("Semester registered successfully", { id: toastId });
    //   }
    // } catch (error) {
    //   toast.error("Something went wrong", { id: toastId });
    // }
  };

  return (
    <Flex justify="center">
      <Col span={6}>
        <PhForm onSubmit={onSubmit}>
          <PhInput name="title" label="Title" type="text" />
          <PhInput name="prefix" label="Prefix" type="text" />
          <PhInput name="code" label="Code" type="text" />
          <PhInput name="credits" label="Credits" type="text" />
          <PhSelect
            options={[
              { label: "test1", value: "test1" },
              { label: "test2", value: "test2" },
            ]}
            name="preRequisiteCourses"
            label="Pre Requisite Courses"
            mode="multiple"
          />
          <Button htmlType="submit">Submit</Button>
        </PhForm>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
