import { Flex } from "@mantine/core";
import UnitCard from "./UnitCard";
import ClassCard from "./ClassCard";

function Unit({ data }) {
  return (
    <Flex direction="column" w="100%" align="center" my="15px">
      <UnitCard data={data} />
      <Flex direction="column" align="end" w="100%">
        {data.classes.map((c) => {
          return <ClassCard key={c.cl_id} data={c} />;
        })}
      </Flex>
    </Flex>
  );
}

export default Unit;
