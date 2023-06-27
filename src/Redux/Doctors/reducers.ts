import {Reducer} from 'redux'
import {DoctorSectionState, DoctorsSectionTypes} from './types'
import {DoctorData} from "../../Common/Types/types";
import {Helpers} from "../../Common/Helpers";


export const initialState: DoctorSectionState = {
    doctors: Array<DoctorData>(),
    newDoctorModal: false
}

// eslint-disable-next-line default-param-last
const reducer: Reducer<DoctorSectionState> = (state = initialState, action) => {
    switch (action.type) {
        case DoctorsSectionTypes.SET_DOCTORS: {
            return {
                ...state,
                doctors: action.payload ?? Array<DoctorData>(),
            }
        }
        case DoctorsSectionTypes.ADD_OR_UPDATE_DOCTOR: {
            const list = Helpers.arrayAddOrReplaceItem(state.doctors, action.payload as DoctorData)
            return {
                ...state,
                doctors: list,
            }
        }

        case DoctorsSectionTypes.SHOW_HIDE_ADD_NEW_DOCTOR_MODAL : {
            return {
                ...state,
                newDoctorModal: action.payload ?? false
            }
        }
        default: {
            return state
        }
    }
}
export {reducer as DoctorSectionReducer}
