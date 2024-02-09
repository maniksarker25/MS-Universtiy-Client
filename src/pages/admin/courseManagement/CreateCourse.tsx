import { FieldValues, SubmitHandler } from "react-hook-form";
import PhForm from "../../../components/form/PhForm";

import { Button, Col, Flex } from "antd";
import PhSelect from "../../../components/form/PhSelect";
import { semesterStatusOptions } from "../../../constant/semester";

import { toast } from "sonner";

import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import PhDatePicker from "../../../components/form/PhDatePicker";
import PhInput from "../../../components/form/PhInput";
import {
  useCreateRegisterSemesterMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { TApiResponse } from "../../../types";

const CreateCourse = () => {
  const { data: courses } = useGetAllCoursesQuery(undefined);
  // console.log(courses);
  const preRequisiteCourseOptions = courses?.data?.map((item) => ({
    label: item.title,
    value: item._id,
  }));
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const courseData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      preRequisiteCourses: data.preRequisiteCourses.map((item: string) => ({
        course: item,
        isDeleted: false,
      })),
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
            options={preRequisiteCourseOptions}
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
