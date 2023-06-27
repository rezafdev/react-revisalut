import RevisalutIcon from "../../Assets/Icons/Login/RevisalutIcon";
import React from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

const ResetPassword = () => {
    const {t} = useTranslation()

    const handleResetPassFn = () => {
        console.log('reset')
    }


    return (
        <div
            className='w-full h-screen flex flex-col justify-center items-center h-full min-h-screen'>
            <div className='flex flex-col justify-center items-center min-w-[40%] max-w-xl'>
                <RevisalutIcon/>
                <div className='flex flex-col items-start gap-y-2 justify-center w-full'>
                    <div className='flex flex-col gap-y-2 items-start w-full'>
                        <p className='text-base text-black'>{t('EMAIL')}</p>
                        <input className='w-full input-login'
                               placeholder={t('EMAIL_PLACE') ?? ""}/>
                    </div>
                </div>
                <div className='flex flex-col w-full justify-center gap-y-4 items-center mt-4'>
                    <button
                        className='w-full bg-Color3 rounded-[12px] text-white py-3'
                        onClick={handleResetPassFn}
                    >
                        {t('RESET_PASSWORD')}
                    </button>
                    <Link to='/login' className='cursor-pointer'>
                        <p className='cursor-pointer text-Color1'>{t("BACK_TO_LOGIN")}</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default ResetPassword