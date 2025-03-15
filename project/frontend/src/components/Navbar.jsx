import { useContext, useState } from "react";
import { Text, Button, Menu, Flex, ActionIcon } from "@mantine/core";
import {
  IconSettings,
  IconHelpCircle,
  IconChevronDown,
  IconEdit,
} from "@tabler/icons-react";
import { PageContext } from "../contexts/PageContext";

function Navbar() {
  const [selectedSemester, setSelectedSemester] = useState("Semester 1");
  const { setEdit } = useContext(PageContext);

  const handleEdit = () => {
    setEdit((e) => !e);
  };

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

      {/* Navbar Right Section - Items slightly closer spaced */}
      <Flex gap="md" align="center">
        <Button variant="subtle" color="gray.0" onClick={handleEdit}>
          Edit
        </Button>

        {/* Semester Selection Dropdown */}
        <Menu>
          <Menu.Target>
            <Button
              variant="subtle"
              color="gray.0"
              rightSection={<IconChevronDown size={14} />}
            >
              {selectedSemester}
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => setSelectedSemester("Semester 1")}>
              Semester 1
            </Menu.Item>
            <Menu.Item onClick={() => setSelectedSemester("Semester 2")}>
              Semester 2
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>

        {/* Help and Settings Icons */}
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
