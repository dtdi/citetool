import {
  DetailsList,
  MarqueeSelection,
  Selection,
  mergeStyleSets,
  SelectionMode,
  DetailsListLayoutMode,
  Fabric,
  ScrollablePane,
  ScrollbarVisibility,
  Announced,
  Toggle,
  CommandBar,
  TextField,
} from "@fluentui/react";
import React, { Component } from "react";

const classNames = mergeStyleSets({
  scrollWrapper: {
    position: "relative",
    height: "80vh",
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
        name: "Name",
        fieldName: "name",
        minWidth: 210,
        maxWidth: 350,
        isRowHeader: true,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
        sortAscendingAriaLabel: "Sorted A to Z",
        sortDescendingAriaLabel: "Sorted Z to A",
        onColumnClick: this._onColumnClick,
        data: "string",
        isPadded: true,
      },
      {
        key: "column2",
        name: "Authors",
        fieldName: "authors",
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        onColumnClick: this._onColumnClick,
        data: "string",

        isPadded: true,
      },
      {
        key: "column4",
        name: "Year",
        fieldName: "year",
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        onColumnClick: this._onColumnClick,
        data: "string",

        isPadded: true,
      },
      {
        key: "column3",
        name: "Publication Name",
        fieldName: "publicationName",
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
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

    const commandBarItems = [
      {
        key: "newItem",
        text: "New",
        cacheKey: "myCacheKey", // changing this key will invalidate this item's cache
        iconProps: { iconName: "Add" },
        subMenuProps: {
          items: [
            {
              key: "emailMessage",
              text: "Email message",
              iconProps: { iconName: "Mail" },
              ["data-automation-id"]: "newEmailButton", // optional
            },
            {
              key: "calendarEvent",
              text: "Calendar event",
              iconProps: { iconName: "Calendar" },
            },
          ],
        },
      },
      {
        key: "upload",
        text: "Upload",
        iconProps: { iconName: "Upload" },
        href: "https://developer.microsoft.com/en-us/fluentui",
      },
      {
        key: "share",
        text: "Share",
        iconProps: { iconName: "Share" },
        onClick: () => console.log("Share"),
      },
      {
        key: "download",
        text: "Download",
        iconProps: { iconName: "Download" },
        onClick: () => console.log("Download"),
      },
    ];

    const commandBarOverflowItems = [
      {
        key: "move",
        text: "Move to...",
        onClick: () => console.log("Move to"),
        iconProps: { iconName: "MoveToFolder" },
      },
      {
        key: "copy",
        text: "Copy to...",
        onClick: () => console.log("Copy to"),
        iconProps: { iconName: "Copy" },
      },
      {
        key: "rename",
        text: "Rename...",
        onClick: () => console.log("Rename"),
        iconProps: { iconName: "Edit" },
      },
    ];

    const commandBarFarItems = [
      {
        key: "tile",
        text: "Grid view",
        // This needs an ariaLabel since it's icon-only
        ariaLabel: "Grid view",
        iconOnly: true,
        iconProps: { iconName: "Tiles" },
        onClick: () => console.log("Tiles"),
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

    this.state = {
      announcedMessage: null,
      columns: columns,
      selectionDetails: this._getSelectionDetails(),
      selectedItem: null,
      isModalSelection: false,
      isCompactMode: false,

      commandBarFarItems: commandBarFarItems,
      commandBarItems: commandBarItems,
      commandBarOverflowItems: commandBarOverflowItems,
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
              compact={isCompactMode}
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

  componentDidUpdate(previousProps, previousState) {
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

  _onChangeCompactMode = (ev, checked) => {
    this.setState({ isCompactMode: checked });
  };

  _onChangeModalSelection = (ev, checked) => {
    this.setState({ isModalSelection: checked });
  };

  _onChangeText = (ev, text) => {
    this.setState({
      items: text
        ? this._allItems.filter((i) => i.name.toLowerCase().indexOf(text) > -1)
        : this._allItems,
    });
  };

  _onItemInvoked(item) {
    alert(`Item invoked: ${item.name}`);
  }

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
