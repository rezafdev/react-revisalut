import {action} from 'typesafe-actions'
import {TherapiesSectionTypes} from './types'
import {PaginatedResponse} from "../../HTTPService/ApiService";
import {TherapyData} from "../../Common/Types/types";

export namespace TherapyActions {
    export const showHideAddTherapieModal = (visible: boolean) => action(TherapiesSectionTypes.SHOW_HIDE_ADD_NEW_THERAPIE_MODAL, visible)
    export const setTherapyPageData = (pageData: PaginatedResponse<TherapyData>|null) => action(TherapiesSectionTypes.SET_PAGINATION_DATA, pageData)
    export const addOrUpdateTherapy = (item: TherapyData|null) => action(TherapiesSectionTypes.ADD_OR_UPDATE_THERAPY, item)
    export const setCurrentPage = (page: number) => action(TherapiesSectionTypes.SET_CURRENT_PAGE, page)
}
