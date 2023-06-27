import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import RevisalutIcon from "../../Assets/Icons/Login/RevisalutIcon";
import {Link, useNavigate} from "react-router-dom";
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {ApiService} from "../../HTTPService/ApiService";
import {toast} from "react-toastify";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import AxiosLocalStorageHelper from "../../Axios/AxiosLocalStorageHelper";
import {useAuthDispatch} from "../../Context/context";


interface FormInputs {
    email: string
    password: string
}


function Login() {

    const [loginLoading, setLoginLoading] = useState<boolean>(false)


    const {t} = useTranslation()
    const navigate = useNavigate()
    const authDispatch = useAuthDispatch()

    const schema = yup.object().shape({
        email: yup.string().required('Please Enter Email Address'),
        password: yup.string().required('Please Enter Password').min(3, 'Password must be at least 6 characters long'),
    }).required()

    const {register, handleSubmit, watch, formState: {errors}} = useForm<FormInputs>({
        resolver: yupResolver(schema)
    })


    const onLoginFn = (formData: FormInputs) => {
        setLoginLoading(true)
        ApiService.UserLogin(formData)
            .then(({data}) => {
                AxiosLocalStorageHelper.setToken(data.token)
                AxiosLocalStorageHelper.setUser(data.user)
                authDispatch({type: "UPDATE_USER", payload: data.user})
                navigate('/dashboard', {replace: true})
            })
            .catch(err => {
                const message = err?.response?.data?.message ?? t<string>('InvalidCredentials')
                toast.error(message)
            })
            .finally(() => setLoginLoading(false))
    }


    const isValid = () => {
        return !!(watch('email') && watch('email').length > 0 && watch('password') && watch('password').length > 0);
    }


    return (
        <div
            className='w-full h-screen flex flex-col justify-center items-center h-full min-h-screen'>
            <form onSubmit={handleSubmit(onLoginFn)}
                  className='flex flex-col justify-center items-center min-w-[40%] max-w-xl'>
                <RevisalutIcon/>
                <div className='flex flex-col items-start gap-y-2 justify-center w-full'>
                    <div className='flex flex-col gap-y-2 items-start w-full'>
                        <p className='text-base text-black'>{t('EMAIL')}</p>
                        <input {...register('email', {required: true})}
                               className='w-full input-login'
                               placeholder={t('EMAIL_PLACE') ?? ""}/>
                    </div>

                    <div className='flex flex-col gap-y-2 items-start w-full'>
                        <p className='text-base text-black'>{t('PASSWORD')}</p>
                        <input  {...register('password', {required: true})}
                                autoComplete='nope' type='password' className='w-full input-login'
                                placeholder="******************"/>
                    </div>
                </div>
                <div className='flex flex-col w-full justify-center gap-y-4 items-center mt-4'>
                    <Link to='/reset-password' className='cursor-pointer'>
                        <p className='cursor-pointer'>{t("FORGOT_PASSWORD")}</p>
                    </Link>
                    <button
                        type='submit'
                        disabled={!isValid()}
                        className='w-full bg-Color3 rounded-[12px] text-white py-3 disabled:bg-gray-500'>
                        {loginLoading ? <LoadingSpinner/> : t('LOGIN')}
                    </button>
                    <div className=' flex items-center gap-x-6'>
                        {t('DONT_HAVE_AN_ACCOUNT')}
                        <span className='underline underline-offset-1 text-Color3 cursor-pointer'>
                            {t("CONTACT_US")}
                        </span>
                    </div>
                </div>

            </form>
        </div>
    )
}


export default Login
