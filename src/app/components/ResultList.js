import {
  ShimmeredDetailsList,
  Selection,
  SelectionMode,
  DetailsListLayoutMode,
  mergeStyleSets,
} from "@fluentui/react";

import React, { Component } from "react";

export default class ResultList extends Component {
  _selection;

  constructor(props) {
    super(props);

    const { onSelectSingle } = this.props;

    const columns = [
      {
        key: "column1",
        name: "Relevance",
        fieldName: "relevance",
        minWidth: 30,
        maxWidth: 50,
        isSorted: true,
        isSortedDescending: true,
        onColumnClick: this._onColumnClick,
        onRender: (item) => {
          return <span>{(item.relevance * 100).toFixed(2) + "%"}</span>;
        },
        data: "string",
        isPadded: true,
      },
      {
        key: "column2",
        name: "Name",
        fieldName: "name",
        maxWidth: 350,
        sortAscendingAriaLabel: "Sorted A to Z",
        sortDescendingAriaLabel: "Sorted Z to A",
        onColumnClick: this._onColumnClick,
        data: "string",
        isPadded: true,
        isMultiline: true,
      },
      {
        key: "column3",
        name: "Author/Year",
        fieldName: "authors",
        minWidth: 75,
        maxWidth: 150,
        onColumnClick: this._onColumnClick,
        data: "string",
        onRender: (item) => {
          return (
            <span>
              {item.authors} ({item.year})
            </span>
          );
        },
        isPadded: true,
        isMultiline: true,
      },
    ];

    this._selection = new Selection({
      onSelectionChanged: () => {
        const selectionCount = this._selection.getSelectedCount();
        if (selectionCount === 1) {
          onSelectSingle(this._selection.getSelection()[0]);
        }
      },
    });

    this.state = {
      announcedMessage: null,
      columns: columns,
      selectedItem: null,
      isModalSelection: false,
      isCompactMode: false,
    };
  }

  render() {
    const { columns } = this.state;

    const { items, isLoading } = this.props;

    return (
      <ShimmeredDetailsList
        items={items}
        enableShimmer={isLoading || items.length === 0}
        compact={false}
        onColumnClick={this._onColumnClick}
        columns={columns}
        selectionMode={SelectionMode.single}
        getKey={this._getKey}
        setKey="multiple"
        layoutMode={DetailsListLayoutMode.fixedColumns}
        isHeaderVisible={true}
        selection={this._selection}
        selectionPreservedOnEmptyClick={true}
        enterModalSelectionOnTouch={true}
        ariaLabelForSelectionColumn="Toggle selection"
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        checkButtonAriaLabel="Row checkbox"
      />
    );
  }

  _getKey(item, index) {
    return item ? item.key : index;
  }

  _onColumnClick = (ev, column) => {
    const { columns } = this.state;
    const { items } = this.props;
    const newColumns = columns.slice();
    const currColumn = newColumns.filter(
      (currCol) => column.key === currCol.key
    )[0];
    newColumns.forEach((newCol) => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
        this.setState({
          announcedMessage: `${currColumn.name} is sorted ${
            currColumn.isSortedDescending ? "descending" : "ascending"
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
