import {Reducer} from 'redux'
import {PatientsSectionState, PatientsSectionTypes} from './types'
import {PatientData, TherapyData} from "../../Common/Types/types";
import _ from "lodash";
import {PaginatedResponse} from "../../HTTPService/ApiService";
import {Helpers} from "../../Common/Helpers";


export const initialState: PatientsSectionState = {
    currentPage: 1,
    lastPage: 1,
    perPage: 12,
    patients: Array<PatientData>(),
    isTableView: false,
    newPatientModal: false
}

// eslint-disable-next-line default-param-last
const reducer: Reducer<PatientsSectionState> = (state = initialState, action) => {
    switch (action.type) {
        case PatientsSectionTypes.SET_CURRENT_PAGE: {
            const currentPage = _.toNumber(action.payload) ?? 1
            const lastPage = Math.max(currentPage, state.lastPage??1)
            return {
                ...state,
                currentPage: currentPage,
                lastPage: lastPage,
            }
        }
        case PatientsSectionTypes.SET_PAGINATION_DATA: {
            if(!action.payload) return state
            const payload = action.payload as PaginatedResponse<PatientData>
            return {
                ...state,
                currentPage: payload.current_page ?? initialState.currentPage,
                lastPage: payload.last_page ?? initialState.lastPage,
                perPage: payload.per_page ?? initialState.perPage,
                patients: payload.data ?? initialState.patients,
            }
        }
        case PatientsSectionTypes.ADD_OR_UPDATE_PATIENT: {
            if(!action.payload) return state
            const item = action.payload as PatientData
            const exists = state.patients.findIndex(it => it.id === item.id) >= 0
            const isFirstPage = state.currentPage === 1
            if(isFirstPage || exists) {
                const list = Helpers.arrayAddOrReplaceItem(state.patients, item, {prepend: true})
                return {
                    ...state,
                    patients: list,
                }
            } else {
                return {
                    ...state,
                    currentPage: 1,
                    patients: [ item ],
                }
            }
        }
        case PatientsSectionTypes.SHOW_HIDE_ADD_NEW_PATIENT_MODAL : {
            return {
                ...state,
                newPatientModal: action.payload ?? false
            }
        }
        case PatientsSectionTypes.TOGGLE_TABLE_VIEW: {
            return {
                ...state,
                isTableView: ! (state.isTableView),
            }
        }
        default: {
            return state
        }
    }
}
export {reducer as PatientsSectionReducer}
