import React from "react";
import {useTranslation} from "react-i18next";
import {TherapyCategories} from "../../../../../../Common/Types/types";

const NewTherapieStep1 = () => {
    const {t} = useTranslation()

    return (
        <div className='flex flex-col gap-y-4 mt-6 w-full'>
            <div className='flex flex-col gap-y-2 items-start w-2/3'>
                <p className='text-base text-black'>{t('Name')}</p>
                <input className='w-full input-login'
                       placeholder={t('EMAIL_PLACE') ?? ""}/>
            </div>

            <div className='flex flex-col gap-y-2 items-start w-2/3'>
                <p className='text-base text-black'>{t('Description')}</p>
                <textarea className='w-full input-login resize-none min-h-[150px]'/>
            </div>
            <div className='flex flex-col gap-y-2 items-start w-2/3'>
                <p className='text-base text-black'>{t('Category')}</p>
                <select className='w-full input-login'>
                    {TherapyCategories.map(item => (
                        <option value={item}>item</option>
                    ))}
                </select>
            </div>

        </div>
    )
}
export default NewTherapieStep1
