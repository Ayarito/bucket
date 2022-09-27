import {
  Accordion,
  Button,
  Center,
  Flex,
  Heading,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import Adder from "../Adder";
import { useTasks } from "../data/useTasks";
import Graveyard from "../Graveyard";
import Task from "../Task";

const Bucket = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <VStack minH="100vh" align="stretch" py={4}>
      <Flex justify="space-between">
        <Heading userSelect="none" as="h1" mb={5}>
          🪣 Bucket
        </Heading>
        <Button p={0} variant="ghost" fontSize="24px" onClick={toggleColorMode}>
          {colorMode === "light" ? "🌙" : "🌞"}
        </Button>
      </Flex>

      <BucketView />
      <Adder />
      <Flex mt="500px">
        <Graveyard />
      </Flex>
    </VStack>
  );
};

const BucketView = () => {
  const { bucket, today } = useTasks();
  console.log(bucket.length);

  return (
    <div id="bucket">
      <Accordion allowToggle>
        {bucket.map((task, index) => (
          <Task tabIndex={index} mb={2} key={task.id} task={task} />
        ))}
      </Accordion>
    </div>
  );
};

export default Bucket;
