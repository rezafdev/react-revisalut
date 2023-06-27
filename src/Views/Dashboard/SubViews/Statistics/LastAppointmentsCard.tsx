import React, {useEffect, useState} from 'react'
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {AppointmentData} from "../../../../Common/Types/types";
import {ApiService} from "../../../../HTTPService/ApiService";


const LastAppointmentsCard = () => {
    const {t} = useTranslation()

    const [items, setItems] = useState<AppointmentData[]|null|undefined>()

    useEffect(() => {
        ApiService.getLastAppointments()
            .then(data => setItems(data))
            .catch(() => {})
        return () => {}
    }, [])

    return (
        <div
            className={`col-span-8 shadow-sm w-full h-full bg-white rounded rounded-xl flex flex-col justify-between items-center`}>

            <div className='w-full flex flex-row justify-between items-center p-6'>
                <span className='text-[#23272E] font-semibold text-lg'>{t('LastAppointments')}</span>
                <Link to={"/calender"} replace={true}>
                    <span className='text-[#01505F] font-medium text-sm'>{t('ViewAll')}</span>
                </Link>
            </div>


            <div className="w-full relative overflow-x-auto sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-start">{t('ID')}</th>
                        <th scope="col" className="px-6 py-3 text-start">{t('DATE')}</th>
                        <th scope="col" className="px-6 py-3 text-start">{t('NAME')}</th>
                        <th scope="col" className="px-6 py-3 text-start">{t('ACTIONS')}</th>
                    </tr>
                    </thead>
                    <tbody>

                    {items?.map(item =>
                        <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td scope="row"
                                className="px-6 py-4 text-[#01505F] whitespace-nowrap dark:text-white text-start">
                                #{item.id}
                            </td>
                            <td className="px-6 py-4 text-start">
                                { new Date(item.beginDate ?? "").toDateString() }
                            </td>
                            <td className="px-6 py-4 text-start">
                                {item.patient?.fullName ?? ""}
                            </td>
                            <td className="px-6 py-4 text-start text-start">
                            <span
                                className="text-[#01505F] hover:underline">{t('ViewDetail')}
                            </span>
                            </td>
                        </tr>
                    )}

                    </tbody>
                </table>
            </div>


        </div>
    )
}
export default LastAppointmentsCard
