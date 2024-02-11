import { Button, Col, Flex } from "antd";
import PhForm from "../../../components/form/PhForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PhInput from "../../../components/form/PhInput";
import {
  useCreateOfferedCourseMutation,
  useGetAllCoursesQuery,
  useGetAllRegisteredSemesterQuery,
  useGetCourseFacultiesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import PhSelectWithWatch from "../../../components/form/PhSelectWithWatch";
import PhSelect from "../../../components/form/PhSelect";
import {
  useGetAllAcademicDepartmentQuery,
  useGetAllAcademicFacultyQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useState } from "react";
import { weekDaysOptions } from "../../../constant/global";
import PhTimePicker from "../../../components/form/PhTimePicker";
import moment from "moment";
import { TApiResponse } from "../../../types";
import { toast } from "sonner";

const OfferCourse = () => {
  const [academicFacultyId, setAcademicFacultyId] = useState("");
  const [courseId, setCourseId] = useState("");
  const { data: registeredSemesterData } =
    useGetAllRegisteredSemesterQuery(undefined);
  const { data: academicFacultyData, isFetching: isAcademicFacultyFetching } =
    useGetAllAcademicFacultyQuery(undefined);
  const {
    data: academicDepartmentData,
    isFetching: isAcademicDepartmentFetching,
  } = useGetAllAcademicDepartmentQuery(
    [{ name: "academicFaculty", value: academicFacultyId }],
    { skip: !academicFacultyId }
  );
  const { data: courseData, isFetching: isCourseFetching } =
    useGetAllCoursesQuery(undefined);
  const { data: courseFacultiesData, isFetching: isFetchingCourseFaculties } =
    useGetCourseFacultiesQuery(courseId, { skip: !courseId });
  // create offered course
  const [createOfferedCourse] = useCreateOfferedCourseMutation();
  const registrationSemesterOptions = registeredSemesterData?.data?.map(
    (item) => ({
      label: `${item.academicSemester.name} - ${item.academicSemester.year}`,
      value: item._id,
    })
  );
  const academicFacultyOptions = academicFacultyData?.data?.map((item) => ({
    label: item?.name,
    value: item._id,
  }));
  const academicDepartmentOptions = academicDepartmentData?.data?.map(
    (item) => ({
      label: item?.name,
      value: item._id,
    })
  );
  const courseOptions = courseData?.data?.map((item) => ({
    label: item?.title,
    value: item._id,
  }));
  const facultyOptions = courseFacultiesData?.data?.faculties?.map(
    (item: any) => ({
      label: item?.fullName,
      value: item._id,
    })
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const offeredCourseData = {
      ...data,
      maxCapacity: Number(data.maxCapacity),
      section: Number(data.section),
      startTime: moment(new Date(data.startTime)).format("HH:mm"),
      endTime: moment(new Date(data.endTime)).format("HH:mm"),
    };
    try {
      const res = (await createOfferedCourse(
        offeredCourseData
      )) as TApiResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Offered course created successfully", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };
  return (
    <Flex justify="center">
      <Col span={6}>
        <PhForm onSubmit={onSubmit}>
          <PhSelect
            label="Registration Semester"
            name="semesterRegistration"
            options={registrationSemesterOptions}
          />
          <PhSelectWithWatch
            label="Academic Faculty"
            name="academicFaculty"
            options={academicFacultyOptions}
            disabled={isAcademicFacultyFetching}
            onValueChange={setAcademicFacultyId}
          />
          <PhSelect
            label="Academic Department"
            name="academicDepartment"
            options={academicDepartmentOptions}
            disabled={!academicFacultyId || isAcademicDepartmentFetching}
          />
          <PhSelectWithWatch
            label="Course"
            name="course"
            options={courseOptions}
            onValueChange={setCourseId}
            disabled={isCourseFetching}
          />
          <PhSelect
            label="Faculty"
            name="faculty"
            options={facultyOptions}
            disabled={!courseId || isFetchingCourseFaculties}
          />
          <PhInput type="text" name="maxCapacity" label="Max Capacity" />
          <PhInput type="text" name="section" label="Section" />
          <PhSelect
            mode="multiple"
            options={weekDaysOptions}
            name="days"
            label="Days"
          />
          <PhTimePicker name="startTime" label="Start Time" />
          <PhTimePicker name="endTime" label="End Time" />
          <Button htmlType="submit">Submit</Button>
        </PhForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
