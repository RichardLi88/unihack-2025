import { useState } from "react";
import { Flex, Text } from "@mantine/core";
import styles from "../css/Sidebar.module.css";
import ClassModal from "./ClassModal";

function ClassCard({ data }) {
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const handleCardClick = () => {
    setIsModalOpen(true); 
  };

  const handleModalClose = () => {
    setIsModalOpen(false); 
  };

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
        onClick={handleCardClick}
        style={{ cursor: "pointer" }} 
      >
        <Text size="l">{data.classType}</Text>
        <Text size="sm">{data.classDuration}</Text>
      </Flex>

      <ClassModal opened={isModalOpen} onClose={handleModalClose} data={data} />
    </>
  );
}

export default ClassCard;