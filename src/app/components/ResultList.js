import {
  DetailsList,
  MarqueeSelection,
  Selection,
  mergeStyleSets,
  SelectionMode,
  DetailsListLayoutMode,
  Fabric,
  Toggle,
  Announced,
  CommandBar,
  TextField,
} from "@fluentui/react";
import React, { Component } from "react";

import result from "../../data/results.json";

const classNames = mergeStyleSets({
  wrapper: {},
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

    /*const commandBarItems = [
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
    ];*/

    this.state = {
      items: this._allItems,
      columns: columns,
      selectionDetails: this._getSelectionDetails(),
      selectedItem: null,
      isModalSelection: false,
      isCompactMode: false,
      announcedMessage: undefined,
      //commandBarFarItems: commandBarFarItems,
      //commandBarItems: commandBarItems,
      //commandBarOverflowItems: commandBarOverflowItems,
    };
  }

  componentDidMount() {
    this._allItems = processSearchResults(result);

    this.setState({
      items: this._allItems,
    });
  }

  render() {
    const {
      columns,
      isCompactMode,
      items,
      selectionDetails,
      announcedMessage,
      commandBarFarItems,
      commandBarOverflowItems,
      commandBarItems,
    } = this.state;

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
          <Announced
            message={`Number of items after filter applied: ${items.length}.`}
          />
        </div>*/}
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
              onItemInvoked={this._onItemInvoked}
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

function processSearchResults(result) {
  const items = [];
  let entries = result["search-results"].entry;
  console.log(entries);
  entries.forEach((entry) => {
    
    let abstractlink = "test";
    let links = entry["link"];
    links.forEach(((link) => {
      let linktype = link['@ref'];
      if(linktype === "scopus"){
        abstractlink = link['@href'];
      }
    }));

    items.push({
      key: entry["dc:identifier"],
      name: entry["dc:title"],
      abstract: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
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

  return items;
}
