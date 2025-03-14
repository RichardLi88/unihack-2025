import { Flex } from "@mantine/core";
import Sidebar from "../components/Sidebar";
import Timetable from "../components/Timetable";

function HomePage(){
  return(
    <>
      <Flex direction="row">
        <Sidebar />
        <Timetable />
      </Flex>

    </>
  )
}

export default HomePage;
