import moment from 'moment';

export const useAppFormatter = () => {
  const formatDate = (date: string) => {
    return moment(date).format("Do MMM, YYYY");
  };

  const formatAmount = (value: number) => {
    let val = (value / 1).toFixed(2).replace(",", ".");
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return {
    formatDate,
    formatAmount
  };
};
