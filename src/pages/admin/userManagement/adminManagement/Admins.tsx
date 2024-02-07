import {
  Button,
  Pagination,
  Row,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";

import { useState } from "react";
import { TQueryParams } from "../../../../types";
import { useGetAllAdminQuery } from "../../../../redux/features/admin/userManagement.api";
import { TStudent } from "../../../../types/userManagement.type";
import { Link } from "react-router-dom";

export type TTableData = Pick<
  TStudent,
  "fullName" | "id" | "email" | "contactNo"
>;

const columns: TableColumnsType<TTableData> = [
  {
    title: "Name",
    dataIndex: "fullName",
  },
  {
    title: "Roll No",
    dataIndex: "id",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Contact No",
    dataIndex: "contactNo",
  },
  {
    title: "Action",
    key: "x",
    render: (item) => {
      return (
        <Space>
          <Button>Update</Button>
          <Link to={`/admin/student-data/${item?.key}`}>
            {" "}
            <Button>Details</Button>
          </Link>
          <Button>Block</Button>
        </Space>
      );
    },
    width: "1%",
  },
];

const Admins = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState(1);
  const { data: adminData, isFetching } = useGetAllAdminQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);
  const metaData = adminData?.meta;
  // console.log(studentData);
  const tableData = adminData?.data?.map(
    ({ _id, fullName, id, email, contactNo }) => ({
      key: _id,
      fullName,
      id,
      email,
      contactNo,
    })
  );

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParams[] = [];
      filters?.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
      filters?.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );
      setParams(queryParams);
    }
  };

  return (
    <div>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
      />
      <Row justify={"end"} style={{ marginTop: "10px" }}>
        <Pagination
          onChange={(value) => setPage(value)}
          current={page}
          total={metaData?.total}
          pageSize={metaData?.limit}
        />
      </Row>
    </div>
  );
};

export default Admins;
