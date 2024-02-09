import { Button, Dropdown, Table, TableColumnsType, Tag } from "antd";

import {
  useGetAllRegisteredSemesterQuery,
  useUpdateRegisteredSemesterMutation,
} from "../../../redux/features/admin/courseManagement.api";
import { TRegisterSemester } from "../../../types/courseManagement.type";
import moment from "moment";
import { useState } from "react";
// import { TQueryParams } from "../../../types";
// import { useState } from "react";

export type TTableData = Pick<
  TRegisterSemester,
  "startDate" | "endDate" | "status"
>;

const items = [
  {
    label: "UPCOMING",
    key: "UPCOMING",
  },
  {
    label: "ONGOING",
    key: "ONGOING",
  },
  {
    label: "ENDED",
    key: "ENDED",
  },
];

const RegisteredSemester = () => {
  //   const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);
  const [semesterId, setSemesterId] = useState("");
  const { data: registeredSemesterData, isFetching } =
    useGetAllRegisteredSemesterQuery(undefined);
  const [updateRegisteredSemester] = useUpdateRegisteredSemesterMutation();
  // console.log(semesterData);
  const tableData = registeredSemesterData?.data?.map(
    ({ _id, academicSemester, startDate, endDate, status }) => ({
      key: _id,
      name: `${academicSemester.name}-${academicSemester.year}`,
      status,
      startDate: moment(new Date(startDate)).format("MMMM"),
      endDate: moment(new Date(endDate)).format("MMMM"),
    })
  );

  const handleStatusChange = (data) => {
    // console.log("new status", data?.key);
    // console.log("semesterid", semesterId);
    const updatedData = {
      id: semesterId,
      data: {
        status: data.key,
      },
    };
    updateRegisteredSemester(updatedData);
  };

  const menuProps = {
    items,
    onClick: handleStatusChange,
  };
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (item) => {
        let color;
        if (item === "UPCOMING") {
          color = "blue";
        }
        if (item === "ONGOING") {
          color = "green";
        }
        if (item === "ENDED") {
          color = "red";
        }

        return <Tag color={color}>{item}</Tag>;
      },
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Dropdown menu={menuProps}>
            <Button onClick={() => setSemesterId(item.key)}>
              Change Status
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  //   const onChange: TableProps<TTableData>["onChange"] = (
  //     _pagination,
  //     filters,
  //     _sorter,
  //     extra
  //   ) => {
  //     if (extra.action === "filter") {
  //       const queryParams: TQueryParams[] = [];
  //       filters?.name?.forEach((item) =>
  //         queryParams.push({ name: "name", value: item })
  //       );
  //       filters?.year?.forEach((item) =>
  //         queryParams.push({ name: "year", value: item })
  //       );
  //       setParams(queryParams);
  //     }
  //   };

  return (
    <div>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        // onChange={onChange}
      />
    </div>
  );
};

export default RegisteredSemester;
