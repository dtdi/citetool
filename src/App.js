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
  ActionButton,
  Modal,
  getTheme,
  FontWeights,
  TextField,
  PrimaryButton,
  Text,
  IconButton,
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

const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
    width: '1000px',
    maxWidth: '100%',
  },
  header: [
    theme.fonts.xLargePlus,
    {
      flex: '1 1 auto',
      borderTop: `4px solid ${theme.palette.themePrimary}`,
      color: theme.palette.neutralPrimary,
      display: 'flex',
      alignItems: 'center',
      fontWeight: FontWeights.semibold,
      padding: '12px 12px 14px 24px',
    },
  ],
  body: {
    flex: '4 4 auto',
    padding: '0 24px 24px 24px',
    overflowY: 'hidden',
    selectors: {
      p: { margin: '14px 0' },
      'p:first-child': { marginTop: 0 },
      'p:last-child': { marginBottom: 0 },
    },
  },
});

const iconButtonStyles = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: 'auto',
    marginTop: '4px',
    marginRight: '2px',
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};

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
      APIKey: "1f1787f55e2084eca33a02829ff7fe6c",
      modalOpen: true,
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
    const { APIKey } = this.state;
    const apiKey = APIKey;
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

  onSettingsOpenClose = () => {
    const { modalOpen } = this.state;

    const isModalOpen = modalOpen ? false : true;

    this.setState({
      modalOpen: isModalOpen,
    });
  }

  //@TODO: local storage einbauen
  handleAPIKeyChange = (e) => {
    this.setState({ APIKey: e.target.value });
  }

  render() {
    const {
      selectedPaper,
      searchResultsList,
      relevantList,
      notRelevantList,
      selectedTabId,
      modalOpen,
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
        <ActionButton text="Help & Settings" iconProps={{ iconName: 'Settings' }} title="settings" ariaLabel="Settings" disabled={false} onClick={this.onSettingsOpenClose} className="settingsbutton" />
        <Modal
          isOpen={modalOpen}
          isBlocking={false}
          containerClassName={contentStyles.container}
        >
          <div className="settings">
            <div className={contentStyles.header}>
              <span>Welcome to Potatosearch</span>
              <IconButton
                styles={iconButtonStyles}
                iconProps={{ iconName: 'Cancel' }}
                ariaLabel="Close popup modal"
                onClick={this.onSettingsOpenClose}
              />
            </div>
            <div className={contentStyles.body}>
              <Stack>
                <Text variant="mediumPlus">
                  <b>This website helps to discover exciting new papers in three easy steps:</b>
                </Text>
                <br />
                <Text>
                  <p><b>I) </b>To get started, use the search box above to start a search query on Scopus. </p></Text>
                <Text>
                  <b>II) </b>Based on the results, we suggest relevant papers on the left, which you can mark as relevant or irrelevant using the buttons at the top. Your vote will automatically move the paper to the lists on the right side of the page. Based on the papers you rated as relevant, we will suggest new papers to rate. For this purpose, we use bibliometric data (i.e., co-citation & bibliometric coupling) to find papers that have a particularly high overlap with your selection.
              </Text>
                <Text>
                  <b>III) </b>If you have identified enough papers or if our suggestions do not contain any more relevant papers, use the download function in the header to export your results as a list.
              </Text>
                <br />
                <Text variant="mediumPlus"><b>Before you start: Please change your Scopus API-Key:</b></Text>
                <br />
                <Stack horizontal>
                  <TextField placeholder="Type in your API Code" id="apiKeyTextField" value={this.state.APIKey} onChange={this.handleAPIKeyChange} className="apikeytextfield" />
                  <PrimaryButton>Save</PrimaryButton>
                </Stack>
              </Stack>
            </div>
          </div>
        </Modal>
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
                    headerText="Paper Pool"
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
