import React, { useState } from "react";
import DashboardLayout from "../../Components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  useUserAuth();
  
  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5x mx-auto"></div>
    </DashboardLayout>
  );
};

export default Home;
