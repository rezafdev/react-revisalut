import {Outlet} from "react-router-dom";
import SideBar from "../../Components/Sidebar/SideBar";

const DashboardLayout = () => {
    return (
        <div className='w-full h-screen grid grid-cols-12'>
            <SideBar/>
            <div id="right-side"
                 className='col-span-10 bg-[#FAFAFA]  min-h-screen overflow-y-scroll scrollbar-hide items-center  flex flex-col '>
                <div className='w-full max-w-[90rem] pb-14'>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}
export default DashboardLayout
