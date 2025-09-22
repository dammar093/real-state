import React from "react";
import { Select } from "antd";

interface EntryProps {
  onChange?: (value: string) => void;
  defaultValue?: string;
  total: number;
}

const Entry: React.FC<EntryProps> = ({
  onChange,
  defaultValue = "10",
  total,
}) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span>Show</span>
      <Select
        defaultValue={defaultValue}
        style={{ maxWidth: 80 }}
        onChange={onChange} // pass the value to parent
      >
        <Select.Option value="10">10</Select.Option>
        <Select.Option value="20">20</Select.Option>
        <Select.Option value="30">30</Select.Option>
        <Select.Option value={`${total}`}>All</Select.Option>
      </Select>
      <span>entries</span>
    </div>
  );
};

export default Entry;
