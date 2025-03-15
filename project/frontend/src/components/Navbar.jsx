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
          Edit
        </Button>
        <Menu>
          <Menu.Target>
            <Button variant="subtle" color="gray.0">
              Semester 1 ▼
            </Button>
          </Menu.Target>
        </Menu>
        {/* Move Help and Settings Left of Logout */}
        <ActionIcon variant="subtle" color="gray.0" size="lg">
          <IconHelpCircle size={20} />
        </ActionIcon>
        <ActionIcon variant="subtle" color="gray.0" size="lg">
          <IconSettings size={20} />
        </ActionIcon>

        <Button variant="subtle" color="gray.0">
          Logout
        </Button>
      </Flex>
    </Flex>
  );
}

export default Navbar;
