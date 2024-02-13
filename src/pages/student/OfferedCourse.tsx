import { Button, Col, Row } from "antd";
import {
  useEnrollCourseMutation,
  useGetMyAllOfferedCoursesQuery,
} from "../../redux/features/student/studentCourseManagement.api";
import { TApiResponse } from "../../types";
import { toast } from "sonner";

type TCourse = {
  [index: string]: any;
};
const OfferedCourse = () => {
  const { data: studentOfferedCourse } =
    useGetMyAllOfferedCoursesQuery(undefined);
  const [enroll] = useEnrollCourseMutation();
  const singleObject = studentOfferedCourse?.data?.reduce(
    (acc: TCourse, item) => {
      const key = item?.course?.title;
      acc[key] = acc[key] || { courseTitle: key, sections: [] };
      acc[key].sections.push({
        section: item?.section,
        _id: item?._id,
        days: item?.days,
        startTime: item?.startTime,
        endTime: item?.endTime,
      });
      return acc;
    },
    {}
  );
  // console.log(singleObject);
  const modifiedData = Object.values(singleObject ? singleObject : {});
  // console.log(modifiedData);

  const handleEnroll = async (id: string) => {
    const toastId = toast.loading("Enrolling...");
    const enrollData = {
      offeredCourse: id,
    };
    try {
      const res = (await enroll(enrollData)) as TApiResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Course enroll  successfully", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };
  if (!modifiedData.length) {
    return <p>No available courses</p>;
  }
  return (
    <Row gutter={[0, 20]}>
      {modifiedData.map((item, index: number) => {
        return (
          <Col key={index} span={24} style={{ border: "solid #d4d4d4 2px" }}>
            <div style={{ padding: "10px" }}>
              <h2>{item.courseTitle}</h2>
            </div>
            <div>
              {item.sections.map((section) => {
                return (
                  <Row
                    justify="space-between"
                    align="middle"
                    style={{ borderTop: "solid #d4d4d4 2px", padding: "10px" }}
                  >
                    <Col span={5}>Section: {section.section} </Col>
                    <Col span={5}>
                      Days:{" "}
                      {section.days.map((day) => (
                        <span> {day} </span>
                      ))}
                    </Col>
                    <Col span={5}>Start Time: {section.startTime} </Col>
                    <Col span={5}>End Time: {section.endTime} </Col>
                    <Button onClick={() => handleEnroll(section._id)}>
                      Enroll
                    </Button>
                  </Row>
                );
              })}
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default OfferedCourse;
