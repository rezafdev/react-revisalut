import ILifeSommIcon from "../../../../Assets/Icons/Patients/ILifeSommIcon";
import ThreeDotsIcon from "../../../../Assets/Icons/SideBar/ThreeDotsIcon";
import React from "react";
import {PatientData} from "../../../../Common/Types/types";

const PatientCardItem = ({patient}: { patient: PatientData }) => {
    return (
        <div
            className='col-span-1 flex w-full h-full flex-col items-center justify-center bg-white shadow-lg gap-y-3 pb-8 rounded-[8px] p-4'>
            <div className='flex items-start justify-between w-full'>
                <p className='text-[#1C1C1C] text-lg'>
                    {patient?.fullName ?? ''}
                </p>
                <div
                    className='w-7 aspect-square shadow-lg rounded-[4px] border border-Color7 font-bold flex gap-x-[2px] items-center justify-center cursor-pointer'>
                    <ThreeDotsIcon/>
                </div>
            </div>


            <div className='flex flex-row items-center  w-full gap-x-4'>
                <div className={` px-2 py-1 bg-opacity-10 flex items-center gap-x-1 rounded-[6px] ${patient.isHold ? 'bg-[#FF101E]' : 'bg-[#00BA34]'}`}>
                    <p className={`text-xs ${patient.isHold ? 'text-[#A10808]' : 'text-[#00BA34]'} `}>
                        {patient?.statusStr ?? ''}
                    </p>
                </div>
                {!!patient?.nearestAppointment?.therapy?.name && <div
                    className='flex items-center gap-x-1 bg-[#00BA34] bg-opacity-10 px-2 py-1 rounded-[4px]'>
                    <ILifeSommIcon/>
                    <div className='text-xs text-[#00BA34]'>
                        {patient?.nearestAppointment?.therapy?.name ?? ''}
                    </div>
                </div>}
            </div>

            {/*<div className='flex flex-col items-center w-full mt-2 gap-y-2'>*/}
            {/*    <p className='text-[#1C1C1C] text-lg'>*/}
            {/*        {patient?.name ?? ''}*/}
            {/*    </p>*/}
            {/*    <hr className='w-64'/>*/}
            {/*    <p className='w-2/3 text-[#8B909A] text-xs'>*/}
            {/*        {doctor?.description ?? ''}*/}
            {/*    </p>*/}
            {/*    <div className='flex items-center gap-x-2'>*/}
            {/*        {*/}
            {/*            _.take(doctor?.tags as string[], 3).map((tag, index) => (*/}
            {/*                <div*/}
            {/*                    className='flex items-center gap-x-1 bg-[#00BA341A] bg-opacity-10 px-2 py-1 rounded-[4px]'>*/}
            {/*                    <ILifeSommIcon/>*/}
            {/*                    <div className='text-xs text-[#00BA34]'>*/}
            {/*                        {tag}*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            ))*/}
            {/*        }*/}
            {/*    </div>*/}
            {/*</div>*/}

        </div>

    )
}
export default PatientCardItem
