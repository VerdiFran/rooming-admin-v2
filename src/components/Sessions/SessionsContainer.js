import {getSessions, getSessionsTotal} from "../../utils/selectors/selectors";
import React from "react";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {connect} from "react-redux";
import {downloadSessions, deleteSession, deleteLayoutFromSession} from "../../redux/reducers/sessionsReducer";
import Sessions from "./Sessions";
import {usePagination} from "../../hooks/usePagination";

const mapStateToProps = (state) => ({
    sessions: getSessions(state),
    totalSessions: getSessionsTotal(state)
})

/**
 * Container for Sessions component.
 * @param props Properties.
 */
const SessionsContainer = (props) => {

    const [pageSize, setCurrentPage] = usePagination(props.downloadSessions)

    return <Sessions
        sessions={props.sessions}
        totalSessions={props.totalSessions}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        deleteSession={props.deleteSession}
        deleteSessionLayout={props.deleteLayoutFromSession}
    />

}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, { downloadSessions, deleteSession, deleteLayoutFromSession })
)(SessionsContainer)