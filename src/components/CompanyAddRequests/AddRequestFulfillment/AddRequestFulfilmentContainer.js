import {getSelectedCompanyAddRequest} from "../../../utils/selectors/selectors";
import {connect} from "react-redux";
import {executeCompanyAddRequests} from "../../../redux/reducers/addRequestsReducer";
import AddRequestFulfillment from "./AddRequestFulfillment";

const mapPropsToState = (state) => ({
    selectedRequest: getSelectedCompanyAddRequest(state),
})

/**
 * Container for component with fulfillment of company-add request.
 * @param props Props.
 */
const AddRequestFulfillmentContainer = (props) => {

    const handleSubmit = () => {
        props.executeCompanyAddRequests([props.selectedRequest.id])
    }

    return <AddRequestFulfillment
        selectedRequest={props.selectedRequest}
        handleSubmit={handleSubmit}
        setVisible={props.setVisible}
        visible={props.visible}
    />
}

export default connect(mapPropsToState, {executeCompanyAddRequests})(AddRequestFulfillmentContainer)