import {Calendar, Culture, DateLocalizer, DateRange, Event, Formats, momentLocalizer, View} from 'react-big-calendar'
import moment from 'moment'

import _ from "lodash";
import '../../../../react-big-calendar.css'
import {ApiService} from "../../../../HTTPService/ApiService";
import {toast} from "react-toastify";
import React, {useEffect, useMemo, useState} from "react";
import {TypeHelpers} from "../../../../Common/Types/TypeHelpers";
import {useTranslation} from "react-i18next";


const localizerInstance = momentLocalizer(moment) // or globalizeLocalizer

// eslint-disable-next-line @typescript-eslint/no-unused-vars


const Calender = () => {

    const {t} = useTranslation()
    const [loading, setLoading] = useState(false)
    const [events, setEvents] = useState<Array<Event>|undefined>(undefined)

    const configParams  = useMemo(() => {
        const formats: Formats =  {
            dayHeaderFormat: 'dddd MMMM Do',
            dayFormat: 'dddd DD',
            dayRangeHeaderFormat: (range: DateRange, culture?: Culture, localizer?: DateLocalizer) => {
                const loc = localizer ?? localizerInstance
                const year1 = loc.format(range.start, "YYYY")
                const year2 = loc.format(range.end, "YYYY")
                return `${year1}, ${loc.format(range.start, 'MMMM DD')} - ${year1 === year2 ? '' : `${year2},`} ${loc.format(range.end, 'MMMM DD')}`
            },
            eventTimeRangeFormat: (range: DateRange, culture?: Culture, localizer?: DateLocalizer) => ""
        }
        return {
            formats: formats,
            min: new Date(1972, 0, 1, 7, 0, 0, 0),
            max: new Date(1972, 0, 1, 22, 0, 0, 0)
        }
    }, [])

    const onRangeChanged = (range: Date[]|{start: Date, end: Date}, view?: View) => {
        let startDate = !_.isArray(range) ? moment(range.start).format('YYYY-MM-DD') : ""
        let endDate = !_.isArray(range) ? moment(range.end).format('YYYY-MM-DD') : ""
        if(_.isArray(range)) {
            startDate = moment(_.head(range)).format('YYYY-MM-DD')
            endDate = moment(_.last(range)).format('YYYY-MM-DD')
        }
        console.log('onRangeChanged ---> ', startDate, " > ", endDate )
        fetchAppointments(startDate, endDate)
    }

    const fetchAppointments = (startDate: string, endDate: string) => {
        ApiService.getAppointmentForRange(startDate, endDate)
            .then(data => {
                const list: Array<Event> = TypeHelpers.getEventsFromAppointments(data).map(event => ({
                    ...event,
                    title: (<div>
                        <span className='font-medium text-black'>{_.get(event.resource, 'patientName') ?? ''}</span>
                        <br/>
                        <span className='font-regular text-grey-500'>{event.title ?? ''}</span>
                    </div>)
                }))
                setEvents(list)
            })
            .catch((err) => {
                if(!_.isEmpty(err.message)) {
                    toast.error(err.message)
                }
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        const date = new Date()
        const startDate = moment(date).startOf('week').format('YYYY-MM-DD')
        const endDate = moment(date).endOf('week').format('YYYY-MM-DD')
        fetchAppointments(startDate, endDate)
    }, [])

    return (
        <div className='flex flex-col w-full'>
            <div className='flex items-center w-full justify-between p-4'>
                <p className='text-2xl font-semibold text-[#23272E]'>{t('Appointments')}</p>
            </div>
            <hr className='w-full text-[#f5f5f5]'/>
            <div className="p-6 h-[90vh] bg-[#FAFAFA]">
                <Calendar
                    localizer={localizerInstance}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    defaultView={'week'}
                    views={['day', 'week', 'agenda']}
                    formats={configParams.formats}
                    onRangeChange={onRangeChanged}
                    min={configParams.min}
                    max={configParams.max}
                    dayLayoutAlgorithm={'no-overlap'}
                />
            </div>
        </div>
    )
}
export default Calender
