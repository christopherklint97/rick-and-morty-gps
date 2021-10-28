import { useMemo } from "react";
import { Row } from "react-table";
import { SelectColumnFilterProps } from "../types/components/SelectColumnFilter";

export default function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}: SelectColumnFilterProps) {
  const options = useMemo(() => {
    const options = new Set<string>();
    preFilteredRows.forEach((row: Row<Location>) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
