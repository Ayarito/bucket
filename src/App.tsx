import {
  Box,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import Bucket from "./Bucket";

import "@fontsource/lato";
import { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import Adder from "./Adder";
import Shuffle from "./Shuffle";

function App() {
  return (
    <Flex
      // position="relative"
      px={[1, 5, 10, 20, 300]}
      py={[1, 1, 1, 1, 1, 10]}
      direction="column"
    >
      <Tabs
        defaultIndex={1}
        align="end"
        boxSizing="content-box"
        variant="unstyled"
      >
        <TabList minH={50} _hover={{ cursor: "pointer" }}>
          <HeadingTab>🪣 Bucket</HeadingTab>
          <HeadingTab>🔀 Shuffle</HeadingTab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Bucket />
          </TabPanel>
          <TabPanel>
            <Shuffle />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

export default App;

const HeadingTab = (props: any) => {
  return (
    <Tab
      as={Heading}
      fontSize="lg"
      color="gray.200"
      _focusVisible={false}
      _selected={{
        fontSize: ["3xl", "5xl"],
      }}
      _hover={{ color: "pink.400" }}
      {...props}
    />
  );
};

function SwipablePanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
