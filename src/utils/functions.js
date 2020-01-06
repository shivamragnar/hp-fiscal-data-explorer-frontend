var yymmdd_ref = require("../data/yymmdd_ref.json");
var scsr_offset = require("../data/scsr_offset.json");

//1
export const convertDataToJson = (data) => {
  const dataToJson = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
  return dataToJson;
}

//2
export const getWeekwiseDates = ( dateFrom, fromMonthIndex, toMonthIndex, fromYearIndex) => {
  
  //dealing with the case where toMonthIndex falls in the next year
  const toMonthIndexAddOn = toMonthIndex < fromMonthIndex ? 12 : 0;
  var allWeekWiseDays = []; //for the actual tick on x axis and the
  var totWeekWiseDayNums = []; //for mapping x axis
  var pMonthTotDays = 0;
  const { months , years, years_short } = yymmdd_ref;



  for(var i = fromMonthIndex ; i <= toMonthIndex + toMonthIndexAddOn ; i++){

      const iMod = i%12;
      const jsDateFrom = new Date(years[Math.floor(((i%fromMonthIndex)+fromMonthIndex)/12) + fromYearIndex]+`-0${iMod+1}-`+dateFrom.split('-')[2]);
      const dayFromIndex = jsDateFrom.getDay();
      const totDaysCurrMonth = parseInt(yymmdd_ref.noOfDays[iMod]);
      const firstWeekend = (7 - dayFromIndex);
      const weekwiseDaysOfMonth = [firstWeekend]; //a week = SUN to SAT
      let weekendCounter = firstWeekend ;
      while((weekendCounter+7) <= totDaysCurrMonth){
        weekendCounter += 7;
        weekwiseDaysOfMonth.push(weekendCounter)
      }
      if(iMod === toMonthIndex){ //if this is the last month only then add the end of month date
        weekwiseDaysOfMonth.push(totDaysCurrMonth);
      }

      weekwiseDaysOfMonth.map(date => {
        totWeekWiseDayNums.push(date+pMonthTotDays);
      })

      const weekwiseDatesOfMonth = weekwiseDaysOfMonth.map(day => {
        return day + " " + months[((i%fromMonthIndex)+fromMonthIndex)%12] + " " + years_short[Math.floor(((i%fromMonthIndex)+fromMonthIndex)/12) + fromYearIndex];
      })

      allWeekWiseDays = allWeekWiseDays.concat(weekwiseDatesOfMonth);
      pMonthTotDays += totDaysCurrMonth;
  }
    return { "date_for_tick" : allWeekWiseDays, "date_for_x_axis" : totWeekWiseDayNums };
}

//3
export const calcMonthOrWeek = (dateFrom, dateTo) => {
  var dateFromTime = new Date(dateFrom).getTime();
  var dateToTime = new Date(dateTo).getTime();
  var daysDiff = ((dateToTime - dateFromTime) / (1000 * 3600 * 24)) + 2; //this calcs every day BETWEEN the given 2 dates. So add '2' to correct this
  const month_week = daysDiff > 125 ? "month" : "week"; //give month-wise breakdown if range > 125 days
  return month_week;
}

//4
export const calcScsrOffset = (tempVizData) => {
  const noOfDataRecords = tempVizData.length;
  return scsr_offset.xOffset[noOfDataRecords - 1];
}

//5
export const getDynamicYLabelFormat = (y) => (
  y > 99999 ?
  (y/100000) + " L INR" :
  (y > 999 && y < 99999) ?
  (y/1000) + " K INR" :
  y + " INR"
)

//6
export const onDateRangeChange = ( newDateRange ) => { //the month number-range is coming in as 1 - 12
  const { year : fromYear, month : fromMonth } = newDateRange.from;
  const { year : toYear, month : toMonth } = newDateRange.to;

  const dateFrom = fromYear.toString()+ "-" + ( fromMonth < 10 ? "0" : "") + fromMonth.toString() + "-01" ;
  const dateTo = toYear.toString() + "-" + //YY
           ( toMonth < 10 ? "0" : "") + toMonth.toString() + "-" + //MM
           ( toMonth !== 2 ? //dealing with day count of feb and leap year
             yymmdd_ref.noOfDays[toMonth-1] :
             yymmdd_ref.noOfDays[toMonth-1].split('_')[ (toYear%4 === 0 ? 1 : 0)] ) ; //DD

   return [dateFrom, dateTo];
}

//7
export const recursFilterFetch = (allFiltersData, obj, idx) => {
  Object.keys(obj).map(obj_key => {
    if(obj[obj_key]){
      if(allFiltersData[idx].val.some(item => item.id === obj_key) !== true){
        const filterOption = {
          filter_name: allFiltersData[idx].key,
          id: obj_key,
          label: obj_key
        }
        allFiltersData[idx].val.push(filterOption);
      }
      recursFilterFetch(allFiltersData, obj[obj_key], idx+1);
    }
  });
}

export const recursFilterFind = (obj, query, results, idx, filterOrderRef, activeFilters) => {

  Object.keys(obj).map(obj_key => {
    if(obj[obj_key]){
      if(obj_key === query){
        results.push(obj[query]);
      }

      if(activeFilters.filters.hasOwnProperty(filterOrderRef[idx]) === true ){
        if(activeFilters.filters[filterOrderRef[idx]] === obj_key.split("-")[0]){
          recursFilterFind(obj[obj_key], query, results, idx+1, filterOrderRef, activeFilters);
        }
      }else{
        recursFilterFind(obj[obj_key], query, results, idx+1, filterOrderRef, activeFilters);
      }

    }
  });
}
