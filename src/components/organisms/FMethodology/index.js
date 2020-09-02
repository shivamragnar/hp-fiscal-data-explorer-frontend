import React from "react";

import "./_style.scss";

const Methodology = () => {
	return (
		<div className="methodology-wrapper">
			<div className="container">
				<h2 className="section-title title">
					Methods: Constructing the index
				</h2>
				<p className="section-p subtitle is-3">
					The index covers 12 districts in Himachal Pradesh and was
					loosely inspired by the Vulnerability Index put forward by{" "}
					<a
						href="https://precisionforcovid.org/africa"
						target="_blank"
					>
						Africa CCVI
					</a>{" "}
					and{" "}
					<a
						href="https://precisionforcovid.org/ccvi"
						target="_blank"
					>
						USA CCVI
					</a>
					. The indicators have of course been modified to account for
					the overall quality of the procurement process specifically
					for health related tenders. The indicators that were
					selected was based on the Manual for Procurements released
					by the Government of India as well as the Open Contracting
					Partnership. The data for all the indices was collected from
					the{" "}
					<a
						href="https://hptenders.gov.in/nicgep/app"
						target="_blank"
					>
						eprocurement portal for Himachal Pradesh
					</a>
					. For detailed methods please look{" "}
					<a
						href="https://drive.google.com/file/d/1GGx5cYsfuKAziUUHZcjxM3S-MiN6kR_i/view"
						target="_blank"
					>
						here
					</a>
					.
					<br />
					<br />
				</p>
				<p>
					<strong>List of Resources:</strong>
					<ul >
						<li>
							<a
								href="https://drive.google.com/file/d/1QH2vAHTUMdb8OXl6k6vQBofW9XsUUgE3/view"
								target="_blank"
								className="resource-link"
							>
								System Architecture
							</a>
						</li>
						<li>
							<a
								href=" https://superset.civicdatalab.in/superset/dashboard/101/"
								target="_blank"
								className="resource-link"
							>
								Hospital and College Procurement Analysis
							</a>
						</li>
						<li>
							<a
								href="https://superset.civicdatalab.in/superset/dashboard/100/"
								target="_blank"
								className="resource-link"
							>
								Key Performance Indicator Analysis
							</a>
						</li>
						<li>
							<a
								href="https://superset.civicdatalab.in/superset/dashboard/102/"
								target="_blank"
								className="resource-link"
							>
								Health related spending data analysis
							</a>
						</li>
						<li>
							<a
								href="https://superset.civicdatalab.in/superset/dashboard/103/"
								target="_blank"
								className="resource-link"
							>
								Sanitation and water supply related spending
								analysis
							</a>
						</li>
						<li>
							<a
								href="https://drive.google.com/file/d/1kRCNYg0oQgRCRitbXLtVdy2pLDP9fyY5/view?usp=sharing"
								target="_blank"
								className="resource-link"
							>
								JSON used for the dashboard
							</a>
						</li>
						<li>
							<a
								href="https://github.com/CivicDataLab/himachal-pradesh-health-procurement-OCDS"
								target="_blank"
								className="resource-link"
							>
								OCDS Published Health Procurement Data
							</a>
						</li>
					</ul>
				</p>
				<p>
					<strong>Caveats</strong>
					<br />
				</p>
				<p>
					The index is limited by the{" "}
					<b>quality of data that is being released</b>, therefore
					many of the indicators still remain unknown and we are
					hoping to get more clarity as we work with governments and
					organizations to better refine this Index. The mapping to
					the sdgs while consistent across this data has been done to
					the best of our abilities and will probably change with time
					and with more information.
				</p>
				<p>
					For a full discussion of caveats, please see the{" "}
					<a
						href="https://drive.google.com/file/d/1GGx5cYsfuKAziUUHZcjxM3S-MiN6kR_i/view"
						target="_blank"
					>
						Methods PDF
					</a>
					.
				</p>
			</div>
		</div>
	);
};

export default Methodology;
