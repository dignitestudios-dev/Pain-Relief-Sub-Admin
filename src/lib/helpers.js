// All the helper functions should must be there.
// The functions that you're using multiple times must be there.
// e.g. formatDateToMMDDYYYY, formatEpochToMMDDYYYY, etc.
import moment from "moment/moment";


export const getLongDateFormat = (date) => {
  return moment(date).format("MMMM D, YYYY");
};
