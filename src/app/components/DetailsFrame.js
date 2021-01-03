import {
  Stack,
  StackItem,
  Fabric,
  DefaultButton,
  PrimaryButton,
  ActionButton,
  ScrollablePane,
  ScrollbarVisibility,
  mergeStyleSets,
  Text,
} from "@fluentui/react";
import React, { Component } from "react";

const classNames = mergeStyleSets({
  detailsStack: {
    height: "80vh",
  },
  scrollWrapper: {
    position: "relative",
    height: "25vh",
  },
});
export default class DetailsFrame extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { selectedPaper, onPaperAction } = this.props;
    if (!selectedPaper) {
      return null;
    }
    return (
      <Stack
        className={classNames.detailsStack}
        tokens={{ padding: 20, childrenGap: 5 }}
      >
        <Stack horizontal tokens={{ childrenGap: 5 }}>
          <ActionButton
            text="To Result List"
            iconProps={{ iconName: "AllApps" }}
            allowDisabledFocus
            disabled={false}
            onClick={() => {
              onPaperAction(selectedPaper, "move-to-result");
            }}
          />
          <PrimaryButton
            text="To Relevant List"
            iconProps={{ iconName: "Accept" }}
            allowDisabledFocus
            disabled={false}
            onClick={() => {
              onPaperAction(selectedPaper, "move-to-relevant");
            }}
          />
          <DefaultButton
            text="To Not Relevant List"
            iconProps={{ iconName: "StatusCircleErrorX" }}
            allowDisabledFocus
            disabled={false}
            onClick={() => {
              onPaperAction(selectedPaper, "move-to-not-relevant");
            }}
          />
        </Stack>
        <StackItem grow>
          <Text>{selectedPaper.name}</Text>
          <p>
            <b>Authors:</b> <i>{selectedPaper.authors}</i>
          </p>

          <ScrollablePane
            className={classNames.scrollWrapper}
            scrollbarVisibility={ScrollbarVisibility.auto}
          >
            <p>
              <b>Abstract:</b> {selectedPaper.abstract}
            </p>
          </ScrollablePane>
          <p>
            <b>Year:</b> {selectedPaper.year}{" "}
          </p>
          <p>
            <b>DOI:</b>{" "}
            <a href={selectedPaper.abstractlink}>{selectedPaper.doi}</a>{" "}
          </p>
          <p>
            <b>Type:</b> {selectedPaper.type}{" "}
          </p>
        </StackItem>
        <StackItem grow>
          <Fabric>
            <h3>Bibliometrics</h3>
            <p>
              <b>Relevance Score:</b> {selectedPaper.relevance}
            </p>
            <p>
              <b>#Cited-by:</b> {selectedPaper.citedbycount}
            </p>
          </Fabric>
        </StackItem>
      </Stack>
    );
  }

  _movePaperToResultList() {
    console.log("_movePaperToResultList");
  }

  _movePaperToRelevantList() {
    console.log("_movePaperToRelevantList");
  }

  _movePaperToNotRelevantList() {
    console.log("_movePaperToNotRelevantList");
  }
}
