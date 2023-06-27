import React from "react";
import {useTranslation} from "react-i18next";

const NewPatientStep1 = () => {
    const {t} = useTranslation()

    return (
        <div className='flex flex-col gap-y-4 mt-6 w-full'>
            <div className='flex flex-row items-center justify-start gap-x-4'>
                <div className='px-5 text-sm py-2 bg-white border border-[#01505F] rounded-[8px]'>
                    Male
                </div>
                <div className='px-5 text-sm py-2 bg-white border border-[#01505F] rounded-[8px]'>
                    Female
                </div>
            </div>
            <div className='flex  gap-y-2 items-start w-3/4 gap-x-6'>
                <input className='w-full input-login'
                       placeholder={t('EMAIL_PLACE') ?? ""}/>
                <input className='w-full input-login'
                       placeholder={t('EMAIL_PLACE') ?? ""}/>
            </div>

            <div className='grid grid-cols-5 gap-x-2 items-start w-1/2'>
                <input className='col-span-1 w-full input-login'/>
                <input className='col-span-1 w-full input-login'/>
                <input className='col-span-1 w-full input-login'/>
            </div>
            <div className='flex flex-col gap-y-2 items-start w-1/2'>
                <input className='w-full input-login'
                       placeholder={t('EMAIL_PLACE') ?? ""}/>
            </div>

            <div className='grid grid-cols-5 gap-x-2 items-start w-1/2'>
                <input className='col-span-1 w-full input-login'/>
                <input className='col-span-4 w-full input-login'/>
            </div>

            <div className='flex flex-col gap-y-2 items-start w-1/2'>
                <input className='w-full input-login'
                       placeholder={t('EMAIL_PLACE') ?? ""}/>
            </div>
        </div>
    )
}

export default NewPatientStep1