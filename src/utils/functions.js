var yymmdd_ref = require("../data/yymmdd_ref.json");

export const convertDataToJson = (data) => {
  const dataToJson = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
  return dataToJson;
}

export const getWeekwiseDates = (fromMonthIndex, toMonthIndex, idx) => {


  var allWeekWiseDays = []; //for the actual tick on x axis and the
  var totWeekWiseDayNums = []; //for mapping x axis
  var pMonthTotDays = 0;

  for(var i = fromMonthIndex ; i <= toMonthIndex ; i++){
      const jsDateFrom = new Date(`2018-0${i+1}-01`)
      const dayFromIndex = jsDateFrom.getDay()
      const totDaysCurrMonth = parseInt(yymmdd_ref.noOfDays[i]);
      const firstWeekend = (7 - dayFromIndex);
      const weekwiseDaysOfMonth = [firstWeekend]; //a week = SUN to SAT
      let weekendCounter = firstWeekend ;
      while((weekendCounter+7) <= totDaysCurrMonth){
        weekendCounter += 7;
        weekwiseDaysOfMonth.push(weekendCounter)
      }
      if(i === toMonthIndex){ //if this is the last month only then add the end of month date
        weekwiseDaysOfMonth.push(totDaysCurrMonth);
      }

      weekwiseDaysOfMonth.map(date => {
        totWeekWiseDayNums.push(date+pMonthTotDays);
      })

      allWeekWiseDays = allWeekWiseDays.concat(weekwiseDaysOfMonth);
      pMonthTotDays += totDaysCurrMonth;
  }
    

    return { "date_for_tick" : allWeekWiseDays, "date_for_x_axis" : totWeekWiseDayNums };




}
