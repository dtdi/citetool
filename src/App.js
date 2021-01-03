import React, { Component } from "react";
import {
  Stack,
  StackItem,
  Image,
  Pivot,
  PivotItem,
  Label,
  Fabric,
  mergeStyleSets,
} from "@fluentui/react";

import result from "./data/results.json";

import ResultList from "./app/components/ResultList";
import PaperFrame from "./app/components/PaperFrame";
import SearchBar from "./app/components/SearchBar";
import header from "./img/header.jpg";
// import "./style.css";

const labelStyles = {
  root: { marginTop: 10 },
};

const classNames = mergeStyleSets({
  paperFrame: {
    width: 500,
  },
});

export default class App extends Component {
  _allItems = [];

  constructor(props) {
    super(props);

    this.state = {
      selectedPaper: null,
      items: [],
    };
  }

  componentDidMount() {
    const self = this;

    this._allItems = this.processSearchResults(result);

    this.setState({
      items: this._allItems,
    });
  }

  onSelectSingle = (elem) => {
    this.setState({
      selectedPaper: elem,
    });
  };

  processSearchResults(result) {
    const items = [];
    let entries = result["search-results"].entry;
    console.log(entries);
    entries.forEach((entry) => {
      items.push({
        key: entry["dc:identifier"],
        name: entry["dc:title"],
        authors: entry["dc:creator"],
        publicationName: entry["prism:publicationName"],
        year: entry["prism:coverDisplayDate"],
        value: entry,
      });
    });

    return items;
  }

  render() {
    const { selectedPaper, items } = this.state;

    const listItems = items;

    return (
      <Stack>
        <Stack style={{ zIndex: 1 }} tokens={{ padding: 10, childrenGap: 5 }}>
          <SearchBar className="searchbar" />
          <Stack className="Grid paperarea" tokens={{ childrenGap: 5 }}>
            <Stack
              horizontal
              horizontalAlign="space-evenly"
              tokens={{ childrenGap: 5 }}
            >
              <StackItem grow={2} disableShrink>
                <Pivot className="pivotbutton">
                  <PivotItem
                    headerText="Results"
                    itemCount={items.length}
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
                <ResultList
                  items={listItems}
                  onSelectSingle={this.onSelectSingle}
                />
              </StackItem>
              <StackItem className={classNames.paperFrame}>
                <PaperFrame selectedPaper={selectedPaper} />
              </StackItem>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    );
  }
}
