import {
    Stack,
    DefaultButton,
    PrimaryButton,
    ActionButton,
    ScrollablePane,
    ScrollbarVisibility,
    mergeStyleSets,
    Link,
    Text,
} from "@fluentui/react";
import React, { Component } from "react";

const classNames = mergeStyleSets({
    detailsStack: {
        height: "80vh",
    },
    scrollWrapper: {
        position: "relative",
        height: "35vh",
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
            <Stack tokens={{ padding: 20, childrenGap: 5 }}>
                <Stack horizontal tokens={{ childrenGap: 5 }}>
                    <ActionButton
                        text="To Paper Pool"
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
                        text="To Irrelevant List"
                        iconProps={{ iconName: "StatusCircleErrorX" }}
                        allowDisabledFocus
                        disabled={false}
                        onClick={() => {
                            onPaperAction(selectedPaper, "move-to-not-relevant");
                        }}
                    />
                </Stack>

                <Text variant={"mediumPlus"}>{selectedPaper.name}</Text>
                <Text>
                    <b>Authors:</b> <i>{selectedPaper.authors}</i>
                </Text>
                <Text>
                    <b>In:</b> <i>{selectedPaper.publication}</i>
                </Text>
                <ScrollablePane
                    className={classNames.scrollWrapper}
                    scrollbarVisibility={ScrollbarVisibility.auto}
                >
                    <Text>
                        <b>Abstract:</b> {selectedPaper.abstract}
                    </Text>
                </ScrollablePane>

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
                        <Link href={selectedPaper.abstractlink}>{selectedPaper.doi}</Link>
                    </Text>
                </Stack>
                <Stack
                    horizontal
                    horizontalAlign="space-between"
                    tokens={{ childrenGap: 10 }}
                >
                    <Text>
                        <b>Relevance Score:</b> {selectedPaper.relevance}
                    </Text>
                    <Text>
                        <b>#Cited-by:</b> {selectedPaper.citedbycount}
                    </Text>
                </Stack>
            </Stack>
        );
    }
}
