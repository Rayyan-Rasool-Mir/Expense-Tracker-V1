import React from 'react';
import DashboardLayout from '../../Components/layouts/DashboardLayout'

const Home = () => {
  useUserAuth();
  return(
    <DashboardLayout activeMenu = "Dashboard">
      <div className="my-5x mx-auto">

      </div>

    </DashboardLayout>
  )
};

export default Home;