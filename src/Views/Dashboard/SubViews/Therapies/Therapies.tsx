import {useTranslation} from "react-i18next";
import ThreeDotsIcon from "../../../../Assets/Icons/SideBar/ThreeDotsIcon";
import SettingsIcon from "../../../../Assets/Icons/SideBar/SettingsIcon";
import React, {useEffect} from "react";
import {toast} from "react-toastify";
import _ from 'lodash'
import CloseIcon from "../../../../Assets/Icons/CloseIcon";
import {Pagination} from 'flowbite-react';
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../../../Redux";
import NewTherapyModal from "./NewTherapie/NewTherapyModal";
import {TherapyActions} from "../../../../Redux/Therapies/actions";
import {TherapyData} from "../../../../Common/Types/types";
import {ApiService} from "../../../../HTTPService/ApiService";


const Therapies = () => {

    const {t} = useTranslation()
    const dispatch = useDispatch()


    const currentPage = useSelector<ApplicationState, number>((state) => state.therapiesSection?.currentPage ?? 1)
    const lastPage = useSelector<ApplicationState, number>((state) => state.therapiesSection?.lastPage ?? 1)
    //const perPage = useSelector<ApplicationState, number>((state) => state.therapiesSection?.perPage ?? 1 )
    const therapies = useSelector<ApplicationState, TherapyData[]>((state) => state.therapiesSection?.therapies ?? Array<TherapyData>())

    const visibleModal = useSelector<ApplicationState, boolean>((state) => state?.therapiesSection?.newTherapieModal)

    const handleChangePage = (page: number) => fetchTherapies(page)

    const menuItems = [
        {
            id: 1,
            Name: t('All_Therapies'),
        },
        {
            id: 2,
            Name: t('Diamaond_Therpie'),
        },
        {
            id: 3,
            Name: t('Standard_Therpie'),
        }
    ]

    const fetchTherapies = (page: number) => {
        ApiService.getTherapiesPaginated(page)
            .then(data => dispatch(TherapyActions.setTherapyPageData(data)))
            .catch(err => {
                if (!_.isEmpty(err.message)) toast.error(err.message)
            })
    }

    useEffect(() => {
        fetchTherapies(currentPage)
    }, [currentPage])
    useEffect(() => {
        fetchTherapies(1)
    }, [])


    return (
        <div className='flex flex-col w-full'>
            <div className='flex items-center w-full justify-between pt-12 pr-8 pl-3 pb-8'>
                <p className='text-2xl font-semibold text-[#23272E]'>{t('THERAPIE_MANAGEMENT')}</p>

                <div className='flex flex-row items-center gap-x-2'>
                    <div
                        className='w-10 aspect-square rounded-[4px] border border-Color7 font-bold flex gap-x-[2px] items-center justify-center cursor-pointer'>
                        <SettingsIcon/>
                    </div>
                    <div
                        className='w-10 aspect-square rounded-[4px] border border-Color7 font-bold flex gap-x-[2px] items-center justify-center cursor-pointer'>
                        <ThreeDotsIcon/>
                    </div>
                    <button
                        onClick={() => {
                            dispatch(TherapyActions.showHideAddTherapieModal(true))
                        }}
                        className='py-2 px-3 bg-Color3 text-white rounded-[4px] text-sm'>
                        + {t('ADD_THERAPIE')}
                    </button>
                </div>
            </div>

            <div className=' flex flex-col w-full border-t border-Color13 p-3 bg-Grey-Light'>
                <div className='flex items-center justify-start'>
                    {
                        menuItems.map((item) => (
                            <div key={item?.id}
                                 className='border-b-2 border-Color3 text-center text-[#8B909A] px-6 py-2 cursor-pointer'>
                                {item?.Name}
                            </div>
                        ))
                    }
                </div>
                <hr className='w-full'/>

                <div className="w-64 mt-8">
                    <div className=" mb-4 flex w-full  items-stretch">
                        <input
                            type="search"
                            className="relative m-0 block w-64 min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                            placeholder="Search"
                            aria-label="Search"
                            aria-describedby="button-addon2"/>

                        <span
                            className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                            id="basic-addon2">
      <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-5 w-5">
        <path
            fillRule="evenodd"
            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
            clipRule="evenodd"/>
      </svg>
    </span>
                    </div>
                </div>

                <div className='flex flex-col w-full bg-white py-2 rounded-[16px]'>
                    <div className='grid grid-cols-12 w-full px-8 py-6 text-[#8B909A] uppercase'>
                        <div className='col-span-2 text-left'>
                            {t('Therapie_ID')}
                        </div>
                        <div className='col-span-2 text-left'>
                            {t('Category')}
                        </div>
                        <div className='col-span-2 text-left'>
                            {t('Name')}
                        </div>

                        <div className='col-span-3 text-left'>
                            {t('total')}
                        </div>

                        <div className='col-span-2 text-left'>
                            {t('Add')}
                        </div>
                        <div className='col-span-1 text-left'>
                            filter
                        </div>
                    </div>
                    <hr/>
                    <div className='w-full'>
                        {therapies?.map((therapy, index) => (
                            <>
                                {index > 0 && <hr className='col-span-12'/>}
                                <div className='grid grid-cols-12 px-8 py-4 items-center text-[#23272E]'>
                                    <div className='col-span-2 text-left  font-semibold'>
                                        # {therapy?.id}
                                    </div>
                                    <div className='col-span-2 text-left'>
                                        {therapy?.category ?? ''}
                                    </div>
                                    <div className='col-span-2 text-left'>
                                        {therapy?.name ?? ''}
                                    </div>

                                    <div className='col-span-3 text-left'>
                                        {therapy?.appointments_count ?? 0}
                                    </div>

                                    <div className='col-span-2 flex'>
                                        <button
                                            className='px-3 py-1 text-sm text-white bg-[#01505F] rounded-[4px]'>
                                            {t('Add_Patient')}
                                        </button>
                                    </div>
                                    <div className='col-span-1 flex items-center gap-x-2'>
                                        <SettingsIcon className='cursor-pointer'/>
                                        <CloseIcon className='cursor-pointer'/>
                                    </div>
                                </div>
                            </>
                        ))}
                        <div className='w-full flex items-center justify-end px-6 py-5'>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={lastPage}
                                onPageChange={handleChangePage}
                            />
                        </div>
                        {visibleModal && <NewTherapyModal/>}
                    </div>
                </div>

            </div>

        </div>
    )
}
export default Therapies
