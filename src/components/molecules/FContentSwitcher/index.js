import React from "react";
import { Radio, Tooltip } from "antd";

import "./_style.scss";

const FContentSwitcher = ({
	options,
	defaultValue,
	onChange,
	activeVizIdx,
}) => {
	const handleSwitchContent = (e) => {
		let index = options.findIndex((viz) => viz.label === e.target.value);
		onChange({ index });
	};

	return (
		<Radio.Group
			defaultValue={defaultValue}
			buttonStyle="solid"
			onChange={handleSwitchContent}
			value={options[activeVizIdx].label}
			className="content-switcher"
		>
			{options.map((viz, i) => {
				return (
					<Tooltip title={viz.infoText} placement="top">
						<Radio.Button value={viz.label} className="w-100">
							{viz.label}
						</Radio.Button>
					</Tooltip>
				);
			})}
		</Radio.Group>
	);
};

export default FContentSwitcher;
