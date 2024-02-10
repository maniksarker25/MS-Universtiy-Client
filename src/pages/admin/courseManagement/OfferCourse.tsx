import { Button, Col, Flex } from "antd";
import PhForm from "../../../components/form/PhForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PhInput from "../../../components/form/PhInput";
import { useGetAllRegisteredSemesterQuery } from "../../../redux/features/admin/courseManagement.api";
import PhSelectWithWatch from "../../../components/form/PhSelectWithWatch";

const OfferCourse = () => {
  const { data: registeredSemesterData } =
    useGetAllRegisteredSemesterQuery(undefined);
  const registrationSemesterOptions = registeredSemesterData?.data?.map(
    (item) => ({
      label: `${item.academicSemester.name} - ${item.academicSemester.year}`,
      value: item._id,
    })
  );
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <Flex justify="center">
      <Col span={6}>
        <PhForm onSubmit={onSubmit}>
          <PhSelectWithWatch
            label="Academic Semester"
            name="academicSemester"
            options={registrationSemesterOptions}
          />
          <PhInput type="text" name="test" label="test" />

          <Button htmlType="submit">Submit</Button>
        </PhForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
