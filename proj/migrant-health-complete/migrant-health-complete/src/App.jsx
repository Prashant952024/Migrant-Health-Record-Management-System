import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import HospitalDashboard from "./pages/HospitalDashboard";
import RegisterMigrant from "./pages/RegisterMigrant";
import RegistrationSuccess from "./pages/RegistrationSuccess";
import UpdateRecords from "./pages/UpdateRecords";
import PatientProfileUpdate from "./pages/PatientProfileUpdate";
import ViewPastRecords from "./pages/ViewPastRecords";
import PatientRecordDetails from "./pages/PatientRecordDetails";
import PatientDashboard from "./pages/PatientDashboard";
import PatientLogin from "./pages/PatientLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import DoctorLogin from "./pages/DoctorLogin";
import DoctorDashboard from "./pages/DoctorDashboard";
import HospitalLogin from "./pages/HospitalLogin";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App(){
  return (
    <div className="min-h-screen">
      <Routes>
        {/* All pages - navbar/footer handled individually by each component */}
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/hospital" element={<HospitalDashboard />} />
        <Route path="/hospital/register" element={<RegisterMigrant />} />
        <Route path="/registration-success" element={<RegistrationSuccess />} />
        <Route path="/hospital/update" element={<UpdateRecords />} />
        <Route path="/hospital/patient-profile-update" element={<PatientProfileUpdate />} />
        <Route path="/hospital/view" element={<ViewPastRecords />} />
        <Route path="/patient-records/:uhid" element={<PatientRecordDetails />} />
        <Route path="/patient/login" element={<PatientLogin />} />
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/patient" element={<PatientDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/doctor/login" element={<DoctorLogin />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/hospital/login" element={<HospitalLogin />} />
      </Routes>
    </div>
  );
}
