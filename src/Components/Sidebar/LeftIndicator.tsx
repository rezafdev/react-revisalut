import React from "react";
import {useTranslation} from "react-i18next";
import {Link, useLocation} from "react-router-dom";
import DashboardIcon from "../../Assets/Icons/SideBar/DashboardIcon";
import CalenderIcon from "../../Assets/Icons/SideBar/CalenderIcon";
import TherapiesIcon from "../../Assets/Icons/SideBar/TherapiesIcon";
import StatisticsIcon from "../../Assets/Icons/SideBar/StatisticsIcon";
import PatientsIcon from "../../Assets/Icons/SideBar/PatientsIcon";
import DoctorsIcon from "../../Assets/Icons/SideBar/DoctorsIcon";
import SettingsIcon from "../../Assets/Icons/SideBar/SettingsIcon";

function LeftIndicator({Pname, onClick}: { Pname: string, onClick?: () => void }) {

    const {t} = useTranslation()
    const location = useLocation().pathname


    const iconRenderer = (name: string) => {
        switch (name) {
            case 'dashboard':
                return (<DashboardIcon/>)
            case 'calender':
                return (<CalenderIcon/>)
            case 'therapies':
                return (<TherapiesIcon/>)
            case 'statistics':
                return (<StatisticsIcon/>)
            case 'patients':
                return (<PatientsIcon/>)
            case 'doctors':
                return (<DoctorsIcon/>)
            case 'settings':
                return (<SettingsIcon/>)
            // case 'reports':
            //     return (<ReportsIcon/>)
            // case 'help':
            //     return (<HelpIcon/>)
            // case 'support-center':
            //     return (<SupportCenterIcon/>)
            // case 'work-in-europe':
            //     return (<WorkEuropeIcon/>)
            // case 'settings':
            //     return (<SettingsIcon/>)
            // case 'bulldog-realstate':
            //     return (<BulldogIcon/>)
            // case 'assessment-center':
            //     return (<AssessmentIcon/>)
            // case 'job-finder':
            //     return (<NotificationsIcon/>)

        }
    }
    return (
        <Link to={Pname.toLowerCase()}>
            <div className='relative flex flex-col justify-center'>
                <div
                    className={`flex flex-row items-center border p-3 rounded-[8px] border-transparent gap-x-2 cursor-pointer ${location.includes(Pname.toLowerCase()) ? 'bg-Color5' : ""}`}>
                    {iconRenderer(Pname.toLowerCase())}
                    <p className='text-sm font-semibold'>
                        {t<string>(`Sidebar_${Pname.toLowerCase()}`)}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default LeftIndicator