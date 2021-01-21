import React, { Component } from "react";
import {
  Stack,
  StackItem,
  CommandBar,
  Pivot,
  PivotItem,
  Image,
  mergeStyleSets,
  Text,
  SearchBox,
  IconButton,
  TeachingBubble,
  PivotLinkFormat,
  ProgressIndicator,
  ScrollablePane,
  ScrollbarVisibility,
  Sticky,
  StickyPositionType,
  Link,
  MessageBar,
  MessageBarType,
  getTheme,
} from "@fluentui/react";

import { get, set, del, clear } from "idb-keyval";

// import result from "./data/scopusresult.json";

import ResultList from "./app/components/ResultList";
import DetailsFrame from "./app/components/DetailsFrame";
import header from "./img/header.jpg";
import logo from "./img/potato.svg";
import "./style.css";

import ApiModal from "./app/components/ApiModal";
import LoadFileModal from "./app/components/LoadFileModal";
import InfoModal from "./app/components/InfoModal";

const theme = getTheme();
const classNames = mergeStyleSets({
  paperFrame: {
    width: "45vw",
    padding: 20,
    background: theme.palette.white,
    position: "relative",
    height: "100%",
    "box-sizing": "border-box",
  },
  searchBar: {
    background: theme.palette.white,
  },
});

export const LIST_RESULT = "result";
export const LIST_RELEVANT = "relevant";
export const LIST_NOT_RELEVANT = "not-relevant";

class PaperCache {
  prefix = "paper_";

  _getKey(doi) {
    return this.prefix + encodeURIComponent(doi);
  }

  async getOrLoad(doi, controller, signal) {
    const key = this._getKey(doi);
    const item = await get(key);
    if (item) {
      return item;
    } else {
      let response;
      try {
        response = await fetch(
          `https://api.semanticscholar.org/v1/paper/${doi}?include_unknown_references=true`,
          { signal }
        );
      } catch (e) {
        if (e instanceof TypeError) {
          controller.abort();
          throw e;
        } else {
          throw e;
        }
      }
      if (!response.ok) {
        if (response.status === 404) {
          const body = await response.json();
          set(key, body);
          console.log(404);
          return body;
        } else {
          const message = `An error has occured: ${response.status}`;
          throw new Error(message);
        }
      }
      const body = await response.json();
      try {
        set(key, body);
      } catch (e) {
        const message = `Unknown error`;
        throw new Error(message, e);
      }
      return body;
    }
  }

  remove(doi) {
    del(this._getKey(doi));
  }
}

export default class App extends Component {
  listRef;

  constructor(props) {
    super(props);

    this.listRef = React.createRef();

    this.state = {
      paperList: [],
      selectedPaper: null,
      isSearchHelper: false,
      searchResultsList: [],
      relevantList: [],
      notRelevantList: [],
      selectedTabId: "searchResultsList",
      apiKey: "",
      fileLocation: "",
      isApiKeyModalOpen: false,
      isLoadFileModalOpen: false,
      isInfoModalOpen: false,
      isLoading: false,
      searchString: `TITLE("digital innovation" AND "literature review")`,
    };
  }

  async componentDidMount() {
    const lastSearch = await get("lastSearch");
    const apiKey = await get("apiKey");
    if (apiKey) {
      this.setState({
        apiKey: apiKey,
      });
    } else {
      this.setState({
        isApiKeyModalOpen: true,
      });
    }
    if (lastSearch) {
      this.setState({ isLoading: true, searchString: lastSearch.searchString });
      await this.processSearchResults(lastSearch.result);
      this.setState({ isLoading: false });
    }
  }

