import React, { useEffect, useState } from 'react';
import DashboardLayout from "../../Components/layouts/DashboardLayout"
import IncomeOverview from "../../Components/Income/IncomeOverview"
import AddIncomeForm from "../../Components/Income/AddIncomeForm"
import axiosInstance from '../../utils/axiosInstance';
import Modal from '../../Components/Modal';
import { API_PATHS } from '../../utils/apiPaths';

const Income = () => {

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  //getting all income detail
  const fetchIncomeDetails = async () => {
    if(loading) return;

    setLoading(true);

    try{
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );
      if(response.data){
        setIncomeData(response.data);
      }
    }catch(error){
      console.log("Something went wrong. Please try again", error)
    } finally {
      setLoading(false);
    }

  };

  //handle add income
  const handleAddIncome = async(income) => {};
  
  //deleting income
  const deleteIncome = async(id) => {};

  //download income details
  const handleDownloadIncomeDetails = async() => {};

  useEffect(() => {
    fetchIncomeDetails();
    
    return () => {};
  }, []);


  return(
    <DashboardLayout activeMenu="Income">
      <div className="my-5x mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className=''>
            <IncomeOverview
              transactions = {incomeData}
              onAddIncome = {() => setOpenAddIncomeModal(true)}
            />
          </div>
        </div>

        <Modal
          isOpen = {openAddIncomeModal}
          onClose ={  () => setOpenAddIncomeModal(false)}
          title = "Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome}/>
        </Modal>

      </div>
    </DashboardLayout>
  )
};

export default Income;