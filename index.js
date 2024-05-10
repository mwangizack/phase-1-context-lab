/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};

const createEmployeeRecord = function (employeeDetails) {
  const employeeObj = {};
  for (let i = 0; i < employeeDetails.length; i++) {
    switch (i) {
      case 0:
        employeeObj.firstName = employeeDetails[i];
        break;
      case 1:
        employeeObj.familyName = employeeDetails[i];
        break;
      case 2:
        employeeObj.title = employeeDetails[i];
        break;
      case 3:
        employeeObj.payPerHour = employeeDetails[i];
        employeeObj.timeInEvents = [];
        employeeObj.timeOutEvents = [];
        break;
    }
  }
  return employeeObj;
};

const createEmployeeRecords = (employeesArrays) => {
  return employeesArrays.map((employeeArray) =>
    createEmployeeRecord(employeeArray)
  );
};

const seperateDateAndTime = (dateTimeStamp) => {
  const dateTimeStampArray = dateTimeStamp.split(" ");
  const date = dateTimeStampArray[0].toString();
  const hour = parseInt(dateTimeStampArray[1].toString());
  return { date: date, hour: hour };
};

const createTimeInEvent = function (dateTimeStamp) {
  this.timeInEvents.push({
    type: "TimeIn",
    hour: seperateDateAndTime(dateTimeStamp).hour,
    date: seperateDateAndTime(dateTimeStamp).date,
  });
  return this;
};

const createTimeOutEvent = function (dateTimeStamp) {
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: seperateDateAndTime(dateTimeStamp).hour,
    date: seperateDateAndTime(dateTimeStamp).date,
  });
  return this;
};

const hoursWorkedOnDate = function (date) {
  let timeIn = 0;
  let timeOut = 0;

  this.timeInEvents.forEach((timeInEvent) => {
    if (timeInEvent.date === date) {
      timeIn = timeInEvent.hour;
    }
  });

  this.timeOutEvents.forEach((timeOutEvent) => {
    if (timeOutEvent.date === date) {
      timeOut = timeOutEvent.hour;
    }
  });

  return (timeOut - timeIn) / 100;
};

const wagesEarnedOnDate = function (date) {
  const hoursWorked = hoursWorkedOnDate.call(this, date);
  return this.payPerHour * hoursWorked;
};

const findEmployeeByFirstName = function (srcArray, firstName) {
  const employeesObjects = createEmployeeRecords(srcArray);
  return employeesObjects.find(employeeObject => employeeObject.firstName === firstName)
};


const calculatePayroll = function (arrayOfEmployeeObjects) {
    const payOwedToAllEmployees = arrayOfEmployeeObjects.reduce(
      (totalPayOwed, employeeObject) => {
        const allWages = allWagesFor.call(employeeObject);
        return totalPayOwed + allWages;
      },
      0
    );
  
    return payOwedToAllEmployees;
  }