  _filterPapers(listType) {
    const { paperList } = this.state;
    return paperList.filter((paper) => {
      return paper.inList === listType;
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

  onSelectSingle = async (elem) => {
    this.setState({
      selectedPaper: elem,
    });
  };

  onClearCache = async (ev) => {
    clear();
  };

  loadSemScholar = async (doi, controller, signal) => {
    let cache = new PaperCache();
    try {
      const item = await cache.getOrLoad(doi, controller, signal);
      return item;
    } catch (e) {
      console.log("resource exhausted", e);
    }
  };

  onLoadData = async (searchString) => {
    this.setState({
      isLoading: true,
      selectedPaper: null,
      searchString: searchString,
    });
    const { apiKey } = this.state;

    const query = encodeURIComponent(searchString);
    const count = 25;
    const limit = 25;
    let start = 0;
    const sort = "relevancy";

    let errorState;
    let results;
    let totalResults = 0;

    do {
      try {
        const response = await fetch(
          `https://api.elsevier.com/content/search/scopus?apiKey=${apiKey}&query=${query}&count=${count}&start=${start}&sort=${sort}`
        );
        if (!response.ok) {
          let error = "";

          if (response.status === 400) {
            const body = await response.json();
            error = `An error has occured (${response.status}) ${body["service-error"].status.statusCode}: ${body["service-error"].status.statusText}`;
          } else {
            error = `An error has occured (${response.status})`;
          }

          errorState = {
            isLoading: false,
            apiError: error,
          };
          break;
        }

        const body = await response.json();
        if (!results) {
          results = body;
          totalResults = Number(
            results["search-results"]["opensearch:totalResults"]
          );

          if (totalResults === 0) {
            errorState = {
              isLoading: false,
              paperList: [],
              apiError: "Search did not return any results",
            };
            break;
          }
        } else {
          results["search-results"].entry.push(...body["search-results"].entry);
        }
      } catch (e) {
        errorState = {
          isLoading: false,
          apiError: e.message,
        };
        break;
      }
      start += count;
    } while (start < limit && start <= totalResults);

    if (errorState) {
      this.setState({ errorState });
      return;
    }
    await set("lastSearch", {
      searchString: this.state.searchString,
      result: results,
    });
    await this.processSearchResults(results);
    this.setState({
      isLoading: false,
    });
  };

  handleTabLinkClick = (item) => {
    this.setState({
      selectedTabId: item.props.itemKey,
    });
  };

  onPaperAction = async (newPaper, action) => {
    const { paperList } = this.state;
    this.setState({
      isLoading: true,
    });
    let newList = paperList
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
          } else if (action === "update-paper") {
          }

          const updatedPaper = {
            ...paper,
            ...newPaper,
          };
          return updatedPaper;
        }
        return paper;
      });

    if (action === "move-to-relevant") {
      newPaper.refs.forEach((p) => {
        const oldPaper = newList.find((oldPaper) => oldPaper.doi === p.doi);
        if (oldPaper) {
          oldPaper.inBatch.push(newPaper.doi);
        } else {
          newList.push({
            key: p.doi || p.paperId,
            name: p.title,
            abstract: null,
            refs: [],
            cites: [],
            raw: {},
            ids: [],
            authors: p.authors
              ? p.authors.map((author) => author.name).join(", ")
              : "",
            publication: p.venue,
            year: p.year,
            doi: p.doi,
            type: null,
            citedByCount: null,
            inBatch: [newPaper.doi],
            inList: LIST_RESULT,
          });
        }
      });
      newList = await this.loadSemScholarForMany(newList);
    }

