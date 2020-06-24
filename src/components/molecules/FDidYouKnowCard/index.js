import React from "react";
import { Row, Col } from "antd";
import "./_style.scss";

const data = [
	{
		heading: "Heading 1",
		link: "https://hp.openbudgetsindia.org/#/expenditure/tracker",
        text:"The Food and Civil services and Social justice and empowerment departments have seen substantial increases in spending during the months (April and May) when the state went into lock down"	
    },
	{
		heading: "Heading 2",
		link: "http://covidorders.hp.gov.in/frontend/web/writeData/Shimla/f69e104b1b24b2ed8358e0e4b0994b3c96d1fbdc.pdf",
		text:"The Himachal Pradesh government is paying ASHA workers an additional incentive of 1000 rs/month from March to June 2020"
	},
	{
		heading: "Heading 3",
		link: "https://hpsdma.nic.in/index1.aspx?lsid=7854&lev=1&lid=5225&langid=1",
		text:"The HP State Disaster Management Authority received rs 78 crores from different donors for the fight against COVID-19"
	},
	{
		heading: "Heading 4",
		link: "http://covidorders.hp.gov.in/frontend/web/writeData/Shimla/5f88d992649cb0548b54e0589a850d41b7d3e1de.pdf",
		text:"On 28th May, the state put out a comprehensive Emergency Response and Health Systems Package which details the release of approximately 14 crores to different districts and CMO’s for the fight against COVID-19"
	},
	{
		heading: "Heading 5 ",
		link: "https://hpsdma.nic.in/index1.aspx?lsid=7854&lev=1&lid=5225&langid=1",
		text:"Of the 78 crores that has been donated, the State Disaster Management fund has spent 13 crores till date. This has been mainly spent toward purchase of PPE kits, transportation of stranded migrants and deployment of guard to keep order "
	},
	{
		heading: "Heading 6",
		link: "https://hp.openbudgetsindia.org/#/receipts",
		text:"Himachal Pradesh is facing a 54% reduction in it’s revenue for this fiscal year (rs 646 crores) compared to last year (rs 1, 411 crore)"
	}
];

const FDidYouKnowCard = () => {
	return (
		<Row gutter={16}>
			{data.map((didYouKnow) => (
				<Col sm={24} md={8}>
					<div class="card-container against-humanity">
						<div class="card">
							<span className="card-text">{didYouKnow.text}</span>
							<a href={didYouKnow.link} target="_blank" className="learn-more-link">Explore More &gt;</a>
						</div>
					</div>
				</Col>
			))}
		</Row>
	);
};

export default FDidYouKnowCard;
