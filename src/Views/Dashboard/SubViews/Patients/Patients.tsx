import React, {useEffect} from "react"
import {useTranslation} from "react-i18next"
import _ from "lodash"
import {toast} from "react-toastify"
import PatientCardItem from "./PatientCardItem"
import {useDispatch, useSelector} from "react-redux"
import {ApplicationState} from "../../../../Redux"
import NewPatientModal from "./NewPatient/NewPatientModal"
import {PatientActions} from "../../../../Redux/Patients/actions";
import {PatientData} from "../../../../Common/Types/types";
import {ApiService} from "../../../../HTTPService/ApiService";
import {Pagination} from "flowbite-react";
import GridOrTableSelector from "../../../../Components/GridOrTableSelector";


const Patients = () => {
    const {t} = useTranslation()
    const dispatch = useDispatch()

    const visibleModal = useSelector<ApplicationState, boolean>((state) => state?.patientsSection?.newPatientModal)
    const currentPage = useSelector<ApplicationState, number>((state) => state.patientsSection?.currentPage ?? 1 )
    const lastPage = useSelector<ApplicationState, number>((state) => state.patientsSection?.lastPage ?? 1 )
    //const perPage = useSelector<ApplicationState, number>((state) => state.patientsSection?.perPage ?? 12 )
    const patients = useSelector<ApplicationState, PatientData[]>((state) => state.patientsSection?.patients ?? Array<PatientData>() )

    const isTableView = useSelector<ApplicationState, boolean>(state => state.patientsSection?.isTableView ?? false)

    const handleChangePage = (page: number) => fetchPatients(page)

    const fetchPatients = (page: number) => {
        ApiService.getPatientsPaginated(page)
            .then(data => dispatch(PatientActions.setPatientsPageData(data)))
            .catch(err => {
                if(!_.isEmpty(err.message)) toast.error(err.message)
            })
    }

    useEffect(() => {
        fetchPatients(currentPage)
    }, [currentPage])
    // useEffect(() => {
    //     fetchPatients(1)
    // }, [])

    return (
        <div className='flex flex-col w-full h-screen bg-Grey-Light'>
            <div className='flex items-center w-full justify-between pt-12 pr-8 pl-3 pb-8 bg-white'>
                <div className="">
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                        <input
                            type="search"
                            className="relative m-0 block w-64 min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                            placeholder="Search"
                            aria-label="Search"
                            aria-describedby="button-addon2"/>

                        <span
                            className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                            id="basic-addon2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                 className="h-5 w-5"><path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd"/></svg>
                        </span>
                    </div>
                </div>

                <div className='flex flex-row items-center gap-x-2'>
                    <button
                        onClick={() => {
                            dispatch(PatientActions.showHideAddPatientModal(true))
                        }}
                        className='py-2 px-3 bg-Color3 text-white rounded-[6px] text-sm'>
                        + {t('ADD_PATIENTS')}
                    </button>
                </div>
            </div>
            <hr/>
            <div className='grid grid-cols-3 justify-start px-3 py-4 gap-7  '>
                {
                    patients?.map((patient, index) => (
                        <PatientCardItem patient={patient}/>
                    ))
                }
                {visibleModal && <NewPatientModal/>}
            </div>

            <div className='w-full flex items-center justify-between px-6 py-5'>
                <GridOrTableSelector isTableSelected={isTableView} onChange={() => dispatch(PatientActions.toggleTableView())} />

                <Pagination
                    currentPage={currentPage}
                    totalPages={lastPage}
                    onPageChange={handleChangePage}
                />
            </div>
        </div>
    )
}
export default Patients
