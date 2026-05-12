export const HEADER_TABLE_TABLE = [
  "No",
  "Name",
  "Capacity",
  "Status",
  "Action",
];

export const STATUS_TABLE_LIST = [
  { value: "available", label: "Available" },
  { value: "reserved", label: "Reserved" },
  { value: "unavailable", label: "Unavailable" },
];

export const INITIAL_STATE_TABLE = {
  status: "idle",
  errors: {
    id: [],
    name: [],
    description: [],
    capacity: [],
    status: [],
    _form: [],
  },
};

export const INITIAL_TABLE = {
  name: "",
  description: "",
  capacity: "",
  status: "",
};
