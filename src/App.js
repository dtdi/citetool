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

  onSelectSingle = async (elem) => {
    this.setState({
      selectedPaper: elem,
    });
    console.log("onSelectSingle", elem);

    const semanticScholarPaper = await this.onLoadSemanticScholar(elem.doi);
    elem.semanticScholarEntry = semanticScholarPaper;
    this.onPaperAction(elem, "update-paper");
  };

  onSearch = (newValue) => {
    this.processSearchResults(result);
  };

  onLoadSemanticScholar = async (doi) => {
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
            if (response.status == "404") {
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
        authors: entry["dc:creator"], // @todo: replace with full list of authors.
        publication: `${entry["prism:publicationName"]} ${entry["prism:volume"]}`,
        year: entry["prism:coverDate"].substr(0, 4),
        relevance: (Math.random() * 100).toFixed(2),
        doi: entry["prism:doi"],
        type: entry["subtypeDescription"],
        citedbycount: entry["citedby-count"],
        scopusEntry: entry,
        semanticScholarEntry: null,
        inList: LIST_RESULT,
      });
    });

    items = items.sort((a, b) => Number(b.relevance) - Number(a.relevance));
    this.setState({
      paperList: items,
    });
    this.onSelectSingle(items[0]);
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

    return (
      <Stack>
        <img class="header" src={header} alt="Header" />
        <div className="searchbar">
          <Stack>
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

function processSearchResults(scopusresult) {
  const items = [];
  let entries = scopusresult["search-results"].entry;
  //console.log(entries);
  entries.forEach((entry) => {
    let abstractlink = "test";
    let links = entry["link"];
    links.forEach((link) => {
      let linktype = link["@ref"];
      if (linktype === "scopus") {
        abstractlink = link["@href"];
      }
    });

    //API Call for Crossrefresult and semanticscholarresult

    items.push({
      key: entry["dc:identifier"],
      name: entry["dc:title"],
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

  //Extract DOIs into array from references
  items.forEach((item) => {
    if (item["references"] == undefined) {
      item.referencingdois = [];
    } else {
      let referencearray = [];
      item.references.forEach((reference, i) => {
        referencearray[i] = reference.doi;
      });
      item.referencingdois = referencearray;
    }
  });

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
