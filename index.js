/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let createEmployeeRecord = function (metric) {
    return {
        firstName: metric[0],
        familyName: metric[1],
        title: metric[2], 
        payPerHour: metric[3],
        timeInEvents: [],
        timeOutEvents: []
    };
};

let createEmployeeRecords = function () {
    return this.map(
        metric => createEmployeeRecord(metric)
    );
};

let createTimeEvent = function(time, eventType) {
    const dateHour = time.split(" ");
    const timeEvent = {
        type: `Time${eventType}`,
        date: dateHour[0],
        hour: parseInt(dateHour[1])
    };
    this[`time${eventType}Events`].push(timeEvent);
    return this;
}

let createTimeInEvent = function(time) {
    return createTimeEvent.call(this, time, "In");
};

let createTimeOutEvent = function(time) {
    return createTimeEvent.call(this, time, "Out");
};

function hoursWorkedOnDate(day) {
    let timeIn = this.timeInEvents.find(record => record.date === day).hour;
    let timeOut = this.timeOutEvents.find(record => record.date === day).hour;
    return (timeOut-timeIn)/100;
};

let wagesEarnedOnDate = function(day) {
    return this.hoursWorkedOnDate.(day)*this.payPerHour;
};

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
};

let calculatePayroll = function(employees) {
    const reducer = (accumulator, currentValue) => accumulator + allWagesFor.call(currentValue);
    return employees.reduce(reducer, 0);
};

let findEmployeeByFirstName = function(employees, name) {
    return employees.find(emp => emp.firstName === name);
};