import React from "react";

class MenuSelectAlbums extends React.Component {
    render(){
        return(
            <div className="menu-screen">
                <div className="menu-header">iHate</div>
                <div className={"menu-options" + (this.props.focusOptionIndex === 0 ? " focused-option" : "")}
                >
                    <img className="menu-cover-img" src="/covers/crystal-castles-cover-1.jpg" alt="cover" />
                    Crystal Castles |
                    {
                        this.props.albumsFilter[0] ?
                            <div style={{scale: "0.85", width: "1rem", display: "flex", marginRight: "0", backgroundColor: ""}}>
                                <div style={{backgroundColor: "lightgreen", width: "5px", height: "0.7rem", transform: "rotate(-45deg)", margin: "auto 0.1rem 0 0", zIndex: "2"}}></div>
                                <div style={{backgroundColor: "lightgreen", width: "5px", height: "1rem", transform: "rotate(40deg)"}}></div>
                            </div>
                            :
                            <div style={{scale: "0.85", width: "1rem", display: "flex", marginRight: "0", backgroundColor: ""}}>
                                <div style={{backgroundColor: "crimson", width: "5px", height: "1rem", transform: "rotate(-45deg)", margin: "auto -0.3rem 0 0.3rem", zIndex: "2"}}></div>
                                <div style={{backgroundColor: "crimson", width: "5px", height: "1rem", transform: "rotate(45deg)", marginRight: "-1.3rem"}}></div>
                            </div>
                    }
                </div>
                <div className={"menu-options" + (this.props.focusOptionIndex === 1 ? " focused-option" : "")}
                >
                    <img className="menu-cover-img" src="/covers/crystal-castles-cover-2.jpg" alt="cover" />
                    Crystal Castles ||
                    {
                        this.props.albumsFilter[1] ?
                            <div style={{scale: "0.85", width: "1rem", display: "flex", marginRight: "0", backgroundColor: ""}}>
                                <div style={{backgroundColor: "lightgreen", width: "5px", height: "0.7rem", transform: "rotate(-45deg)", margin: "auto 0.1rem 0 0", zIndex: "2"}}></div>
                                <div style={{backgroundColor: "lightgreen", width: "5px", height: "1rem", transform: "rotate(40deg)"}}></div>
                            </div>
                            :
                            <div style={{scale: "0.85", width: "1rem", display: "flex", marginRight: "0", backgroundColor: ""}}>
                                <div style={{backgroundColor: "crimson", width: "5px", height: "1rem", transform: "rotate(-45deg)", margin: "auto -0.3rem 0 0.3rem", zIndex: "2"}}></div>
                                <div style={{backgroundColor: "crimson", width: "5px", height: "1rem", transform: "rotate(45deg)", marginRight: "-1.3rem"}}></div>
                            </div>
                    }
                </div>
                <div className={"menu-options" + (this.props.focusOptionIndex === 2 ? " focused-option" : "")}
                >
                    <img className="menu-cover-img" src="/covers/crystal-castles-cover-3.jpg" alt="cover" />
                    Crystal Castles |||
                    {
                        this.props.albumsFilter[2] ?
                            <div style={{scale: "0.85", width: "1rem", display: "flex", marginRight: "0", backgroundColor: ""}}>
                                <div style={{backgroundColor: "lightgreen", width: "5px", height: "0.7rem", transform: "rotate(-45deg)", margin: "auto 0.1rem 0 0", zIndex: "2"}}></div>
                                <div style={{backgroundColor: "lightgreen", width: "5px", height: "1rem", transform: "rotate(40deg)"}}></div>
                            </div>
                            :
                            <div style={{scale: "0.85", width: "1rem", display: "flex", marginRight: "0", backgroundColor: ""}}>
                                <div style={{backgroundColor: "crimson", width: "5px", height: "1rem", transform: "rotate(-45deg)", margin: "auto -0.3rem 0 0.3rem", zIndex: "2"}}></div>
                                <div style={{backgroundColor: "crimson", width: "5px", height: "1rem", transform: "rotate(45deg)", marginRight: "-1.3rem"}}></div>
                            </div>
                    }
                </div>
            </div>
        )
    }
}

export default MenuSelectAlbums;
