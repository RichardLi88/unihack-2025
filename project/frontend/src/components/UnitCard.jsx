import { Flex, Text } from "@mantine/core";
import styles from "../css/Sidebar.module.css"


function UnitCard({data}) {
  return (
  <>
    <Flex direction="column" bg ="lightblue" h="60px" w="90%" justify="center" align="center" className={styles['unit-card']}>
      <Text size="xl">
          {data.unitCode}
        </Text>
      <Text size="md">
          {data.unitName}
        </Text>
    </Flex>
    </>
  )
}

export default UnitCard;

