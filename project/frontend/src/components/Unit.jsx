import { Flex, Transition } from "@mantine/core";
import UnitCard from "./UnitCard";
import ClassCard from "./ClassCard";
import { useState } from "react";

function Unit({ data }) {
  const [visible, setVisible] = useState(true);

  return (
    <Flex direction="column" w="100%" align="center" my="15px">
      <UnitCard data={data} onClick={() => setVisible((v) => !v)} />
      <Transition
        mounted={visible}
        transition={{
          in: { opacity: 1, transform: "translateY(0)" },
          out: { opacity: 0, transform: "translateY(-10px)" },
        }}
        duration={200}
        timingFunction="ease-in-out"
      >
        {(transitionStyles) => (
          <Flex
            direction="column"
            align="end"
            w="100%"
            style={transitionStyles}
          >
            {data.classes.map((c) => (
              <ClassCard key={c.cl_id} data={c} />
            ))}
          </Flex>
        )}
      </Transition>
    </Flex>
  );
}

export default Unit;
