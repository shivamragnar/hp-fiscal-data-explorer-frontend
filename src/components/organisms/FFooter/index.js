import React from "react";
import { Row, Col } from "antd";
import {
	TwitterOutlined,
	GithubOutlined,
	FacebookFilled,
} from "@ant-design/icons";
import "./_style.scss";

const socialIconsData = [
	{
		class: "twitter footer-icons",
		link: "https://twitter.com/OpenBudgetsIn",
		component: <TwitterOutlined />,
	},
	{
		class: "facebook footer-icons",
		link: "https://www.facebook.com/OpenBudgetsIndia",
		component: <FacebookFilled />,
	},
	{
		class: "github footer-icons",
		link: "https://github.com/cbgaindia",
		component: <GithubOutlined />,
	},
];

const externalLinks = [
	{
		link: "https://hp.openbudgetsindia.org/aboutus#/aboutus",
		text: "About Us",
	},
	{
		link: "https://openbudgetsindia.org/pages/license",
		text: "License",
	},
];

const FFooter = () => {
	return (
		<footer className="hpfde-footer">
			<div className="container">
				<Row justify="space-around" align="middle">
					<Col xs={20} sm={6}>
						<div className="col-sm-3 col-sm-offset-1">
							<h2 className="logo">
								<a
									href="https://openbudgetsindia.org/"
									target="_blank"
								>
									<img src="https://raw.githubusercontent.com/cbgaindia/design/master/logo_OBI/logo_types/dark_bg_logo/draft_final/logo_with_text/draft_final.png" />
								</a>
							</h2>
							<div className="credit-text">
								<p>Data Sourced from Himachal Pradesh's</p>
								<p>
									IFMIS -{" "}
									<a
										href="https://himkosh.nic.in/"
										target="_blank"
									>
										Himkosh
									</a>
								</p>
							</div>
						</div>
					</Col>
					<Col xs={20} sm={6}>
						<div className="social-networks">
							{socialIconsData.map((icon) => (
								<a
									href={icon.link}
									target="_blank"
									className={icon.class}
								>
									{icon.component}
								</a>
							))}
						</div>
						<a
							href="https://openbudgetsindia.org/contact"
							target="_blank"
							className="footer-contactus-button"
						>
							Contact Us
						</a>
					</Col>
					<Col xs={24} sm={6}>
						<h5>OpenBudgetsIndia</h5>
						<ul>
							{/* <li><a target="_blank" href="https://openbudgetsindia.org/budget-basics/union-budget.html">Budget Basics</a></li> */}
							{externalLinks.map((link) => (
								<li>
									<a target="_blank" href={link.link}>
										{link.text}
									</a>
								</li>
							))}
						</ul>
					</Col>
				</Row>
			</div>
			<div className="footer-copyright">
				<p>
					All work under{" "}
					<a
						href="https://creativecommons.org/licenses/by/4.0/"
						target="_blank"
					>
						Creative Commons Attribution 4.0 (CC-BY)
					</a>
				</p>
			</div>
		</footer>
	);
};

export default FFooter;
