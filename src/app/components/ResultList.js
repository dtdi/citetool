import {
  DetailsList,
  MarqueeSelection,
  Selection,
  SelectionMode,
  DetailsListLayoutMode,
  Fabric,
  ScrollablePane,
  ScrollbarVisibility,
  mergeStyleSets,
} from "@fluentui/react";

import React, { Component } from "react";

const classNames = mergeStyleSets({
  scrollWrapper: {
    position: "relative",
    height: "80vh",
    width: "50vw",
  },
  fileIconHeaderIcon: {
    padding: 0,
    fontSize: "16px",
  },
  fileIconCell: {
    textAlign: "center",
    selectors: {
      "&:before": {
        content: ".",
        display: "inline-block",
        verticalAlign: "middle",
        height: "100%",
        width: "0px",
        visibility: "hidden",
      },
    },
  },
  fileIconImg: {
    verticalAlign: "middle",
    maxHeight: "16px",
    maxWidth: "16px",
  },
  controlWrapper: {
    display: "flex",
    flexWrap: "wrap",
  },
  exampleToggle: {
    display: "inline-block",
    marginBottom: "10px",
    marginRight: "30px",
  },
  selectionDetails: {
    marginBottom: "20px",
  },
});
const controlStyles = {
  root: {
    margin: "0 30px 20px 0",
    maxWidth: "300px",
  },
};

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
        maxWidth: 60,
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
      announcedMessage: null,
      columns: columns,
      selectionDetails: this._getSelectionDetails(),
      selectedItem: null,
      isModalSelection: false,
      isCompactMode: false,

      //commandBarFarItems: commandBarFarItems,
      //commandBarItems: commandBarItems,
      //commandBarOverflowItems: commandBarOverflowItems,
    };
  }

  render() {
    const {
      columns,
      isCompactMode,
      selectionDetails,
      announcedMessage,
      commandBarFarItems,
      commandBarOverflowItems,
      commandBarItems,
    } = this.state;

    const { items } = this.props;

    return (
      <Fabric>
        {/*<div className={classNames.controlWrapper}>
          <CommandBar
            items={commandBarItems}
            overflowItems={commandBarOverflowItems}
            overflowButtonProps={{ ariaLabel: "More Commands" }}
            farItems={commandBarFarItems}
            ariaLabel="Use left and right arrow keys to navigate between commands"
          />
          <Toggle
            label="Enable compact mode"
            checked={isCompactMode}
            onChange={this._onChangeCompactMode}
            onText="Compact"
            offText="Normal"
            styles={controlStyles}
          />
          <TextField
            label="Filter by name:"
            onChange={this._onChangeText}
            styles={controlStyles}
          />
          <Announced message={announcedMessage} />
        </div>
          <Announced
            message={`Number of items after filter applied: ${items.length}.`}
          />
        </div>*/}
        <ScrollablePane
          className={classNames.scrollWrapper}
          scrollbarVisibility={ScrollbarVisibility.auto}
        >
          <MarqueeSelection selection={this._selection}>
            <DetailsList
              items={items}
              compact={true}
              columns={columns}
              selectionMode={SelectionMode.multiple}
              getKey={this._getKey}
              setKey="multiple"
              layoutMode={DetailsListLayoutMode.justified}
              isHeaderVisible={true}
              selection={this._selection}
              selectionPreservedOnEmptyClick={true}
              onItemInvoked={this._onItemInvoked}
              enterModalSelectionOnTouch={true}
              ariaLabelForSelectionColumn="Toggle selection"
              ariaLabelForSelectAllCheckbox="Toggle selection for all items"
              checkButtonAriaLabel="Row checkbox"
            />
          </MarqueeSelection>
        </ScrollablePane>
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
