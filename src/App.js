import React, { Component } from "react";
import {
  Stack,
  StackItem,
  Pivot,
  PivotItem,
  PivotLinkFormat,
} from "@fluentui/react";

import ResultList from "./app/components/ResultList";
import DetailsFrame from "./app/components/DetailsFrame";
import SearchBar from "./app/components/SearchBar";
import header from "./img/header.jpg"
import './style.css'

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPaper: null,
      paperPool: null,
      relevantList: null,
      irrelevantList: null,
    };
  }

  _onSelectSingle = (elem) => {
    this.setState({
      selectedPaper: elem,
    });
  };

  _changeListView = (item) => {
    console.log(item.props.itemkey);
  }

  render() {
    const { selectedPaper} = this.state;

    return (
      <Stack>
        <img class="header" src={header} alt="Header" />
        <Stack style={{ zIndex: 1 }}>
          <div class="searchbar">
            <SearchBar className="searchbar" />
          </div>
          <Stack className="paperarea" tokens={{ padding: 10, childrenGap: 5 }}>
            <Stack
              horizontal
              horizontalAlign="center"
              tokens={{ padding: 10, childrenGap: 20 }}
            >
              <StackItem >
                <DetailsFrame selectedPaper={selectedPaper} />
              </StackItem>
              <StackItem className={"Container"}>
                <Pivot
                  linkFormat={PivotLinkFormat.tabs}
                  onLinkClick={this._changeListView}
                >
                  <PivotItem
                    headerText="Paper Pool"
                    //itemCount={42}
                    itemIcon="AllApps"
                    itemkey="paperpool"
                  >
                  </PivotItem>
                  <PivotItem
                    //itemCount={23}
                    headerText="Relevant Paper"
                    itemIcon="Accept"
                    itemkey="relevant"
                  >
                  </PivotItem>
                  <PivotItem
                    //itemCount={23}
                    headerText="Irrelevant Paper"
                    itemIcon="StatusCircleErrorX"
                    itemkey="irrrelevant"
                  >
                  </PivotItem>
                </Pivot>
                <ResultList onSelectSingle={this._onSelectSingle} className="resultlist" />
              </StackItem>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    );
  }
}
