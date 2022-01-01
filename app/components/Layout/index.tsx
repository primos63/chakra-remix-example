import { NavLink } from "remix";
import { Box, HStack, Link as ChakraLink, Spacer, useColorMode } from "@chakra-ui/react";
import { getColor } from '@chakra-ui/theme-tools'
import { FaMoon, FaSun } from 'react-icons/fa'
import { Switch } from "../switch"
import { useTheme } from "@emotion/react";

export function Layout({ children }: { children: React.ReactNode }) {
  const { colorMode, toggleColorMode } = useColorMode()
  const theme = useTheme()

  return (
    <Box>
      <HStack as="nav" spacing={4} p={4}>
        <ChakraLink as={NavLink} to="/">
          Home
        </ChakraLink>
        <ChakraLink as={NavLink} to="/i-dont-exist">
          No route
        </ChakraLink>
        <ChakraLink as={NavLink} to="/route-with-error">
          Error
        </ChakraLink>
        <ChakraLink as={NavLink} to="/good-route">
          Real route
        </ChakraLink>
        <Spacer />
        <Switch
          aria-label="Toggle color mode"
          leftIcon={<FaMoon color={getColor(theme, 'yellow.400')} />}
          rightIcon={<FaSun color={getColor(theme, 'orange.300')} />}
          isChecked={colorMode === 'dark'}
          onChange={() => toggleColorMode()}
        />
      </HStack>

      <Box as="main" p={4}>
        {children}
      </Box>
    </Box>
  );
}
