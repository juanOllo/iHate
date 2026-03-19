import React, { useEffect } from "react";
import Player from "./Player.jsx"
import MainMenu from "./MainMenu.jsx";
import SelectAlbumsMenu from "./SelectAlbumsMenu.jsx";
import MenuSongs from "./MenuSongs.jsx";

class Menu extends React.Component {

    constructor(props) {
        super(props);

        this.state={
            audio: new Audio(),

            playerDisplay: false,
            songs: [],
            playlist: [],
            covers: [],

            focusOptionIndex: 0,
            actualMenuIndex: 0,

            albumsFilter: [true, true, true],
            top: 3, //Cambiar nombre

            lastSongPlayed: null,
            lastSongPlayedCurrentTime: 0,
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
                    title: "Violent Dreams",
                    album: 2,
                    src: "/songs/Violent-Dreams.mp3",
                },
                {
                    id: 2,
                    title: "Kerosene",
                    album: 3,
                    src: "/songs/Kerosene.mp3",
                },
                {
                    id: 0,
                    title: "Untrust Us",
                    album: 1,
                    src: "/songs/Untrust-Us.mp3",
                },
                {
                    id: 1,
                    title: "Violent Dreams",
                    album: 2,
                    src: "/songs/Violent-Dreams.mp3",
                },
                {
                    id: 2,
                    title: "Kerosene",
                    album: 3,
                    src: "/songs/Kerosene.mp3",
                },
                {
                    id: 0,
                    title: "Untrust Us",
                    album: 1,
                    src: "/songs/Untrust-Us.mp3",
                },
                {
                    id: 1,
                    title: "Violent Dreams",
                    album: 2,
                    src: "/songs/Violent-Dreams.mp3",
                },
                {
                    id: 2,
                    title: "Suffocation - Memory Tapes Remix",
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
                        this.setState({ actualMenuIndex: 1, focusOptionIndex: 0, top: 2 });
                        break;

                    case 2:
                        this.setState({ actualMenuIndex: 2, focusOptionIndex: 0, top: 2 });
                        break;
                
                    default:
                        break;
                }
                
                break;

            case 1:
                const newList = this.state.albumsFilter;
                switch (this.state.focusOptionIndex) {
                    case 0:
                        newList[this.state.focusOptionIndex] = !newList[this.state.focusOptionIndex];
                        this.setState({ albumsFilter: [...newList], lastSongPlayed: null, lastSongPlayedCurrentTime: 0 });
                        break;

                    case 1:
                        newList[this.state.focusOptionIndex] = !newList[this.state.focusOptionIndex];
                        this.setState({ albumsFilter: [...newList], lastSongPlayed: null, lastSongPlayedCurrentTime: 0 });
                        break;

                    case 2:
                        newList[this.state.focusOptionIndex] = !newList[this.state.focusOptionIndex];
                        this.setState({ albumsFilter: [...newList], lastSongPlayed: null, lastSongPlayedCurrentTime: 0 });
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

            case 2:
                return <MenuSongs
                        focusOptionIndex={this.state.focusOptionIndex}
                        songs={this.state.songs}
                    />

            default:
                break;
        }
    }

    updateLastSongPlayed = (song, time) => {
        this.setState({ lastSongPlayed: song, lastSongPlayedCurrentTime: time });
    }

    render(){

        if (this.state.playerDisplay) {
            return(
                <Player
                    audio={this.state.audio}
                    closePlayer={this.closePlayer}
                    songs={this.state.playlist}
                    covers={this.state.covers}
                    lastSongPlayed={this.state.lastSongPlayed}
                    lastSongPlayedCurrentTime={this.state.lastSongPlayedCurrentTime}
                    updateLastSongPlayed={this.updateLastSongPlayed}
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
                        
                        onClick={() => this.setState({ actualMenuIndex: 0, focusOptionIndex: 0, top: 3 })}
                    >MENU</button>
                    
                    <button className="prev-btn"
                        onClick={() => {
                            if (this.state.focusOptionIndex > 0) {
                                this.setState({ focusOptionIndex: this.state.focusOptionIndex-1})
                            }
                        }}
                    >PREV</button>
                    
                    <button className="next-btn"
                        onClick={() => {
                            if (this.state.focusOptionIndex < this.state.top) {
                                this.setState({ focusOptionIndex: this.state.focusOptionIndex+1})
                            }
                        }}
                    >NEXT</button>
                    
                    <button className="play-pause-btn"
                        onClick={() => this.chooseOption()}
                    >P/P</button>
                    
                    <button className="mix-btn"
                    >LIST</button>
                    
                </div>
            </div>
        )

    }

}

export default Menu;
