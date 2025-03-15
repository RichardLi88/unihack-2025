import { Flex, ScrollArea } from "@mantine/core";
import Unit from "./Unit";

const units = [
  {
    unitCode: "FIT3171",
    unitName: "Databases",
    classes: [
      { cl_id: 123, classType: "Seminar", classDuration: "1hr" },
      { cl_id: 124, classType: "Applied", classDuration: "2hr" },
    ],
  },
  {
    unitCode: "FIT2004",
    unitName: "Algorithms",
    classes: [
      { cl_id: 125, classType: "Lecture", classDuration: "1.5hr" },
      { cl_id: 126, classType: "Workshop", classDuration: "2hr" },
    ],
  },
  {
    unitCode: "FIT1047",
    unitName: "Cybersecurity",
    classes: [
      { cl_id: 127, classType: "Lab", classDuration: "3hr" },
      { cl_id: 128, classType: "Tutorial", classDuration: "1hr" },
    ],
  },
  {
    unitCode: "FIT1051",
    unitName: "AI & ML",
    classes: [
      { cl_id: 129, classType: "Lecture", classDuration: "2hr" },
      { cl_id: 130, classType: "Practical", classDuration: "1.5hr" },
    ],
  },
];

const colors = ["#64B5F6", "#81C784", "#FFD54F", "#E57373"]; // Light blue, green, yellow, red

function Sidebar() {
  return (
    <Flex
      direction="column"
      align="center"
      w="15%"
      bg="#F5F5F5"
      h="100vh"
      py="20px"
    >
      <ScrollArea w="100%">
        {units.map((unit, index) => (
          <Unit key={unit.unitCode} data={unit} bgColor={colors[index % colors.length]} />
        ))}
      </ScrollArea>
    </Flex>
  );
}

export default Sidebar;
