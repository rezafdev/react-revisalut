import {TherapyData} from "../../Common/Types/types";

export enum TherapiesSectionTypes {
    SHOW_HIDE_ADD_NEW_THERAPIE_MODAL = '@@therapie/SHOW_HIDE_ADD_NEW_THERAPIE_MODAL',
    ADD_OR_UPDATE_THERAPY = '@@therapie/add_therapy',
    SET_PAGINATION_DATA = "@@therapie/set_paginagtion_data",
    SET_CURRENT_PAGE =  "@@therapie/set_page",
}


export interface TherapiesSectionState {
    currentPage?: number,
    lastPage?: number,
    perPage?: number,
    therapies: Array<TherapyData>,
    newTherapieModal: boolean
}

