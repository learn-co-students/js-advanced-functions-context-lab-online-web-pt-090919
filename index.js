/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let createEmployeeRecord = function(record) {
    return {
        firstName: record[0],
        familyName: record[1],
        title: record[2],
        payPerHour: record[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(records) {
    return records.map(rec => createEmployeeRecord(rec))
}

let createTimeInEvent = function(dateTime) {
    let [date, hour] = dateTime.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}

let createTimeOutEvent = function(dateTime) {
    let [date, hour] = dateTime.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}

let hoursWorkedOnDate = function(date) {
    let timeIn = this.timeInEvents.find(d => d.date === date)
    let timeOut = this.timeOutEvents.find(d => d.date === date)

    return (timeOut.hour - timeIn.hour) / 100
}

let wagesEarnedOnDate = function(date) {
    return (hoursWorkedOnDate.call(this, date) * this.payPerHour)
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

let findEmployeeByFirstName = function(employees, firstName){
    return employees.find(e => e.firstName === firstName)
}

let calculatePayroll = function(records){
    return records.reduce(function(total, emp) {
        return total + allWagesFor.call(emp)
    }, 0)
}