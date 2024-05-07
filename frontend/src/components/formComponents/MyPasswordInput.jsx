import { PasswordInput } from "@mantine/core";

const MyPasswordInput = ({ placeholder, inputProps }) => {
  return (
    <>
      <PasswordInput size="md" placeholder={placeholder} {...inputProps} />
    </>
  );
};

export default MyPasswordInput;
