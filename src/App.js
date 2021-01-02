import React, { Component } from "react";
import {
  Stack,
  StackItem,
  SearchBox,
  Pivot,
  PivotItem,
  Label,
  Fabric,
} from "@fluentui/react";

import ResultList from "./app/components/ResultList";
import PaperFrame from "./app/components/PaperFrame";
import SearchBar from "./app/components/SearchBar";
import header from "./img/header.jpg";
import "./style.css";

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
        <img class="header" src={header} alt="Header" />
        <Stack style={{ zIndex: 1 }}>
          <div class="searchbar">
            <SearchBar className="searchbar" />
          </div>
          <Stack
            className="Grid paperarea"
            tokens={{ padding: 10, childrenGap: 5 }}
          >
            <Stack
              horizontal
              horizontalAlign="space-evenly"
              tokens={{ padding: 10, childrenGap: 5 }}
            >
              <StackItem grow={2} className={"Container"}>
                <Pivot className="pivotbutton">
                  <PivotItem
                    headerText="Results"
                    itemCount={42}
                    itemIcon="AllApps"
                  ></PivotItem>
                  <PivotItem
                    itemCount={23}
                    headerText="Relevant Paper"
                    itemIcon="Accept"
                  ></PivotItem>
                  <PivotItem
                    itemCount={23}
                    headerText="Not Relevant"
                    itemIcon="StatusCircleErrorX"
                  ></PivotItem>
                </Pivot>
                <ResultList onSelectSingle={this.onSelectSingle} />
              </StackItem>
              <StackItem grow={2}>
                <PaperFrame selectedPaper={selectedPaper} />
              </StackItem>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    );
  }
}
