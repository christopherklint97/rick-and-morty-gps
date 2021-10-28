import { useMemo } from "react";
import {
  Row,
  useExpanded,
  useFilters,
  useFlexLayout,
  useTable,
} from "react-table";
import { Location } from "../types/gql/getLocations";
import Resident from "./Resident";
import SelectColumnFilter from "./SelectColumnFilter";
import styles from "../styles/components/Table.module.css";

export default function Table({ data }: { data: Location[] }) {
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Filter: () => null,
      },
      {
        Header: "Type",
        accessor: "type",
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Dimension",
        accessor: "dimension",
        Filter: SelectColumnFilter,
        filter: "includes",
        width: 170,
      },
      {
        Header: "Alive residents",
        accessor: (_: Row<Location>, index: number) => {
          let count = 0;
          for (const resident of data[index].residents) {
            if (resident.status === "Alive") count++;
          }
          return count;
        },
        Filter: () => null,
        width: 70,
      },
      {
        Header: "Dead residents",
        accessor: (_: Row<Location>, index: number) => {
          let count = 0;
          for (const resident of data[index].residents) {
            if (resident.status === "Dead") count++;
          }
          return count;
        },
        Filter: () => null,
        width: 70,
      },
      {
        Header: "Current guests",
        accessor: (_: Row<Location>, index: number) => {
          let count = 0;
          for (const resident of data[index].residents) {
            if (
              resident.origin.id !== data[index].id &&
              resident.location.id === data[index].id
            )
              count++;
          }
          return count;
        },
        Filter: () => null,
        width: 70,
      },
      {
        Header: "Robots",
        accessor: (_: Row<Location>, index: number) => {
          let count = 0;
          for (const resident of data[index].residents) {
            if (resident.species === "Robot") count++;
          }
          return count;
        },
        Filter: () => null,
        width: 70,
      },
      {
        Header: "Humans",
        accessor: (_: Row<Location>, index: number) => {
          let count = 0;
          for (const resident of data[index].residents) {
            if (resident.species === "Human") count++;
          }
          return count;
        },
        Filter: () => null,
        width: 70,
      },
      {
        Header: "Aliens",
        accessor: (_: Row<Location>, index: number) => {
          let count = 0;
          for (const resident of data[index].residents) {
            if (resident.species === "Alien") count++;
          }
          return count;
        },
        Filter: () => null,
        width: 70,
      },
      {
        Header: () => null,
        id: "expander",
        Cell: ({ row }: { row: any }) => {
          return data[row.index].residents.length ? (
            <span {...row.getToggleRowExpandedProps()}>
              {row.isExpanded ? "Hide residents" : "Show residents >"}
            </span>
          ) : null;
        },
        Filter: () => null,
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    totalColumnsWidth,
  } = useTable<any>(
    {
      columns,
      data,
    },
    useExpanded,
    useFilters,
    useFlexLayout
  );

  return (
    <table className={styles.table} {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          // eslint-disable-next-line react/jsx-key
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              // eslint-disable-next-line react/jsx-key
              <th {...column.getHeaderProps()}>
                {column.render("Header")}
                <div>{column.render("Filter")}</div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row: any) => {
          prepareRow(row);
          return (
            // eslint-disable-next-line react/jsx-key
            <>
              <tr {...row.getRowProps()}>
                {row.cells.map((cell: any) => {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
              {row.isExpanded ? (
                <tr>
                  <td
                    className={styles.residentsContainer}
                    colSpan={totalColumnsWidth}
                  >
                    {data[row.index].residents.map((resident) => (
                      <Resident key={resident.id} resident={resident} />
                    ))}
                  </td>
                </tr>
              ) : null}
            </>
          );
        })}
      </tbody>
    </table>
  );
}
