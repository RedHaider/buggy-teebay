import {
  Box,
  Button,
  PasswordInput,
  TextInput,
  Center,
  Text,
  Flex,
  Grid,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyTextInput from "../components/formComponents/MyTextInput";
import MyPasswordInput from "../components/formComponents/MyPasswordInput";
import MyButton from "../components/formComponents/MyButton";
import { validateEmail } from "../lib/formValidation";

// eslint-disable-next-line react/prop-types
const Login = () => {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: validateEmail,
    },
  });

  const loginHandler = async (values) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        const data = await response.json();

        console.log(data);

        const authToken = data.token;

        // Save user data to localStorage for later use
        localStorage.setItem("currentUser", JSON.stringify(data.user));

        // Naive user authentication
        if (authToken) {
          navigate("/my-products");
        }
      } else {
        const errorMessage = await response.json();
        errorPopup(errorMessage.error);
      }
    } catch (error) {
      console.error(error.message);
      errorPopup("An unexpected error occurred. Please try again.");
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
      <Text fz={"xl"}>SIGN IN</Text>
      <Box
        maw={450}
        m="lg"
        p="6rem"
        sx={{
          border: "2px rgba(162, 160, 160, 0.412) solid",
        }}
      >
        <form onSubmit={form.onSubmit((values) => loginHandler(values))}>
          <Grid gutter="xl">
            <Grid.Col>
              <MyTextInput
                placeholder="Email"
                inputProps={{ ...form.getInputProps("email") }}
              />
            </Grid.Col>
            <Grid.Col>
              <MyPasswordInput
                placeholder="Password"
                inputProps={{ ...form.getInputProps("password") }}
              />
            </Grid.Col>
            <Grid.Col></Grid.Col>
            <Grid.Col>
              <Center>
                <MyButton text="login" />
              </Center>
            </Grid.Col>
            <Grid.Col></Grid.Col>
            <Grid.Col>
              <Center>
                <Text>
                  {`Don't have an account?`} <Link to="/register">Signup</Link>
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

export default Login;
