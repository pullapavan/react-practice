import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'

class RulesComponent extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const mystyle = {
            card: { width: '40rem', textAlign: 'center', margin: 'auto', top: '7rem' },
            p10: { padding: '10px' },
            floatleft: { float: 'left' }
        };
        return (
            <div className="container">
                <div className="row m-5">
                    <div className="col-md-12 ">
                        <h4 className="text-center">Brainstorm on the ideas</h4>
                        <h4 className="text-center">Flip your library</h4>
                        <h4 className="text-center">Bring a Change</h4>
                    </div>
                </div>
                <div className="row m-5">
                    <div className="col-md-12 ">
                        <p>If you are a person who think’s out of the box then surely this is the right time to get your Ideas grow and blossom….</p>

                        <p>Our history has been a proof that we were the rock stars since our inception and now let’s move ahead holding to our values of meritocracy and set our sights high to stay focused and maintain the consistency and efficiency that has carried us this far.</p>

                        <p>Team HDW is always identified to be eager to wear thinking hats & apply the knowledge to come up with the best solutions …</p>

                        <p>So for all such members here is an opportunity to get your amazing ideas to action by working from ideation to implementation.</p>


                        <div><h3>Steps</h3></div>
                        <ListGroup>
                            <ListGroup.Item >Form your team (Max 5 members) & Identify an opportunity (IDEA for improvement in our business or process, Company growth, Product enhancement, Customer satisfaction, Branding, Security, Cost effectiveness, New products etc.,)</ListGroup.Item>
                            <ListGroup.Item >Submit your overview of ideas with detailed plan after analyzing, designing and strategizing the same ( link provided)</ListGroup.Item>
                            <ListGroup.Item>Panel will look in and Shortlist the Ideas</ListGroup.Item>
                            <ListGroup.Item>Shortlisted Ideas will be called in for presentation in detail</ListGroup.Item>
                            <ListGroup.Item>Best ideas will be presented before our CEO who shall declare the winners – Biggest Cash Prize ever.</ListGroup.Item>
                        </ListGroup>
                    </div>

                </div>



            </div>
        )
    }
}

export default RulesComponent