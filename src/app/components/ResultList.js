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


  //Hier kann Oli arbeiten
  items[0].olislieblingskpi = "5";
  console.log(items);

  return items;
}
