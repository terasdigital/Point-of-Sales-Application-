"use client";

import DataTable from "@/components/common/data-table";
import DropdownAction from "@/components/common/dropdown-action";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useDataTable from "@/hooks/use-data-table";
import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Pencil, Trash } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Menu } from "@/validations/menu-validation";
import Image from "next/image";
import { cn, convertIDR } from "@/lib/utils";
import { HEADER_TABLE_MENU } from "@/constants/menu-constant";
import { Table } from "@/validations/table-validation";
import { HEADER_TABLE_TABLE } from "@/constants/table-constant";
import { HEADER_TABLE_ORDER } from "@/constants/order-constant";

export default function OrderManagement() {
  const supabase = createClient();
  const {
    currentPage,
    currentLimit,
    currentSearch,
    handleChangePage,
    handleCurrentLimit,
    handleChangeSearch,
  } = useDataTable();
  const {
    data: orders,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["orders", currentPage, currentLimit, currentSearch],
    queryFn: async () => {
      const query = supabase
        .from("orders")
        .select(
          `
          id, order_id, customer_name, status, payment_url, tables (name, id)
          `,
          { count: "exact" },
        )
        .range((currentPage - 1) * currentLimit, currentPage * currentLimit - 1)
        .order("created_at");

      if (currentSearch) {
        query.or(
          `order_id.ilike.%${currentSearch}%,customer_name.ilike.%${currentSearch}%, status.ilike.%${currentSearch}%`,
        );
      }

      const result = await query;

      if (result.error)
        toast.error("Get Order Data Failed", {
          description: result.error.message,
        });
      return result;
    },
  });

  const [selectedAction, setSelectedAction] = useState<{
    data: Table;
    type: "Update" | "Delete";
  } | null>(null);

  const handleChangeAction = (open: boolean) => {
    if (!open) setSelectedAction(null);
  };

  const filteredData = useMemo(() => {
    return (orders?.data || []).map((order, index) => {
      return [
        currentLimit * (currentPage - 1) + index + 1,
        order.order_id,
        order.customer_name,
        (order.tables as unknown as { name: string }).name,
        <div
          className={cn("px-2 py-1 rounded-full text-white w-fit capitalize", {
            "bg-lime-600": order.status === "settle",
            "bg-sky-600": order.status === "process",
            "bg-amber-600": order.status === "reserved",
            "bg-red-600": order.status === "canceled",
          })}
        >
          {order.status}
        </div>,
        <DropdownAction menu={[]} />,
      ];
    });
  }, [orders]);

  const totalPages = useMemo(() => {
    return orders && orders.count !== null
      ? Math.ceil(orders.count / currentLimit)
      : 0;
  }, [orders]);

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row mb-4 gap-2 justify-between w-full">
        <h1 className="text-2xl font-bold">Order Management</h1>
        <div className="flex gap-2">
          <Input
            placeholder="Search by name, capacity or status..."
            onChange={(e) => handleChangeSearch(e.target.value)}
          ></Input>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Create</Button>
            </DialogTrigger>
            {/* <DialogCreateTable refetch={refetch} /> */}
          </Dialog>
        </div>
      </div>
      <DataTable
        header={HEADER_TABLE_ORDER}
        data={filteredData}
        isLoading={isLoading}
        totalPages={totalPages}
        currentPage={currentPage}
        currentLimit={currentLimit}
        onChangePage={handleChangePage}
        onChangeLimit={handleCurrentLimit}
      />
      {/* <DialogUpdateTable
        open={selectedAction !== null && selectedAction.type === "Update"}
        refetch={refetch}
        currentData={selectedAction?.data}
        handleChangeAction={handleChangeAction}
      />
      <DialogDeleteTable
        open={selectedAction !== null && selectedAction.type === "Delete"}
        refetch={refetch}
        currentData={selectedAction?.data}
        handleChangeAction={handleChangeAction}
      /> */}
    </div>
  );
}
