const Income = require("../models/Income");
const Expense = require("../models/Expense");

const { isValidObjectId, Types } = require("mongoose");

//add expense

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    //fetching all the incomes & expenses
    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    console.log("totalIncome", {
      totalIncome,
      userId: isValidObjectId(userId),
    });

    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    //getting all the income transactions in the past 60 days
    const last60daysIncomeTransactions = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    //getting total income for the last 60 days
    const incomeLast60Days = last60daysIncomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0,
    );

    //getting expense transactions for the past 30 days

    const last30DaysExpenseTransactions = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({date:-1});
    
    //get total expenses for last 30days
    const expensesLast30Days = last30DaysExpenseTransactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
    );

    //fetching the last 5 transactions either income or expense
    const lastTransactions = [
        ...(await Income.find({userId}).sort({date: -1}).limit(5)).map(
            (txn) => ({
                ...txn.toObject(),
                type: "income",
            })
        ),
        ...(await Expense.find({userId}).sort({date: -1}).limit(5)).map(
            (txn) => ({
                ...txn.toObject(),
                type: "expense",

            })
        ),
    ].sort((a,b) => b.date - a.date); //sorting the latest first

    //final response
    res.json({
        totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
        totalIncome: totalIncome[0]?.total || 0,
        totalExpense: totalExpense[0]?.total || 0,
        last30DaysExpenses:{
            total: expensesLast30Days,
            transactions: last30DaysExpenseTransactions,
        },
        last60DaysIncome:{
            total: incomeLast60Days,
            transactions: last60daysIncomeTransactions,
        },
        recentTransactions: lastTransactions,
    });
  } catch (error) {
    res.status(500).json({message: "Server error", error});
  }
  
};
