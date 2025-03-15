import { useContext, useState } from "react";
import { Button, Flex, Text } from "@mantine/core";
import styles from "../css/Sidebar.module.css";
import ClassModal from "./ClassModal";
import { PageContext } from "../contexts/PageContext";
import { IconCircleX, IconEdit } from "@tabler/icons-react";

function ClassCard({ data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const { edit, editUnit, setEditUnit, unitInfo, setUnitInfo } =
    useContext(PageContext);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleActiveEdit = () => {
    if (editUnit === data.cl_id) {
      setEditUnit(-1);
      setUnitInfo("");
    } else {
      setEditUnit(data.cl_id);
      setUnitInfo({ unitCode: data.unitCode, classType: data.classType });
    }
  };

  return (
    <>
      <Flex w="100%" align="center" justify="end">
        {edit && (
          <Button onClick={handleActiveEdit} variant="subtle">
            {editUnit !== data.cl_id && <IconEdit />}
            {editUnit === data.cl_id && <IconCircleX color="red" />}
          </Button>
        )}
        <Flex
          direction="row"
          bg="#BDBDBD"
          h="40px"
          mt="10px"
          w="60%"
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

        <ClassModal
          opened={isModalOpen}
          onClose={handleModalClose}
          data={data}
        />
      </Flex>
    </>
  );
}

export default ClassCard;
