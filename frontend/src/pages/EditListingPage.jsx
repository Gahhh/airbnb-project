import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import { dataDispatch } from '../utils/api';
import { errorPopup } from "../components/ErrorPopup";
import EditListingForm from "../components/EditListingForm";

const EditListingPage = (props) => {
  const listingId = parseInt(props.match.params.id)

  const [listingDetail, setListingDetail] = React.useState({});
  const [isLoaded, setIsloaded] = React.useState(false);
  
  const getData = () => {
    dataDispatch('GET', `listings/${listingId}`).then(res => {
      setListingDetail(res.data.listing)
      setIsloaded(true)
    }).catch(err => {
      errorPopup(err.response.data.error);
    })
  }

  if(isLoaded) {
    return <EditListingForm element={listingDetail} id={listingId} key='edit' />
  } else {
    getData();
    return <div>

    </div>
  }
}

EditListingPage.propTypes = {
  match: PropTypes.object,
}

export default withRouter(EditListingPage);
