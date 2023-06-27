import {PatientData} from "../../Common/Types/types";

export enum PatientsSectionTypes {
    SHOW_HIDE_ADD_NEW_PATIENT_MODAL = '@@patient/SHOW_HIDE_ADD_NEW_PATIENT_MODAL',
    ADD_OR_UPDATE_PATIENT = '@@patient/add_patient',
    SET_PAGINATION_DATA = "@@patient/set_pagination_data",
    SET_CURRENT_PAGE =  "@@patient/set_page",
    TOGGLE_TABLE_VIEW = "@@patient/toggle_table_view"
}


export interface PatientsSectionState {
    currentPage?: number,
    lastPage?: number,
    perPage?: number,
    patients: Array<PatientData>,
    isTableView?: boolean,
    newPatientModal: boolean
}

