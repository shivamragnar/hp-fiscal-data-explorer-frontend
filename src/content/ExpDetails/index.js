import React, {
  Component
} from "react";
//from carbon's components
import {Content} from 'carbon-components-react/lib/components/UIShell';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack, VictoryGroup, VictoryLabel, VictoryLine } from 'victory';
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
    x: 1,
    sanction: 4,
    addition: 5,
    saving: 6,
    revised: 7,
  },
  {
    x: 2,
    sanction: 4.5,
    addition: 5,
    saving: 6,
    revised: 7,
  },
  {
    x: 3,
    sanction: 4.7,
    addition: 5,
    saving: 6,
    revised: 7,
  },
  {
    x: 4,
    sanction: 4,
    addition: 5,
    saving: 6,
    revised: 7,
  },
  {
    x: 5,
    sanction: 4,
    addition: 5,
    saving: 6,
    revised: 7,
  },
  {
    x: 6,
    sanction: 4,
    addition: 5,
    saving: 6,
    revised: 7,
  },
  {
    x: 7,
    sanction: 4,
    addition: 5,
    saving: 6,
    revised: 7,
  },
  {
    x: 8,
    sanction: 4,
    addition: 5,
    saving: 6,
    revised: 7,
  },
  {
    x: 9,
    sanction: 4,
    addition: 5,
    saving: 6,
    revised: 7,
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
        <Content>
          <div className="viz_body">
            <div>
              <FBarChart
                data={sampleDataBar}
                dataToX={'month'}
                dataPoints={['sanction','revised']}
                yLabelFormat={[""," L INR",1/1000]}
              />
            </div>
            <div>
              <FTimeSeries
                data={sampleDataTime}
                dataToX={'x'}
                dataPoints={['sanction','revised', 'addition', 'saving']}
                xLabelValues={[1,2,3,4,5,6,7,8,9]}
                xLabelFormat={(t) => t}
              />
            </div>
          </div>
        </Content>
        <div className="filter_panel">
          <h3>Filter col</h3>
        </div>
      </div>
    )
  }
}
export default ExpDetails;
