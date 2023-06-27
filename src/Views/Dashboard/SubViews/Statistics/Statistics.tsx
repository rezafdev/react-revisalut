import AppVisitStats from "./AppVisitStats";
import StatsCard from "./StatsCard";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {StatsObject} from "../../../../Common/Types/types";
import {ApiService} from "../../../../HTTPService/ApiService";
import LastAppointmentsCard from "./LastAppointmentsCard";
import PopularTreatments from "./PopularTreatmentsCard";

const Statistics = () => {
    const {t} = useTranslation()
    const [statsObject, setStatsObject] = useState<StatsObject|null|undefined>(null)

    const fetchData = () => {
        ApiService.getStatistics()
            .then(data => setStatsObject(data))
            .catch()

    }

    useEffect(() => {
        fetchData()
        return ()=>{}
    }, [])

    return (
        <div className='grid grid-cols-12 gap-4 p-6'>
            <AppVisitStats title={t('TotalAppVisits')} value={statsObject?.appVisits?.value ?? '-'} change={statsObject?.appVisits?.change ?? 0} changeSymbol={statsObject?.appVisits?.changeSymbol ?? ''}/>
            <StatsCard colSpan={5} title={t('TherapySessions')} value={statsObject?.therapySessions?.value ?? '-'} change={statsObject?.therapySessions?.change ?? 0} changeSymbol={statsObject?.therapySessions?.changeSymbol ?? ''} />

            <StatsCard colSpan={4} title={t('TotalPatients')} value={statsObject?.totalPatients?.value ?? '-'} change={statsObject?.totalPatients?.change ?? 0} changeSymbol={statsObject?.totalPatients?.changeSymbol ?? ''} />
            <StatsCard colSpan={4} title={t('NewPatients')}  value={statsObject?.newPatients?.value ?? '-'} change={statsObject?.newPatients?.change ?? 0} changeSymbol={statsObject?.newPatients?.changeSymbol ?? ''}/>
            <StatsCard colSpan={4} title={t('MonthlyPatients')} value={statsObject?.monthlyPatients?.value ?? '-'} change={statsObject?.monthlyPatients?.change ?? 0} changeSymbol={statsObject?.monthlyPatients?.changeSymbol ?? ''}/>

            <LastAppointmentsCard />

            <PopularTreatments />

        </div>
    )
}
export default Statistics
