import { UseFiltersColumnProps } from "react-table";

export interface SelectColumnFilterProps {
  column: UseFiltersColumnProps<Location> & { id: string };
}
