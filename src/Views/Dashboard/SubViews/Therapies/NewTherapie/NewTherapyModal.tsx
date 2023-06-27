import ThreeDotsIcon from "../../../../../Assets/Icons/SideBar/ThreeDotsIcon";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import React, {useEffect, useRef, useState} from "react";
import {TherapyActions} from "../../../../../Redux/Therapies/actions";
import {DoctorData, TherapyCategories, TherapyData} from "../../../../../Common/Types/types";
import {ApiService} from "../../../../../HTTPService/ApiService";
import {DoctorActions} from "../../../../../Redux/Doctors/actions";
import _ from "lodash";
import {toast} from "react-toastify";
import {useForm} from "react-hook-form";
import {ApplicationState} from "../../../../../Redux";
import LoadingSpinner from "../../../../../Components/LoadingSpinner/LoadingSpinner";
import TrashIcon from "../../../../../Assets/Icons/TrashIcon";


const NewTherapyModal = () => {

    const [loading, setLoading] = useState(false)
    const [stepIndex, setStepIndex] = useState<number>(1)
    const dispatch = useDispatch()
    const {t} = useTranslation()

    const doctors = useSelector<ApplicationState, Array<DoctorData>>(state => state.doctorSection.doctors)
    const [selectedDoctor, setSelectedDoctor] = useState<DoctorData | undefined | null>(undefined)

    const [photos, setPhotos] = useState<string[]>(Array<string>())

    const imageInputRef = useRef<any>(null)

    const {watch, reset, setValue, handleSubmit, register, getValues} = useForm<Partial<TherapyData>>({
        defaultValues: {
            name: '',
            description: '',
            category: '',
            minDuration: '15',
            maxDuration: '30',
        }
    })

    const fetchDoctors = () => {
        ApiService.getDoctors().then()
            .then(data => dispatch(DoctorActions.setDoctors(data)))
            .catch((err: Error) => {
                console.log("err --> ", err)
                console.log("error message ---> ", err.message)
                toast.error("Something Wrong Happened!")
            })
    }

    const handleReset = () => {
        reset()
        setSelectedDoctor(undefined)
    }

    const submitForm = (data: Partial<TherapyData>) => {
        setLoading(true)
        ApiService.postTherapy({
            ...data,
            photos: photos,
            doctorId: selectedDoctor?.id,
        })
            .then(result => {
                dispatch(TherapyActions.addOrUpdateTherapy(result))
                dispatch(TherapyActions.showHideAddTherapieModal(false))
                handleReset()
            })
            .catch(err => {
                if (!_.isEmpty(err.message)) toast.error(err.message)
            })
            .finally(() => setLoading(false))
    }

    const handleUploadPhoto = (file: File | null) => {
        if (!file) return
        setLoading(true)
        ApiService.uploadFilePath(file, null).then(path => {
            if (!!path) {
                setPhotos(photos.concat([path]))
            }
        })
            .catch(err => {
                if (!_.isEmpty(err.message)) toast.error(err.message)
            })
            .finally(() => setLoading(false))
    }

    const handleDeletePhoto = (path: string) => {
        setPhotos(photos.filter(it => it !== path))
    }

    useEffect(() => {
        fetchDoctors()
    }, [])


    const steps = [
        {
            "stepIndex": 1,
            "stepName": t('Details')
        },
        {
            "stepIndex": 2,
            "stepName": t('Duration')
        },
        {
            "stepIndex": 3,
            "stepName": t('Upload')
        },
        // {
        //     "stepIndex": 4,
        //     "stepName": t('Upload')
        // },
        // {
        //     "stepIndex": 5,
        //     "stepName": t('Preview')
        // }
    ]

    console.log('mylog', photos)
    return (
        <div
            className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur backdrop-brightness-50">
            <div className="relative mx-auto my-8 w-3/4 max-w-6xl  max-h-[98vh]">
                <form
                    className='border-0 rounded-lg  shadow-md relative flex flex-col items-center w-full bg-white outline-none focus:outline-none min-h-[400px] pl-12 pr-6 py-6 '>

                    <div className='w-full flex flex-col items-start justify-start gap-y-3'>
                        <div className='flex items-start w-full justify-between'>
                            <div className='flex flex-col justify-start items-start gap-y-1'>
                                <p className='text-lg text-[#23272E]'>
                                    {t('ADD_THERAPIE')}
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

                            <div className={`${stepIndex === 1 ? 'flex flex-col gap-y-4 mt-6 w-full' : 'hidden'}`}>
                                <div className='flex flex-col gap-y-2 items-start w-2/3'>
                                    <p className='text-base text-black'>{t('Name')}</p>
                                    <input
                                        {...register('name', {required: true})}
                                        className='w-full input-login'
                                        placeholder={t('EMAIL_PLACE') ?? ""}/>
                                </div>

                                <div className='flex flex-col gap-y-2 items-start w-2/3'>
                                    <p className='text-base text-black'>{t('Description')}</p>
                                    <textarea
                                        {...register('description', {required: true})}
                                        className='w-full input-login resize-none min-h-[150px]'/>
                                </div>
                                <div className='flex flex-col gap-y-2 items-start w-2/3'>
                                    <p className='text-base text-black'>{t('Category')}</p>
                                    <select
                                        {...register('category', {required: true})}
                                        className='w-full input-login'>
                                        {TherapyCategories.map(item => (
                                            <option value={item}>{item}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>


                            <div className={`${stepIndex === 2 ? 'flex flex-col gap-y-4 mt-6 w-full' : 'hidden'}`}>
                                <div className='flex flex-row items-center gap-x-4 w-1/2'>
                                    <div className='flex flex-col gap-y-2 items-start w-1/4'>
                                        <p className='text-sm text-black'>{t('Min')}</p>
                                        <input
                                            {...register('minDuration', {required: true})}
                                            className='w-full input-login [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                            type='number'/>
                                    </div>
                                    <div className='flex flex-col gap-y-2 items-start w-1/4'>
                                        <p className='text-sm text-black'>{t('Max')}</p>
                                        <input
                                            {...register('maxDuration', {required: true})}
                                            className='w-full input-login [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                            type='number'/>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-y-2 items-start w-2/3'>
                                    <p className='text-base text-black'>{t('Add_Doctor_Team')}</p>
                                    <div className='flex flex-col gap-y-2 items-start w-2/3'>
                                        <select
                                            onChange={(e) => setValue('doctorId', _.toNumber(e.target.value))}
                                            className='w-full input-login'>
                                            {doctors.map((item) => (
                                                <option
                                                    onClick={() => setSelectedDoctor(item)}
                                                    value={item.id}>{item.name ?? ''}</option>
                                            ))}
                                        </select>
                                    </div>

                                </div>
                                {/*<div className='flex flex-col gap-y-2 items-start w-2/3 mt-20'>*/}
                                {/*    <div className='flex items-center gap-x-4'>*/}
                                {/*        <input type='checkbox'*/}
                                {/*               className='bg-[#01505F] bg-opacity-50 outline-none border-none'/>*/}
                                {/*        <p className='text-xs text-[#787486]'>*/}
                                {/*            Arztberief hinzufügen (Upload )*/}
                                {/*        </p>*/}
                                {/*    </div>*/}
                                {/*    <div className='flex items-center gap-x-4'>*/}
                                {/*        <input type='checkbox'*/}
                                {/*               className='bg-[#01505F] bg-opacity-50 outline-none border-none'/>*/}
                                {/*        <p className='text-xs text-[#787486]'>*/}
                                {/*            Noch iregdwas hinzufügen*/}
                                {/*        </p>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>


                            <div
                                className={`${stepIndex === 3 ? 'w-full pt-10 h-full flex flex-col gap-y-3 items-center justify-center' : 'hidden'} `}>
                                <div
                                    className='w-1/2 min-h-[200px] grid grid-cols-3 gap-2 items-center justify-between py-2 px-3 rounded-[10px]'>
                                    {
                                        photos?.map((photo, index) => (
                                                <div key={index}
                                                     className='relative col-span-1 flex flex-col gap-y-2 w-full aspect-video rounded-[4px]'>
                                                    <img src={photo ?? ''}
                                                         className='w-full aspect-video rounded-[4px] object-cover object-center'/>
                                                    <p className='text-xs'>{photo.split('/')?.pop()}</p>
                                                    <TrashIcon
                                                        onClick={() => handleDeletePhoto(photo)}
                                                        className='absolute top-1 right-1 cursor-pointer z-20'/>
                                                </div>
                                            )
                                        )
                                    }
                                    <button
                                        className='col-span-1 text-sm p-2 bg-white cursor-pointer  border border-[#01505F] rounded-[8px] whitespace-nowrap'
                                        onClick={(e) => {
                                            e.preventDefault()
                                            imageInputRef.current?.click()
                                        }}>
                                        {t('Browse_File')}

                                    </button>
                                </div>
                            </div>


                            <div
                                className={`${stepIndex === 4 ? '' : 'hidden'}`}>
                                step4
                            </div>
                            <div
                                className={`${stepIndex === 5 ? '' : 'hidden'}`}>
                                step5
                            </div>


                        </div>
                        <div className='w-full flex items-center justify-between mt-10'>
                            <button
                                onClick={() => {
                                    dispatch(TherapyActions.showHideAddTherapieModal(false))
                                }}
                                className='px-6 py-1 text-center text-white bg-[#01505F] rounded-[4px]'>
                                {t('Cancel')}
                            </button>


                            <div>
                                <button
                                    type={'button'}
                                    onClick={() => setStepIndex(stepIndex + 1)}
                                    disabled={stepIndex > 2}
                                    className={`${stepIndex < 3 ? 'px-6 py-1 text-center text-white bg-[#01505F] rounded-[4px] disabled:cursor-auto disabled:bg-gray-500' : 'hidden'}`}>
                                    {loading && <LoadingSpinner/>} {t('Next')}
                                </button>

                                <button
                                    type='submit'
                                    onClick={handleSubmit(submitForm)}
                                    disabled={stepIndex !== 3}
                                    className={`${stepIndex === 3 ? 'px-6 py-1 flex flex-row text-center text-white bg-[#01505F] rounded-[4px] disabled:cursor-auto disabled:bg-gray-500' : 'hidden'}`}>
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
                               handleUploadPhoto(file)
                           }
                       }}/>

            </div>
        </div>
    )
}
export default NewTherapyModal
