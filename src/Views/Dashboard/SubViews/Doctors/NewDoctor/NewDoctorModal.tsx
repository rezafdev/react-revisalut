import {useTranslation} from "react-i18next"
import ThreeDotsIcon from "../../../../../Assets/Icons/SideBar/ThreeDotsIcon"
import React, {useRef, useState} from "react"
import {useDispatch} from "react-redux"
import {DoctorActions} from "../../../../../Redux/Doctors/actions"
import {useForm} from "react-hook-form";
import {DoctorData, DoctorType} from "../../../../../Common/Types/types";
import {ApiService} from "../../../../../HTTPService/ApiService";
import _ from "lodash";
import {toast} from "react-toastify";
import LoadingSpinner from "../../../../../Components/LoadingSpinner/LoadingSpinner";
import AddDoctorImageIcon from "../../../../../Assets/Icons/Doctors/AddDoctorImageIcon";
import ImageFileIcon from "../../../../../Assets/Icons/Doctors/ImageFileIcon";
import DeleteImageIcon from "../../../../../Assets/Icons/Doctors/DeleteImageIcon";

const NewDoctorModal = () => {

    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const {t} = useTranslation()
    const [stepIndex, setStepIndex] = useState<number>(1)
    const [uploading, setUploading] = useState(false)
    const [selectedAvatar, setSelectedAvatar] = useState<any>()


    const imageInputRef = useRef<any>(null)

    const {watch, reset, handleSubmit, register, getValues, setValue} = useForm<Partial<DoctorData>>({
        defaultValues: {
            type: DoctorType.Doctor,
            name: '',
            bio: '',
            skill_mental: false,
            skill_beauty: false,
            skill_blood: false
        }
    })

    const steps = [
        {
            "stepIndex": 1,
            "stepName": t('Personal_Details')
        },
        {
            "stepIndex": 2,
            "stepName": t('Upload_Picture')
        }
    ]


    const handleImageFileSelected = (file: File) => {
        setUploading(true)
        ApiService.uploadFilePath(file).then(path => {
            setValue('avatarUrl', path ?? null)
        })
            .catch(() => {
            })
            .finally(() => setUploading(false))
    }

    const handleDeleteImageFile = () => {
        setValue('avatarUrl', null)
        setSelectedAvatar(undefined)
    }

    const submitForm = (data: Partial<DoctorData>) => {
        setLoading(true)
        console.log('submitForm --> values: ' , getValues())
        // const apiData = {
        //     type: data.isDoctor ? DoctorType.Doctor : DoctorType.Nurse,
        //     ..._.omit(data, 'isDoctor'),
        // }

        ApiService.postDoctor(data)
            .then(result => {
                dispatch(DoctorActions.addOrUpdateDoctor(result))
                dispatch(DoctorActions.showHideAddDoctorModal(false))
                reset()
            })
            .catch(err => {
                if (!_.isEmpty(err.message)) toast.error(err.message)
            })
            .finally(() => setLoading(false))
    }


    const isValid = () => {
        if (stepIndex === 1)
            return !_.isEmpty(watch('name')) && !_.isEmpty(watch('bio'))
                && (!!watch('skill_mental') || !!watch('skill_blood') || !!watch('skill_beauty'))
        else if (stepIndex === 2)
            return !!(watch('avatarUrl'))
        return true
    }

    console.log('mylog -->',getValues())

    return (
        <div
            className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur backdrop-brightness-50">
            <div className="relative my-6 w-3/4 max-w-6xl  max-h-[98vh]">
                <form
                    className='border-0 rounded-lg  shadow-md relative flex flex-col items-center w-full bg-white outline-none focus:outline-none min-h-[400px] pl-12 pr-6 py-6'>
                    <div className='w-full flex flex-col items-start justify-start gap-y-3'>
                        <div className='flex items-start w-full justify-between'>
                            <div className='flex flex-col justify-start items-start gap-y-1'>
                                <span className='text-lg text-[#23272E]'>
                                    {t('Add_Doctor')}
                                </span>
                                <span className='text-[#8B909A] text-sm'>
                                    {t('CREATE_NEW_THERAPIE')}
                                </span>
                            </div>
                            <ThreeDotsIcon className='rotate-90 cursor-pointer'/>
                        </div>

                        <div className='flex flex-col w-full justify-start items-start'>
                            <div className='flex flex-row items-start gap-x-3'>
                                {
                                    steps?.map((step) => (
                                        <div
                                            className={`text-[#8B909A] pb-4 px-2 text-sm ${stepIndex === step?.stepIndex ? "border-b-2 border-[#01505F] bg-gradient-to-b  from-[#0F60FF]/0 to-[#0F60FF]/5 " : "border-b border-[#DDE2E4]"} `}>
                                            {step?.stepName}
                                        </div>
                                    ))
                                }
                            </div>

                            <div className={`${stepIndex === 1 ? 'flex flex-col gap-y-4 mt-6 w-full' : 'hidden'} `}>
                                <div className='flex flex-row items-center justify-start gap-x-4'>
                                    <div className='flex flex-row gap-x-4'>

                                        <div>
                                            <input
                                                className="peer hidden"
                                                {...register('type', {valueAsNumber: true})}
                                                type="radio"
                                                value={DoctorType.Doctor}
                                                id={`type-opt-doctor`}
                                                checked={_.toNumber(watch('type')) === _.toNumber(DoctorType.Doctor)}
                                            />
                                            <label htmlFor={`type-opt-doctor`}
                                                   className="px-5 text-sm py-2 bg-white cursor-pointer  border border-[#01505F] rounded-[8px] peer-checked:bg-Color1  peer-checked:text-white "
                                            >
                                                {t<string>('Doctor')}
                                            </label>
                                        </div>

                                        <div>
                                            <input
                                                className="peer hidden"
                                                {...register('type', {valueAsNumber: true})}
                                                type="radio"
                                                value={DoctorType.Nurse}
                                                id={`type-opt-nurse`}
                                                checked={_.toNumber(watch('type')) === _.toNumber(DoctorType.Nurse)}
                                            />
                                            <label htmlFor={`type-opt-nurse`}
                                                   className="px-5 text-sm py-2 bg-white cursor-pointer border border-[#01505F] rounded-[8px] peer-checked:bg-Color1  peer-checked:text-white"
                                            >
                                                {t<string>('Nurse')}
                                            </label>
                                        </div>

                                    </div>


                                </div>
                                <div className='flex flex-col gap-y-2 items-start w-1/2'>
                                    <p className='text-base text-black'>{t('Doctor_Name')}</p>
                                    <input
                                        {...register('name', {required: true})}
                                        className='w-full input-login'
                                        placeholder={t('NAME_PLACE') ?? ""}/>
                                </div>

                                <div className='flex flex-col gap-y-2 items-start w-1/2'>
                                    <p className='text-base text-black'>{t('Doctor_Bio')}</p>
                                    <textarea
                                        {...register('bio')}
                                        className='w-full input-login resize-none'
                                        placeholder={t('EMAIL_PLACE') ?? ""}/>
                                </div>

                                <div className='flex flex-col gap-y-2 items-start w-1/2'>
                                    <p className='text-base text-black'>{t('Add_Skill')}</p>
                                    <div className='flex flex-row items-center justify-start gap-x-4'>
                                        <div>
                                            <input
                                                className="peer hidden"
                                                {...register('skill_mental', {valueAsNumber: true})}
                                                type="checkbox"
                                                checked={!!watch('skill_mental')}
                                                id='mental'
                                            />
                                            <label htmlFor='mental'
                                                   className="px-5 text-sm text-gray-400 py-2 bg-white border border-[#01505F] rounded-[8px] peer-checked:bg-Color1  peer-checked:text-white">
                                                {t('Mental')}
                                            </label>

                                        </div>

                                        <div>
                                            <input
                                                className="peer hidden"
                                                {...register('skill_blood', {valueAsNumber: true})}
                                                type="checkbox"
                                                checked={!!watch('skill_blood')}
                                                id='blood'
                                            />
                                            <label htmlFor='blood'
                                                   className="px-5 text-sm text-gray-400 py-2 bg-white border border-[#01505F] rounded-[8px] peer-checked:bg-Color1  peer-checked:text-white">
                                                {t('Blood')}
                                            </label>
                                        </div>

                                        <div>
                                            <input
                                                className="peer hidden"
                                                {...register('skill_beauty', {valueAsNumber: true})}
                                                type="checkbox"
                                                checked={!!watch('skill_beauty')}
                                                id='beauty'
                                            />
                                            <label htmlFor='beauty'
                                                   className="px-5 text-sm text-gray-400 py-2 bg-white border border-[#01505F] rounded-[8px] peer-checked:bg-Color1  peer-checked:text-white">
                                                {t('Beauty')}
                                            </label>
                                        </div>

                                    </div>
                                </div>
                            </div>


                            <div
                                className={`${stepIndex === 2 ? 'w-full pt-10 h-full flex flex-col gap-y-3 items-center justify-center' : 'hidden'} `}>
                                <div
                                    onClick={() => {
                                        imageInputRef.current?.click()
                                    }}
                                    className='relative w-1/2 aspect-square border h-full py-20 border-dashed border-[#01505F] rounded-[8px] flex flex-col gap-y-3 justify-center items-center'>
                                    <AddDoctorImageIcon/>
                                    <img
                                        src={selectedAvatar}
                                        onError={({currentTarget}) => currentTarget.src = ''}
                                        className="absolute top-0 right-0 left-0 bottom-0 w-full h-full z-20 rounded-[8px] outline-none object-cover"
                                        alt=""/>
                                    <p>
                                        {t('Browse_Files_to_upload')}
                                    </p>
                                </div>

                                <div
                                    className='w-1/2 flex items-center justify-between bg-[#01505F] bg-opacity-30 py-2 px-3 rounded-[10px]'>
                                    <ImageFileIcon/>
                                    <div className='flex items-center gap-x-6'>
                                        <p className='text-xs text-gray-500 truncate'>
                                            {watch("avatarUrl")?.split('/')?.pop() ?? 'No File Selected!'}
                                        </p>
                                        <span onClick={handleDeleteImageFile}>
                                            <DeleteImageIcon className='cursor-pointer'/>
                                        </span>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className='w-full flex items-center justify-between mt-10'>
                            <button
                                onClick={() => {
                                    dispatch(DoctorActions.showHideAddDoctorModal(false))
                                }}
                                className='px-6 py-1 text-center text-white bg-[#01505F] rounded-[4px]'>
                                {t('Cancel')}
                            </button>

                            <div>
                                <button
                                    type={'button'}
                                    onClick={() => setStepIndex(2)}
                                    disabled={stepIndex !== 1 || !isValid()}
                                    className={`${stepIndex === 1 ? 'px-6 py-1 text-center text-white bg-[#01505F] rounded-[4px] disabled:cursor-auto disabled:bg-gray-500' : 'hidden'}`}>
                                    {loading && <LoadingSpinner/>} {t('Next')}
                                </button>

                                <button
                                    onClick={handleSubmit(submitForm)}
                                    disabled={stepIndex !== 2 || !isValid()}
                                    className={`${stepIndex === 2 ? 'px-6 py-1 flex flex-row text-center text-white bg-[#01505F] rounded-[4px] disabled:cursor-auto disabled:bg-gray-500' : 'hidden'}`}>
                                    {loading && <LoadingSpinner/>} {t('Submit')}
                                </button>
                            </div>
                        </div>

                    </div>

                </form>

                <input id="ArticleImageUpload" type="file" accept="image/*" className="hidden"
                       ref={imageInputRef}
                       onChange={e => {
                           const file = _.head(e.target.files)
                           if (file) {
                               handleImageFileSelected(file)
                               setSelectedAvatar(URL.createObjectURL(file))
                           }
                       }}/>
            </div>
        </div>
    )
}

export default NewDoctorModal
