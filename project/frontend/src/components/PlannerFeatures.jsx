import { Button, Flex, Text, Slider } from "@mantine/core";
import { IconSparkles } from "@tabler/icons-react";
import { useContext } from "react";
import { FilterContext } from "../contexts/FilterContext";

function PlannerFeatures() {
  const { hours, setHours } = useContext(FilterContext);

  return (
    <Flex direction="column" py="10px" w="100%" align="center" justify="center">
      <Button
        variant="gradient"
        gradient={{ from: "#DD73D6", to: "#12DFF3", deg: 90 }}
        h="100px"
        w="90%"
        rightSection={<IconSparkles />}
      >
        Generate for me!
      </Button>

      <Flex direction="column" align="center" w="90%">
        <Text size="sm" mb="xs">
          Max Hours of Class per Day:{<br />}
          {hours} hours
        </Text>
        <Slider
          w="100%"
          value={hours}
          onChange={setHours}
          color="purple"
          min={1}
          max={10}
          step={1}
          marks={[
            { value: 1, label: "1" },
            { value: 2, label: "2" },
            { value: 3, label: "3" },
            { value: 4, label: "4" },
            { value: 5, label: "5" },
            { value: 6, label: "6" },
            { value: 7, label: "7" },
            { value: 8, label: "8" },
            { value: 9, label: "9" },
            { value: 10, label: "10" },
          ]}
        />
      </Flex>
    </Flex>
  );
}

export default PlannerFeatures;
