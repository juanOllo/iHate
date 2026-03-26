import React from "react";

class MenuInfo extends React.Component {

    render(){

        return(
            <div id="menu-screen" className="menu-screen-info"
                style={{marginTop: ("-" + (this.props.focusOptionIndex+1.7)*10 + "%")}}
            >
                <h3>About Crystal Castles</h3>

                <h4>1. Departure from the Band (2014)</h4>
                <p>Alice Glass announced her departure from Crystal Castles in October 2014. At the time, she stated that continuing in the group was no longer possible for a "multitude of reasons both professional and personal," though she did not initially provide specific details.</p>

                <h4>2. Abuse Allegations (2017)</h4>
                <p>In October 2017, Glass posted an extensive official statement detailing nearly a decade of alleged abuse by Ethan Kath (Claudio Palmieri). Her claims included:</p>
                <ul>
                    <li>Sexual and Physical Abuse: Allegations of non-consensual sex, physical assault (including being thrown onto concrete), and intimidation starting when she was 15 years old and he was 25.</li>
                    <li>Extreme Control: Glass alleged that Kath systematically controlled her eating habits, finances, communications, and social interactions.</li>
                    <li>Professional Diminishment: She claimed he minimized her creative contributions to keep her insecure and dependent.</li>
                </ul>

                <h4>3. Defamation Lawsuit and Legal Outcome</h4>
                <p>Ethan Kath denied all allegations, calling them "pure fiction" and filed a defamation lawsuit against Glass in November 2017.</p>
                <ul>
                    <li>Dismissal: In February 2018, a Los Angeles judge dismissed the lawsuit under a California statute designed to protect free speech (Anti-SLAPP).</li>
                    <li>Legal Fees: Following the dismissal, the court ordered Kath to pay Glass approximately $21,000 in attorney fees and legal costs.</li>
                    <li>Police Investigation: It was confirmed that the Toronto Police sex crimes unit opened an investigation into Kath after multiple other women came forward with similar allegations.</li>
                </ul>

                <h4>4. Current Status and Legacy</h4>
                <ul>
                    <li>Crystal Castles: The band has been inactive since the 2017 allegations led to tour cancellations and widespread removal from festival lineups.</li>
                    <li>Solo Career: Alice Glass has since established a solo career, releasing her debut album, PREY//IV, in 2022. She has publicly urged fans not to stream Crystal Castles music, stating she does not receive royalties and prefers that her alleged abuser not be supported financially.</li>
                </ul>
            </div>
        )

    }

}

export default MenuInfo;
