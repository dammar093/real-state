import React from "react";
import { Select } from "antd";
const Entry = () => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span>Show</span>
      <Select defaultValue="10" style={{ maxWidth: 80 }}>
        <Select.Option value="10">10</Select.Option>
        <Select.Option value="20">20</Select.Option>
        <Select.Option value="30">50</Select.Option>
        <Select.Option value="40">All</Select.Option>
      </Select>
      <span>entries</span>
    </div>
  );
};

export default Entry;
