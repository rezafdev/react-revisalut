import {action} from 'typesafe-actions'
import {DoctorsSectionTypes} from './types'
import {DoctorData} from "../../Common/Types/types";


export namespace DoctorActions {

    export const  showHideAddDoctorModal = (visible: boolean) => action(DoctorsSectionTypes.SHOW_HIDE_ADD_NEW_DOCTOR_MODAL, visible)

    export const setDoctors = (list: DoctorData[]|null) => action(DoctorsSectionTypes.SET_DOCTORS, list)
    export const addOrUpdateDoctor =  (doctor: DoctorData) => action(DoctorsSectionTypes.ADD_OR_UPDATE_DOCTOR, doctor)

}
