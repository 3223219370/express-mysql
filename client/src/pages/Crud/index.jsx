import React, { useState, useEffect } from "react";
import { Button, Table } from "@alifd/next";
import axios from "axios";
export default function Crud() {
  const [dataSource, setDtaSource] = useState([]);

  const clickAdd = async () => {
    const data = await axios({
      url: "api/users/add",
      method: "post",
      data: {
        name:  "testName" + +new Date(),
        age: 18,
        password:'123'

      },
    });
    clickGet();
  };
  const clickDelete = async (id) => {
    const data = await axios({
      url: "api/users/delete",
      method: "post",
      data: {
        id,
      },
    });
    clickGet();
  };
  const clickModify = async (id) => {
    const data = await axios({
      url: "api/users/modify",
      method: "post",
      data: {
        name: "testName" + +new Date(),
        age: 18,
        id,
      },
    });
    clickGet();
  };
  const clickGet = async () => {
    const { data } = await axios({
      url: "api/users",
    });
    setDtaSource(data);
  };

  const operCell = (value, index, record) => {
    return (
      <>
        <Button onClick={() => clickModify(record.id)}>修改</Button>
        <Button onClick={() => clickDelete(record.id)}>删除</Button>
      </>
    );
  };
  useEffect(() => {
    clickGet();
  }, []);
  return (
    <>
      <Button onClick={clickGet}>查询</Button>
      <Button onClick={clickAdd}>增加</Button>
      <Table dataSource={dataSource}>
        <Table.Column title="Id" dataIndex="id" />
        <Table.Column title="名称" dataIndex="name" />
        <Table.Column title="密码" dataIndex="password" />
        <Table.Column title="年龄" dataIndex="age" />
        <Table.Column title="操作" cell={operCell} />
      </Table>
    </>
  );
}
