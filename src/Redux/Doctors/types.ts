import {DoctorData} from "../../Common/Types/types";

export enum DoctorsSectionTypes {
    SHOW_HIDE_ADD_NEW_DOCTOR_MODAL = '@@doctor/SHOW_HIDE_ADD_NEW_DOCTOR_MODAL',
    SET_DOCTORS = "@@doctor/set_doctors",
    ADD_OR_UPDATE_DOCTOR = "@@doctor/add_doctor",
}


export interface DoctorSectionState {
    doctors: Array<DoctorData>,
    newDoctorModal: boolean
}

