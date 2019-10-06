import React, {
  Component
} from "react";




class Home extends Component {
  constructor( props ) {
    super( props )

    this.state = {
      data: [
          {quarter: 1, earnings: 3000},
          {quarter: 2, earnings: 6500},
          {quarter: 3, earnings: 4250},
          {quarter: 4, earnings: 19000}
      ],
      xLabelPos: [1, 2, 3, 4],
      xLabelTxt: ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"],
      yLabelFormat: ["$", "k", 1/1000]
    }

    this.change = this.change.bind( this );
  }

  change() {
    this.setState( {
        data: [

            {quarter: 1, earnings: 30100},
            {quarter: 2, earnings: 61500},
            {quarter: 3, earnings: 14250},
            {quarter: 4, earnings: 19000}

        ]
    } )
  }

  render() {

    const {data, data2, xLabelPos, xLabelTxt, yLabelFormat} = this.state;

    return (
      <div>
        


      </div>
    )
  }
}
export default Home;
