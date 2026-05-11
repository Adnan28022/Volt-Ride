import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Mail,
  Phone,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Hash,
  ShieldCheck,
  User as UserIcon
} from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  fetchAllUsers,
  deleteUserAccount,
} from "../../../redux/reducer/auth/AuthSlice";
import Swal from "sweetalert2";

const UserTable = ({ filteredUsers = [] }) => {
  const dispatch = useDispatch();
  const { loading, user: currentUser } = useSelector((state) => state.auth);
  const [sorting, setSorting] = useState([]);

  console.log("filteredUsers", filteredUsers)

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleDelete = (id, name) => {
    if (id === currentUser?._id || id === currentUser?.id) {
      return Swal.fire(
        "Error",
        "Aap apna account delete nahi kar sakte!",
        "error"
      );
    }
    Swal.fire({
      title: `Delete ${name}?`,
      text: "Kya aap waqayi is user ko remove karna chahte hain?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      customClass: {
        popup: 'rounded-2xl',
        confirmButton: 'rounded-lg px-6 py-2 text-sm font-bold',
        cancelButton: 'rounded-lg px-6 py-2 text-sm font-bold'
      }
    }).then((result) => {
      if (result.isConfirmed) dispatch(deleteUserAccount(id));
    });
  };

  // 1. Column Definitions
  const columns = useMemo(
    () => [
      {
        header: () => <Hash size={12} className="mx-auto" />,
        accessorKey: "index",
        enableSorting: false,
        cell: (info) => (
          <span className="text-xs font-black text-slate-300">
            {String(info.row.index + 1).padStart(2, "0")}
          </span>
        ),
        meta: { className: "text-center w-16" },
      },
      {
        accessorKey: "name",
        header: "User Details",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-tr from-slate-800 to-slate-900 rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-sm ring-2 ring-slate-50">
              {row.original.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                {row.original.name}
              </span>
              <span className="text-[10px] text-slate-400 font-bold tracking-tight uppercase">
                ID: {row.original._id?.slice(-6)}
              </span>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "email",
        header: "Contact Info",
        cell: ({ row }) => (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600">
              <Mail size={12} className="text-emerald-500" /> {row.original.email}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
              <Phone size={12} /> {row.original.phone || "Not Provided"}
            </div>
          </div>
        ),
      },
      {
        accessorKey: "role",
        header: "Access Level",
        cell: ({ getValue }) => {
          const role = getValue();
          const isAdmin = role === "admin";
          return (
            <div className="flex items-center gap-2">
              <span className={`text-[9px] font-black px-2 py-1 rounded border uppercase tracking-wider ${isAdmin
                ? "bg-purple-50 text-purple-600 border-purple-100"
                : "bg-blue-50 text-blue-600 border-blue-100"
                }`}>
                {role}
              </span>
              {isAdmin && <ShieldCheck size={12} className="text-purple-400" />}
            </div>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex justify-end">
            <button
              onClick={() => handleDelete(row.original._id, row.original.name)}
              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 rounded-lg transition-all"
              title="Delete User"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ),
        meta: { className: "text-right" }
      },
    ],
    [currentUser]
  );

  // 2. Table Instance
  const table = useReactTable({
    data: filteredUsers,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: { pagination: { pageSize: 8 } },
  });

  if (loading && filteredUsers.length === 0) {
    return (
      <div className="p-20 text-center flex flex-col items-center justify-center bg-white border border-slate-200 rounded-2xl mt-6">
        <div className="w-10 h-10 border-4 border-slate-100 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Initializing Database...</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm mt-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-slate-50/50">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className={`px-6 py-4 text-[10px] font-black uppercase tracking-wider text-slate-500 border-b border-slate-100 ${header.column.columnDef.meta?.className || ""}`}>
                    <div
                      className={`flex items-center gap-2 ${header.column.getCanSort() ? "cursor-pointer select-none" : ""}`}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <div className="text-slate-300">
                          {{
                            asc: <ArrowUp size={12} className="text-emerald-500" />,
                            desc: <ArrowDown size={12} className="text-emerald-500" />,
                          }[header.column.getIsSorted()] ?? <ArrowUpDown size={12} />}
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-50">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="group hover:bg-slate-50/30 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={`px-6 py-4 ${cell.column.columnDef.meta?.className || ""}`}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-20 text-center">
                  <div className="flex flex-col items-center opacity-40">
                    <UserIcon size={40} className="text-slate-300 mb-2" />
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No users discovered</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer: Matching Station/Bike Style */}
      <div className="px-6 py-3.5 bg-slate-50/30 border-t border-slate-100 flex items-center justify-between">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Active Directory: <span className="text-slate-900">{filteredUsers.length} Entries</span>
        </p>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="p-1.5 border border-slate-200 rounded-lg disabled:opacity-30 bg-white hover:border-emerald-500 transition-colors text-slate-600"
          >
            <ChevronLeft size={14} />
          </button>

          <div className="flex gap-1 mx-1">
            {[...Array(table.getPageCount())].map((_, i) => (
              <button
                key={i}
                onClick={() => table.setPageIndex(i)}
                className={`w-7 h-7 text-[10px] font-black rounded-lg transition-all ${table.getState().pagination.pageIndex === i
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
                  : "text-slate-500 hover:bg-slate-100"
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="p-1.5 border border-slate-200 rounded-lg disabled:opacity-30 bg-white hover:border-emerald-500 transition-colors text-slate-600"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTable;