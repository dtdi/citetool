import {
  DetailsList,
  MarqueeSelection,
  Selection,
  SelectionMode,
  DetailsListLayoutMode,
  Fabric,
  PeoplePickerItemBase,
} from "@fluentui/react";
import React, { Component } from "react";

import scopusresult from "../../data/scopusresult.json";
import crossrefresult1 from "../../data/crossrefresult1.json";
import crossrefresult2 from "../../data/crossrefresult1.json";
import semanticscholarresult1 from "../../data/semanticscholarresult1.json";
import semanticscholarresult2 from "../../data/semanticscholarresult2.json";
import semanticscholarresult3 from "../../data/semanticscholarresult3.json";
import semanticscholarresult4 from "../../data/semanticscholarresult4.json";
import semanticscholarresult5 from "../../data/semanticscholarresult5.json";
import semanticscholarresult6 from "../../data/semanticscholarresult6.json";
import semanticscholarresult7 from "../../data/semanticscholarresult7.json";

export default class ResultList extends Component {
  _selection;
  _allItems = [];
  constructor(props) {
    super(props);

    const { onSelectSingle } = this.props;

    const columns = [
      {
        key: "column1",
        name: "Relevance",
        fieldName: "relevance",
        minWidth: 75,
        maxWidth: 100,
        isRowHeader: true,
        isSorted: true,
        isSortedDescending: true,
        onColumnClick: this._onColumnClick,
        data: "number",
        isPadded: true,
      },
      {
        key: "column2",
        name: "Name",
        fieldName: "name",
        minWidth: 300,
        maxWidth: 500,
        sortAscendingAriaLabel: "Sorted A to Z",
        sortDescendingAriaLabel: "Sorted Z to A",
        onColumnClick: this._onColumnClick,
        data: "string",
        isPadded: true,
        isMultiline: true,
      },
      {
        key: "column3",
        name: "Authors",
        fieldName: "authors",
        minWidth: 75,
        maxWidth: 100,
        onColumnClick: this._onColumnClick,
        data: "string",
        isPadded: true,
        isMultiline: true,
      },
      {
        key: "column4",
        name: "Year",
        fieldName: "year",
        minWidth: 50,
        maxWidth: 75,
        onColumnClick: this._onColumnClick,
        data: "string",
        isPadded: true,
      },
    ];

    this._selection = new Selection({
      onSelectionChanged: () => {
        const selectionCount = this._selection.getSelectedCount();
        if (selectionCount === 1) {
          onSelectSingle(this._selection.getSelection()[0]);
        }

        this.setState({
          selectionDetails: this._getSelectionDetails(),
        });
      },
    });

    this.state = {
      items: this._allItems,
      columns: columns,
      selectionDetails: this._getSelectionDetails(),
      selectedItem: null,
      isModalSelection: false,
      isCompactMode: false,
      announcedMessage: undefined,
    };
  }

  componentDidMount() {
    this._allItems = processSearchResults(scopusresult).slice(0)
    .sort((a, b) =>
      (Number(a["relevance"]) < Number(b["relevance"])) ? 1 : -1
    );;

    this.setState({
      items: this._allItems,
    });

  }

  render() {
    const {
      columns,
      items,
    } = this.state;

    return (
      <Fabric>
        <MarqueeSelection selection={this._selection}>
          <div overflow="scroll" data-is-scrollable="true">
            <DetailsList
              items={items}
              compact={"true"}
              columns={columns}
              selectionMode={SelectionMode.multiple}
              getKey={this._getKey}
              setKey="multiple"
              layoutMode={DetailsListLayoutMode.justified}
              isHeaderVisible={true}
              selection={this._selection}
              selectionPreservedOnEmptyClick={true}
              enterModalSelectionOnTouch={true}
              ariaLabelForSelectionColumn="Toggle selection"
              ariaLabelForSelectAllCheckbox="Toggle selection for all items"
              checkButtonAriaLabel="Row checkbox"
            />
          </div>
        </MarqueeSelection>
      </Fabric>
    );
  }

  _componentDidUpdate(previousProps, previousState) {
    if (
      previousState.isModalSelection !== this.state.isModalSelection &&
      !this.state.isModalSelection
    ) {
      this._selection.setAllSelected(false);
    }
  }

  _getKey(item, index) {
    return item.key;
  }

  _onChangeText = (ev, text) => {
    this.setState({
      items: text
        ? this._allItems.filter((i) => i.name.toLowerCase().indexOf(text) > -1)
        : this._allItems,
    });
  };

