import ThreeDotsIcon from "../../../../../Assets/Icons/SideBar/ThreeDotsIcon";
import {useTranslation} from "react-i18next";
import NewPatientStep1 from "./Steps/NewPatientStep1";
import NewPatientStep2 from "./Steps/NewPatientStep2";
import {useDispatch} from "react-redux";
import React, {useState} from "react";
import {PatientActions} from "../../../../../Redux/Patients/actions";
import {BasePatientData, SexType} from "../../../../../Common/Types/types";
import _ from "lodash";
import {useForm} from "react-hook-form";
import {ApiService} from "../../../../../HTTPService/ApiService";
import {toast} from "react-toastify";


type PatientFormData = { year: number, month: number, day: number, sex: string | number } & Partial<BasePatientData>

const NewPatientModal = () => {

    const {t} = useTranslation()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)


    const [stepIndex, setStepIndex] = useState<number>(1)


    const {watch, reset, handleSubmit, register, getValues, setValue} = useForm<PatientFormData>({
        defaultValues: {
            sexType: SexType.Male,
            name: '',
            phoneCountryCode: '+43',
            phoneNumber: "",
            email: '',
            year: undefined,
            month: undefined,
            day: undefined,
        }
    })

    const steps = [
        {
            "stepIndex": 1,
            "stepName": t('Personal_Details')
        },
        // {
        //     "stepIndex": 2,
        //     "stepName": t('Appoitments')
        // },
    ]


    const stepRenderer = (stepIndex: number) => {
        switch (stepIndex) {
            default:
                return <NewPatientStep1/>
            case 2 :
                return <NewPatientStep2/>
        }
    }

    const isValid = () => {
        if (stepIndex === 1) {
            return !_.isEmpty(watch('name')) && !_.isEmpty(watch('surname')) &&
                (!_.isEmpty(watch('email')) || (!_.isEmpty(watch('phoneCountryCode')) && !_.isEmpty(watch('phoneNumber')))) &&
                (!!watch('year') && !!watch('month') && !!watch('day'))
        }
        return true
    }

    const submitForm = (data: PatientFormData) => {
        setLoading(true)

        const birthday = `${data.year}-${data.month >= 10 ? data.month : `0${data.month}`}-${data.day >= 10 ? data.day : `0${data.day}`}`
        const apiData = {
            sexType: _.toNumber(data.sex),
            name: data.name,
            surname: data.surname,
            birthday: birthday,
            phoneCountryCode: data.phoneCountryCode,
            phoneNumber: data.phoneNumber,
            email: data.email
        }
        ApiService.postPatient(apiData)
            .then(result => {
                dispatch(PatientActions.addOrUpdatePatient(result))
                dispatch(PatientActions.showHideAddPatientModal(false))
                reset()
            })
            .catch(err => {
                if (!_.isEmpty(err.message)) toast.error(err.message)
            })
            .finally(() => setLoading(false))
    }
    console.log('mylog ', getValues())


    return (
        <div
            className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur backdrop-brightness-50">
            <div className="relative my-6 w-3/4 max-w-6xl  max-h-[98vh]">
                <form onSubmit={handleSubmit(submitForm)}
                      className='border-0 rounded-lg  shadow-md relative flex flex-col items-center w-full bg-white outline-none focus:outline-none min-h-[400px] pl-12 pr-6 py-6'>
                    <div className='w-full flex flex-col items-start justify-start gap-y-3'>
                        <div className='flex items-start w-full justify-between'>
                            <div className='flex flex-col justify-start items-start gap-y-1'>
                                <p className='text-lg text-[#23272E]'>
                                    {t('Add_Patient')}
                                </p>
                                <p className='text-[#8B909A] text-sm'>
                                    {t('CREATE_NEW_THERAPIE')}
                                </p>
                            </div>
                            <ThreeDotsIcon className='rotate-90 cursor-pointer'/>
                        </div>


                        <div className='flex flex-col w-full justify-start items-start'>
                            <div className='flex flex-row items-start gap-x-3'>
                                {
                                    steps?.map((step) => (
                                        <div
                                            className={`text-[#8B909A] w-32 pb-4 px-2 text-left text-sm ${stepIndex === step?.stepIndex ? "border-b-2 border-[#01505F] bg-gradient-to-b  from-[#0F60FF]/0 to-[#0F60FF]/5 " : " border-b border-[#DDE2E4]"} `}>
                                            {step?.stepName}
                                        </div>
                                    ))
                                }
                            </div>


                            <div className={'flex flex-col gap-y-4 mt-6 w-full'}>
                                <div className='flex flex-row items-center justify-start gap-x-4'>
                                    <div>
                                        <input
                                            className="peer hidden"
                                            {...register('sex', {required: true, valueAsNumber: true})}
                                            type="radio"
                                            value={_.toNumber(SexType.Male)}
                                            id={`sex-opt-male`}
                                            checked={_.toNumber(watch('sex')) === _.toNumber(SexType.Male)}
                                        />
                                        <label htmlFor={`sex-opt-male`}
                                               className="px-5 text-sm py-2 bg-white cursor-pointer  border border-[#01505F] rounded-[8px] peer-checked:bg-Color1  peer-checked:text-white "
                                        >
                                            {t<string>('Male')}
                                        </label>
                                    </div>


                                    <div>
                                        <input
                                            className="peer hidden"
                                            {...register('sex', {required: true, valueAsNumber: true})}
                                            type="radio"
                                            value={_.toNumber(SexType.Female)}
                                            id={`sex-opt-female`}
                                            checked={_.toNumber(watch('sex')) === _.toNumber(SexType.Female)}
                                        />
                                        <label htmlFor={`sex-opt-female`}
                                               className="px-5 text-sm py-2 bg-white cursor-pointer border border-[#01505F] rounded-[8px] peer-checked:bg-Color1  peer-checked:text-white "
                                        >
                                            {t<string>('Female')}
                                        </label>
                                    </div>

                                </div>
                                <div className='flex flex-col items-start justify-start gap-y-2'>
                                    <p className='text-base text-black'>{t('Name')}:</p>
                                    <div className='flex  gap-y-2 items-start w-3/4 gap-x-6'>
                                        <input
                                            {...register('name', {required: true})}
                                            className='w-full input-login'
                                            placeholder={t('Name') ?? ""}/>
                                        <input
                                            {...register('surname', {required: true})}
                                            className='w-full input-login'
                                            placeholder={t('Surname') ?? ""}/>
                                    </div>
                                </div>

                                <div className='flex flex-col items-start justify-start gap-y-2'>
                                    <p className='text-base text-black'>{t('Date_of_Birth')}:</p>
                                    <div className='grid grid-cols-5 gap-x-2 items-start w-1/2'>
                                        <input type='number'
                                               {...register('year', {required: true, valueAsNumber: true})}
                                               placeholder={t('Year') ?? ""}
                                               min='0'
                                               className='col-span-1 w-full input-login [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'/>
                                        <input type='number'
                                               placeholder={t('Month') ?? ""}
                                               min='0'
                                               {...register('month', {required: true, valueAsNumber: true})}
                                               className='col-span-1 w-full input-login [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'/>
                                        <input type='number'
                                               placeholder={t('Day') ?? ""}
                                               min='0'
                                               {...register('day', {required: true, valueAsNumber: true})}
                                               className='col-span-1 w-full input-login [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'/>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-y-2 items-start w-1/2'>
                                    <p className='text-base text-black'>{t('Email')}:</p>
                                    <input
                                        {...register('email', {required: true})}
                                        className='w-full input-login'
                                        placeholder={t('EMAIL_PLACE') ?? ""}/>
                                </div>


                                <div className='flex flex-col items-start justify-start gap-y-2'>
                                    <p className='text-base text-black'>{t('Phone_Number')}:</p>
                                    <div className='grid grid-cols-5 gap-x-2 items-start w-1/2'>
                                        <input
                                            {...register('phoneCountryCode', {required: true})}
                                            className='col-span-1 w-full input-login'/>
                                        <input
                                            {...register('phoneNumber', {required: true})}
                                            className='col-span-4 w-full input-login'/>
                                    </div>
                                </div>

                                {/*<div className='flex flex-col gap-y-2 items-start w-1/2'>*/}
                                {/*    <input className='w-full input-login'*/}
                                {/*           placeholder={t('AddTherapy') ?? ""}/>*/}
                                {/*</div>*/}
                            </div>


                        </div>
                        <div className='w-full flex items-center justify-between mt-10'>
                            <button
                                onClick={() => dispatch(PatientActions.showHideAddPatientModal(false))}
                                className='px-6 py-1 text-center text-white bg-[#01505F] rounded-[4px]'>
                                {t('Cancel')}
                            </button>

                            <button
                                disabled={!isValid()}
                                type='submit'
                                className='px-6 py-1 text-center text-white bg-[#01505F] rounded-[4px] disabled:bg-gray-500 disabled:cursor-auto'>
                                {t('Submit')}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default NewPatientModal
