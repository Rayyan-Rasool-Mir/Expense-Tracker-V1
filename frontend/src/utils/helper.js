import moment from "moment";

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (name) => {
    if(!name) return "";

    const words = name.split(" ");
    let initials = "";

    for(let i = 0; i<Math.min(words.length, 2); i++){
        initials += words[i][0];
    }

    return initials.toUpperCase();
}

export const addThousandsSeparator = (num) => {
    if (num == null || isNaN(num)) return "";

    const [integerPart, fractionalPart] = num.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return fractionalPart
        ?`${formattedInteger}.${fractionalPart}`
        : formattedInteger;
};

export const prepareExpenseBarChartData = (data = []) => {
  return [...data]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((item, index) => ({
      month: `${moment(item.date).format("Do MMM")} · ${item.category}`,
      dateLabel: moment(item.date).format("Do MMM"),
      category: item.category,
      amount: Number(item.amount) || 0,
      id: item._id || `${item.date}-${index}`,
    }));
};

// export const prepareIncomeBarChartData = (data = []) => {
//     const sortedData = [...data].sort((a,b) => new Date(a.date) - new Date(b.date))

//     const chartData = sortedData.map((item) => ({
//         month: moment(item?.date).format("Do MMM"),
//         amount: item?.amount,
//         source: item?.source,
//     }));

//     return chartData;
// }

export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return sortedData.map((item, index) => ({
    month: `${moment(item.date).format('Do MMM')} · ${item.source}`,
    dateLabel: moment(item.date).format('Do MMM'),
    amount: Number(item.amount),
    source: item.source,
    category: item.category,
    id: item._id || `${item.date}-${index}`,
  }));
};

// export const prepareExpenseLineChartData = (data = []) => {
//   const sortedData = [...data].sort((a,b) => new Date(a.date) - new Date(b.date));

//   const chartData = sortedData.map((item) => ({
//     month: moment(item?.date).format("Do MMM"),
//     amount: item?.amount,
//     category: item?.category,
//   }))

//   return chartData;
// }

export const prepareExpenseLineChartData = (data = []) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return sortedData.map((item, index) => ({
    month: `${moment(item.date).format("Do MMM")} · ${item.category}`,
    dateLabel: moment(item.date).format("Do MMM"),
    amount: Number(item.amount),
    category: item.category,
    id: item._id || `${item.date}-${index}`,
  }));
};

export const formatINR = (amount) => {
  const value = Number(amount ?? 0);

  if (!Number.isFinite(value)) return "0";

  return value.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  });
};