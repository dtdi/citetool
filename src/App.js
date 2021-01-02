import logo from "./logo.svg";

import React from "react";
import {
  Stack,
  SearchBox,
  Fabric,
  FontWeights,
  mergeStyleSets,
  Toggle,
  Announced,
  TextField,
} from "@fluentui/react";

import ResultList from "./app/components/ResultList";

export default function App() {
  return (
    <Fabric>
      <Stack>
        <SearchBox
          placeholder="Search"
          onSearch={(newValue) => console.log("value is " + newValue)}
        />
        <ResultList />
      </Stack>
    </Fabric>
  );
}
