import React, { useState } from "react";

import { Button, Checkbox, Flex, Input, Select, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: TableColumnsType<DataType> = [
  { title: "Name", dataIndex: "name" },
  { title: "Age", dataIndex: "age" },
  { title: "Address", dataIndex: "address" },
  {
    title: "select",
    dataIndex: "select",
  },
  {
    title: "checkbox",
    dataIndex: "checkbox",
  },
  {
    title: "input",
    dataIndex: "input",
  },
];

const dataSource = Array.from<DataType>({ length: 46 }).map<DataType>(
  (_, i) => ({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
    select: (
      <Select
        defaultValue="lucy"
        style={{ width: 120 }}
        disabled={i <= 2}
        options={[
          { value: "jack", label: "Jack" },
          { value: "lucy", label: "Lucy" },
          { value: "Yiminghe", label: "yiminghe" },
          { value: "disabled", label: "Disabled", disabled: true },
        ]}
      />
    ),
    checkbox: <Checkbox disabled={i < 2}>Test</Checkbox>,
    input: <Input disabled={i < 2} />,
  })
);

const App: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record) => ({
      disabled: Number(record.key) < 2,
    }),
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <Flex gap="medium" vertical>
      <Flex align="center" gap="medium">
        <Button
          type="primary"
          onClick={start}
          disabled={!hasSelected}
          loading={loading}
        >
          Reload
        </Button>
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
      </Flex>
      <Table<DataType>
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        rowClassName={(record) =>
          Number(record.key) < 2 ? "row-disabled" : ""
        }
      />
    </Flex>
  );
};

export default App;
