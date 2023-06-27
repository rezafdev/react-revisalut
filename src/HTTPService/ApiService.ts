import AxiosInstance from "../Axios/AxiosInstance";
import {
    AppointmentData,
    DoctorData,
    PatientData,
    StatsObject,
    TherapyData,
    UserProfileData
} from "../Common/Types/types";
import _ from "lodash";


export type PaginatedResponse<T> = {
    current_page?: number | null,
    last_page?: number | null,
    per_page?: number | null,
    data?: T[] | null,
}

export type UploadFileResData = {
    path: string,
    name?: string | null,
    size?: number,
    type?: string | null,
    subtype?: string | null,
    extname?: string | null,
    sizeStr?: string | null,
    metadata?: { numPages?: number | null, lang?: string | null }
}

export const ErrorMessage = (err: any | Error) => {
    throw Error(_.get(err, 'response.data.message') ?? '')
}


export namespace ApiService {

    // |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
    // ||                   DOCTOR                                              ||
    // |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

    export const UserLogin = (data: { email: string, password: string }) => AxiosInstance.post<{ success: boolean, token: string, user: UserProfileData }>("/auth/login", data)
    export const getMe = () => AxiosInstance.get<UserProfileData>('/auth/me')

    // |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
    // ||                   FILE                                                ||
    // |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
    export const uploadFilePath = (file?: File | null, onErrorValue?: string | null) => {
        if (!file) {
            if (!_.isUndefined(onErrorValue)) return Promise.resolve(onErrorValue)
            throw Error('Invalid File')
        }
        const formData = new FormData()
        formData.append('file', file)
        return AxiosInstance.post<UploadFileResData>('/file/upload', formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
        )
            .then(({data}) => data.path)
            .catch((err) => {
                if (!_.isUndefined(onErrorValue)) return onErrorValue
                throw err
            })
    }

    // |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
    // ||                   DOCTORS                                             ||
    // |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

    export const getDoctors = () => AxiosInstance.get<DoctorData[]>('doctor').then(res => res.data).catch(ErrorMessage)

    export const postDoctor = (data: Partial<DoctorData>) =>
        AxiosInstance.post<DoctorData>(`/doctor`, data).then(res => res.data).catch(ErrorMessage)

    // |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
    // ||                   THERAPY                                             ||
    // |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

    export const getTherapiesPaginated = (page?: number, perPage?: number) => AxiosInstance.get<PaginatedResponse<TherapyData>>('therapy', {
        params: {
            page: page ?? 1,
            size: perPage ?? 10
        }
    })
        .then(res => res.data).catch(() => null)

    export const getTherapyById = (id: number | string) => AxiosInstance.get<TherapyData>(`therapy/${id}`).then(res => res.data).catch(ErrorMessage)

    export const postTherapy = (data: Partial<TherapyData>, idToUpdate?: number) => AxiosInstance.post<TherapyData>(`/therapy`, data)
        .then(res => res.data).catch(ErrorMessage)

    // |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
    // ||                   PATIENT                                             ||
    // |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

    export const getPatientsPaginated = (page?: number, perPage?: number) =>
        AxiosInstance.get<PaginatedResponse<PatientData>>('patient', {params: {page: page ?? 1, size: perPage ?? 12}})
            .then(res => res.data).catch(() => null)

    export const getPatientById = (id: number | string) => AxiosInstance.get<PatientData>(`patient/${id}`).then(res => res.data).catch(ErrorMessage)

    export const postPatient = (data: Partial<PatientData>) => AxiosInstance.post<PatientData>(`/patient`, data).then(res => res.data).catch(ErrorMessage)


    // |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
    // ||                   APPOINTMENT                                         ||
    // |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

    export const getAppointmentByDate = (date: string) => AxiosInstance.get<AppointmentData[]>(`/appointment/date/${date}`).then(res => res.data).catch(() => null)

    export const getAppointmentForRange = (startDate: string, endDate: string) =>
        AxiosInstance.get<AppointmentData[]>(`/appointment/from/${startDate}/to/${endDate}`)
        .then(res => res.data).catch(() => null)

    export const postAppointment = (data: { patientId: number | string, therapyId: number | string, beginDate: string, beginTime: string }, idToUpdate?: number) =>
        AxiosInstance.post<AppointmentData>(`/appointment/${idToUpdate ?? ''}`, data).then(res => res.data).catch(ErrorMessage)

    // |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
    // ||                   Statistics                                          ||
    // |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

    export const getStatistics = () => AxiosInstance.get<StatsObject>(`/statistics`).then(res => res.data).catch(() => null)
    export const getLastAppointments = () => AxiosInstance.get<AppointmentData[]>(`/appointment/last`).then(res => res.data).catch(() => null)
    export const getPopularTreatments = () => AxiosInstance.get<{total?: number, therapies?: TherapyData[]|null}>(`/therapy/popular`).then(res => res.data).catch(() => null)
}
