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
                </div>
                <div className={"menu-options" + (this.props.focusOptionIndex === 3 ? " focused-option" : "")}
                >Info
                    <div> {">"} </div>
                </div>
            </div>
        )
    }
}

export default MenuMain;
