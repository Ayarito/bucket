import {
  Accordion,
  AccordionButton,
  AccordionItem,
  Box,
  Button,
  VStack,
} from "@chakra-ui/react";
import { useTasks } from "../data/useTasks";
import Task from "../Task";
import * as R from "ramda";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const Shuffle = () => {
  const { shuffle, shuffleIt } = useTasks();
  const parent = useAutoAnimate({ duration: 100, easing: "ease-out" });

  return (
    <Box position="relative">
      <VStack align="stretch" py={2}>
        <Accordion allowToggle ref={parent as any}>
          {R.times((num) => {
            const shuffledItem = R.nth(num, shuffle);
            const shuffleThis = () => shuffleIt(num);

            if (shuffledItem) {
              return (
                <Task
                  hasShuffler
                  onShuffleClick={shuffleThis}
                  tabIndex={num}
                  mb={4}
                  key={shuffledItem.id}
                  task={shuffledItem}
                />
              );
            } else {
              return (
                <AccordionItem key={num}>
                  <AccordionButton
                    bg="darkmagenta"
                    borderRadius="lg"
                    fontWeight="medium"
                    border="none"
                    key={num}
                    onClick={shuffleThis}
                  >
                    🎲 try shuffle
                  </AccordionButton>
                </AccordionItem>
              );
            }
          })(3)}
        </Accordion>
      </VStack>
    </Box>
  );
};

export default Shuffle;

function sampleSize<T>(size: number, list: T[], collected: T[] = []): T[] {
  return size < 1 || list.length < 1
    ? collected
    : size >= list.length
    ? [...collected, ...list] // or throw error?
    : Math.random() < size / list.length
    ? sampleSize(size - 1, list.slice(1), [...collected, list[0]])
    : sampleSize(size, list.slice(1), collected);
}

const gradient = `linear-gradient(to right, 
  #00C6FB, 
  #3DBBFF, 
  #6CADFF, 
  #979DFC, 
  #BA8BEA,
  #C783DE,
  #D778CF,
  #E965AD,
  #F15787,
  #ED525F,
  #DF5737)`;
