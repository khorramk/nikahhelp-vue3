export function formatDate(param) {
  var d = new Date(param);
  var date = d.getDate();
  var month = d.getMonth() + 1; //Months are zero based
  var year = d.getFullYear();
  var result = date + "/" + month + "/" + year;
  return result;
}

export function getAge(dateString) {
  console.log(dateString);
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  console.log(m);
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
export function dateFromDateTime(dateTime) {
  if (dateTime) {
    const date = dateTime.split(" ");
    return formatDate(date[0]);
  } else return "N/A";
}

export function dateFromTimeStamp(dateTime) {
  const date = dateTime.split("T");
  return formatDate(date[0]);
}
