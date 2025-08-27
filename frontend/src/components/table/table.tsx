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
    <div className="w-full overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 table-auto">
        <thead>
          <tr>
            {columns?.map((col, index) => (
              <th
                key={index}
                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-gray-800">
          {data?.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-700">
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className="px-4 py-2 whitespace-nowrap text-sm text-white"
                  data-label={col.title} // For mobile stacking if needed
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
