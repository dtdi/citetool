import React, { Component } from "react";
import {
  Stack,
  StackItem,
  SearchBox,
  Pivot,
  PivotItem,
  Label,
} from "@fluentui/react";

import ResultList from "./app/components/ResultList";
import PaperFrame from "./app/components/PaperFrame";
import SearchBar from "./app/components/SearchBar";


const labelStyles = {
  root: { marginTop: 10 },
};

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPaper: null,
    };
  }

  onSelectSingle = (elem) => {
    this.setState({
      selectedPaper: elem,
    });
  };

  render() {
    const { selectedPaper } = this.state;
    return (
      <Stack>
        <SearchBar />
        <Stack className="Grid" tokens={{ padding: 10, childrenGap: 5 }}>
          <Stack
            horizontal
            horizontalAlign="space-evenly"
            tokens={{ padding: 10, childrenGap: 5 }}
          >
            <StackItem grow={2} className={"Container"}>
              <SearchBox
                placeholder="Search"
                onSearch={(newValue) => console.log("value is " + newValue)}
              />

              <Pivot>
                <PivotItem
                  headerText="Results"
                  itemCount={42}
                  itemIcon="AllApps"
                >
                  <Label styles={labelStyles}>Pivot #1</Label>
                </PivotItem>
                <PivotItem
                  itemCount={23}
                  headerText="Relevant Paper"
                  itemIcon="Accept"
                >
                  <Label styles={labelStyles}>Pivot #2</Label>
                </PivotItem>
                <PivotItem
                  itemCount={23}
                  headerText="Not Relevant"
                  itemIcon="StatusCircleErrorX"
                >
                  <Label styles={labelStyles}>Pivot #2</Label>
                </PivotItem>
              </Pivot>

              <ResultList onSelectSingle={this.onSelectSingle} />
            </StackItem>
            <StackItem grow={2}>
              <PaperFrame selectedPaper={selectedPaper} />
            </StackItem>
          </Stack>
        </Stack>
      </Stack>
    );
  }
}
