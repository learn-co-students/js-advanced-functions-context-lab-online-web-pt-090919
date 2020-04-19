/* Your Code Here */

function createEmployeeRecord(args){
  return {
    firstName: args[0],
    familyName: args[1],
    title: args[2],
    payPerHour: args[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(record){
  return record.map(function(args){
    return createEmployeeRecord(args)
  })
}

function createTimeInEvent(employee, dateStamp){
  let [date, hour] = dateStamp.split(" ");
  
  employee.timeInEvent.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date
  })
  return employee
}

function createTimeOutEvent(employee, dateStamp){
  let [date, hour] = dateStamp.split(" ");
  employee.timeOutEvent.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date
  })
  return employee
}

function hoursWorkedOnDate(employee, soughtDate){
  let inEvent = employee.timeInEvent.find(function(e){
    return e.date === soughtDate
  })
  let outEvent = employee.timeOutEvent.find(function(e){
    return e.date === soughtDate
  })
  return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(employee, soughtDate){
  let wage = hoursWorkedOnDate(employee, soughtDate) * employee.payPerHour;
  return parseFloat(wage.toString())
}

function findEmployeeByFirstName(srcArray, firstName){
  return srcArray.find(function(record){
    return record.firstName === firstName
  })
  return undefined
}

function calculatePayroll(record){
  return record.reduce(function(memo, i){
    return memo + wagesEarnedOnDate(i)
  }, 0)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}