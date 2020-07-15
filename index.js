/* Your Code Here */

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

const createEmployeeRecord = (arr) => {
    let employee = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return employee;
};

const createEmployeeRecords = (arrOfarrs) => {
    return arrOfarrs.map(createRecord);
};

const createTimeInEvent = (dateStamp) => {
    let type = "TimeIn";
    let hour = dateStamp;
    let date = dateStamp.split(" ")[0];
    let punchIn = {
        type,
        hour,
        date
    };

    return createEmployeeRecord.call(this, dateStamp)
};

// TESTING AREA 

let bpRecord, updatedBpRecord, newEvent
bpRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3])
updatedBpRecord = createTimeInEvent.call(bpRecord, "2014-02-28 1400")
newEvent = updatedBpRecord.timeInEvents[0]

console.log(updatedBpRecord)

// ===================================

const createTimeOutEvent = (empRec, dateStamp) => {
    let type = "TimeOut";
    let hour = parseInt(dateStamp.split(" ")[1]);
    let date = dateStamp.split(" ")[0];
    let punchOut = {
        type,
        hour,
        date,
    };
    empRec.timeOutEvents.push(punchOut);
    return empRec;
};

const hoursWorkedOnDate = (empRec, date) => {
    let timeInhour = empRec.timeInEvents.filter(getDate)[0].hour;
    let timeOutHour = empRec.timeOutEvents.filter(getDate)[0].hour;
    let total;

    total = (timeOutHour - timeInhour) / 100;
    return total;

    function getDate(event) {
        if (event.date === date) {
            return event.date;
        }
    }
};

const wagesEarnedOnDate = (empRec, date) => {
    return hoursWorkedOnDate(empRec, date) * empRec.payPerHour;
};

const findEmployeeByFirstName = (srcArray, firstName) => {
    return srcArray.find(emplObj => emplObj.firstName === firstName)
};

const calculatePayroll = (arrOfEmpRecs) => {
    return arrOfEmpRecs.map(getAllWages).reduce(getTotalWage)
};

// ITERATION HELPER METHODS IF CAN BE USED BY OTHER FUNCTIONS

function getTotalWage(wage, total = 0) {
    return wage + total;
} // used by > func calculatePayroll() < and > func allWagesFor() <

function getAllWages(emp) {
    return allWagesFor(emp)
} // used by: calculatePayroll()

function createRecord(arr) {
    return createEmployeeRecord(arr);
} // used by: createEmployeeRecords()