    newList = this.getPaperScores(newList).sort(
      (a, b) => b.relevance - a.relevance
    );
    this.setState({
      paperList: newList,
      isLoading: false,
    });
    this.onSelectSingle(newList.find((p) => p.inList === LIST_RESULT));
  };

  onToCitavi = () => {
    const { relevantList } = this.state;
    var doiList = "";
    relevantList.forEach((paper) => {
      doiList += paper.doi + "\n";
    });

    const blob = new Blob([doiList], { type: "text/plain" });
    const anchor = document.createElement("a");

    anchor.download = "PotatoSearch2Citavi.txt";
    anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
    anchor.dataset.downloadurl = [
      "text/plain",
      anchor.download,
      anchor.href,
    ].join(":");
    anchor.click();
  };

  onSave = () => {
    const { state } = this;
    const stateJSON = JSON.stringify(state);

    const blob = new Blob([stateJSON], { type: "text/plain" });
    const anchor = document.createElement("a");

    anchor.download = "PotatoSearchData.json";
    anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
    anchor.dataset.downloadurl = [
      "text/plain",
      anchor.download,
      anchor.href,
    ].join(":");
    anchor.click();
  };

  onLoadFileOpenClose = () => {
    const { isLoadFileModalOpen } = this.state;
    this.setState({
      isLoadFileModalOpen: !isLoadFileModalOpen,
    });
  };

  onInfoModalClose = () => {
    const { isInfoModalOpen } = this.state;
    this.setState({
      isInfoModalOpen: !isInfoModalOpen,
    });
  };

  onSettingsOpenClose = () => {
    const { isApiKeyModalOpen, apiKey } = this.state;
    if (apiKey) {
      set("apiKey", apiKey);
      this.setState({
        isApiKeyModalOpen: !isApiKeyModalOpen,
      });
    } else {
      const error = "api key not provided.";
      this.setState(error);
    }
  };

  onApiKeyChange = (ev, newVal) => {
    this.setState({ apiKey: newVal });
  };

  onLoadFile = (ev) => {
    const file = ev.target.files;

    var reader = new FileReader();
    reader.onload = (e) => {
      const savedText = reader.result;
      const savedState = JSON.parse(savedText);
      this.setState(savedState);
    };
    reader.readAsText(file[0]);
  };

  closeMessageBar = (ev) => {
    this.setState({ apiError: null });
  };

  toggleSearchHelper = (ev) => {
    this.setState({ isSearchHelper: !this.state.isSearchHelper });
  };

  clearSearch = async (ev) => {
    await del("lastSearch");
    this.setState({
      paperList: [],
      selectedPaper: null,
      isSearchHelper: false,
      searchResultsList: [],
      relevantList: [],
      notRelevantList: [],
      selectedTabId: "searchResultsList",
      isLoading: false,
    });
  };

  render() {
    const {
      selectedPaper,
      searchResultsList,
      searchString,
      isSearchHelper,
      relevantList,
      notRelevantList,
      selectedTabId,
      isApiKeyModalOpen,
      isLoadFileModalOpen,
      isInfoModalOpen,
      apiKey,
      fileLocation,
      isLoading,
      apiError,
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

    const _items = [
      {
        key: "load",
        text: "Load File",
        disabled: false,
        iconProps: { iconName: "Import" },
        onClick: this.onLoadFileOpenClose,
      },
      {
        key: "save",
        text: "Save",
        disabled: false,
        iconProps: { iconName: "Save" },
        onClick: this.onSave,
      },
      {
        key: "toCitavi",
        text: "To Citavi",
        disabled: false,
        iconProps: { iconName: "Share" },
        onClick: this.onToCitavi,
      },
    ];

    const _overflowItems = [];
    const _farItems = [
      {
        key: "settings",
        text: "Help & Settings",
        // This needs an ariaLabel since it's icon-only
        ariaLabel: "Help & Settings",
        iconOnly: true,
        iconProps: { iconName: "Settings" },
        onClick: this.onSettingsOpenClose,
      },
      {
        key: "info",
        text: "Info",
        // This needs an ariaLabel since it's icon-only
        ariaLabel: "Info",
        iconOnly: true,
        iconProps: { iconName: "Info" },
        onClick: this.onInfoModalClose,
      },
    ];

    return (
      <>
        <ApiModal
          isOpen={isApiKeyModalOpen}
          apiKey={apiKey}
          onClearCache={this.onClearCache}
          onApiKeyChange={this.onApiKeyChange}
          onClose={this.onSettingsOpenClose}
        />
        <LoadFileModal
          isOpen={isLoadFileModalOpen}
          fileLocation={fileLocation}
          onLoadFile={this.onLoadFile}
          onClose={this.onLoadFileOpenClose}
        />
        <InfoModal isOpen={isInfoModalOpen} onClose={this.onInfoModalClose} />
        <Stack
          style={{ height: "100vh" }}
          tokens={{ padding: 20, childrenGap: 20 }}
        >
          <Stack
            horizontal
            horizontalAlign={"space-around"}
            verticalAlign={"center"}
            tokens={{ childrenGap: 20 }}
            className={classNames.searchBar}
          >
            <Image className="header" src={header} alt="Header" />
            <StackItem>
              <Stack
                horizontal
                tokens={{ childrenGap: 10 }}
                horizontalAlign="center"
              >
                <Image
                  className="logo"
                  style={{ width: 28 }}
                  src={logo}
                  alt="Potato Search"
                />
                <Text style={{ fontWeight: "bolder" }}>Potato Search</Text>
              </Stack>
            </StackItem>

            <StackItem>
              <Stack horizontal>
                <SearchBox
                  styles={{ root: { width: 400 } }}
                  placeholder="Search"
                  onSearch={this.onLoadData}
                  value={searchString}
                />
                <IconButton
                  iconProps={{ iconName: "Delete" }}
                  title="Clear all lists"
                  id="clearSearch"
                  ariaLabel="Help"
                  onClick={this.clearSearch}
                />
                <IconButton
                  iconProps={{ iconName: "Help" }}
                  title="Help"
                  id="searchHelpButton"
                  ariaLabel="Help"
                  onClick={this.toggleSearchHelper}
                />
                {isSearchHelper && (
                  <TeachingBubble
                    target="#searchHelpButton"
                    hasCloseButton={true}
                    closeButtonAriaLabel="Close"
                    primaryButtonProps={{
                      children: "Explore Search Tips",
                      target: "_blank",
                      href:
                        "http://schema.elsevier.com/dtds/document/bkapi/search/SCOPUSSearchTips.htm",
                    }}
                    onDismiss={this.toggleSearchHelper}
                    headline="SCOPUS Search Tips"
                  >
                    SCOPUS Search API supports a Boolean syntax, which is a type
                    of search allowing users to combine keywords with operators
                    such as AND, NOT and OR to further produce more relevant
                    results. For example, a Boolean search could be "heart" AND
                    "brain". This would limit the search results to only those
                    documents containing the two keywords.
                  </TeachingBubble>
                )}
              </Stack>
            </StackItem>
            <CommandBar
              items={_items}
              overflowItems={_overflowItems}
              overflowButtonProps={{ ariaLabel: "More Comands" }}
              farItems={_farItems}
              ariaLabel="Use left and right arrow keys to navigate between commands"
            />
          </Stack>
          <StackItem grow>
            <Stack style={{ height: "100%" }} tokens={{ childrenGap: 5 }}>
              <Stack
                horizontal
                style={{ height: "100%" }}
                horizontalAlign="space-evenly"
                tokens={{ childrenGap: 10 }}
              >
                <StackItem className={classNames.paperFrame}>
                  <DetailsFrame
                    isLoading={isLoading}
                    selectedPaper={selectedPaper}
                    onPaperAction={this.onPaperAction}
                  />
                </StackItem>
                <StackItem grow={2} className={classNames.paperFrame}>
                  <ScrollablePane
                    scrollbarVisibility={ScrollbarVisibility.auto}
                  >
                    <Sticky stickyPosition={StickyPositionType.Header}>
                      <Stack
                        tokens={{ padding: "15px 15px 0", childrenGap: 5 }}
                      >
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
                        {isLoading && (
                          <ProgressIndicator
                            label="We're Loading"
                            description="Lots of data from semantic Scholar"
                          />
                        )}
                        {apiError && (
                          <MessageBar
                            messageBarType={MessageBarType.error}
                            isMultiline={false}
                            onDismiss={this.closeMessageBar}
                            dismissButtonAriaLabel="Close"
                          >
                            {apiError}
                            <Link
                              href="https://github.com/dtdi/citetool/wiki/API-Key"
                              target="_blank"
                            >
                              Did you provide your API Key?
                            </Link>
                          </MessageBar>
                        )}
                      </Stack>
                    </Sticky>
                    <Stack style={{ padding: 15 }}>
                      <ResultList
                        items={listItems}
                        selectedKey={selectedPaper && selectedPaper.key}
                        isLoading={isLoading}
                        ref={this.listRef}
                        onSelectSingle={this.onSelectSingle}
                      />
                    </Stack>
                  </ScrollablePane>
                </StackItem>
              </Stack>
            </Stack>
          </StackItem>
        </Stack>
      </>
    );
  }

  async loadSemScholarForMany(items) {
    const controller = new AbortController();
    const signal = controller.signal;

    items = await Promise.all(
      items.map(async (paper) => {
        const semScholar = await this.loadSemScholar(
          paper.doi,
          controller,
          signal
        );
        if (!semScholar) {
          return paper;
        }
        const newPaper = {
          abstract: semScholar.abstract,
          abstractlink: paper.abstractlink || semScholar.url,
          refs: semScholar.references || [],
          cites: semScholar.citations || [],
          authors: semScholar.authors
            ? semScholar.authors.map((author) => author.name).join(", ")
            : paper.authors,
          ids: semScholar.references
            ? semScholar.references.map((ref) => {
                return ref.doi || ref.paperId;
              })
            : [],
        };
        const updatedPaper = {
          ...paper,
          ...newPaper,
        };
        updatedPaper.raw.semScholar = semScholar;

        return updatedPaper;
      })
    );
    return items;
  }

  async processSearchResults(result) {
    let items = [];

    if (!result || !result["search-results"]) {
      return;
    }

    const searchResults = result["search-results"];

    const searchQuery = searchResults["opensearch:Query"]["@searchTerms"];

    const entries = searchResults.entry;

    const { paperList: oldItems } = this.state;

    entries.forEach((entry) => {
      let newDOI = !oldItems.some((item) => item.doi === entry["prism:doi"]);
      if (newDOI) {
        let abstractlink = "test";
        let links = entry["link"];
        links.forEach((link) => {
          let linktype = link["@ref"];
          if (linktype === "scopus") {
            abstractlink = link["@href"];
          }
        });

        items.push({
          key: entry["prism:doi"] || entry["dc:identifier"],
          name: entry["dc:title"],
          abstractlink: abstractlink,
          abstract: null,
          refs: [],
          cites: [],
          ids: [],
          authors: entry["dc:creator"], // @todo: replace with full list of authors.
          publication: `${entry["prism:publicationName"]} ${entry["prism:volume"]}`,
          year: entry["prism:coverDate"].substr(0, 4),
          doi: entry["prism:doi"],
          type: entry["subtypeDescription"],
          citedByCount: entry["citedby-count"],
          inBatch: [this.state.searchString],
          raw: {
            scopusEntry: entry,
            semScholar: null,
          },
          inList: LIST_RESULT,
        });
      }
    });

    items = await this.loadSemScholarForMany(items);

    // add to existing papers if exisiting
    items.push(...oldItems);

    items = this.getPaperScores(items);
    items = items.sort((a, b) => b.relevance - a.relevance);

    this.setState({
      searchString: searchQuery,
      paperList: items,
      isLoading: false,
    });
    this.onSelectSingle(items[0]);
  }

  getPaperScores(papers) {
    //Build matrix (Step1) -> direct references.
    /** @description matrix for direct references */
    let matrix = new Array(papers.length);
    const paperIds = papers.map((paper) => paper.doi);
    papers.forEach((paper, i) => {
      let row = new Array(papers.length).fill(0);
      paper.ids.forEach((id) => {
        let idx = paperIds.indexOf(id);
        if (idx !== -1) row[idx] = 1;
      });
      matrix[i] = row;
    });

    /** @description Lookup-Array - determines whether a paper is in list relevant or not. */
    let isRelevant = papers.map((paper) => paper.inList === LIST_RELEVANT);

    /**
     * summarize all citations within the set of papers
     */

    papers = papers.map((p) => {
      return {
        ...p,
        ...{
          refs_relevant: 0,
          refs_pool: 0,
          cited_relevant: 0,
          cited_pool: 0,
          cocit_pool: 0,
          cocit_relevant: 0,
          bibcup_pool: 0,
          bibcup_relevant: 0,
        },
      };
    });

    const m = {};

    // each paper
    for (let i = 0; i < papers.length; i++) {
      // each column
      for (let j = 0; j < papers.length; j++) {
        //Referencing Count - a)
        if (matrix[i][j] === 1) {
          if (isRelevant[j]) {
            papers[i].refs_relevant++;
          } else {
            papers[i].refs_pool++;
          }
        }
        //Referenced Count - b)
        if (matrix[j][i] === 1) {
          if (isRelevant[j]) {
            papers[i].cited_relevant++;
          } else {
            papers[i].cited_pool++;
          }
        }
        // each row
        for (let k = 0; k < papers.length; k++) {
          // cocitation: how often has a paper been co-cited? - c)
          if (matrix[j][i] === 1 && matrix[j][k] === 1 && i !== k) {
            if (isRelevant[k]) {
              papers[i].cocit_relevant++;
            } else {
              papers[i].cocit_pool++;
            }
          }
          // bibcoupling: - d)
          if (matrix[i][j] === 1 && matrix[k][j] === 1 && i !== k) {
            if (isRelevant[k]) {
              papers[i].bibcup_relevant++;
            } else {
              papers[i].bibcup_pool++;
            }
          }
        }
      }
    }

    const relevantKpis = papers.filter((_, i) => isRelevant[i]);
    const poolKpis = papers.filter((_, i) => !isRelevant[i]);

    m.poolPoolRefs = Math.max(1, ...poolKpis.map((l) => l.refs_pool));
    m.poolPoolCited = Math.max(1, ...poolKpis.map((l) => l.cited_pool));
    m.poolPoolCocit = Math.max(1, ...poolKpis.map((l) => l.cocit_pool));
    m.poolPoolBibcup = Math.max(1, ...poolKpis.map((l) => l.bibcup_pool));

    m.relRelRefs = Math.max(1, ...relevantKpis.map((l) => l.refs_relevant));
    m.relRelCited = Math.max(1, ...relevantKpis.map((l) => l.cited_relevant));
    m.relRelCocit = Math.max(1, ...relevantKpis.map((l) => l.cocit_relevant));
    m.relRelBibcup = Math.max(1, ...relevantKpis.map((l) => l.bibcup_relevant));

    m.poolRelRefs = Math.max(1, ...poolKpis.map((l) => l.refs_relevant));
    m.poolRelCited = Math.max(1, ...poolKpis.map((l) => l.cited_relevant));
    m.poolRelCocit = Math.max(1, ...poolKpis.map((l) => l.cocit_relevant));
    m.poolRelBibcup = Math.max(1, ...poolKpis.map((l) => l.bibcup_relevant));

    papers.forEach((paper, i) => {
      if (isRelevant[i]) {
        paper.refs_relevant /= m.relRelRefs;
        paper.cited_relevant /= m.relRelCited;
        paper.cocit_relevant /= m.relRelCocit;
        paper.bibcup_relevant /= m.relRelBibcup;

        delete paper.refs_pool;
        delete paper.cited_pool;
        delete paper.cocit_pool;
        delete paper.bibcup_pool;

        paper.relevance =
          (paper.refs_relevant +
            paper.cited_relevant +
            paper.cocit_relevant +
            paper.bibcup_relevant) /
          4;
      } else {
        paper.refs_pool /= m.poolPoolRefs;
        paper.cited_pool /= m.poolPoolCited;
        paper.cocit_pool /= m.poolPoolCocit;
        paper.bibcup_pool /= m.poolPoolBibcup;

        paper.refs_relevant /= m.poolRelRefs;
        paper.cited_relevant /= m.poolRelCited;
        paper.cocit_relevant /= m.poolRelCocit;
        paper.bibcup_relevant /= m.poolRelBibcup;

        paper.relevance =
          (paper.refs_relevant +
            paper.cited_relevant +
            paper.cocit_relevant +
            paper.bibcup_relevant +
            paper.refs_pool +
            paper.cited_pool +
            paper.cocit_pool +
            paper.bibcup_pool) /
          8;
      }
    });
    return papers;
  }
}
