import { Flex } from "@mantine/core";
import Unit from "./Unit";
const units = [

  {
    unitCode: "FIT3171",
    unitName: "Databases",
    classes: [{
      cl_id: 123,
      classType: "Seminar",
      classDuration: "1hr",
    },{
      cl_id: 124,
      classType: "Applied",
      classDuration: "2hr",
      }
    ]
  },
    {
    unitCode: "FIT3171",
    unitName: "Databases",
    classes: [{
      cl_id: 123,
      classType: "Seminar",
      classDuration: "1hr",
    },{
      cl_id: 124,
      classType: "Applied",
      classDuration: "2hr",
      }
    ]
  },
    {
    unitCode: "FIT3171",
    unitName: "Databases",
    classes: [{
      cl_id: 123,
      classType: "Seminar",
      classDuration: "1hr",
    },{
      cl_id: 124,
      classType: "Applied",
      classDuration: "2hr",
      }
    ]
  },

]

function Sidebar(){
  return (
      <Flex direction="column" align="center" w="15%" bg="blue" h="100vh" py="20px">
        {
        units.map((unit)=>{
          return <Unit key={unit.unitCode} data={unit} /> 
        })
      }
      </Flex>
  )
}

export default Sidebar;
