import {instance} from './instances'

/**
 * API for sessions.
 */
export const sessionsApi = {

    /**
     * Download company viewing sessions.
     * @param pageNumber Page number.
     * @param pageSize Page size.
     */
    downloadSessions(pageNumber: number, pageSize: number) {
        const config = {
            params: { pageNumber, pageSize }
        }
        return instance.get('company/sessions', config)
    },

    /**
     * Delete session by id.
     * @param sessionId Session id.
     */
    deleteSession(sessionId: number) {
        return instance.delete(`company/sessions/${sessionId}`)
    }
}