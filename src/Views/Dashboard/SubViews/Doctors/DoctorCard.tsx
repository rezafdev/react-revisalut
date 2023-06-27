import ILifeSommIcon from "../../../../Assets/Icons/Patients/ILifeSommIcon";

import Avatar from '../../../../Assets/avatar.png'
import ThreeDotsIcon from "../../../../Assets/Icons/SideBar/ThreeDotsIcon";
import React from "react";
import _ from "lodash";
import {Helpers} from "../../../../Common/Helpers";
import {DoctorData} from "../../../../Common/Types/types";
import {useTranslation} from "react-i18next";



const DoctorCard = ({doctor}: { doctor: DoctorData }) => {
    const {t} = useTranslation()
    return (
        <div key={doctor.id}
            className='flex flex-col h-full items-center justify-start bg-white shadow-lg rounded-[8px] py-2 px-3'>
            <div className='flex items-start justify-between w-full'>
                <div className='p-2 bg-[#E7E7FF] flex items-center gap-x-1 rounded-[6px]'>
                    <ILifeSommIcon color='#000000'/>
                    <p className='text-xs text-[#01505F]'>
                        {doctor?.typeStr ?? ''}
                    </p>
                </div>

                <img className='w-[76px] aspect-square rounded-full ' src={Helpers.imageUrl(doctor.avatarUrl)}/>

                <div className='w-7 aspect-square rounded-[4px] border border-Color7 font-bold flex gap-x-[2px] items-center justify-center cursor-pointer'>
                    <ThreeDotsIcon/>
                </div>
            </div>

            <div className='flex flex-col items-center w-full mt-2 gap-y-2'>
                <p className='text-[#1C1C1C] text-lg'>
                    {doctor?.name ?? ''}
                </p>
                <hr className='w-64'/>
                <p className='w-full px-10 text-[#8B909A] text-xs'>
                    {doctor?.bio ?? ''}
                </p>
                <div className='flex items-center gap-x-2'>
                    {doctor.skill_mental && <div className='flex items-center gap-x-1 bg-[#00BA341A] bg-opacity-10 px-2 py-1 rounded-[4px]'>
                        <ILifeSommIcon/>
                        <p className='text-xs text-[#00BA34]'>{t('Mental')}</p>
                    </div>}
                    {doctor.skill_blood && <div className='flex items-center gap-x-1 bg-[#00BA341A] bg-opacity-10 px-2 py-1 rounded-[4px]'>
                        <ILifeSommIcon/>
                        <p className='text-xs text-[#00BA34]'>{t('Blood')}</p>
                    </div>}
                    {doctor.skill_beauty && <div className='flex items-center gap-x-1 bg-[#00BA341A] bg-opacity-10 px-2 py-1 rounded-[4px]'>
                        <ILifeSommIcon/>
                        <p className='text-xs text-[#00BA34]'>{t('Beauty')}</p>
                    </div>}
                </div>
            </div>

        </div>
    )
}
export default DoctorCard
