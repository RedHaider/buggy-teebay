/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Stepper,
  Button,
  TextInput,
  Title,
  Flex,
  NumberInput,
  MultiSelect,
  Select,
  Text,
  ActionIcon,
  Textarea,
  Grid,
  Center,
  Group,
  Container,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { GrClose } from "react-icons/gr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddProduct({ onClose, userId, categories }) {
  // TODO Reusable input/form componennts
  const [active, setActive] = useState(0);

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      purchase_price: "",
      rent_price: "",
      rent_duration: "",
      categories: [],
    },
  });

  // display error message to user
  const errorPopup = (message) => toast.error(message);

  const validateStep = () => {
    const { title, categories, purchase_price, rent_price, rent_duration } =
      form.values;
    if (active === 0 && title.trim() === "") {
      errorPopup("Title is required.");
      return false;
    } else if (active === 1 && categories.length === 0) {
      errorPopup("At least one category must be selected.");
      return false;
    } else if (
      active === 3 &&
      (purchase_price === "" || rent_price === "" || rent_duration === "")
    ) {
      errorPopup("All price and rent fields are required.");
      return false;
    }
    return true;
  };

  const nextStep = () => {
    const isStepValid = validateStep();
    if (isStepValid) {
      setActive((current) => (current < 4 ? current + 1 : current));
    }
  };

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const handleSubmit = async () => {
    try {
      const apiRes = await fetch(
        `http://localhost:3001/api/v1/${userId}/product`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form.values),
        }
      );

      if (!apiRes.ok) {
        console.error("Error saving product data");
        return;
      }
      alert("Product added successfully!");
      onClose();
    } catch (error) {
      console.error("Error saving product data:", error);
    }
  };

  return (
    <Container mb={70}>
      <Grid mah={"80vh"} mb={50}>
        <Grid.Col>
          <Flex justify={"flex-end"} h={"100px"} mt={"2rem"}>
            <ActionIcon onClick={onClose}>
              <GrClose />
            </ActionIcon>
          </Flex>
        </Grid.Col>
        <Grid.Col span={12}>
          <Center>
            <Stepper
              active={active}
              onStepClick={setActive}
              breakpoint="sm"
              w={"80vh"}
              allowNextStepsSelect={false}
              color="indigo"
            >
              <Stepper.Step>
                <Center my={30}>
                  <Title fw={700}>Select a title for your product</Title>
                </Center>
                <TextInput {...form.getInputProps("title")} size="xl" />
              </Stepper.Step>

              <Stepper.Step>
                <Center my={30}>
                  <Title fw={700}>Select Categories</Title>
                </Center>
                <MultiSelect
                  size="md"
                  data={categories}
                  placeholder="Select a category"
                  {...form.getInputProps("categories")}
                />
              </Stepper.Step>

              <Stepper.Step>
                <Center my={30}>
                  <Title fw={700}>Select Description</Title>
                </Center>
                <Textarea {...form.getInputProps("description")} size="xl" />
              </Stepper.Step>

              <Stepper.Step>
                <Center my={30}>
                  <Title fw={700}>Select Price</Title>
                </Center>
                <Center>
                  <NumberInput
                    maw={300}
                    size="md"
                    placeholder="Purchase price"
                    {...form.getInputProps("purchase_price")}
                  />
                </Center>
                <Group position="center" mt={50}>
                  <NumberInput
                    label="Rent"
                    placeholder="$40"
                    {...form.getInputProps("rent_price")}
                  />
                  <Select
                    mt={20}
                    placeholder="Select option"
                    data={[
                      { value: "daily", label: "Daily" },
                      { value: "hourly", label: "Hourly" },
                      { value: "weekly", label: "Weekly" },
                      { value: "monthly", label: "Monthly" },
                    ]}
                    {...form.getInputProps("rent_duration")}
                  />
                </Group>
              </Stepper.Step>

              <Stepper.Completed>
                <Grid my={50}>
                  <Grid.Col>
                    <Title>Summary</Title>
                  </Grid.Col>
                  <Grid.Col>
                    <Text>Title: {form.values.title}</Text>
                  </Grid.Col>
                  <Grid.Col>
                    <Text>
                      Categories:{" "}
                      {form.values.categories
                        .map((category) => {
                          const categoryName = category.toLowerCase();
                          return (
                            categoryName.charAt(0).toUpperCase() +
                            categoryName.slice(1)
                          );
                        })
                        .join(", ")}
                    </Text>
                  </Grid.Col>
                  <Grid.Col>
                    <Text>Description: {form.values.description}</Text>
                  </Grid.Col>
                  <Grid.Col>
                    <Text>
                      Price: {form.values.purchase_price}, To rent:{" "}
                      {form.values.rent_price}
                    </Text>
                  </Grid.Col>
                </Grid>
              </Stepper.Completed>
            </Stepper>
          </Center>
        </Grid.Col>
      </Grid>
      <Group position="apart">
        {active !== 0 && (
          <Button variant="light" color="violet" onClick={prevStep}>
            Back
          </Button>
        )}
        {active !== 4 && (
          <Button color="violet" onClick={nextStep}>
            Next step
          </Button>
        )}
        {active === 4 && (
          <Button color="violet" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </Group>
      <ToastContainer position="top-center" autoClose={1500} />
    </Container>
  );
}

export default AddProduct;
