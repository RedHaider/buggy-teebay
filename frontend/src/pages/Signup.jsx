import { Box, Center, Text, Flex, Grid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyTextInput from "../components/formComponents/MyTextInput";
import MyPasswordInput from "../components/formComponents/MyPasswordInput";
import MyButton from "../components/formComponents/MyButton";
import {
  validateAddress,
  validateConfirmPassword,
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePassword,
} from "../lib/formValidation";

const Signup = () => {
  const navigate = useNavigate();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      email: "",
      password: "",
      confirm_password: "",
      address: "",
      phone_number: "",
      first_name: "",
      last_name: "",
    },
    validate: {
      first_name: validateFirstName,
      last_name: validateLastName,
      address: validateAddress,
      email: validateEmail,
      password: validatePassword,
      confirm_password: validateConfirmPassword,
    },
  });

  const registrationHandler = async (values) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        alert("Successfully signed up! Login to continue.");
        navigate("/");
      } else {
        const data = await response.json();
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Error registering user:", error.message);
      errorPopup(error.message);
    }
  };

  // Progress messages to user
  const errorPopup = (message) => toast.error(message);

  return (
    <Flex
      justify="center"
      align="center"
      direction="column"
      style={{ minHeight: "100vh" }}
    >
      <Text fz={"xl"}>SIGN UP</Text>
      <Box
        maw={750}
        m="lg"
        p="6rem"
        sx={{
          border: "2px rgba(162, 160, 160, 0.412) solid",
        }}
      >
        <form onSubmit={form.onSubmit((values) => registrationHandler(values))}>
          <Grid gutter="xl">
            <Grid.Col span={6}>
              <MyTextInput
                placeholder="First Name"
                inputProps={{ ...form.getInputProps("first_name") }}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <MyTextInput
                placeholder="Last Name"
                inputProps={{ ...form.getInputProps("last_name") }}
              />
            </Grid.Col>
            <Grid.Col>
              <MyTextInput
                placeholder="Address"
                inputProps={{ ...form.getInputProps("address") }}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <MyTextInput
                placeholder="Email"
                inputProps={{ ...form.getInputProps("email") }}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <MyTextInput
                placeholder="Phone Number"
                inputProps={{ ...form.getInputProps("phone_number") }}
              />
            </Grid.Col>
            <Grid.Col>
              <MyPasswordInput
                placeholder="Password"
                inputProps={{ ...form.getInputProps("password") }}
              />
            </Grid.Col>
            <Grid.Col>
              <MyPasswordInput
                placeholder="Confirm password"
                inputProps={{ ...form.getInputProps("confirm_password") }}
              />
            </Grid.Col>
            <Grid.Col></Grid.Col>
            <Grid.Col>
              <MyButton text="register" />
            </Grid.Col>
            <Grid.Col></Grid.Col>
            <Grid.Col>
              <Center>
                <Text>
                  {`Already have an account? `} <Link to="/">Sign In</Link>
                </Text>
              </Center>
            </Grid.Col>
          </Grid>
        </form>
      </Box>
      <ToastContainer position="top-center" autoClose={false} />
    </Flex>
  );
};

export default Signup;
