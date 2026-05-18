import DialogDelete from "@/components/common/dialog-delete";
import { Profile } from "@/types/auth";
import { deleteTable } from "../actions";
import { startTransition, useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Menu } from "@/validations/menu-validation";
import { INITIAL_STATE_MENU } from "@/constants/menu-constant";
import { Table } from "@/validations/table-validation";
import { INITIAL_STATE_TABLE } from "@/constants/table-constant";

export default function DialogDeleteTable({
  open,
  refetch,
  currentData,
  handleChangeAction,
}: {
  refetch: () => void;
  currentData?: Table;
  open: boolean;
  handleChangeAction: (open: boolean) => void;
}) {
  const [deleteTableState, deleteTableAction, isPendingDeleteTable] =
    useActionState(deleteTable, INITIAL_STATE_TABLE);

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("id", currentData!.id);
    startTransition(() => {
      deleteTableAction(formData);
    });
  };

  useEffect(() => {
    if (deleteTableState.status === "error") {
      toast.error("Delete Table Failed", {
        description: deleteTableState.errors?._form?.[0],
      });
    }

    if (deleteTableState.status === "success") {
      toast.success("Delete Table Success");
      handleChangeAction?.(false);
      refetch();
    }
  }, [deleteTableState]);
  return (
    <DialogDelete
      open={open}
      onOpenChange={handleChangeAction}
      isLoading={isPendingDeleteTable}
      onSubmit={onSubmit}
      title="Table"
    />
  );
}
