import React from "react";

class MenuSongs extends React.Component {

    render(){

        return(
            <div id="menu-screen" className="menu-screen">
                <div className="menu-header">iHate</div>
                
                {
                    this.props.songs.map((elem, index) => {
                        return(
                            <div className={"menu-options" + (this.props.focusOptionIndex === index ? " focused-option" : "")}>
                                {/* <img className="menu-cover-img" src={"/covers/crystal-castles-cover-" + (index+1) +".jpg"} alt="cover" /> */}
                                {elem.title}
                                <div> {">"} </div>
                            </div>
                        )
                    })
                }
            </div>
        )

    }

}

export default MenuSongs;
