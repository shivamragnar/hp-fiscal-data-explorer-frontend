import React, {
  Component
} from "react";
import BarChart from '../../datavizcomps/BarChart';
import FPieChart from '../../datavizcomps/FPieChart';
import FBarChart from '../../datavizcomps/FBarChart';


class Home extends Component {
  constructor( props ) {
    super( props )

    this.state = {
      data: [
        [
          {quarter: 1, earnings: 3000},
          {quarter: 2, earnings: 6500},
          {quarter: 3, earnings: 4250},
          {quarter: 4, earnings: 19000}
        ],
        [
          {quarter: 1, earnings: 3000},
          {quarter: 2, earnings: 6500},
          {quarter: 3, earnings: 4250},
          {quarter: 4, earnings: 19000}
        ],
        [
          {quarter: 1, earnings: 3000},
          {quarter: 2, earnings: 6500},
          {quarter: 3, earnings: 4250},
          {quarter: 4, earnings: 19000}
        ]
      ],
      xLabelPos: [1, 2, 3, 4],
      xLabelTxt: ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]
      //yLabelTxt has to be modified from inside the FBarChart component
    }

    this.change = this.change.bind( this );
  }

  change() {
    this.setState( {
        data: [
          [
            {quarter: 1, earnings: 30100},
            {quarter: 2, earnings: 61500},
            {quarter: 3, earnings: 14250},
            {quarter: 4, earnings: 19000}
          ],
          [
            {quarter: 1, earnings: 13000},
            {quarter: 2, earnings: 16500},
            {quarter: 3, earnings: 14250},
            {quarter: 4, earnings: 19000}
          ],
          [
            {quarter: 1, earnings: 13000},
            {quarter: 2, earnings: 16500},
            {quarter: 3, earnings: 14250},
            {quarter: 4, earnings: 19000}
          ]
        ]
    } )
  }

  render() {

    const {data, xLabelPos, xLabelTxt} = this.state;

    return (
      <div style={{ width: '50%' }}>
        {
        // <FPieChart />
        }
        <FBarChart
          data={data}
          xLabelPos={xLabelPos}
          xLabelTxt={xLabelTxt}
          dataToX={'quarter'}
          dataToY={'earnings'}
        />
        <button  onClick={this.change}>Change</button>
      </div>
    )
  }
}
export default Home;
