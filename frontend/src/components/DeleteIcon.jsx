import { ActionIcon } from "@mantine/core";
import { FaTrash } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const ProductDelete = ({ onDelete, id }) => {
  return (
    <ActionIcon
      onClick={(event) => {
        event.stopPropagation();
        onDelete(id);
      }}
    >
      <FaTrash size={30} color="black" />
    </ActionIcon>
  );
};

export default ProductDelete;
