import React from "react";
import {useTranslation} from "react-i18next";
import LeftIndicator from "./LeftIndicator";
import SideBarLogo from "../../Assets/Icons/SideBar/SideBarLogo";
import Avatar from '../../Assets/avatar.png'
import ThreeDotsIcon from "../../Assets/Icons/SideBar/ThreeDotsIcon";
import {useAuthState} from "../../Context/context";

const SideBar = () => {
    const {t} = useTranslation()
    const {user} = useAuthState()


    console.log("user --> ", user)
    return (
        <div id="side-bar"
             className='col-span-2 min-h-screen flex flex-col  overflow-y-scroll scrollbar-hide '>
            <div className='flex flex-col justify-between w-full h-full gap-y-4 px-4 border-r border-[#EAECF0]'>
                <div>
                    <div className='pt-9 flex items-center justify-center'>
                        <SideBarLogo/>
                    </div>
                    <div className='mt-8'>
                        <nav className='flex flex-col gap-y-4'>
                            <LeftIndicator Pname={'dashboard'}/>
                            <LeftIndicator Pname={'calender'}/>
                            <LeftIndicator Pname={'therapies'}/>
                            <LeftIndicator Pname={'statistics'}/>
                            <LeftIndicator Pname={'patients'}/>
                            <LeftIndicator Pname={'doctors'}/>
                            <LeftIndicator Pname={'settings'}/>
                        </nav>
                    </div>
                </div>
                <div className=' pb-8 flex flex-col gap-y-6'>
                    <hr/>
                    <div className='flex items-center'>
                        <div className='flex flex-row items-center  gap-x-2'>
                            <img className='w-10 aspect-square rounded-full' src={Avatar} alt=''/>
                            <div className='flex flex-col items-start justify-between h-full'>
                                <p className='text-sm'>
                                    {user?.name ?? ""}
                                </p>
                                <p className='text-xs text-Color6'>
                                    {user?.email ?? ""}
                                </p>
                            </div>
                        </div>
                        <div
                            className='w-6 aspect-square rounded-[4px] border border-Color7 font-bold flex gap-x-[2px] items-center justify-center cursor-pointer'>
                            <ThreeDotsIcon/>
                        </div>
                    </div>
                </div>

            </div>
        </div>)
}

export default SideBar
