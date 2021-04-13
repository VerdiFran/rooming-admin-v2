import {connect} from "react-redux";
import {getSelectedLayout} from "../../../utils/selectors/selectors";
import LayoutInfo from "./LayoutInfo";
import {buildingsAPI} from "../../../api/buildingsAPI";

const mapStateToProps = (state => ({
    selectedLayout: getSelectedLayout(state)
}))

const LayoutInfoContainer = (props) => {
    return <LayoutInfo
        setVisible={props.setVisible}
        visible={props.visible}
        selectedLayout={props.selectedLayout}
        handleDownload={buildingsAPI.downloadFile}
    />
}

export default connect(mapStateToProps)(LayoutInfoContainer)