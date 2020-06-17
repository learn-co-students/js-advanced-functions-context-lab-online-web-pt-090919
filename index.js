/* Your Code Here */ 
function createEmployeeRecord(array) {
    var employee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
      };
    return employee  
}

function createEmployeeRecords(array) {
    return array.map(e => createEmployeeRecord(e))
}

function createTimeInEvent(time) {
    var thing = {
        type: "TimeIn",
        hour: Number(time.split(" ")[1]),
        date: time.split(" ")[0]
    }
    this.timeInEvents.push(thing)
    return this
}

function createTimeOutEvent(time) {
    var thing = {
        type: "TimeOut",
        hour: Number(time.split(" ")[1]),
        date: time.split(" ")[0]
    }
    this.timeOutEvents.push(thing)
    return this
}

function hoursWorkedOnDate(date) {
    var i
    for (i = 0; i < this.timeOutEvents.length; i++) {
        if (this.timeOutEvents[i].date == date) {
            var a = this.timeOutEvents[i].hour
            var b = this.timeInEvents[i].hour
            var c = (a - b) / 100
            return c
        }
      }
}

function wagesEarnedOnDate(date) {
    var amount = hoursWorkedOnDate.call(this, date) * this.payPerHour
    return amount
}

function findEmployeeByFirstName(employees, name) {
    for (var i=0; i < employees.length; i++) {
        if (employees[i].firstName === name) {
            return employees[i];
        }
    }
}

function calculatePayroll(employees) {
    var payarray = employees.map(x => allWagesFor.call(x))
    var payroll = payarray.reduce(function(a, b){
        return a + b;
    }, 0);
    return payroll
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