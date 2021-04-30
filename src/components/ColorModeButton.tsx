import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

const ColorModeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const fontColor = useColorModeValue("#EBEBEB", "#90CDF4");
  const hoverColor = useColorModeValue("#90CDF4", "#EBEBEB");

  return (
    <IconButton
      aria-label="color mode"
      position="absolute"
      right="5"
      top="5"
      size="sm"
      rounded="xl"
      bgColor="#505153"
      color={fontColor}
      fontSize="lg"
      _hover={{
        color: hoverColor,
      }}
      _focus={{
        boxShadow: "none",
      }}
      onClick={toggleColorMode}
    >
      {colorMode === "light" ? <FaMoon /> : <FaSun />}
    </IconButton>
  );
};

export default ColorModeButton;
