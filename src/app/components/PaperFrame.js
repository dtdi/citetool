import {
    Stack,
    Fabric
} from "@fluentui/react";
import React, { Component } from "react";

export default class PaperFrame extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { selectedPaper } = this.props;
        return (
            <Stack
                className={"DetailsPane"}
                tokens={{ padding: 10, childrenGap: 5 }}
            >
                <Fabric className={"Section"}>
                    <h1>Paper infos</h1>
                    {selectedPaper && selectedPaper.name}
                    {selectedPaper && selectedPaper.authors}
                </Fabric>
                <Fabric className={"Section"}>
                    <h1>Related Information</h1>
                </Fabric>
            </Stack>
        );
    }
}