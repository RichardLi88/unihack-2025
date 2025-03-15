import { Flex, Text } from "@mantine/core";
import styles from "../css/Sidebar.module.css";

function ClassCard({ data }) {
  return (
    <>
      <Flex
        direction="row"
        bg="#BDBDBD"
        h="40px"
        mt="10px"
        w="70%"
        mx="5%"
        px="10px"
        justify="space-between"
        align="center"
        className={styles["unit-card"]}
      >
        <Text size="l">{data.classType}</Text>
        <Text size="sm">{data.classDuration}</Text>
      </Flex>
    </>
  );
}

export default ClassCard;
