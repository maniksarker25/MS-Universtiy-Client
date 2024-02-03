import { Table, TableColumnsType, TableProps } from "antd";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicSemester } from "../../../types/academicManagement.type";

export type TTableData = Pick<
  TAcademicSemester,
  "_id" | "name" | "year" | "startMonth" | "endMonth"
>;

const columns: TableColumnsType<TTableData> = [
  {
    title: "Name",
    dataIndex: "name",
    filters: [
      {
        text: "Joe",
        value: "Joe",
      },
      {
        text: "Jim",
        value: "Jim",
      },
      // {
      //   text: "Submenu",
      //   value: "Submenu",
      //   children: [
      //     {
      //       text: "Green",
      //       value: "Green",
      //     },
      //     {
      //       text: "Black",
      //       value: "Black",
      //     },
      //   ],
      // },
    ],
  },
  {
    title: "Year",
    dataIndex: "year",
  },
  {
    title: "Start Month",
    dataIndex: "startMonth",
  },
  {
    title: "End Month",
    dataIndex: "endMonth",
  },
];

const AcademicSemester = () => {
  const { data: semesterData } = useGetAllSemestersQuery([
    {
      name: "year",
      value: "2025",
    },
  ]);
  console.log(semesterData);
  const tableData = semesterData?.data?.map(
    ({ _id, name, startMonth, endMonth, year }) => ({
      _id,
      name,
      startMonth,
      endMonth,
      year,
    })
  );

  const onChange: TableProps<TTableData>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div>
      <Table columns={columns} dataSource={tableData} onChange={onChange} />
    </div>
  );
};

export default AcademicSemester;
