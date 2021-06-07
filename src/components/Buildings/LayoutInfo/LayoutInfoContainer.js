import {connect} from "react-redux";
import {getSelectedLayout} from "../../../utils/selectors/selectors";
import LayoutInfo from "./LayoutInfo";
import {buildingsAPI} from "../../../api/buildingsAPI";
import {sessionsApi} from "../../../api/sessionsApi";
import React from 'react'
import {addLayoutsToSessions} from "../../../redux/reducers/sessionsReducer";

const mapStateToProps = (state => ({
    selectedLayout: getSelectedLayout(state)
}))

const LayoutInfoContainer = (props) => {
    return <LayoutInfo
        setVisible={props.setVisible}
        visible={props.visible}
        selectedLayout={props.selectedLayout}
        handleDownload={buildingsAPI.downloadFile}
        downloadSessions={sessionsApi.downloadSessions}
        addToSession={props.addLayoutsToSessions}
        addSession={sessionsApi.addNewSession}
    />
}

export default connect(mapStateToProps, {addLayoutsToSessions})(LayoutInfoContainer)