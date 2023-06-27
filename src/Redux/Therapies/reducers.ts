import {Reducer} from 'redux'
import {TherapiesSectionState, TherapiesSectionTypes} from './types'
import {TherapyData} from "../../Common/Types/types";
import {PaginatedResponse} from "../../HTTPService/ApiService";
import {Helpers} from "../../Common/Helpers";
import _ from "lodash";


export const initialState: TherapiesSectionState = {
    currentPage: 1,
    lastPage: 1,
    perPage: 10,
    therapies: Array<TherapyData>(),
    newTherapieModal: false
}

// eslint-disable-next-line default-param-last
const reducer: Reducer<TherapiesSectionState> = (state = initialState, action) => {
    switch (action.type) {
        case TherapiesSectionTypes.SET_CURRENT_PAGE: {
            const currentPage = _.toNumber(action.payload) ?? 1
            const lastPage = Math.max(currentPage, state.lastPage??1)
            return {
                ...state,
                currentPage: currentPage,
                lastPage: lastPage,
            }
        }
        case TherapiesSectionTypes.SET_PAGINATION_DATA: {
            if(!action.payload) return state
            const payload = action.payload as PaginatedResponse<TherapyData>
            return {
                ...state,
                currentPage: payload.current_page ?? initialState.currentPage,
                lastPage: payload.last_page ?? initialState.lastPage,
                perPage: payload.per_page ?? initialState.perPage,
                therapies: payload.data ?? initialState.therapies,
            }
        }
        case TherapiesSectionTypes.ADD_OR_UPDATE_THERAPY: {
            if(!action.payload) return state
            const item = action.payload as TherapyData
            const exists = state.therapies.findIndex(it => it.id === item.id) >= 0
            const isFirstPage = state.currentPage === 1
            if(isFirstPage || exists) {
                const list = Helpers.arrayAddOrReplaceItem(state.therapies, item, {prepend: true})
                return {
                    ...state,
                    therapies: list,
                }
            } else {
                return {
                    ...state,
                    currentPage: 1,
                    therapies: [ item ],
                }
            }
        }
        case TherapiesSectionTypes.SHOW_HIDE_ADD_NEW_THERAPIE_MODAL : {
            return {
                ...state,
                newTherapieModal: action.payload ?? false
            }
        }
        default: {
            return state
        }
    }
}
export {reducer as TherapiesSectionReducer}
