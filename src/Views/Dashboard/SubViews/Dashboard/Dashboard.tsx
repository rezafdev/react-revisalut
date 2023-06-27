import DashboardNavbar from "./DashboardNavbar";
import PlusIcon from "../../../../Assets/Icons/Patients/PlusIcon";
import ThreeDotsIcon from "../../../../Assets/Icons/SideBar/ThreeDotsIcon";
import React from "react";
import {useTranslation} from "react-i18next";
import DashboardItemCard from "./DashboardItemCard";

import {Pagination} from 'flowbite-react';

const Dashboard = () => {
    const {t} = useTranslation()

    return (
        <div className='w-full'>
            <DashboardNavbar/>
            <div className='grid grid-cols-12 bg-Color8 b w-full rounded-[8px] h-[90vh] p-[6px] '>
                <div className='col-span-4 bg-Color9 px-2 py-4 rounded-[8px] shadow-md'>
                    <div className='w-full flex items-center justify-between'>
                        <p className='text-Color10'>
                            {t('Dashboard')}
                        </p>
                        <div className='flex items-center gap-x-1'>
                            <PlusIcon className='cursor-pointer'/>
                            <ThreeDotsIcon color='#6F6F6F' className='cursor-pointer'/>
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-6 px-5 mt-5'>
                        <DashboardItemCard/>
                        <DashboardItemCard/>
                        <DashboardItemCard/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard