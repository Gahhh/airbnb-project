import React, { Component, useState } from 'react';
import CreateListForm from "../components/NewListingForm";
import { withRouter } from 'react-router-dom'


class CreateNewListing extends Component {
  render() {
    return (
      <CreateListForm />
    )
  }
}
export default withRouter(CreateNewListing);