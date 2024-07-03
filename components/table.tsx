"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ComplexityDetail } from "@/app/analyzer/page"

export const columns: ColumnDef<ComplexityDetail>[] = [
  {
    accessorKey: "name",
    header:({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Function name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "big_o_complexity",
    header: "Big O complexity ",
    cell: ({ row }) => <div className="lowercase">{row.getValue("big_o_complexity")}</div>,
  },
  {
    accessorKey: "cyclomatic_complexity",
    header: "Ciclomatic complexity",
    cell: ({ row }) => (
        <div className="capitalize">{row.getValue("cyclomatic_complexity")}</div>
      ),
  },

]

export function DataTable({data}: { data: ComplexityDetail[] }) {
  // console.log(data[0]);
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  // const data = [
  //   {
  //     "name": "extraer_terminales",
  //     "big_o_complexity": "O(n^3)",
  //     "cyclomatic_complexity": 5
  // },
  // {
  //     "name": "calcular_primeros_produccion",
  //     "big_o_complexity": "O(n)",
  //     "cyclomatic_complexity": 8
  // },
  // {
  //     "name": "esTerminal",
  //     "big_o_complexity": "O(1)",
  //     "cyclomatic_complexity": 1
  // },
  // {
  //     "name": "factorizar_gramatica",
  //     "big_o_complexity": "O(n^2)",
  //     "cyclomatic_complexity": 9
  // },
  // {
  //     "name": "encontrar_prefijo_comun",
  //     "big_o_complexity": "O(n)",
  //     "cyclomatic_complexity": 5
  // },
  // {
  //     "name": "calcularSiguientes",
  //     "big_o_complexity": "O(n^4)",
  //     "cyclomatic_complexity": 12
  // },
  // {
  //     "name": "getPrimeros",
  //     "big_o_complexity": "O(1)",
  //     "cyclomatic_complexity": 1
  // },
  // {
  //     "name": "getnTInicial",
  //     "big_o_complexity": "O(1)",
  //     "cyclomatic_complexity": 1
  // },
  // {
  //     "name": "quitar_recursividad",
  //     "big_o_complexity": "O(n^2)",
  //     "cyclomatic_complexity": 8
  // },
  // {
  //     "name": "calcular_conjuntos_prediccion",
  //     "big_o_complexity": "O(n^2)",
  //     "cyclomatic_complexity": 4
  // },
  // {
  //     "name": "_inicializar_componentes",
  //     "big_o_complexity": "O(n)",
  //     "cyclomatic_complexity": 2
  // },
  // {
  //     "name": "resultados",
  //     "big_o_complexity": "No calculable (Recursiva)",
  //     "cyclomatic_complexity": 1
  // },
  // {
  //     "name": "calcularPrimerosDeProduccion",
  //     "big_o_complexity": "O(n)",
  //     "cyclomatic_complexity": 9
  // },
  // {
  //     "name": "calcularPrimeros",
  //     "big_o_complexity": "No calculable (Recursiva)",
  //     "cyclomatic_complexity": 6
  // },
  // {
  //     "name": "getSiguientes",
  //     "big_o_complexity": "O(1)",
  //     "cyclomatic_complexity": 1
  // },
  // {
  //     "name": "__init__",
  //     "big_o_complexity": "O(1)",
  //     "cyclomatic_complexity": 1
  // },
  // {
  //     "name": "convertir_a_listas",
  //     "big_o_complexity": "O(n)",
  //     "cyclomatic_complexity": 2
  // },
  // {
  //     "name": "getTerminales",
  //     "big_o_complexity": "O(1)",
  //     "cyclomatic_complexity": 1
  // },
  // {
  //     "name": "getProducciones",
  //     "big_o_complexity": "O(1)",
  //     "cyclomatic_complexity": 1
  // },
  // {
  //     "name": "getNoTerminales",
  //     "big_o_complexity": "O(1)",
  //     "cyclomatic_complexity": 1
  // },
  // {
  //     "name": "asignar_nuevo_no_terminal",
  //     "big_o_complexity": "O(n)",
  //     "cyclomatic_complexity": 3
  // }
  // ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
         
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
    
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
