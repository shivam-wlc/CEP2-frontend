const convertToUTC = (dateTime) => {
  const dateUTC = new Date(dateTime).toUTCString();
  return dateUTC;
};

// yyyy-mm-dd
function convertUTCDateToLocalDate(utcDate) {
  const date = new Date(utcDate);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1; // Months are zero indexed
  const year = date.getUTCFullYear();

  // Format the date as yyyy-mm-dd
  const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;

  return formattedDate;
}

function convertUTCtoMonthAndYear(utcDate) {
  // const dateString = "2024-04-22T09:03:42.875Z";
  const dateObj = new Date(utcDate);
  const formattedDate = dateObj.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
  return formattedDate;
}

export { convertToUTC, convertUTCDateToLocalDate, convertUTCtoMonthAndYear };
