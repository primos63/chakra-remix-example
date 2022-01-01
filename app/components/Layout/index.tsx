import { Link, NavLink } from "remix";
import { Box, HStack, Link as ChakraLink } from "@chakra-ui/react";

export function Layout({ children }: { children: React.ReactNode }) {
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
      </HStack>

      <Box as="main" p={4}>
        {children}
      </Box>
    </Box>
  );
}
