import React from "react";
import {useTranslation} from "react-i18next";

const NewDoctorStep1 = () => {
    const {t} = useTranslation()


    return (
        <div className='flex flex-col gap-y-4 mt-6 w-full'>
            <div className='flex flex-row items-center justify-start gap-x-4'>
                <div className='px-5 text-sm py-2 bg-white border border-[#01505F] rounded-[8px]'>
                    Doctor
                </div>
                <div className='px-5 text-sm py-2 bg-white border border-[#01505F] rounded-[8px]'>
                    Nurse
                </div>
            </div>
            <div className='flex flex-col gap-y-2 items-start w-1/2'>
                <p className='text-base text-black'>{t('Doctor_Name')}</p>
                <input className='w-full input-login'
                       placeholder={t('EMAIL_PLACE') ?? ""}/>
            </div>

            <div className='flex flex-col gap-y-2 items-start w-1/2'>
                <p className='text-base text-black'>{t('Doctor_Name')}</p>
                <textarea className='w-full input-login resize-none'
                          placeholder={t('EMAIL_PLACE') ?? ""}/>
            </div>

            <div className='flex flex-col gap-y-2 items-start w-1/2'>
                <p className='text-base text-black'>{t('Add_Skill')}</p>
                <div className='flex flex-row items-center justify-start gap-x-4'>
                    <div className='px-5 text-sm text-gray-400 py-2 bg-white border border-[#01505F] rounded-[8px]'>
                        Mental
                    </div>
                    <div className='px-5 text-sm text-gray-400 py-2 bg-white border border-[#01505F] rounded-[8px]'>
                        Schönheit
                    </div>
                    <div className='px-5 text-sm text-gray-400 py-2 bg-white border border-[#01505F] rounded-[8px]'>
                        BLut
                    </div>
                </div>
            </div>
        </div>
    )
}
export default NewDoctorStep1