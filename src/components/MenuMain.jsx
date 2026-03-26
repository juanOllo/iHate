import React from "react";

class MenuMain extends React.Component {
    render(){
        return(
            <div id="menu-screen" className="menu-screen">
                <div className="menu-header">iHate</div>
                <div className={"menu-options" + (this.props.focusOptionIndex === 0 ? " focused-option" : "")}
                >Play
                    <div> {">"} </div>
                </div>
                <div className={"menu-options" + (this.props.focusOptionIndex === 1 ? " focused-option" : "")}
                >Select albums
                    <div> {">"} </div>
                </div>
                <div className={"menu-options" + (this.props.focusOptionIndex === 2 ? " focused-option" : "")}
                >
                    {/* Shuffle songs */}
                    {
                        this.props.isSongsListShuffled ?
                            "Sort songs"
                            :
                            "Shuffle songs"
                    }
                    {/* {
                        this.props.isSongsListShuffled ?
                            <div> :) </div>
                            :
                            <div> :( </div>
                    } */}
                    {/* <div style={{scale: "0.8", transform: "translate(1.4rem, 0)", display: "flex", gap: "0.05rem", backgroundColor: ""}}>
                        <div style={{width: "0.8rem", height: "1rem", background: "linear-gradient(white 0%, white 49%, gray 50%, gray 100%)", borderRadius: "50%", transform: "rotate(-90deg)"}}>
                            <div style={{scale: "0.7", width: "0.8rem", height: "1rem", background: "white", borderRadius: "50%"}}></div>
                        </div>
                        <div style={{width: "0.8rem", height: "1rem", background: "linear-gradient(white 0%, white 49%, gray 50%, gray 100%)", borderRadius: "50%", transform: "rotate(90deg)"}}>
                            <div style={{scale: "0.7", width: "0.8rem", height: "1rem", background: "white", borderRadius: "50%"}}></div>
                        </div>
                        <div style={{transform: "translate(-0.5rem, -0.05rem)", width: "0", height: "0", borderTop: "0.2rem solid transparent",borderBottom: "0.2rem solid transparent",borderLeft: "0.4rem solid gray",}}></div>
                        <div style={{transform: "translate(-0.95rem, 0.65rem)", width: "0", height: "0", borderTop: "0.2rem solid transparent",borderBottom: "0.2rem solid transparent",borderLeft: "0.4rem solid gray",}}></div>
                    </div> */}
                </div>
                <div className={"menu-options" + (this.props.focusOptionIndex === 3 ? " focused-option" : "")}
                >Info
                    <div> {">"} </div>
                </div>
                <div className={"menu-options" + (this.props.focusOptionIndex === 4 ? " focused-option" : "")}
                    style={{color: "white"}}
                >By: juanOllo
                    <div> {">"} </div>
                </div>
            </div>
        )
    }
}

export default MenuMain;
