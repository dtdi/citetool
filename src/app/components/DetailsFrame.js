import {
  Stack,
  DefaultButton,
  PrimaryButton,
  ScrollablePane,
  ScrollbarVisibility,
  mergeStyleSets,
  Link,
  Shimmer,
  ShimmerElementsGroup,
  ShimmerElementType,
  Text,
  StackItem,
  FontWeights,
  Image,
} from "@fluentui/react";
import React, { Component } from "react";
import { LIST_NOT_RELEVANT, LIST_RELEVANT, LIST_RESULT } from "../../App";
import logo from "../../img/potato.svg";

const classNames = mergeStyleSets({
  relative: {
    position: "relative",
  },
  abstract: {
    "-moz-osx-font-smoothing": "grayscale",
    "-webkit-font-smoothing": "antialiased !important",
    "-moz-font-smoothing": "antialiased !important",
    "text-rendering": "optimizelegibility !important",
    "letter-spacing": ".03em",
    "line-height": "1.25em",
    "font-weight": "400",
    "font-size": "1rem",
    "line-height": "1.8",
    "text-align": "justify",
  },
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
        <Stack className={classNames.abstract}>
          <Text>Howdy, Partner!</Text>
          <Text>
            This website helps you discover exciting new papers in three easy
            steps:
            <ol>
              <li>
                To get started, use the search box above to run a search query
                on Scopus.
              </li>
              <li>
                Based on the results, a relevance score is calculated for each
                paper - based on bibliometric data (i.e., co-citation & 
                bibliometric coupling). The paper with the highest relevance
                score will be presented to you in this box. It is, then, your
                task to mark the paper as "relevant" or "not relevant" using
                the buttons that will be placed above the paper. Your input 
                will automatically move the paper to the according list on the 
                right side of this page. When a paper is marked "relevant", a 
                forward-backward-search is run, the citing and cited papers are 
                added to the Paper Pool, and the relevance score for each paper 
                is updated.
              </li>
              <li>
                If you have identified enough papers or if our suggestions do
                not contain any more relevant papers, use the "To Citavi" function 
                to export your results.
              </li>
            </ol>
          </Text>
          <Image style={{ margin: "0 auto" }} src={logo} height={120} />
        </Stack>
      );
    }
    return (
      <Stack
        style={{ position: "relative", height: "100%" }}
        tokens={{ childrenGap: 5 }}
      >
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

        <StackItem grow className={classNames.relative}>
          <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
            <Stack tokens={{ childrenGap: 5 }}>
              <Shimmer
                shimmerElements={[
                  { type: ShimmerElementType.line, height: 22 },
                ]}
                width={"80%"}
                isDataLoaded={!isLoading}
              >
                <Text
                  style={{ fontWeight: FontWeights.semibold }}
                  variant={"mediumPlus"}
                  id={"selectedPaperTitle"}
                >
                  {selectedPaper.name}
                </Text>
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
                  <Text style={{ fontWeight: FontWeights.semibold }}>
                    Authors:{" "}
                  </Text>
                  {selectedPaper.authors}
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
                  <Text style={{ fontWeight: FontWeights.semibold }}>In: </Text>{" "}
                  {selectedPaper.publication}
                </Text>
              </Shimmer>

              <Shimmer
                customElementsGroup={this.customElements()}
                isDataLoaded={!isLoading}
              >
                <Text className={classNames.abstract}>
                  {selectedPaper.abstract}
                </Text>
              </Shimmer>

              <Shimmer
                customElementsGroup={this.customElements()}
                isDataLoaded={!isLoading}
              >
                <Stack
                  horizontal
                  horizontalAlign="space-between"
                  tokens={{ childrenGap: 5 }}
                >
                  <Text>
                    <Text style={{ fontWeight: FontWeights.semibold }}>
                      Year:{" "}
                    </Text>{" "}
                    {selectedPaper.year}
                  </Text>
                  <Text>
                    <Text style={{ fontWeight: FontWeights.semibold }}>
                      Type:{" "}
                    </Text>{" "}
                    {selectedPaper.type}
                  </Text>
                  <Text>
                    <Text style={{ fontWeight: FontWeights.semibold }}>
                      DOI:{" "}
                    </Text>
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
                    <Text style={{ fontWeight: FontWeights.semibold }}>
                      Score:{" "}
                    </Text>
                    {(selectedPaper.relevance * 100).toFixed(2) + "%"}
                  </Text>
                  <Text>
                    <Text style={{ fontWeight: FontWeights.semibold }}>
                      #CitedBy:{" "}
                    </Text>{" "}
                    {selectedPaper.citedByCount}
                  </Text>
                  <Text>
                    <Text style={{ fontWeight: FontWeights.semibold }}>
                      #References:{" "}
                    </Text>{" "}
                    {selectedPaper.refs.length}
                  </Text>
                </Stack>
              </Shimmer>
            </Stack>
          </ScrollablePane>
        </StackItem>
      </Stack>
    );
  }
}
