export type UserProfileData = {
    id: number,
    name?: string | null
    email?: string | null
    avatarUrl?: string | null
}

export const TherapyCategories = [
    'Mental', 'Head', 'Legs', 'Face', 'Standard', 'Fitness', 'Full Body'
]

export enum DoctorType { Doctor, Nurse}

export type DoctorData = {
    id: number
    type: DoctorType
    name?: string | null
    bio?: string | null
    avatarUrl?: string | null
    skill_mental?: boolean
    skill_beauty?: boolean
    skill_blood?: boolean
    typeStr?: string | null
    isDoctor?: boolean,
    isNurse?: boolean
}

export enum SexType { Male, Female}


export type BasePatientData = {
    id: number,
    name?: string | null,
    surname?: string | null,
    fullName?: string | null,
    email?: string | null,
    sexType?: SexType,
    isMale?: boolean,
    isFemale?: boolean,
    birthday?: string | null,
    phoneCountryCode?: string | null,
    phoneNumber?: string | null,
    appointments_count?: number | null,
    open_appointments_count?: number | null,
    status?: number | null,
    statusStr?: string | null,
    isHold?: boolean,
    isActive?: boolean,
    sexTypeStr?: string|null,
}

export type TherapyData = {
    id: number,
    name?: string | null
    description?: string | null
    category?: string,
    minDuration?: string | number,
    maxDuration?: string | number,
    doctorId: number,
    photos_count?: number | null,
    photos?: string[] | null,
    doctor?: DoctorData | null,
    appointments_count?: number | null,

}

export type AppointmentData = {
    id: number
    patientId?: number | string | null
    therapyId?: number | string | null
    beginDate?: string | null
    beginTime?: string | null
    endDate?: string | null,
    endTime?: string | null
    therapy?: TherapyData | null,
    patient?: PatientData | null,
    beginAt?: string|null,
    endAt?: string|null,
    status?: string|number|null,
    statusStr?: string|null,
}

export type PatientData = BasePatientData & { nearestAppointment?: AppointmentData | null }

export type StatsValueObject = { value?: number | string, last?: string | number, change?: number | null, changeSymbol?: string | null }
export type StatsObject = {
    appVisits?: StatsValueObject | null,
    therapySessions?: StatsValueObject | null,
    totalPatients?: StatsValueObject | null,
    newPatients?: StatsValueObject | null,
    monthlyPatients?: StatsValueObject | null,
}


// export function getEventFromAppointment = (appointment: AppointmentData) => {
//     if(!appointment.beginAt || appointment.endAt) return null
//     const start = new Date(appointment.beginAt)
//     const event:  = {
//
//     }
//     return event
// }
