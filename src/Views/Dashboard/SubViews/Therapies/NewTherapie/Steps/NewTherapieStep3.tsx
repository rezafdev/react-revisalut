import AddDoctorImageIcon from "../../../../../../Assets/Icons/Doctors/AddDoctorImageIcon";
import ImageFileIcon from "../../../../../../Assets/Icons/Doctors/ImageFileIcon";
import DeleteImageIcon from "../../../../../../Assets/Icons/Doctors/DeleteImageIcon";
import {useTranslation} from "react-i18next";

const NewTherapieStep3 = () => {
    const {t} = useTranslation()



    return (
        <div className='w-full pt-10 h-full flex flex-col gap-y-3 items-center justify-center'>
            <div
                className='w-3/4 border h-full py-20 border-dashed border-[#01505F] rounded-[8px] flex flex-col gap-y-3 justify-center items-center'>
                <AddDoctorImageIcon/>
                <p>
                    {t('Browse_Files_to_upload')}
                </p>
            </div>

            <div
                className='w-3/4 flex items-center justify-between bg-[#01505F] bg-opacity-30 py-2 px-3 rounded-[10px]'>
                <ImageFileIcon/>
                <div className='flex items-center gap-x-6'>
                    <p>
                        No File Selected
                    </p>
                    <DeleteImageIcon className='cursor-pointer'/>
                </div>
            </div>
        </div>
    )
}
export default NewTherapieStep3