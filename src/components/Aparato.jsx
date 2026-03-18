import React, { useEffect } from "react";
import Player from "./Player.jsx"
import MainMenu from "./MainMenu.jsx";
import SelectAlbumsMenu from "./SelectAlbumsMenu.jsx";

class Menu extends React.Component {

    constructor(props) {
        super(props);

        this.state={
            playerDisplay: false,
            songs: [],
            playlist: [],
            covers: [],

            focusOptionIndex: 0,
            actualMenuIndex: 0,

            albumsFilter: [true, true, true],
        }

    }

    componentDidMount(){
        this.setState({
            songs: [
                {
                    id: 0,
                    title: "Untrust Us",
                    album: 1,
                    src: "/songs/Untrust-Us.mp3",
                },
                {
                    id: 1,
                    title: "Kerosene",
                    album: 3,
                    src: "/songs/Kerosene.mp3",
                },
            ],
            covers: [
                "/covers/crystal-castles-cover-1.jpg",
                "/covers/crystal-castles-cover-2.jpg",
                "/covers/crystal-castles-cover-3.jpg"
            ]
        });
    }

    closePlayer = () => {
        this.setState({ playerDisplay: false });
    }

    chooseOption(){
        switch (this.state.actualMenuIndex) {
            case 0:
                switch (this.state.focusOptionIndex) {
                    case 0:
                        // const playlist = [...this.state.songs];

                        if (!this.state.albumsFilter.every(valor => valor === true)) {
                            const playlist = this.state.songs.filter(elem => this.state.albumsFilter[elem.album-1]);
                            console.log("playlist filtrada: ", playlist);
                            this.setState({ playlist: [...playlist] });
                        } else {
                            this.setState({ playlist: this.state.songs })
                        }
                        const menuScreen = document.getElementById("menu-screen");
                        menuScreen.style.animation = "menu-screen-disappear 0.5s ease-in-out 0s forwards";
                        setTimeout(() => {
                            this.setState({ playerDisplay: true });
                        }, 510);
                        break;

                    case 1:
                        this.setState({ actualMenuIndex: 1 });
                        break;
                
                    default:
                        break;
                }
                
                break;

            case 1:
                const newList = this.state.albumsFilter;
                switch (this.state.focusOptionIndex) {
                    case 0:
                        console.log("entro en: ", this.state.focusOptionIndex)
                        newList[this.state.focusOptionIndex] = !newList[this.state.focusOptionIndex];
                        this.setState({ albumsFilter: [...newList]});
                        break;

                    case 1:
                        console.log("entro en: ", this.state.focusOptionIndex)
                        newList[this.state.focusOptionIndex] = !newList[this.state.focusOptionIndex];
                        this.setState({ albumsFilter: [...newList]});
                        break;

                    case 2:
                        console.log("entro en: ", this.state.focusOptionIndex)
                        newList[this.state.focusOptionIndex] = !newList[this.state.focusOptionIndex];
                        this.setState({ albumsFilter: [...newList]});
                        break;
                
                    default:
                        break;
                }

                break;
        
            default:
                break;
        }

    }

    returnMenuDisplay(){
        switch (this.state.actualMenuIndex) {
            case 0:
                return <MainMenu focusOptionIndex={this.state.focusOptionIndex}/>

            case 1:
                return <SelectAlbumsMenu 
                    focusOptionIndex={this.state.focusOptionIndex}
                    albumsFilter={this.state.albumsFilter}
                />
                break;

            default:
                break;
        }
    }

    render(){

        if (this.state.playerDisplay) {
            return(
                <Player
                    closePlayer={this.closePlayer}
                    songs={this.state.playlist}
                    covers={this.state.covers}
                ></Player>
            )
        }

        return(
            <div className="aparato menu">
                <div className="screen">
                    {
                        this.returnMenuDisplay()
                    }
                </div>
                <div className="pad">
                    <button className="menu-btn"
                        onClick={() => this.setState({ focusOptionIndex: this.state.focusOptionIndex-1})}
                    >UP</button>
                    
                    <button className="prev-btn"
                        onClick={() => this.setState({ actualMenuIndex: 0 })}
                    >BACK</button>
                    
                    <button className="next-btn"
                    >SEL</button>
                    
                    <button className="play-pause-btn"
                        onClick={() => this.chooseOption()}
                    >OK</button>
                    
                    <button className="mix-btn"
                        onClick={() => this.setState({ focusOptionIndex: this.state.focusOptionIndex+1})}
                    >DOWN</button>
                    
                </div>
            </div>
        )

    }

}

export default Menu;
