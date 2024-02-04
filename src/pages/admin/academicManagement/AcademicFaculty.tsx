import { useGetAllAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement.api";
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
  // {
  //   title: "Age",
  //   dataIndex: "age",
  // },
  // {
  //   title: "Address",
  //   dataIndex: "address",
  // },
];

const AcademicFaculty = () => {
  const { data: AcademicFacultyData, isFetching } =
    useGetAllAcademicFacultyQuery(undefined);

  const tableData = AcademicFacultyData?.data?.map(({ _id, name }) => ({
    key: _id,
    name,
  }));

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

export default AcademicFaculty;
