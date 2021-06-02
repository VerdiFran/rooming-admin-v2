import {instance} from './instances'

/**
 * API for sessions.
 */
export const sessionsApi = {

    /**
     * Download company viewing sessions.
     * @param pageNumber Page number.
     * @param pageSize Page size.
     * @param namePart Part of session name for filtration.
     */
    downloadSessions(pageNumber: number, pageSize: number, namePart?: string) {
        const config = {
            params: {pageNumber, pageSize, namePart}
        }
        return instance.get('sessions', config)
    },

    /**
     * Delete session by id.
     * @param sessionId Session id.
     */
    deleteSession(sessionId: number) {
        return instance.delete(`sessions/${sessionId}`)
    },

    /**
     * Delete layout from session.
     * @param sessionId Session id.
     * @param layoutId Layouts id.
     */
    deleteLayoutFromSession(sessionId: number, layoutId: number) {
        const config = {
            data: {layouts: [layoutId]}
        }
        return instance.delete(`sessions/${sessionId}/layouts`, config)
    },

    /**
     * Add layouts to session.
     * @param sessionId Session id.
     * @param layouts Ids of layouts.
     */
    addToSession(sessionId: number, layouts: Array<number>) {
        return instance.post(`sessions/${sessionId}/layouts`, {layouts})
    },

    /**
     * Start session request.
     * @param sessionId Session id.
     */
    startSession(sessionId: number) {
        const config = {
            params: {sessionId}
        }
        return instance.put(`sessions/current`, null, config)
    },

    /**
     * Returns current session.
     */
    getCurrentSession() {
        return instance.get(`sessions/current`)
    },

    /**
     * Add new session.
     * @param name Session name.
     * @param layouts Layouts to add to session.
     */
    addNewSession(name: string, layouts: Array<number>) {
        return instance.post('sessions', {
            name,
            layouts
        })
    }
}