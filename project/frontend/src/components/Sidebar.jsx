import { Button, Flex, ScrollArea } from "@mantine/core";
import Unit from "./Unit";
import { IconSparkles } from "@tabler/icons-react";
import { useContext } from "react";
import { PageContext } from "../contexts/PageContext";
import PlannerFeatures from "./PlannerFeatures";

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
];

function Sidebar() {
  const { page } = useContext(PageContext);
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
        {page === "planner" && <PlannerFeatures />}
        {units.map((unit) => {
          return <Unit key={unit.unitCode} data={unit} />;
        })}
      </ScrollArea>
    </Flex>
  );
}

export default Sidebar;
