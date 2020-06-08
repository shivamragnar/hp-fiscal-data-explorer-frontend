import React from "react"
import {Row, Col} from "antd"
import "./_style.scss"

const data = [
    {
        heading: "Heading 1",
        text: "During April and May, the government of himachal had markedly increased expenditure (Compared to spending last year) in three departments: Food and Civil services, Road and Transport services and Social justice and empowerment."
    },
    {
        heading: "Heading 2",
        text: "Food and civil services spent almost 28% of their allocated budget in April and may  this year, compared to 0.54% last year. Much of this (Rs 8000 lakhs) was spent on subsidies toward procurement of pulses (55% of its allocated budget)."
    },
    {
        heading: "Heading 3",
        text: "The department of social justice and Empowerment spent 19% of its total budget by the month of May (compared to 13% last year)."
    },
    {
        heading: "Heading 4",
        text: "The government spent Rs 4 crores spent toward children's welfare in April and May. Most of the expenditure were grants toward social welfare for ICDS - Integrated Child Development Services (81 lakhs or 50%) and honorariums (toward anganwadi workers and ICDS health workers- 3 crores or 20%)."
    },
    {
        heading: "Heading 5 ",
        text: "Around 27% or about rs 177 crores has been spent on pensions in this department. Through the state treasury, a total of 1128 crores was spent towards pensions for April and May."
    }
]

const FDidYouKnowCard = () => {

    return (
            <Row gutter={16}>
            {
                data.map(didYouKnow => (
                    <Col sm={24} md={12}>
                    <div class="card-container">
                            <div class="card">
                                <span className="card-text">{didYouKnow.text}</span>
                            </div>
                        </div>
                    </Col>
                ))
            }
            </Row>
    )
}

export default FDidYouKnowCard