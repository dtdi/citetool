import {
    Stack,
    Fabric,
    DefaultButton,
} from "@fluentui/react";
import React, { Component } from "react";

export default class DetailsFrame extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { selectedPaper } = this.props;
        if (!selectedPaper) {
            return null;
        }
        return (
            <div className={"detailsframe"}>
                <Stack
                    tokens={{ padding: 20, childrenGap: 5 }}
                >
                    <Fabric>
                        <DefaultButton
                            text="To Paper Pool"
                            iconProps={{ iconName: 'AllApps' }}
                            allowDisabledFocus
                            disabled={false}
                            onClick={this._movePaperToResultList}
                        />
                        <DefaultButton
                            text="To Relevant List"
                            iconProps={{ iconName: 'Accept' }}
                            allowDisabledFocus
                            disabled={false}
                            onClick={this._movePaperToRelevantList}
                        />
                        <DefaultButton
                            text="To Irrelevant List"
                            iconProps={{ iconName: 'StatusCircleErrorX' }}
                            allowDisabledFocus
                            disabled={false}
                            onClick={this._movePaperToNotRelevantList}
                        />
                    </Fabric>
                    <Fabric>
                        <h2>Your selected paper</h2>
                        <p><b>Title:</b> {selectedPaper.name}</p>
                        <p><b>Authors:</b> <i>{selectedPaper.authors}</i></p>
                        <p><b>Abstract:</b> {selectedPaper.abstract}</p>
                        <p><b>Year:</b> {selectedPaper.year} </p>
                        <p><b>DOI:</b> <a href={selectedPaper.abstractlink}>{selectedPaper.doi}</a> </p>
                        <p><b>Type:</b> {selectedPaper.type} </p>
                    </Fabric>
                    <Fabric>
                        <h3>Bibliometrics</h3>
                        <p><b>Relevance Score:</b> {selectedPaper.relevance}</p>
                        <p><b>#Cited-by:</b> {selectedPaper.citedbycount}</p>
                    </Fabric>
                    <Fabric>
                        <h3>Related Information</h3>
                    </Fabric>
                </Stack>
            </div>
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