import React, { useEffect, useState } from 'react';
import DashboardLayout from "../../Components/layouts/DashboardLayout"
import IncomeOverview from "../../Components/Income/IncomeOverview"
import AddIncomeForm from "../../Components/Income/AddIncomeForm"
import axiosInstance from '../../utils/axiosInstance';
import IncomeList from '../../Components/Income/IncomeList';
import DeleteAlert from '../../Components/DeleteAlert';
import Modal from '../../Components/Modal';
import { API_PATHS } from '../../utils/apiPaths';
import toast  from 'react-hot-toast';

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
  const handleAddIncome = async(income) => {
    const {source, amount, date, icon} = income;

    //validation check
    if(!source.trim()){
      toast.error("Source is required");
      return;
    }

    if(!amount || isNaN(amount) || Number(amount) <= 0){
      toast.error("Amount should be a greater than 0");
      return;
    }

    if(!date){
      toast.error("Date is required");
      return;
    }

    try{
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME,{
        source,
        amount,
        date,
        icon,
      });
      setOpenAddIncomeModal(false);
      toast.success("Income added successfully");
      fetchIncomeDetails();
    }catch(error){
      console.error(
        "Error adding income: ",
        error.response?.data?.message || error.message
      );
    }
  };
  
  //deleting income
  const deleteIncome = async(id) => {
    try{
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));

      setOpenDeleteAlert({show: false, data: null});

      toast.success("Income details deleted successfully");
      fetchIncomeDetails();
    }catch(error){
      console.error("Error deleting income: ", error.response?.data?.message || error.message)
    }
  };

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
          <IncomeList
            transactions = {incomeData}
            onDelete = {(id) => {
              setOpenDeleteAlert({show: true, data: id});
            }}
            onDownload = {handleDownloadIncomeDetails}
          />
        </div>

        <Modal
          isOpen = {openAddIncomeModal}
          onClose ={  () => setOpenAddIncomeModal(false)}
          title = "Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome}/>
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({show: false, data: null})}
          title = "Delete Income"
        >
          <DeleteAlert
            content = "Are you sure you want to delete this income detail?"
            onDelete = {() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>

      </div>
    </DashboardLayout>
  )
};

export default Income;