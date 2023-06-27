import React, {useEffect, useState} from 'react'
import {useTranslation} from "react-i18next";
import {ApiService} from "../../../../HTTPService/ApiService";
import {TherapyData} from "../../../../Common/Types/types";


const PopularTreatments = () => {
    const {t} = useTranslation()

    const [total, setTotal] = useState<number|undefined|null>()
    const [items, setItems] = useState<TherapyData[]|null|undefined>()

    useEffect(() => {
        ApiService.getPopularTreatments()
            .then(data => {
                setTotal(data?.total)
                setItems(data?.therapies)
            })
            .catch(() => {})
        return () => {}
    }, [])

    return (
        <div
            className={`col-span-4 shadow-sm w-full h-full bg-white rounded rounded-xl flex flex-col gap-2 items-center`}>

            <div className='w-full flex flex-col justify-start items-start px-6 pt-6 pb-2'>
                <span className='text-[#23272E] font-semibold text-lg'>{t('PopularTreatments')}</span>
                <span className='text-[#8B909A] font-medium text-xs'>{t('TotalTreatments')} {total ?? ''}</span>
            </div>

            <hr className='w-full text-[#FaFafa]'/>

            <div  className="w-full flex flex-col gap-4 pr-2 pl-8">
                {items?.map(item =>
                    <div className='w-full flex flex-col items-start justify-start'>
                        <div key={item.id} className='w-full grid grid-cols-6 items-center justify-between'>
                            <span className='col-span-4 text-start text-[#23272E] font-semibold text-sm'>{item.name ?? ''}</span>
                            <span className='col-span-2 text-end text-[#23272E] font-medium text-base'>{item.appointments_count ?? 0}</span>
                        </div>
                        <span className='text-[#8B909A] font-light text-xs'>{t('ID')}#{item.id}</span>
                    </div>
                )}
            </div>


        </div>
    )
}
export default PopularTreatments
