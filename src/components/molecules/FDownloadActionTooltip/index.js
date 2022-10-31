import React from "react";
import {Tooltip, Button} from "carbon-components-react";
import Download16 from '@carbon/icons-react/lib/download/16';

//download files components
import { CSVLink } from "react-csv";

//import helpers
import { convertDataToJson } from '../../../utils/functions';

const FDownloadActionTooltip = ({ data }) => {


    return (

        <Tooltip
          className="f-download-action-tooltip"
          direction="top"
          iconDescription="Helpful Information"
          renderIcon={
            React.forwardRef((props, ref) => (
              <Download16 ref={ref} />
            ))
          }
          showIcon
          tabIndex={0}
        >
          <p>
            What format would you like to download this data in?
          </p>
          <div className="bx--tooltip__footer">
            <CSVLink data={data}><Button>.CSV</Button></CSVLink>
            <a href={`data:${convertDataToJson(data)}`} download="data.json"><Button>.JSON</Button></a>
          </div>
        </Tooltip>


    )

}


export default FDownloadActionTooltip;
