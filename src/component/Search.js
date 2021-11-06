import React from "react";
import { Container, Icon, Input } from "semantic-ui-react";
function Search() {
  return (
    <Container>
      <div className="search" style={{ marginTop: "100px" }}>
        <Input
          fluid
          icon={<Icon name="search" color="red" circular link />}
          placeholder="Search..."
          size="huge"
        />
      </div>
    </Container>
  );
}

export default Search;
