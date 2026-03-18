import React from "react";

class SelectAlbumsMenu extends React.Component {

    render(){

        return(
            <div className="menu-screen">
                <div className="menu-header">iHate</div>
                <div className={"menu-options" + (this.props.focusOptionIndex === 0 ? " focused-option" : "")}
                >
                    <img className="menu-cover-img" src="/covers/crystal-castles-cover-1.jpg" alt="cover" />
                    Crystal Castles |
                    <div className={"menu-album-checkout" + (this.props.albumsFilter[0] ? " menu-album-checkout-selected" : "")}></div>
                </div>
                <div className={"menu-options" + (this.props.focusOptionIndex === 1 ? " focused-option" : "")}
                >
                    <img className="menu-cover-img" src="/covers/crystal-castles-cover-2.jpg" alt="cover" />
                    Crystal Castles ||
                    <div className={"menu-album-checkout" + (this.props.albumsFilter[1] ? " menu-album-checkout-selected" : "")}></div>
                </div>
                <div className={"menu-options" + (this.props.focusOptionIndex === 2 ? " focused-option" : "")}
                >
                    <img className="menu-cover-img" src="/covers/crystal-castles-cover-3.jpg" alt="cover" />
                    Crystal Castles |||
                    <div className={"menu-album-checkout" + (this.props.albumsFilter[2] ? " menu-album-checkout-selected" : "")}></div>
                </div>
            </div>
        )

    }

}

export default SelectAlbumsMenu;
