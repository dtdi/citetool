import React, { Component } from "react";
import {
  Stack,
  StackItem,
  SearchBox,
  Pivot,
  PivotItem,
  mergeStyleSets,
} from "@fluentui/react";

import result from "./data/results.json";

import ResultList from "./app/components/ResultList";
import DetailsFrame from "./app/components/DetailsFrame";

import header from "./img/header.jpg";
// import "./style.css";

const labelStyles = {
  root: { marginTop: 10 },
};

const classNames = mergeStyleSets({
  paperFrame: {
    width: "40vw",
  },
});

const LIST_RESULT = "result";
const LIST_RELEVANT = "relevant";
const LIST_NOT_RELEVANT = "not-relevant";
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paperList: [],
      selectedPaper: null,
      searchResultsList: [],
      relevantList: [],
      notRelevantList: [],
      selectedTabId: "searchResultsList",
    };
  }

  componentDidMount() {
    this.processSearchResults(result);
  }

  _filterPapers(listType) {
    const { paperList } = this.state;
    return paperList.filter((paper) => {
      return paper.inList == listType;
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.paperList !== this.state.paperList) {
      this.setState({
        searchResultsList: this._filterPapers(LIST_RESULT),
        relevantList: this._filterPapers(LIST_RELEVANT),
        notRelevantList: this._filterPapers(LIST_NOT_RELEVANT),
      });
    }
  }

  onSelectSingle = (elem) => {
    this.setState({
      selectedPaper: elem,
    });
  };

  onSearch = (newValue) => {
    this.processSearchResults(result);
  };

  onLoadSemanticScholar = (doi) => {
    fetch(
      `https://api.semanticscholar.org/v1/paper/${doi}}?include_unknown_references=true`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          localStorage.setItem(doi, result);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  };

  onLoadData = (searchString) => {
    const apiKey = "1f1787f55e2084eca33a02829ff7fe6c";
    const query = `all("${searchString}")`;
    fetch(
      `https://api.elsevier.com/content/search/scopus?apiKey=${apiKey}&query=${query}&count=25&start=0`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          this.processSearchResults(result);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
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
        inList: LIST_RESULT,
        value: entry,
      });
    });

    this.setState({
      paperList: items.sort(
        (a, b) => Number(a.relevance) - Number(b.relevance)
      ),
    });
  }

  handleTabLinkClick = (item) => {
    this.setState({
      selectedTabId: item.props.itemKey,
    });
  };

  onPaperAction = (newPaper, action) => {
    const { paperList } = this.state;

    const newList = paperList
      .filter((paper) => {
        return action !== "remove-paper" || newPaper.key !== paper.key;
      })
      .map((paper) => {
        if (paper.key === newPaper.key) {
          if (action === "move-to-result") {
            newPaper.inList = LIST_RESULT;
          } else if (action === "move-to-relevant") {
            newPaper.inList = LIST_RELEVANT;
          } else if (action === "move-to-not-relevant") {
            newPaper.inList = LIST_NOT_RELEVANT;
          }

          const updatedPaper = {
            ...paper,
            ...newPaper,
          };
          return updatedPaper;
        }
        return paper;
      });
    this.setState({
      paperList: newList,
    });
  };

  render() {
    const {
      selectedPaper,
      searchResultsList,
      relevantList,
      notRelevantList,
      selectedTabId,
    } = this.state;

    let listItems;

    switch (selectedTabId) {
      case "searchResultsList":
        listItems = searchResultsList;
        break;
      case "relevantList":
        listItems = relevantList;
        break;
      case "notRelevantList":
        listItems = notRelevantList;
        break;
    }

    return (
      <Stack style={{ zIndex: 1 }} tokens={{ padding: 10, childrenGap: 5 }}>
        <SearchBox placeholder="Search" onSearch={this.onSearch} />

        <Stack className="paperarea" tokens={{ padding: 10, childrenGap: 5 }}>
          <Stack
            horizontal
            horizontalAlign="space-evenly"
            tokens={{ padding: 10, childrenGap: 10 }}
          >
            <StackItem grow={2}>
              <Pivot
                selectedKey={selectedTabId}
                // eslint-disable-next-line react/jsx-no-bind
                onLinkClick={this.handleTabLinkClick}
                headersOnly={true}
              >
                <PivotItem
                  headerText="Results"
                  itemKey={"searchResultsList"}
                  itemCount={searchResultsList.length}
                  itemIcon="AllApps"
                ></PivotItem>
                <PivotItem
                  itemCount={relevantList.length}
                  itemKey={"relevantList"}
                  headerText="Relevant Paper"
                  itemIcon="Accept"
                ></PivotItem>
                <PivotItem
                  itemCount={notRelevantList.length}
                  itemKey={"notRelevantList"}
                  headerText="Not Relevant"
                  itemIcon="StatusCircleErrorX"
                ></PivotItem>
              </Pivot>
              <ResultList
                items={listItems}
                onSelectSingle={this.onSelectSingle}
              />
            </StackItem>
            <StackItem disableShrink className={classNames.paperFrame}>
              <DetailsFrame
                selectedPaper={selectedPaper}
                onPaperAction={this.onPaperAction}
              />
            </StackItem>
          </Stack>
        </Stack>
      </Stack>
    );
  }
}
