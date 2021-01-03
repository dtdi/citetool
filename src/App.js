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
import DetailsFrame from "./app/components/DetailsFrame";
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

    this._allItems = this.processSearchResults(result)
      .slice(0)
      .sort((a, b) =>
        Number(a["relevance"]) < Number(b["relevance"]) ? 1 : -1
      );

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
      let abstractlink = "test";
      let links = entry["link"];
      links.forEach((link) => {
        let linktype = link["@ref"];
        if (linktype === "scopus") {
          abstractlink = link["@href"];
        }
      });

      items.push({
        key: entry["dc:identifier"],
        name: entry["dc:title"],
        abstract:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        abstractlink: abstractlink,
        authors: entry["dc:creator"],
        year: entry["prism:coverDate"].substr(0, 4),
        relevance: (Math.random() * 100).toFixed(2),
        doi: entry["prism:doi"],
        type: entry["subtypeDescription"],
        citedbycount: entry["citedby-count"],
        value: entry,
      });
    });

    return items;
  }

  render() {
    const { selectedPaper, items } = this.state;

    const listItems = items;

    return (
      <Stack style={{ zIndex: 1 }} tokens={{ padding: 10, childrenGap: 5 }}>
        <SearchBar className="searchbar" />
        {/**  
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
        */}
        <Stack className="paperarea" tokens={{ padding: 10, childrenGap: 5 }}>
          <Stack
            horizontal
            horizontalAlign="center"
            tokens={{ padding: 10, childrenGap: 20 }}
          >
            <StackItem className={classNames.paperFrame}>
              <DetailsFrame selectedPaper={selectedPaper} />
            </StackItem>
            <StackItem className={"Container"}>
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
          </Stack>
        </Stack>
      </Stack>
    );
  }
}
