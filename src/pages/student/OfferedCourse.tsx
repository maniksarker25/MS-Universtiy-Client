import { useGetMyAllOfferedCoursesQuery } from "../../redux/features/student/studentCourseManagement.api";

const OfferedCourse = () => {
  const { data: studentOfferedCourse } =
    useGetMyAllOfferedCoursesQuery(undefined);
  console.log(studentOfferedCourse);
  return (
    <div>
      <h1>Student : offered course</h1>
    </div>
  );
};

export default OfferedCourse;
