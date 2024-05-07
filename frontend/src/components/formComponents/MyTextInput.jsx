import { TextInput } from "@mantine/core";

const MyTextInput = ({ placeholder, inputProps, size }) => {
  if (!size) {
    size = "md";
  }
  return (
    <>
      <TextInput size={size} placeholder={placeholder} {...inputProps} />
    </>
  );
};

export default MyTextInput;
