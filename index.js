/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const createEmployeeRecord = function(array){
    let employee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
    return employee
}

let createEmployeeRecords = function(data) {
    return data.map(info => createEmployeeRecord(info))
}

let createTimeInEvent = function(dateTime){
    let [date, hour] = dateTime.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return this
}

let createTimeOutEvent = function(dateTime){
    let [date, hour] = dateTime.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return this
}
    
let hoursWorkedOnDate = function(dateMatch){
    let timeIn = this.timeInEvents.find(element => element.date === dateMatch)
    let timeOut = this.timeOutEvents.find(element => element.date === dateMatch)
    return (timeOut.hour - timeIn.hour) / 100
}

let wagesEarnedOnDate = function(dates) {
   return (hoursWorkedOnDate.call(this, dates) * this.payPerHour)
}
let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let calculatePayroll = function(record) {
    return record.reduce(function(amount, employee) {
        return amount + allWagesFor.call(employee)
    }, 0)
}

let findEmployeeByFirstName = function(employees, firstNameString) {
    return employees.find(employee => employee.firstName === firstNameString )
}