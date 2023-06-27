import {AppointmentData} from "./types"
import {Event} from 'react-big-calendar'
import _ from "lodash";

export namespace TypeHelpers {


    function appointmentToEvent(appointment: AppointmentData): Event|null {
        if(!appointment.beginAt || !appointment.endAt) return null
        return {
            title: appointment.therapy?.name ?? "",
            allDay: false,
            start: new Date(appointment.beginAt!!),
            end: new Date(appointment.endAt!!),
            resource: { id: appointment.id, title: appointment.therapy?.name ?? '', patientName: appointment.patient?.fullName ?? ""},
        }
    }

    export function getEventsFromAppointments(appointments: AppointmentData[]|null) {
        const list = Array<Event>()
        if(!appointments || _.isEmpty(appointments)) return list
        appointments.forEach(it => {
            const event = appointmentToEvent(it)
            if(!!event) list.push(event)
        })
        return list
    }

}
