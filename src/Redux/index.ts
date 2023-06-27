import {combineReducers} from 'redux';
import {all} from 'redux-saga/effects';
import {DoctorSectionState} from "./Doctors/types";
import {DoctorSectionReducer} from "./Doctors/reducers";
import {TherapiesSectionState} from "./Therapies/types";
import {TherapiesSectionReducer} from "./Therapies/reducers";
import {PatientsSectionState} from "./Patients/types";
import {PatientsSectionReducer} from "./Patients/reducers";

export interface ApplicationState {
    doctorSection: DoctorSectionState,
    therapiesSection: TherapiesSectionState
    patientsSection: PatientsSectionState
}

export const createRootReducer = () =>
    combineReducers({
        doctorSection: DoctorSectionReducer,
        therapiesSection: TherapiesSectionReducer,
        patientsSection: PatientsSectionReducer

    });

export function* rootSaga() {
    yield all([]);
}

export const rootReducer = combineReducers({
    doctorSection: DoctorSectionReducer,
    therapiesSection: TherapiesSectionReducer,
    patientsSection: PatientsSectionReducer
});
