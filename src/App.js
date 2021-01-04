import React, { Component } from "react";
import {
  Stack,
  StackItem,
  CommandBar,
  Pivot,
  PivotItem,
  Image,
  mergeStyleSets,
  SearchBox,
  PivotLinkFormat,
  DefaultButton,
  getTheme,
} from "@fluentui/react";

import result from "./data/scopusresult.json";

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
      apiKey: "1f1787f55e2084eca33a02829ff7fe6c",
      modalOpen: false,
    };
  }

  componentDidMount() {
    this.processSearchResults(result);
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
    const semanticScholarPaper = await this.loadSemScholar(elem.doi);
    this.onPaperAction(elem, "update-paper");
  };

  onSearch = (newValue) => {
    this.processSearchResults(result);
  };

  loadSemScholar = async (doi) => {
    class PaperCache {
      prefix = "paper_";

      _getKey(doi) {
        return this.prefix + encodeURIComponent(doi);
      }

      async getOrLoad(doi) {
        const key = this._getKey(doi);
        const item = localStorage.getItem(key);
        if (!item) {
          const response = await fetch(
            `https://api.semanticscholar.org/v1/paper/${doi}?include_unknown_references=true`
          );

          if (!response.ok) {
            if (response.status === 404) {
              const body = await response.json();
              localStorage.setItem(key, JSON.stringify(body));
              return body;
            } else {
              const message = `An error has occured: ${response.status}`;
              throw new Error(message);
            }
          }

          const body = await response.json();
          localStorage.setItem(key, JSON.stringify(body));
          return body;
        } else return JSON.parse(item);
      }

      remove(doi) {
        localStorage.removeItem(this._getKey(doi));
      }
    }
    this.setState({ isLoaded: false });

    let cache = new PaperCache();
    const item = await cache.getOrLoad(doi);

    this.setState({ isLoaded: true });

    return item;
  };

  onLoadData = (searchString) => {
    const { apiKey: APIKey } = this.state;
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
  };

  //@TODO: local storage einbauen
  handleAPIKeyChange = (e) => {
    this.setState({ APIKey: e.target.value });
  };

  render() {
    const {
      selectedPaper,
      searchResultsList,
      relevantList,
      notRelevantList,
      selectedTabId,
      modalOpen,
      apiKey,
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
          isOpen={modalOpen}
          apiKey={apiKey}
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
            <SearchBox
              styles={{ root: { width: 400 } }}
              placeholder="Search"
              onSearch={this.onSearch}
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
                  selectedPaper={selectedPaper}
                  onPaperAction={this.onPaperAction}
                />
              </StackItem>
              <StackItem grow={2} className={classNames.paperFrame}>
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
      </>
    );
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
        key: entry["dc:identifier"],
        name: entry["dc:title"],
        abstractlink: abstractlink,
        authors: entry["dc:creator"], // @todo: replace with full list of authors.
        publication: `${entry["prism:publicationName"]} ${entry["prism:volume"]}`,
        year: entry["prism:coverDate"].substr(0, 4),
        doi: entry["prism:doi"],
        type: entry["subtypeDescription"],
        citedbycount: entry["citedby-count"],
        raw: {
          scopusEntry: entry,
          semScholar: null,
        },
        inList: LIST_RESULT,
        refs: [],
      });
    });

    items = await Promise.all(
      items.map(async (paper) => {
        const semScholar = await this.loadSemScholar(paper.doi);

        const newPaper = {
          abstract: semScholar.abstract,
          refs: semScholar.references || [],
          cites: semScholar.citations || [],
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

    console.log(items);

    //Build matrix (Step1) -> direct references.
    const matrix = new Array(items.length);
    const itemIDs = items.map((paper) => paper.doi);
    console.log(itemIDs);
    items.forEach((paper, i) => {
      let row = new Array(items.length).fill(0);
      paper.ids.forEach((id) => {
        let idx = itemIDs.indexOf(id);
        if (idx >= 0) row[idx] = 1;
      });
      matrix[i] = row;
    });

    console.log(matrix);

    //////Prepare Calculation of Indicators
    const relevantItems = items.map((paper) => paper.inList === LIST_RELEVANT);
    console.log(relevantItems);
    //calculate row sums
    let rowSums = new Array(items.length);
    matrix.forEach((row, i) => {
      let referencingRelevant = row
        .filter((l, idx) => relevantItems[idx])
        .reduce((a, b) => a + b, 0);

      let referencingPool = row
        .filter((l, idx) => !relevantItems[idx])
        .reduce((a, b) => a + b, 0);
      rowSums[i] = [referencingPool, referencingRelevant];
    });

    //calculate Column Sums
    let colSums_relevant = new Array(items.length).fill(0);
    let colSums_pool = new Array(items.length).fill(0);
    let colSums = new Array(items.length).fill([]);

    matrix.forEach((row, row_idx) => {
      row.forEach((value, col_idx) => {
        if (relevantItems[row_idx]) {
          colSums_relevant[col_idx] = colSums_relevant[col_idx] + value;
        } else {
          colSums_pool[col_idx] = colSums_pool[col_idx] + value;
        }
      });
    });
    colSums_relevant.forEach((column, index) => {
      colSums[index] = [colSums_pool[index], colSums_relevant[index]];
    });

    //Calculate Indicators (Step2)
    //Referencing Count - a)
    let referencingPool = new Array(items.length).fill(0);
    let referencingRelevant = new Array(items.length).fill(0);
    matrix.forEach((line, i) => {
      referencingPool[i] = rowSums[i][0];
      referencingRelevant[i] = rowSums[i][1];
    });

    //Referenced Count - b)
    let referencedPool = new Array(items.length).fill(0);
    let referencedRelevant = new Array(items.length).fill(0);
    matrix.forEach((line, i) => {
      referencedPool[i] = colSums[i][0];
      referencedRelevant[i] = colSums[i][1];
    });

    //Cocitation Count - c)
    let cocitationPool = new Array(items.length).fill(0);
    let cocitationRelevant = new Array(items.length).fill(0);
    matrix.forEach((column, col_idx) => {
      matrix.forEach((line, lin_idx) => {
        //calculate Cocitation Pool
        cocitationPool[col_idx] =
          cocitationPool[col_idx] +
          (line[col_idx] === 1 &&
            rowSums[lin_idx][0] - (!relevantItems[col_idx] && 1));
        //Calculate Cocitation Relevant
        cocitationRelevant[col_idx] =
          cocitationRelevant[col_idx] +
          (line[col_idx] === 1 &&
            rowSums[lin_idx][1] - (relevantItems[col_idx] && 1));
      });
    });

    //Bibliographic Count - d)
    let bibliographicPool = new Array(items.length).fill(0);
    let bibliographicRelevant = new Array(items.length).fill(0);
    matrix.forEach((line, lin_idx) => {
      matrix.forEach((c, col_idx) => {
        //calculate Bibliographic Pool
        bibliographicPool[lin_idx] =
          bibliographicPool[lin_idx] +
          (line[col_idx] === 1 &&
            colSums[col_idx][0] - (!relevantItems[lin_idx] && 1));
        //Calculate Bibliographic Relevant
        bibliographicRelevant[lin_idx] =
          bibliographicRelevant[lin_idx] +
          (line[col_idx] === 1 &&
            colSums[col_idx][1] - (relevantItems[lin_idx] && 1));
      });
    });

    console.log(colSums);

    this.setState({
      paperList: items,
    });
    this.onSelectSingle(items[0]);
  }
}

function processSearchResults(scopusresult) {
  let items = [];
  //Hard coded list separation
  const relevantItems = [items[0], items[2], items[3], items[5]];
  const paperPool = [items[1], items[4], items[6]];

  //Join Lists
  relevantItems.forEach(function (item) {
    item.relevant = true;
  });
  paperPool.forEach(function (item) {
    item.relevant = false;
  });
  //hard coded list aggregation
  //const allPapers = [relevantItems[0], paperPool[0], relevantItems[1], relevantItems[2], paperPool[1], relevantItems[3], paperPool[2]];
  const allPapers = relevantItems.concat(paperPool);
  console.log(allPapers);

  //ATTENTION - INCONSISTENCIES BETWEEN allPapers AND items --> Join later on uses index, might have to use doi

  //Build matrix (Step1)
  let paperCount = allPapers.length;
  const matrix = new Array(paperCount);
  allPapers.forEach((paper, i) => {
    let matrixline = new Array(paperCount).fill(0);
    paper.referencingdois.forEach((doi) => {
      let paperindex = allPapers.map((paper) => paper.doi).indexOf(doi);
      matrixline[paperindex] = 1;
    });
    matrix[i] = matrixline;
  });

  console.log(matrix);

  //////Prepare Calculation of Indicators
  let relevantArray = allPapers.map((paper) => paper.relevant);

  //calculate row sums
  let rowsums = new Array(paperCount);
  matrix.forEach((matrixline, i) => {
    let matrixlineRelevant = matrixline.filter((line, i) => relevantArray[i]);
    let referencingRelevant = matrixlineRelevant.reduce((a, b) => {
      return a + b;
    }, 0);
    let matrixlinePool = matrixline.filter((line, i) => !relevantArray[i]);
    let referencingPool = matrixlinePool.reduce((a, b) => {
      return a + b;
    }, 0);
    rowsums[i] = [referencingPool, referencingRelevant];
  });

  //calculate Column Sums
  let columnsumsRelevant = new Array(paperCount).fill(0);
  let columnsumsPool = new Array(paperCount).fill(0);
  let columnsums = new Array(paperCount).fill([]);

  matrix.forEach((matrixline, i) => {
    let relevantLine = relevantArray[i];
    matrixline.forEach((value, index) => {
      if (relevantLine) {
        columnsumsRelevant[index] = columnsumsRelevant[index] + value;
      } else {
        columnsumsPool[index] = columnsumsPool[index] + value;
      }
    });
  });
  columnsumsRelevant.forEach((column, index) => {
    columnsums[index] = [columnsumsPool[index], columnsumsRelevant[index]];
  });

  //Calculate Indicators (Step2)

  //Referencing Count - a)
  let referencingPool = new Array(paperCount).fill(0);
  let referencingRelevant = new Array(paperCount).fill(0);
  matrix.forEach((line, i) => {
    referencingPool[i] = rowsums[i][0];
    referencingRelevant[i] = rowsums[i][1];
  });

  //Referenced Count - b)
  let referencedPool = new Array(paperCount).fill(0);
  let referencedRelevant = new Array(paperCount).fill(0);
  matrix.forEach((line, i) => {
    referencedPool[i] = columnsums[i][0];
    referencedRelevant[i] = columnsums[i][1];
  });

  //Cocitation Count - c)
  let cocitationPool = new Array(paperCount).fill(0);
  let cocitationRelevant = new Array(paperCount).fill(0);
  matrix.forEach((column, columnindex) => {
    matrix.forEach((line, lineindex) => {
      //calculate Cocitation Pool
      cocitationPool[columnindex] =
        cocitationPool[columnindex] +
        (line[columnindex] === 1 &&
          rowsums[lineindex][0] - (!relevantArray[columnindex] && 1));
      //Calculate Cocitation Relevant
      cocitationRelevant[columnindex] =
        cocitationRelevant[columnindex] +
        (line[columnindex] === 1 &&
          rowsums[lineindex][1] - (relevantArray[columnindex] && 1));
    });
  });

  //Bibliographic Count - d)
  let bibliographicPool = new Array(paperCount).fill(0);
  let bibliographicRelevant = new Array(paperCount).fill(0);
  matrix.forEach((line, lineindex) => {
    matrix.forEach((c, columnindex) => {
      //calculate Bibliographic Pool
      bibliographicPool[lineindex] =
        bibliographicPool[lineindex] +
        (line[columnindex] === 1 &&
          columnsums[columnindex][0] - (!relevantArray[lineindex] && 1));
      //Calculate Bibliographic Relevant
      bibliographicRelevant[lineindex] =
        bibliographicRelevant[lineindex] +
        (line[columnindex] === 1 &&
          columnsums[columnindex][1] - (relevantArray[lineindex] && 1));
    });
  });

  //Initialize Indicator Property - 8 indicators
  items.forEach((item, index) => {
    item.indicators = new Array(8).fill(0);
  });

  //indicators compared to Pool
  let referencingPoolMaxPool = Math.max(
    ...referencingPool.filter((line, i) => !relevantArray[i])
  );
  let referencingPoolMaxRelevant = Math.max(
    ...referencingPool.filter((line, i) => relevantArray[i])
  );
  referencingPool.forEach((line, index) => {
    if (relevantArray[index]) {
      items[index].indicators[0] =
        0.01 *
        Math.round(
          10000 *
            (referencingPool[index] / Math.max(1, referencingPoolMaxRelevant))
        );
    } else {
      items[index].indicators[0] =
        0.01 *
        Math.round(
          10000 * (referencingPool[index] / Math.max(1, referencingPoolMaxPool))
        );
    }
  });

  let referencedPoolMaxPool = Math.max(
    ...referencedPool.filter((line, i) => !relevantArray[i])
  );
  let referencedPoolMaxRelevant = Math.max(
    ...referencedPool.filter((line, i) => relevantArray[i])
  );
  referencedPool.forEach((line, index) => {
    if (relevantArray[index]) {
      items[index].indicators[1] =
        0.01 *
        Math.round(
          10000 *
            (referencedPool[index] / Math.max(1, referencedPoolMaxRelevant))
        );
    } else {
      items[index].indicators[1] =
        0.01 *
        Math.round(
          10000 * (referencedPool[index] / Math.max(1, referencedPoolMaxPool))
        );
    }
  });

  let cocitationPoolMaxPool = Math.max(
    ...cocitationPool.filter((line, i) => !relevantArray[i])
  );
  let cocitationPoolMaxRelevant = Math.max(
    ...cocitationPool.filter((line, i) => relevantArray[i])
  );
  cocitationPool.forEach((line, index) => {
    if (relevantArray[index]) {
      items[index].indicators[2] =
        0.01 *
        Math.round(
          10000 *
            (cocitationPool[index] / Math.max(1, cocitationPoolMaxRelevant))
        );
    } else {
      items[index].indicators[2] =
        0.01 *
        Math.round(
          10000 * (cocitationPool[index] / Math.max(1, cocitationPoolMaxPool))
        );
    }
  });

  let bibliographicPoolMaxPool = Math.max(
    ...bibliographicPool.filter((line, i) => !relevantArray[i])
  );
  let bibliographicPoolMaxRelevant = Math.max(
    ...bibliographicPool.filter((line, i) => relevantArray[i])
  );
  bibliographicPool.forEach((line, index) => {
    if (relevantArray[index]) {
      items[index].indicators[3] =
        0.01 *
        Math.round(
          10000 *
            (bibliographicPool[index] /
              Math.max(1, bibliographicPoolMaxRelevant))
        );
    } else {
      items[index].indicators[3] =
        0.01 *
        Math.round(
          10000 *
            (bibliographicPool[index] / Math.max(1, bibliographicPoolMaxPool))
        );
    }
  });

  //indicators compared to Relevant Papers
  let referencingRelevantMaxPool = Math.max(
    ...referencingRelevant.filter((line, i) => !relevantArray[i])
  );
  let referencingRelevantMaxRelevant = Math.max(
    ...referencingRelevant.filter((line, i) => relevantArray[i])
  );
  referencingRelevant.forEach((line, index) => {
    if (relevantArray[index]) {
      items[index].indicators[4] =
        0.01 *
        Math.round(
          10000 *
            (referencingRelevant[index] /
              Math.max(1, referencingRelevantMaxRelevant))
        );
    } else {
      items[index].indicators[4] =
        0.01 *
        Math.round(
          10000 *
            (referencingRelevant[index] /
              Math.max(1, referencingRelevantMaxPool))
        );
    }
  });

  let referencedRelevantMaxPool = Math.max(
    ...referencedRelevant.filter((line, i) => !relevantArray[i])
  );
  let referencedRelevantMaxRelevant = Math.max(
    ...referencedRelevant.filter((line, i) => relevantArray[i])
  );
  referencedRelevant.forEach((line, index) => {
    if (relevantArray[index]) {
      items[index].indicators[5] =
        0.01 *
        Math.round(
          10000 *
            (referencedRelevant[index] /
              Math.max(1, referencedRelevantMaxRelevant))
        );
    } else {
      items[index].indicators[5] =
        0.01 *
        Math.round(
          10000 *
            (referencedRelevant[index] / Math.max(1, referencedRelevantMaxPool))
        );
    }
  });

  let cocitationRelevantMaxPool = Math.max(
    ...cocitationRelevant.filter((line, i) => !relevantArray[i])
  );
  let cocitationRelevantMaxRelevant = Math.max(
    ...cocitationRelevant.filter((line, i) => relevantArray[i])
  );
  cocitationRelevant.forEach((line, index) => {
    if (relevantArray[index]) {
      items[index].indicators[6] =
        0.01 *
        Math.round(
          10000 *
            (cocitationRelevant[index] /
              Math.max(1, cocitationRelevantMaxRelevant))
        );
    } else {
      items[index].indicators[6] =
        0.01 *
        Math.round(
          10000 *
            (cocitationRelevant[index] / Math.max(1, cocitationRelevantMaxPool))
        );
    }
  });

  let bibliographicRelevantMaxPool = Math.max(
    ...bibliographicRelevant.filter((line, i) => !relevantArray[i])
  );
  let bibliographicRelevantMaxRelevant = Math.max(
    ...bibliographicRelevant.filter((line, i) => relevantArray[i])
  );
  bibliographicRelevant.forEach((line, index) => {
    if (relevantArray[index]) {
      items[index].indicators[7] =
        0.01 *
        Math.round(
          10000 *
            (bibliographicRelevant[index] /
              Math.max(1, bibliographicRelevantMaxRelevant))
        );
    } else {
      items[index].indicators[7] =
        0.01 *
        Math.round(
          10000 *
            (bibliographicRelevant[index] /
              Math.max(1, bibliographicRelevantMaxPool))
        );
    }
  });

  items.forEach((item, index) => {
    let indicatorsforscore = relevantArray[index]
      ? item.indicators.slice(4, 8)
      : item.indicators;
    console.log(indicatorsforscore);
    let score = 0;
    let size = indicatorsforscore.length;
    indicatorsforscore.forEach((indicator) => {
      score = score + (1 / size) * indicator;
    });
    item.relevance = 0.01 * Math.round(score * 100);
  });

  console.log(items);

  return items;
}
