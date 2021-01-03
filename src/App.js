import React, { Component } from "react";
import {
  Stack,
  StackItem,
  Pivot,
  PivotItem,
  mergeStyleSets,
  SearchBox,
  Fabric,
  PivotLinkFormat,
} from "@fluentui/react";

import result from "./data/scopusresult.json";

import ResultList from "./app/components/ResultList";
import DetailsFrame from "./app/components/DetailsFrame";
import header from "./img/header.jpg";
import "./style.css";

import semanticscholarresult1 from "./data/semanticscholarresult1.json";
import semanticscholarresult2 from "./data/semanticscholarresult2.json";
import semanticscholarresult3 from "./data/semanticscholarresult3.json";
import semanticscholarresult4 from "./data/semanticscholarresult4.json";
import semanticscholarresult5 from "./data/semanticscholarresult5.json";
import semanticscholarresult6 from "./data/semanticscholarresult6.json";
import semanticscholarresult7 from "./data/semanticscholarresult7.json";

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
    let items = [];
    const entries = result["search-results"].entry;
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
        abstractlink: abstractlink,
        authors: entry["dc:creator"],
        publication: `${entry["prism:publicationName"]}`,
        year: entry["prism:coverDate"].substr(0, 4),
        relevance: (Math.random() * 100).toFixed(2),
        doi: entry["prism:doi"],
        type: entry["subtypeDescription"],
        citedbycount: entry["citedby-count"],
        value: entry,
        inList: LIST_RESULT,
      });
    });

    items[0].abstract = semanticscholarresult1["abstract"];
    items[1].abstract = semanticscholarresult2["abstract"];
    items[2].abstract = semanticscholarresult3["abstract"];
    items[3].abstract = semanticscholarresult4["abstract"];
    items[4].abstract = semanticscholarresult5["abstract"];
    items[5].abstract = semanticscholarresult6["abstract"];
    items[6].abstract = semanticscholarresult7["abstract"];
    items[0].references = semanticscholarresult1["references"];
    items[1].references = semanticscholarresult2["references"];
    items[2].references = semanticscholarresult3["references"];
    items[3].references = semanticscholarresult4["references"];
    items[4].references = semanticscholarresult5["references"];
    items[5].references = semanticscholarresult6["references"];
    items[6].references = semanticscholarresult7["references"];

    items = items.sort((a, b) => Number(b.relevance) - Number(a.relevance));
    this.setState({
      paperList: items,
      selectedPaper: items[0],
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
      default:
        listItems = searchResultsList;
        break;
    }

    console.log(listItems);

    return (
      <Stack>
        <img class="header" src={header} alt="Header" />
        <div className="searchbar" >
          <Stack>
            <Fabric>
              <h1 className="searchbarlabel">Potatosearch</h1>
            </Fabric>
            <SearchBox placeholder="Search" onSearch={this.onSearch} />
          </Stack>
        </div>
        <Stack style={{ zIndex: 1 }} tokens={{ padding: 10, childrenGap: 5 }}>
          <Stack className="paperarea" tokens={{ padding: 10, childrenGap: 5 }}>
            <Stack
              horizontal
              horizontalAlign="space-evenly"
              tokens={{ padding: 10, childrenGap: 10 }}
            >
              <StackItem disableShrink className={classNames.paperFrame}>
                <div className="detailsframe">
                  <DetailsFrame
                    selectedPaper={selectedPaper}
                    onPaperAction={this.onPaperAction}
                  />
                </div>

              </StackItem>
              <StackItem grow={2}>
                <Pivot
                  selectedKey={selectedTabId}
                  onLinkClick={this.handleTabLinkClick}
                  headersOnly={true}
                  linkFormat={PivotLinkFormat.tabs}
                >
                  <PivotItem
                    itemKey={"searchResultsList"}
                    itemIcon="AllApps"
                    headerText="Results"
                    itemCount={searchResultsList.length}
                  ></PivotItem>
                  <PivotItem
                    itemKey={"relevantList"}
                    itemIcon="Accept"
                    headerText="Relevant Paper"
                    itemCount={relevantList.length}
                  ></PivotItem>
                  <PivotItem
                    itemKey={"notRelevantList"}
                    itemIcon="StatusCircleErrorX"
                    headerText="Not Relevant"
                    itemCount={notRelevantList.length}
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
      </Stack>
    );
  }
}
