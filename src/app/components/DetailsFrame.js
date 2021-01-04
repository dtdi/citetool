import {
  Stack,
  DefaultButton,
  PrimaryButton,
  mergeStyleSets,
  Link,
  Shimmer,
  ShimmerElementsGroup,
  ShimmerElementType,
  Text,
} from "@fluentui/react";
import React, { Component } from "react";
import { LIST_NOT_RELEVANT, LIST_RELEVANT, LIST_RESULT } from "../../App";

const classNames = mergeStyleSets({
  detailsStack: {
    height: "80vh",
  },
  scrollWrapper: {
    position: "relative",
    height: "40vh",
  },
  scroller: {},
});
export default class DetailsFrame extends Component {
  customElements() {
    return (
      <ShimmerElementsGroup
        flexWrap
        style
        width="100%"
        shimmerElements={[
          { type: ShimmerElementType.line },
          { type: ShimmerElementType.line },
          { type: ShimmerElementType.line },
          { type: ShimmerElementType.line },
          { type: ShimmerElementType.line },
        ]}
      />
    );
  }
  render() {
    const { selectedPaper, onPaperAction, isLoading } = this.props;
    if (!selectedPaper) {
      return (
        <Stack>
          <Text>Howdy, Partner! Try to start from a search result!</Text>
        </Stack>
      );
    }
    return (
      <Stack tokens={{ childrenGap: 5 }}>
        <Stack
          horizontal
          horizontalAlign={"space-evenly"}
          tokens={{ childrenGap: 5 }}
        >
          {selectedPaper.inList !== LIST_RESULT && (
            <PrimaryButton
              text="Back to Pool"
              iconProps={{ iconName: "RevToggleKey" }}
              onClick={() => {
                onPaperAction(selectedPaper, "move-to-result");
              }}
            />
          )}
          {selectedPaper.inList !== LIST_RELEVANT && (
            <PrimaryButton
              text="Mark relevant"
              iconProps={{ iconName: "Accept" }}
              onClick={() => {
                onPaperAction(selectedPaper, "move-to-relevant");
              }}
            />
          )}
          {selectedPaper.inList !== LIST_NOT_RELEVANT && (
            <DefaultButton
              text="Mark not relevant"
              iconProps={{ iconName: "StatusCircleErrorX" }}
              onClick={() => {
                onPaperAction(selectedPaper, "move-to-not-relevant");
              }}
            />
          )}
        </Stack>

        <Shimmer
          shimmerElements={[{ type: ShimmerElementType.line, height: 22 }]}
          width={"80%"}
          isDataLoaded={!isLoading}
        >
          <Text variant={"mediumPlus"}>{selectedPaper.name}</Text>
        </Shimmer>
        <Shimmer
          shimmerElements={[
            { type: ShimmerElementType.line, width: "15%" },
            { type: ShimmerElementType.gap, width: 10 },
            { type: ShimmerElementType.line, width: "80%" },
          ]}
          width={"60%"}
          isDataLoaded={!isLoading}
        >
          <Text>
            <b>Authors:</b> <i>{selectedPaper.authors}</i>
          </Text>
        </Shimmer>
        <Shimmer
          isDataLoaded={!isLoading}
          shimmerElements={[
            { type: ShimmerElementType.line, width: "5%" },
            { type: ShimmerElementType.gap, width: 10 },
            { type: ShimmerElementType.line, width: "90%" },
          ]}
        >
          <Text>
            <b>In:</b> <i>{selectedPaper.publication}</i>
          </Text>
        </Shimmer>

        <Shimmer
          customElementsGroup={this.customElements()}
          isDataLoaded={!isLoading}
        >
          <Text>{selectedPaper.abstract}</Text>
        </Shimmer>

        <Stack
          horizontal
          horizontalAlign="space-between"
          tokens={{ childrenGap: 5 }}
        >
          <Text>
            <b>Year:</b> {selectedPaper.year}
          </Text>
          <Text>
            <b>Type:</b> {selectedPaper.type}
          </Text>
          <Text>
            <b>DOI:</b>{" "}
            <Link target={"_blank"} href={selectedPaper.abstractlink}>
              {selectedPaper.doi}
            </Link>
          </Text>
        </Stack>
        <Stack
          horizontal
          horizontalAlign="space-between"
          tokens={{ childrenGap: 10 }}
        >
          <Text>
            <b>Relevance Score:</b>{" "}
            {(selectedPaper.relevance * 100).toFixed(2) + "%"}
          </Text>
          <Text>
            <b>#Cited-by:</b> {selectedPaper.citedByCount}
          </Text>
          <Text>
            <b>#References:</b> {selectedPaper.refs.length}
          </Text>
        </Stack>
      </Stack>
    );
  }
}
