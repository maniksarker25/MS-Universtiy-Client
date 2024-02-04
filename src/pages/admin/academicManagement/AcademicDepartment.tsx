import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagement.api";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";

interface DataType {
  key: React.Key;
  name: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Academic Faculty",
    dataIndex: "academicFaculty",
  },
  // {
  //   title: "Address",
  //   dataIndex: "address",
  // },
];
const AcademicDepartment = () => {
  const { data: academicDepartmentData, isFetching } =
    useGetAllAcademicDepartmentQuery(undefined);
  // console.log(academicDepartmentData);
  const tableData = academicDepartmentData?.data?.map(
    ({ _id, name, academicFaculty }) => ({
      key: _id,
      name,
      academicFaculty: academicFaculty.name,
    })
  );

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
    />
  );
};

export default AcademicDepartment;
