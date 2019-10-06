import React, {
  Component
} from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack, VictoryGroup, VictoryLabel } from 'victory';
import FBarChart from '../../datavizcomps/FBarChart';
import FTimeSeries from '../../datavizcomps/FTimeSeries';

const sampleDataBar = [
  {month: "Jan", sanction: 3000, revised: 2500},
  {month: "Feb", sanction: 3000, revised: 2500},
  {month: "Mar", sanction: 3000, revised: 2500},
  {month: "Apr", sanction: 3000, revised: 2500},
  {month: "May", sanction: 3000, revised: 2500},
  {month: "Jun", sanction: 3000, revised: 2500},
  {month: "Jul", sanction: 3000, revised: 2500},
  {month: "Aug", sanction: 3000, revised: 2500},
  {month: "Sep", sanction: 3000, revised: 2500},
  {month: "Oct", sanction: 3000, revised: 2500},
  {month: "Nov", sanction: 3000, revised: 2500},
  {month: "Dec", sanction: 3000, revised: 2500}
]

const sampleDataTime = [
  {
    day: "1",
    sanction: getRandomInt(1000,3000),
    addition: getRandomInt(1000,3000),
    saving: getRandomInt(1000,3000),
    revised: getRandomInt(1000,3000),
  },
  {
    day: "2",
    sanction: getRandomInt(1000,3000),
    addition: getRandomInt(1000,3000),
    saving: getRandomInt(1000,3000),
    revised: getRandomInt(1000,3000),
  },
  {
    day: "3",
    sanction: getRandomInt(1000,3000),
    addition: getRandomInt(1000,3000),
    saving: getRandomInt(1000,3000),
    revised: getRandomInt(1000,3000),
  },
  {
    day: "4",
    sanction: getRandomInt(1000,3000),
    addition: getRandomInt(1000,3000),
    saving: getRandomInt(1000,3000),
    revised: getRandomInt(1000,3000),
  },
  {
    day: "5",
    sanction: getRandomInt(1000,3000),
    addition: getRandomInt(1000,3000),
    saving: getRandomInt(1000,3000),
    revised: getRandomInt(1000,3000),
  },
  {
    day: "6",
    sanction: getRandomInt(1000,3000),
    addition: getRandomInt(1000,3000),
    saving: getRandomInt(1000,3000),
    revised: getRandomInt(1000,3000),
  },
  {
    day: "7",
    sanction: getRandomInt(1000,3000),
    addition: getRandomInt(1000,3000),
    saving: getRandomInt(1000,3000),
    revised: getRandomInt(1000,3000),
  },
  {
    day: "8",
    sanction: getRandomInt(1000,3000),
    addition: getRandomInt(1000,3000),
    saving: getRandomInt(1000,3000),
    revised: getRandomInt(1000,3000),
  },
  {
    day: "9",
    sanction: getRandomInt(1000,3000),
    addition: getRandomInt(1000,3000),
    saving: getRandomInt(1000,3000),
    revised: getRandomInt(1000,3000),
  },
]

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}


class ExpDetails extends Component {


  render() {



    return (
      <div>
        <div className="bx--grid">
          <div className="bx--row">
            <div className="left-col bx--col-lg-2">
              <h3>Filter col</h3>
            </div>
            <div className="right-col bx--col-lg-10">
              <FBarChart
                data={sampleDataBar}
                dataToX={'month'}
                dataPoints={['sanction','revised']}
                yLabelFormat={[""," L INR",1/1000]}
              />
            </div>
          </div>
        </div>
        <div>
          <FTimeSeries
            data={sampleDataTime}
            dataToX={'day'}
            dataPoints={['sanction','revised', 'addition', 'saving']}
          />
        </div>
      </div>
    )
  }
}
export default ExpDetails;
