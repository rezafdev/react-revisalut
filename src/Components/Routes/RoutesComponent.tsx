import {Route, Routes} from "react-router-dom";
import Login from "../../Views/Login/Login";
import ResetPassword from "../../Views/Login/ResetPassword";
import DashboardLayout from "../../Views/Dashboard/DashboardLayout";
import Dashboard from "../../Views/Dashboard/SubViews/Dashboard/Dashboard";
import Therapies from "../../Views/Dashboard/SubViews/Therapies/Therapies";
import Doctors from "../../Views/Dashboard/SubViews/Doctors/Doctors";
import Patients from "../../Views/Dashboard/SubViews/Patients/Patients";
import Calender from "../../Views/Dashboard/SubViews/Calender/Calender";
import Statistics from "../../Views/Dashboard/SubViews/Statistics/Statistics";
import Settings from "../../Views/Dashboard/SubViews/Settings/Settings";

const RoutesComponent = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={<DashboardLayout/>}
            />

            <Route path='/login' element={<Login/>}/>
            <Route path='/reset-password' element={<ResetPassword/>}/>
            <Route path='/' element={<DashboardLayout/>}>
                <Route path="dashboard" element={<Dashboard/>}/>
                <Route path="patients" element={<Patients/>}/>
                <Route path="therapies" element={<Therapies/>}/>
                <Route path="doctors" element={<Doctors/>}/>
                <Route path="calender" element={<Calender/>}/>
                <Route path="statistics" element={<Statistics/>}/>
                <Route path="settings" element={<Settings/>}/>


            </Route>
        </Routes>
    )
}

export default RoutesComponent