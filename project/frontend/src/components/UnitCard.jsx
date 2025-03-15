import { Flex, Text } from "@mantine/core";
import styles from "../css/Sidebar.module.css";

function UnitCard({ data, color, onClick }) {
  return (
    <>
      <Flex
        direction="column"
        bg={color}
        h="60px"
        w="90%"
        style={{ cursor: "pointer" }}
        justify="center"
        align="center"
        onClick={onClick}
        className={styles["unit-card"]}
      >
        <Text size="xl" fw={500}>
          {data.unitCode}
        </Text>
        <Text size="md">{data.unitName}</Text>
      </Flex>
    </>
  );
}

export default UnitCard;
