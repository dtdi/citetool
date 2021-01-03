import { Fabric, SearchBox, Stack, Label } from "@fluentui/react";
import React, { Component } from "react";

export default class PaperFrame extends Component {
  render() {
    return (
      <Stack>
        <Fabric>
          <h1 className="searchbarlabel">Potatosearch</h1>
        </Fabric>
        <SearchBox
          placeholder="Search"
          onSearch={(newValue) => console.log("value is " + newValue)}
        />
      </Stack>
    );
  }
}
