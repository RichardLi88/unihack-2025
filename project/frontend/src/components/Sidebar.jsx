import { Flex, ScrollArea } from "@mantine/core";
import Unit from "./Unit";
const units = [
  {
    unitCode: "FIT3171",
    unitName: "Databases",
    classes: [
      {
        cl_id: 123,
        classType: "Seminar",
        classDuration: "1hr",
      },
      {
        cl_id: 124,
        classType: "Applied",
        classDuration: "2hr",
      },
    ],
  },
  {
    unitCode: "FIT2099",
    unitName: "Databases",
    classes: [
      {
        cl_id: 123,
        classType: "Seminar",
        classDuration: "1hr",
      },
      {
        cl_id: 124,
        classType: "Applied",
        classDuration: "2hr",
      },
    ],
  },
  {
    unitCode: "FIT3159",
    unitName: "Databases",
    classes: [
      {
        cl_id: 123,
        classType: "Seminar",
        classDuration: "1hr",
      },
      {
        cl_id: 124,
        classType: "Applied",
        classDuration: "2hr",
      },
    ],
  },
];

function Sidebar() {
  return (
    <Flex
      direction="column"
      align="center"
      w="15%"
      bg="blue"
      h="100vh"
      py="20px"
    >
      <ScrollArea w="100%">
        {units.map((unit) => {
          return <Unit key={unit.unitCode} data={unit} />;
        })}
      </ScrollArea>
    </Flex>
  );
}

export default Sidebar;
