import React from "react";
import { Link } from "react-router-dom";
import Dropdown from "carbon-components-react/lib/components/Dropdown";

const FDropdown = props => (
  <div className={props.className}>
    <Dropdown
      ariaLabel="Dropdown"
      disabled={false}
      id="f-dropdown"
      invalidText="A valid value is required"
      itemToElement={null}
      items={props.items}
      label={props.label}
      light={false}
      onChange={props.onChange}
      titleText={props.titleText}
      type="default"
    />
  </div>
);

FDropdown.defaultProps = {
  //yLabelFormat mnust be an array of 3. each value representing  'prefix', 'suffix' and multiplier
  className: "f-dropdown",
  titleText: "Dropdown Title",
  label: "Dropdown Label",
  items: [
    {
      dd_name: "name of dd", //should be the same as the key name in the raw fiscal data
      id: "option-1",
      label: "Option 1"
    },
    {
      dd_name: "name of dd",
      id: "option-2",
      label: "Option 2"
    },
    {
      dd_name: "name of dd",
      id: "option-3",
      label: "Option 3"
    },
    {
      dd_name: "name of dd",
      id: "option-4",
      label: "Option 4"
    }
  ]
};

export default FDropdown;
