import React from "react";
import {useTranslation} from "react-i18next";

const NewTherapieStep2 = () => {
    const {t} = useTranslation()


    return (
        <div className='flex flex-col gap-y-4 mt-6 w-full'>
            <div className='flex flex-row items-center gap-x-4 w-1/2'>
                <div className='flex flex-col gap-y-2 items-start w-1/4'>
                    <p className='text-sm text-black'>{t('Min')}</p>
                    <input className='w-full input-login' type="time" name="time" min='00:00'/>
                </div>
                <div className='flex flex-col gap-y-2 items-start w-1/4'>
                    <p className='text-sm text-black'>{t('Max')}</p>
                    <input className='w-full input-login'/>
                </div>
            </div>
            <div className='flex flex-col gap-y-2 items-start w-2/3'>
                <p className='text-base text-black'>{t('Add_Doctor_Team')}</p>
                <input className='w-full input-login'
                       placeholder={t('EMAIL_PLACE') ?? ""}/>
            </div>
            <div className='flex flex-col gap-y-2 items-start w-2/3 mt-20'>
                <div className='flex items-center gap-x-4'>
                    <input type='checkbox' className='bg-[#01505F] bg-opacity-50 outline-none border-none'/>
                    <p className='text-xs text-[#787486]'>
                        Arztberief hinzufügen (Upload )
                    </p>
                </div>
                <div className='flex items-center gap-x-4'>
                    <input type='checkbox' className='bg-[#01505F] bg-opacity-50 outline-none border-none'/>
                    <p className='text-xs text-[#787486]'>
                        Noch iregdwas hinzufügen
                    </p>
                </div>
            </div>
        </div>

    )
}
export default NewTherapieStep2