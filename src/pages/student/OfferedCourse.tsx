import { useGetMyAllOfferedCoursesQuery } from "../../redux/features/student/studentCourseManagement.api";

const OfferedCourse = () => {
  const { data: studentOfferedCourse } =
    useGetMyAllOfferedCoursesQuery(undefined);
  const singleObject = studentOfferedCourse?.data?.reduce((acc, item) => {
    const key = item?.course?.title;
    acc[key] = acc[key] || { courseTitle: key, sections: [] };
    acc[key].sections.push({
      section: item?.section,
      _id: item?._id,
    });
    return acc;
  }, {});
  // console.log(singleObject);
  console.log(Object.values(singleObject ? singleObject : {}));
  return (
    <div>
      <h1>Student : offered course</h1>
    </div>
  );
};

export default OfferedCourse;
