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
  PivotLinkFormat,
  ProgressIndicator,
  Link,
  MessageBar,
  MessageBarType,
  getTheme,
} from "@fluentui/react";

import { get, set, keys, del, clear, Store } from "idb-keyval";

// import result from "./data/scopusresult.json";

import ResultList from "./app/components/ResultList";
import DetailsFrame from "./app/components/DetailsFrame";
import header from "./img/header.jpg";
import "./style.css";

import ApiModal from "./app/components/ApiModal";

const theme = getTheme();
const classNames = mergeStyleSets({
  paperFrame: {
    width: "40vw",
    padding: 20,
    background: theme.palette.white,
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

  async getOrLoad(doi) {
    const key = this._getKey(doi);
    const item = await get(key);
    if (!item) {
      const response = await fetch(
        `https://api.semanticscholar.org/v1/paper/${doi}?include_unknown_references=true`
      );

      if (!response.ok) {
        if (response.status === 404) {
          const body = await response.json();
          set(key, body);
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
        console.log(e);
      }
      return body;
    } else return item;
  }

  remove(doi) {
    del(this._getKey(doi));
  }
}

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
      apiKey: "",
      isApiKeyModalOpen: true,
      isLoading: false,
      searchString: "",
    };
  }

  async componentDidMount() {
    const lastSearch = await get("lastSearch");
    const apiKey = await get("apiKey");
    if (apiKey) {
      this.setState({
        apiKey: apiKey,
        isApiKeyModalOpen: false,
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

  loadSemScholar = async (doi) => {
    let cache = new PaperCache();
    const item = await cache.getOrLoad(doi);
    return item;
  };

  onLoadData = async (searchString) => {
    this.setState({
      isLoading: true,
      selectedPaper: null,
      searchString: searchString,
    });
    const { apiKey } = this.state;
    const query = `all("${searchString}")`;

    try {
      const response = await fetch(
        `https://api.elsevier.com/content/search/scopus?apiKey=${apiKey}&query=${query}&count=25&start=0`
      );
      if (!response.ok) {
        const error = `An error has occured: ${response.status}`;
        this.setState({
          isLoading: false,
          apiError: error,
        });
      }
      const body = await response.json();

      set("lastSearch", {
        searchString: this.state.searchString,
        result: body,
      });
      await this.processSearchResults(body);
      this.setState({
        isLoading: false,
      });
    } catch (e) {
      this.setState({
        isLoading: false,
        apiError: e.message,
      });
    }
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

    newList = this.getPaperScores(newList);
    this.setState({
      paperList: newList.sort((a, b) => b.relevance - a.relevance),
      isLoading: false,
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

  closeMessageBar = (ev) => {
    this.setState({ apiError: null });
  };

  render() {
    const {
      selectedPaper,
      searchResultsList,
      searchString,
      relevantList,
      notRelevantList,
      selectedTabId,
      isApiKeyModalOpen,
      apiKey,
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
        key: "upload",
        text: "Upload",
        disabled: true,
        iconProps: { iconName: "Upload" },
        href: "https://developer.microsoft.com/en-us/fluentui",
      },
      {
        key: "share",
        text: "Share",
        disabled: true,
        iconProps: { iconName: "Share" },
        onClick: () => console.log("Share"),
      },
      {
        key: "download",
        text: "Download",
        disabled: true,
        iconProps: { iconName: "Download" },
        onClick: () => console.log("Download"),
      },
    ];

    const _overflowItems = [
      {
        key: "move",
        text: "Move to...",
        disabled: true,
        onClick: () => console.log("Move to"),
        iconProps: { iconName: "MoveToFolder" },
      },
      {
        key: "copy",
        text: "Copy to...",
        disabled: true,
        onClick: () => console.log("Copy to"),
        iconProps: { iconName: "Copy" },
      },
      {
        key: "rename",
        text: "Rename...",
        disabled: true,
        onClick: () => console.log("Rename"),
        iconProps: { iconName: "Edit" },
      },
    ];

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
        onClick: () => console.log("Info"),
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
        <Stack tokens={{ padding: 25, childrenGap: 20 }}>
          <Image className="header" src={header} alt="Header" />

          <Stack
            horizontal
            horizontalAlign={"space-around"}
            verticalAlign={"center"}
            tokens={{ childrenGap: 20 }}
            className={classNames.searchBar}
          >
            <Text style={{ fontWeight: "bolder" }}>Potatosearch</Text>
            <SearchBox
              styles={{ root: { width: 400 } }}
              placeholder="Search"
              onSearch={this.onLoadData}
              value={searchString}
            />
            <CommandBar
              items={_items}
              overflowItems={_overflowItems}
              overflowButtonProps={{ ariaLabel: "More Comands" }}
              farItems={_farItems}
              ariaLabel="Use left and right arrow keys to navigate between commands"
            />
          </Stack>
          <Stack className="" tokens={{ childrenGap: 5 }}>
            <Stack
              horizontal
              horizontalAlign="space-evenly"
              tokens={{ childrenGap: 10 }}
            >
              <StackItem disableShrink className={classNames.paperFrame}>
                <DetailsFrame
                  isLoading={isLoading}
                  selectedPaper={selectedPaper}
                  onPaperAction={this.onPaperAction}
                />
              </StackItem>
              <StackItem grow={2} className={classNames.paperFrame}>
                <Stack tokens={{ childrenGap: 5 }}>
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
                  <ResultList
                    items={listItems}
                    isLoading={isLoading}
                    onSelectSingle={this.onSelectSingle}
                  />
                </Stack>
              </StackItem>
            </Stack>
          </Stack>
        </Stack>
      </>
    );
  }

  async loadSemScholarForMany(items) {
    items = await Promise.all(
      items.map(async (paper) => {
        const semScholar = await this.loadSemScholar(paper.doi);

        const newPaper = {
          abstract: semScholar.abstract,
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
    });

    items = await this.loadSemScholarForMany(items);

    items = this.getPaperScores(items);
    items = items.sort((a, b) => b.relevance - a.relevance);

    this.setState({
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
