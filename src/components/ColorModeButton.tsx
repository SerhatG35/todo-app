import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

const ColorModeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const fontColor = useColorModeValue("#EBEBEB", "#E9D6AF");
  const hoverColor = useColorModeValue("#E9D6AF", "#EBEBEB");

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
