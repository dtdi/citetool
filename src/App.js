import React, { Component } from "react";
import {
  Stack,
  StackItem,
  SearchBox,
  ISearchBoxStyles,
  Fabric,
  Pivot,
  PivotItem,
  Label,
  CommandBar,
  FontWeights,
  mergeStyleSets,
  Toggle,
  Announced,
  TextField,
} from "@fluentui/react";

import ResultList from "./app/components/ResultList";

const labelStyles = {
  root: { marginTop: 10 },
};

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: null,
    };
  }

  onSelectSingle = (elem) => {
    this.setState({
      selected: elem,
    });
  };

  render() {
    const { selected } = this.state;
    return (
      <Stack>
        <Fabric className="TopBar"></Fabric>
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
                  headerText="Search List"
                  itemCount={42}
                  itemIcon="Emoji2"
                >
                  <Label styles={labelStyles}>Pivot #1</Label>
                </PivotItem>
                <PivotItem
                  itemCount={23}
                  headerText="References"
                  itemIcon="FavoriteList"
                >
                  <Label styles={labelStyles}>Pivot #2</Label>
                </PivotItem>
                <PivotItem
                  itemCount={23}
                  headerText="Favorites"
                  itemIcon="FavoriteList"
                >
                  <Label styles={labelStyles}>Pivot #2</Label>
                </PivotItem>
              </Pivot>

              <ResultList onSelectSingle={this.onSelectSingle} />
            </StackItem>
            <StackItem grow={2}>
              <Stack
                className={"DetailsPane"}
                tokens={{ padding: 10, childrenGap: 5 }}
              >
                <Fabric className={"Section"}>
                  <h1>Paper infos</h1>
                  {selected && selected.name}
                  {selected && selected.authors}
                </Fabric>
                <Fabric className={"Section"}>
                  <h1>Related Information</h1>
                </Fabric>
              </Stack>
            </StackItem>
          </Stack>
        </Stack>
      </Stack>
    );
  }
}
