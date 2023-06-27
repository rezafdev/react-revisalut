import Avatar from '../../../../Assets/avatar.png'
import ThreeDotsIcon from "../../../../Assets/Icons/SideBar/ThreeDotsIcon";
import React from "react";
import ILifeSommIcon from "../../../../Assets/Icons/Patients/ILifeSommIcon";
import {useTranslation} from "react-i18next";


const DashboardItemCard = () => {
    const {t} = useTranslation()

    return (
        <div className='bg-white flex flex-col gap-y-3 p-4 rounded-[8px] shadow-md'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-x-2'>
                    <img className='w-8 aspect-square rounded-full' src={Avatar} alt=''/>
                    <p className='text-base text-Color11'>Kathryn Murphy</p>
                </div>
                <div
                    className='w-6 aspect-square rounded-[4px] border border-Color7 font-bold flex gap-x-[2px] items-center justify-center cursor-pointer'>
                    <ThreeDotsIcon/>
                </div>
            </div>
            <hr/>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-x-1 bg-[#00BA341A] bg-opacity-10 px-2 py-1 rounded-[4px]'>
                    <ILifeSommIcon/>
                    <p className='text-xs text-[#00BA34]'>
                        {t('ILIFESOMM')}
                    </p>
                </div>
                <p className='text-xs uppercase text-Color12'>
                    3 OPEN
                </p>
            </div>

        </div>
    )
}
export default DashboardItemCard