// components/table/table.tsx
import React, { ReactNode } from "react";

export interface Column<T> {
  title: string;
  selector: (row: T) => ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data?: T[];
}

const Table = <T extends Record<string, any>>({
  columns,
  data,
}: TableProps<T>) => {
  return (
    <div className="overflow-x-auto w-full rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            {columns?.map((col, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data?.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-4 whitespace-nowrap text-sm text-white"
                >
                  {col.selector(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
