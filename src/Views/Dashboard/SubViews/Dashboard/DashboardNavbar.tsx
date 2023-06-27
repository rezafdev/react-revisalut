import {useTranslation} from "react-i18next";
import BoardIcon from "../../../../Assets/Icons/Patients/BoardIcon";
import TopPatientsIcon from "../../../../Assets/Icons/Patients/TopPatientsIcon";
import TopCalenderIcon from "../../../../Assets/Icons/Patients/TopCalenderIcon";
import ThreeDotsIcon from "../../../../Assets/Icons/SideBar/ThreeDotsIcon";
import React from "react";
import SettingsIcon from "../../../../Assets/Icons/SideBar/SettingsIcon";

const DashboardNavbar = () => {
    const {t} = useTranslation()

    const menuItems = [
        {
            id: 1,
            Name: t('BOARD'),
            Icon: <BoardIcon/>
        },
        {
            id: 2,
            Name: t('PATIENTS'),
            Icon: <TopPatientsIcon/>
        },
        {
            id: 3,
            Name: t('CALENDER'),
            Icon: <TopCalenderIcon/>
        }
    ]

    return (
        <>
            <div className='w-full h-16 flex flex-row items-center justify-between px-6 py-3'>
                <div className='flex flex-row items-center gap-x-3'>
                    {menuItems?.map((item, index) => (
                        <div className='flex items-center gap-x-2'>
                            {item?.Icon}
                            {item?.Name}
                        </div>
                    ))}
                </div>
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
            </div>
            <hr className='w-full'/>

            <div className=' flex flex-row w-full items-center justify-between px-6 pt-10 pb-3'>
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
      <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-5 w-5">
        <path
            fillRule="evenodd"
            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
            clip-rule="evenodd"/>
      </svg>
    </span>
                    </div>
                </div>


                <div className='flex flex-row items-center gap-x-2'>
                    <div
                        className='w-10 aspect-square rounded-[4px] border border-Color7 font-bold flex gap-x-[2px] items-center justify-center cursor-pointer'>
                        <ThreeDotsIcon/>
                    </div>
                    <div
                        className='w-10 aspect-square rounded-[4px] border border-Color7 font-bold flex gap-x-[2px] items-center justify-center cursor-pointer'>
                        <SettingsIcon/>
                    </div>
                    <button className='py-2 px-3 bg-Color3 text-white rounded-[4px] text-sm'>
                        + {t('ADD_PATIENTS')}
                    </button>
                </div>
            </div>
            <hr className='w-full'/>


        </>
    )
}
export default DashboardNavbar