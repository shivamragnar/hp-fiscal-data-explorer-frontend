import React from "react";
import { Link } from "react-router-dom";
import RadioButtonGroup from 'carbon-components-react/lib/components/RadioButtonGroup';
import RadioButton from 'carbon-components-react/lib/components/RadioButton';
import FormGroup from 'carbon-components-react/lib/components/FormGroup';

const FRadioGroup = props => (
  <div className={props.className}>

      <RadioButtonGroup
        defaultSelected="default-selected"
        labelPosition="right"
        legend="Group Legend"
        name={props.name}
        onChange={function noRefCheck(){}}
        orientation="horizontal"
        valueSelected="default-selected"
      >
      {
        props.radioButtons.map((rbutton, i) =>(
          <RadioButton
            id= {rbutton.id}
            labelText= {rbutton.labelText}
            value= {rbutton.value}
          />
          )
        )
      }
      </RadioButtonGroup>
    
  </div>
);

FRadioGroup.defaultProps = {
  //yLabelFormat mnust be an array of 3. each value representing  'prefix', 'suffix' and multiplier
  className: "f-radio-group",
  name: "radio-button-group",
  titleText: "radio button heading",
  radioButtons: [
    {id:"radio-1", labelText: "radio1", value: "default-selected"},
    {id:"radio-2", labelText: "radio2", value: "standard"}
  ]
};

export default FRadioGroup;