  _getSelectionDetails() {
    const selectionCount = this._selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        return "No items selected";
      case 1:
        return "1 item selected: " + this._selection.getSelection()[0].name;
      default:
        return `${selectionCount} items selected`;
    }
  }

  _onColumnClick = (ev, column) => {
    const { columns, items } = this.state;
    const newColumns = columns.slice();
    const currColumn = newColumns.filter(
      (currCol) => column.key === currCol.key
    )[0];
    newColumns.forEach((newCol) => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
        this.setState({
          announcedMessage: `${currColumn.name} is sorted ${currColumn.isSortedDescending ? "descending" : "ascending"
            }`,
        });
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });
    const newItems = _copyAndSort(
      items,
      currColumn.fieldName,
      currColumn.isSortedDescending
    );
    this.setState({
      columns: newColumns,
      items: newItems,
    });
  };
}

function _copyAndSort(items, columnKey, isSortedDescending) {
  const key = columnKey;
  return items
    .slice(0)
    .sort((a, b) =>
      (isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1
    );
}

function processSearchResults(scopusresult) {
  const items = [];
  let entries = scopusresult["search-results"].entry;
  //console.log(entries);
  entries.forEach((entry) => {
    
    let abstractlink = "test";
    let links = entry["link"];
    links.forEach(((link) => {
      let linktype = link['@ref'];
      if(linktype === "scopus"){
        abstractlink = link['@href'];
      }
    }));

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
      let paperindex = allPapers.map(paper => paper.doi).indexOf(doi);
      matrixline[paperindex] = 1;      
    });
    matrix[i] = matrixline;
  });

  console.log(matrix);

  //////Prepare Calculation of Indicators
  let relevantArray = allPapers.map(paper => paper.relevant);
  
  //calculate row sums
  let rowsums = new Array(paperCount);
  matrix.forEach((matrixline, i) => {
    let matrixlineRelevant = matrixline.filter((line, i) => relevantArray[i]);
    let referencingRelevant = matrixlineRelevant.reduce((a, b) => {
      return a+b;
    }, 0);
    let matrixlinePool = matrixline.filter((line, i) => !relevantArray[i]);
    let referencingPool = matrixlinePool.reduce((a, b) => {
      return a+b;
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
        columnsumsRelevant[index] = columnsumsRelevant[index] + value 
      } else {
        columnsumsPool[index] = columnsumsPool[index] + value 
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
        ((line[columnindex]===1) &&
        (rowsums[lineindex][0] - (!relevantArray[columnindex] && 1)));
      //Calculate Cocitation Relevant
      cocitationRelevant[columnindex] =
      cocitationRelevant[columnindex] +
        ((line[columnindex]===1) &&
        (rowsums[lineindex][1] - (relevantArray[columnindex] && 1))); 
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
        ((line[columnindex]===1) &&
        (columnsums[columnindex][0] - (!relevantArray[lineindex] && 1)));
      //Calculate Bibliographic Relevant
      bibliographicRelevant[lineindex] =
      bibliographicRelevant[lineindex] +
        ((line[columnindex]===1) &&
        (columnsums[columnindex][1] - (relevantArray[lineindex] && 1)));
    });
  });

  //Initialize Indicator Property - 8 indicators
  items.forEach((item, index) => {
    item.indicators = new Array(8).fill(0)
  })

  //indicators compared to Pool
  let referencingPoolMaxPool = Math.max(...referencingPool.filter((line, i) => !relevantArray[i]));
  let referencingPoolMaxRelevant = Math.max(...referencingPool.filter((line, i) => relevantArray[i]));
  referencingPool.forEach((line, index) => {
    if (relevantArray[index]) {
      items[index].indicators[0] = 0.01 * Math.round(10000 * (referencingPool[index]/Math.max(1, referencingPoolMaxRelevant)));
    } else {
      items[index].indicators[0] = 0.01 * Math.round(10000 * (referencingPool[index]/Math.max(1, referencingPoolMaxPool))); 
    };
  });
  
  let referencedPoolMaxPool = Math.max(...referencedPool.filter((line, i) => !relevantArray[i]));
  let referencedPoolMaxRelevant = Math.max(...referencedPool.filter((line, i) => relevantArray[i]));
  referencedPool.forEach((line, index) => {
    if (relevantArray[index]) {
      items[index].indicators[1] = 0.01 * Math.round(10000 * (referencedPool[index]/Math.max(1, referencedPoolMaxRelevant)));
    } else {
      items[index].indicators[1] = 0.01 * Math.round(10000 * (referencedPool[index]/Math.max(1, referencedPoolMaxPool))); 
    };
  });
    
  let cocitationPoolMaxPool = Math.max(...cocitationPool.filter((line, i) => !relevantArray[i]));  
  let cocitationPoolMaxRelevant = Math.max(...cocitationPool.filter((line, i) => relevantArray[i]));
  cocitationPool.forEach((line, index) => {
    if (relevantArray[index]) {
      items[index].indicators[2] = 0.01 * Math.round(10000 * (cocitationPool[index]/Math.max(1, cocitationPoolMaxRelevant)));
    } else {
      items[index].indicators[2] = 0.01 * Math.round(10000 * (cocitationPool[index]/Math.max(1, cocitationPoolMaxPool))); 
    };
  });
  
  let bibliographicPoolMaxPool = Math.max(...bibliographicPool.filter((line, i) => !relevantArray[i]));
  let bibliographicPoolMaxRelevant = Math.max(...bibliographicPool.filter((line, i) => relevantArray[i]));
  bibliographicPool.forEach((line, index) => {
    if (relevantArray[index]) {
      items[index].indicators[3] = 0.01 * Math.round(10000 * (bibliographicPool[index]/Math.max(1, bibliographicPoolMaxRelevant)));
    } else {
      items[index].indicators[3] = 0.01 * Math.round(10000 * (bibliographicPool[index]/Math.max(1, bibliographicPoolMaxPool))); 
    };
  });


  //indicators compared to Relevant Papers
  let referencingRelevantMaxPool = Math.max(...referencingRelevant.filter((line, i) => !relevantArray[i]));
  let referencingRelevantMaxRelevant = Math.max(...referencingRelevant.filter((line, i) => relevantArray[i]));
  referencingRelevant.forEach((line, index) => {
    if (relevantArray[index]) {
      items[index].indicators[4] = 0.01 * Math.round(10000 * (referencingRelevant[index]/Math.max(1, referencingRelevantMaxRelevant)));
    } else {
      items[index].indicators[4] = 0.01 * Math.round(10000 * (referencingRelevant[index]/Math.max(1, referencingRelevantMaxPool))); 
    };
  });
  
  let referencedRelevantMaxPool = Math.max(...referencedRelevant.filter((line, i) => !relevantArray[i]));
  let referencedRelevantMaxRelevant = Math.max(...referencedRelevant.filter((line, i) => relevantArray[i]));
  referencedRelevant.forEach((line, index) => {
    if (relevantArray[index]) {
      items[index].indicators[5] = 0.01 * Math.round(10000 * (referencedRelevant[index]/Math.max(1, referencedRelevantMaxRelevant)));
    } else {
      items[index].indicators[5] = 0.01 * Math.round(10000 * (referencedRelevant[index]/Math.max(1, referencedRelevantMaxPool))); 
    };
  });
    
  let cocitationRelevantMaxPool = Math.max(...cocitationRelevant.filter((line, i) => !relevantArray[i]));  
  let cocitationRelevantMaxRelevant = Math.max(...cocitationRelevant.filter((line, i) => relevantArray[i]));
  cocitationRelevant.forEach((line, index) => {
    if (relevantArray[index]) {
      items[index].indicators[6] = 0.01 * Math.round(10000 * (cocitationRelevant[index]/Math.max(1, cocitationRelevantMaxRelevant)));
    } else {
      items[index].indicators[6] = 0.01 * Math.round(10000 * (cocitationRelevant[index]/Math.max(1, cocitationRelevantMaxPool))); 
    };
  });
  
  let bibliographicRelevantMaxPool = Math.max(...bibliographicRelevant.filter((line, i) => !relevantArray[i]));
  let bibliographicRelevantMaxRelevant = Math.max(...bibliographicRelevant.filter((line, i) => relevantArray[i]));
  bibliographicRelevant.forEach((line, index) => {
    if (relevantArray[index]) {
      items[index].indicators[7] = 0.01 * Math.round(10000 * (bibliographicRelevant[index]/Math.max(1, bibliographicRelevantMaxRelevant)));
    } else {
      items[index].indicators[7] = 0.01 * Math.round(10000 * (bibliographicRelevant[index]/Math.max(1, bibliographicRelevantMaxPool))); 
    };
  });

  items.forEach((item, index) => {
    let indicatorsforscore = relevantArray[index] ? item.indicators.slice(4,8) : item.indicators;
    console.log(indicatorsforscore);
    let score = 0;
    let size = indicatorsforscore.length;
    indicatorsforscore.forEach((indicator) => {
      score = score + (1/size) * indicator;
    });
    item.relevance = (0.01 * Math.round(score*100));
  });

  console.log(items);

  return items;
}
