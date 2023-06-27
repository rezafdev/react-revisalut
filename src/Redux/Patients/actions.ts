import {action} from 'typesafe-actions'
import {PatientsSectionTypes} from './types'
import {PaginatedResponse} from "../../HTTPService/ApiService";
import {PatientData, TherapyData} from "../../Common/Types/types";


export namespace PatientActions {
    export const showHideAddPatientModal = (visible: boolean) => action(PatientsSectionTypes.SHOW_HIDE_ADD_NEW_PATIENT_MODAL, visible)
    export const setPatientsPageData = (pageData: PaginatedResponse<PatientData> | null) => action(PatientsSectionTypes.SET_PAGINATION_DATA, pageData)
    export const addOrUpdatePatient = (item: PatientData | null) => action(PatientsSectionTypes.ADD_OR_UPDATE_PATIENT, item)
    export const setCurrentPage = (page: number) => action(PatientsSectionTypes.SET_CURRENT_PAGE, page)
    export const toggleTableView = () => action(PatientsSectionTypes.TOGGLE_TABLE_VIEW)
}
