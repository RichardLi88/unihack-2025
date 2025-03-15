import { Text, Button, Menu, Flex, ActionIcon } from "@mantine/core";
import { IconSettings, IconHelpCircle } from "@tabler/icons-react";

function Navbar() {
  return (
    <Flex
      h={50}
      px="md"
      bg="blue.9"
      c="white"
      align="center"
      justify="space-between"
    >
      <Text size="lg" weight={500}>
        Allocate++
      </Text>
      <Flex gap="md" align="center">
        <Button variant="subtle" color="gray.0">
          Planner
        </Button>
        <ActionIcon variant="subtle" color="gray.0" size="lg">
          <IconHelpCircle size={20} />
        </ActionIcon>
        <ActionIcon variant="subtle" color="gray.0" size="lg">
          <IconSettings size={20} />
        </ActionIcon>
        <Menu>
          <Menu.Target>
            <Button variant="subtle" color="gray.0">
              Period ▼
            </Button>
          </Menu.Target>
        </Menu>
        <Button variant="subtle" color="gray.0">
          Home
        </Button>
        <Button variant="subtle" color="gray.0">
          Logout
        </Button>
      </Flex>
    </Flex>
  );
}

export default Navbar;
