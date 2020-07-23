import React from "react";
import { Row, Col } from "antd";
import "./_style.scss";

const data = [
	{
		heading: "Heading 1",
		link: "https://hp.openbudgetsindia.org/#/expenditure/tracker",
        text:"The Food and Civil Supplies, and the Social Justice and Empowerment departments have seen substantial increases in spending during the months of April and May when the state went into lockdown"	
    },
	{
		heading: "Heading 2",
		link: "http://covidorders.hp.gov.in/frontend/web/writeData/Shimla/f69e104b1b24b2ed8358e0e4b0994b3c96d1fbdc.pdf",
		text:"The Government of Himachal Pradesh provided extra incentive of ₹1000 / month to ASHA workers for the months of March - June 2020"
	},
	{
		heading: "Heading 3",
		link: "https://hpsdma.nic.in/index1.aspx?lsid=7854&lev=1&lid=5225&langid=1",
		text:"The Himachal Pradesh State Disaster Management Authority received ₹82 crores (₹780 million) from donors as on 23 July 2020"
	},
	{
		heading: "Heading 4",
		link: "http://covidorders.hp.gov.in/frontend/web/writeData/Shimla/5f88d992649cb0548b54e0589a850d41b7d3e1de.pdf",
		text:"On May 28, 2020 the Himachal Pradesh government put out a comprehensive Emergency Response and Health Systems Package which detailed the release of nearly ₹14 crores (₹140 million) to various districts and Chief Medical Officers for the fight against COVID-19"
	},
	{
		heading: "Heading 5 ",
		link: "https://hpsdma.nic.in/index1.aspx?lsid=7854&lev=1&lid=5225&langid=1",
		text:"As on 23 July 2020, ₹18 crores (₹300 million) have been allotted to various departments of the government for purchase of PPE kits, transportation of stranded migrant workers, and deployment of home guards to maintain law and order"
	},
	{
		heading: "Heading 6",
		link: "https://hp.openbudgetsindia.org/#/receipts",
		text:"Himachal Pradesh government, in the months of April - June 2020, received only 48% of the revenue it received in the same months in 2019"
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
