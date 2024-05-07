/* eslint-disable react/prop-types */
import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Group,
  Modal,
  Text,
  Title,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { GrClose } from "react-icons/gr";
import { formatDate } from "../../helper/formatDate";

const BuyOrRent = ({ product, onClose, userId }) => {
  // TODO Reusable input/form componennts
  const [rentOpened, { open: rentOpen, close: rentClose }] =
    useDisclosure(false);
  const [buyOpened, { open: buyOpen, close: buyClose }] = useDisclosure(false);

  const rentalDates = useForm({
    initialValues: {
      rentalStart: "",
      rentalEnd: "",
    },
  });

  const productCategoriesArray = product.categories.map(({ category }) => {
    return category.name;
  });

  let reshapedProduct = {
    title: product.title,
    description: product.description,
    purchase_price: product.purchase_price,
    rent_price: product.rent_price,
    rent_duration: product.rent_duration,
    categories: productCategoriesArray,
  };

  const handleRentClick = () => {
    rentOpen();
  };
  const handleBuyClick = () => {
    buyOpen();
  };

  const handleBuyConfirm = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/buy/${userId}/${product.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: product.id,
          }),
        }
      );

      if (response.ok) {
        console.log("Product successfully purchased");
      } else {
        console.error("Failed to purchase the product");
      }

      onClose();
    } catch (error) {
      console.error("An error occurred while purchasing the product:", error);
    }
  };

  const handleRentConfirm = async () => {
    try {
      const formattedRentalStart = formatDate(rentalDates.values.rentalStart);
      const formattedRentalEnd = formatDate(rentalDates.values.rentalEnd);

      const response = await fetch(
        `http://localhost:3001/api/v1/rent/${userId}/${product.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: product.id,
            rentalStart: formattedRentalStart,
            rentalEnd: formattedRentalEnd,
          }),
        }
      );

      if (response.ok) {
        console.log("Product successfully rented");
      } else {
        console.error("Failed to rent the product");
      }

      onClose();
    } catch (error) {
      console.error("An error occurred while renting the product:", error);
    }
  };

  return (
    <Box w={"full"}>
      <Flex justify={"flex-end"} m={"lg"}>
        <ActionIcon onClick={onClose}>
          <GrClose />
        </ActionIcon>
      </Flex>
      <Box mx={"30%"} mb={"2rem"}>
        <Box mb={"2rem"}>
          <Title>{reshapedProduct.title}</Title>
          <Text>
            Categories:{" "}
            {productCategoriesArray &&
              productCategoriesArray
                .map((category) => {
                  const categoryName = category.toLowerCase();
                  return (
                    categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
                  );
                })
                .join(", ")}
          </Text>
          <Text>Price: ${reshapedProduct.purchase_price}</Text>
          <Text>{reshapedProduct.description}</Text>
        </Box>
        <Group position="right">
          <Button uppercase color="violet" onClick={handleRentClick}>
            Rent
          </Button>
          <Button uppercase color="violet" onClick={handleBuyClick}>
            Buy
          </Button>
        </Group>
        <Modal opened={rentOpened} onClose={rentClose} centered padding={"xl"}>
          <Title order={2} fw={500}>
            Rental Period{" "}
          </Title>
          <Group mb={30} mt={40} position="apart">
            <DateInput
              valueFormat="DD/MM/YYYY"
              label="From"
              placeholder="dd/mm/yyyy"
              maw={200}
              {...rentalDates.getInputProps("rentalStart")}
            />
            <DateInput
              valueFormat="DD/MM/YYYY"
              label="To"
              placeholder="dd/mm/yyyy"
              maw={200}
              {...rentalDates.getInputProps("rentalEnd")}
            />
          </Group>
          <Group position="right" spacing={"md"} mt={"5rem"}>
            <Button uppercase onClick={rentClose} color="red">
              Go Back
            </Button>
            <Button uppercase color="violet" onClick={handleRentConfirm}>
              Confirm Rent
            </Button>
          </Group>
        </Modal>
        <Modal opened={buyOpened} onClose={buyClose} centered padding={"xl"}>
          <Title order={2} fw={300}>
            Are you sure you want to buy this Product?
          </Title>
          <Group position="right" spacing={"lg"} mt={"5rem"}>
            <Button uppercase onClick={buyClose} color="red">
              No
            </Button>
            <Button uppercase color="violet" onClick={handleBuyConfirm}>
              Yes
            </Button>
          </Group>
        </Modal>
      </Box>
    </Box>
  );
};

export default BuyOrRent;
