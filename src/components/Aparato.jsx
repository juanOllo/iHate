import React from "react";
import Player from "./Player.jsx"
import MenuMain from "./MenuMain.jsx";
import MenuSelectAlbums from "./MenuSelectAlbums.jsx";
import MenuInfo from "./MenuInfo.jsx";
import dataSongs from "../data/songs.js";


class Menu extends React.Component {

    constructor(props) {
        super(props);

        this.state={
            audio: new Audio(),

            playerDisplay: false,
            songs: [],
            playlist: [],

            focusOptionIndex: 0,
            actualMenuIndex: 0,

            albumsFilter: [true, true, true],
            top: 4, //Cambiar nombre

            lastSongPlayed: null,
            lastSongPlayedCurrentTime: 0,

            isSongsListShuffled: false,
        }

    }

    componentDidMount(){
        this.setState({
            songs: dataSongs
        });
    }

    closePlayer = () => {
        this.setState({ playerDisplay: false });
    }

    shuffleSongs(){
        if (!this.state.isSongsListShuffled) {
            const playlist = [...this.state.songs];
            playlist.sort(() => Math.random() - 0.5)
            
            this.setState({ songs: [...playlist] })
        } else {
            this.setState({ songs: dataSongs })
        }
        
        this.setState({
            isSongsListShuffled: !this.state.isSongsListShuffled,
            lastSongPlayed: null,
            lastSongPlayedCurrentTime: 0,
        })
    }

    chooseOption(){
        switch (this.state.actualMenuIndex) {
            // MenuMain
            case 0:
                switch (this.state.focusOptionIndex) {
                    case 0:
                        // const playlist = [...this.state.songs];

                        if (!this.state.albumsFilter.every(valor => valor === true)) {
                            const playlist = this.state.songs.filter(elem => this.state.albumsFilter[elem.album-1]);

                            // No permite abrir el player si la lisa de canciones esta vacia
                            if (playlist.length <= 0) { return; }
                            
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
                        this.shuffleSongs();
                        break;

                    case 3:
                        this.setState({ actualMenuIndex: 2, focusOptionIndex: 0, top: 31 });
                        break;

                    case 4:
                        window.location.href = "https://github.com/juanOllo";
                        break;
                
                    default:
                        break;
                }
                
                break;

            // MenuSelectAlbum
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
                return <MenuMain 
                        focusOptionIndex={this.state.focusOptionIndex}
                        isSongsListShuffled={this.state.isSongsListShuffled}
                    />

            case 1:
                return <MenuSelectAlbums 
                        focusOptionIndex={this.state.focusOptionIndex}
                        albumsFilter={this.state.albumsFilter}
                    />

            case 2:
                return <MenuInfo
                        focusOptionIndex={this.state.focusOptionIndex}
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
                    lastSongPlayed={this.state.lastSongPlayed}
                    lastSongPlayedCurrentTime={this.state.lastSongPlayedCurrentTime}
                    updateLastSongPlayed={this.updateLastSongPlayed}
                    isSongsListShuffled={this.state.isSongsListShuffled}
                ></Player>
            )
        }

        return(
            <div className="aparato menu">
                <div className="screen">
                    { this.returnMenuDisplay() }
                </div>
                <div className="pad">
                    <button className="menu-btn"
                        
                        onClick={() => this.setState({ actualMenuIndex: 0, focusOptionIndex: 0, top: 4 })}
                    >MENU</button>
                    
                    <button className="prev-btn"
                        onClick={() => {
                            if (this.state.focusOptionIndex > 0) {
                                this.setState({ focusOptionIndex: this.state.focusOptionIndex-1})
                            }
                        }}
                    >
                        {/* PREV */}
                        <div style={{scale: "0.95", transform: "rotate(180deg)"}}>
                            <div style={{transform: "translate(-0.5rem, 0.9rem)", width: "0", height: "0", borderTop: "0.4rem solid transparent",borderBottom: "0.4rem solid transparent",borderLeft: "0.8rem solid rgb(93, 93, 93)",}}></div>
                            <div style={{transform: "translate(0.15rem, 0.08rem)", width: "0", height: "0", borderTop: "0.4rem solid transparent",borderBottom: "0.4rem solid transparent",borderLeft: "0.8rem solid rgb(93, 93, 93)",}}></div>
                            <div style={{transform: "translate(0.75rem, -0.8rem)", width: "0.25rem", height: "0.9rem", backgroundColor: "rgb(93, 93, 93)"}}></div>
                        </div>
                    </button>
                    
                    <button className="next-btn"
                        onClick={() => {
                            if (this.state.focusOptionIndex < this.state.top) {
                                this.setState({ focusOptionIndex: this.state.focusOptionIndex+1})
                            }
                        }}
                    >
                        {/* NEXT */}
                        <div style={{scale: "0.95"}}>
                            <div style={{transform: "translate(-0.5rem, 0.8rem)", width: "0", height: "0", borderTop: "0.4rem solid transparent",borderBottom: "0.4rem solid transparent",borderLeft: "0.8rem solid rgb(93, 93, 93)",}}></div>
                            <div style={{transform: "translate(0.15rem, -0.02rem)", width: "0", height: "0", borderTop: "0.4rem solid transparent",borderBottom: "0.4rem solid transparent",borderLeft: "0.8rem solid rgb(93, 93, 93)",}}></div>
                            <div style={{transform: "translate(0.75rem, -0.9rem)", width: "0.25rem", height: "0.9rem", backgroundColor: "rgb(93, 93, 93)"}}></div>
                        </div>
                    </button>
                    
                    <button className="play-pause-btn"
                        onClick={() => this.chooseOption()}
                    >
                        {/* P/P */}
                        <div style={{scale: "0.95"}}>
                            <div style={{transform: "translate(-0.5rem, 0.9rem)", width: "0", height: "0", borderTop: "0.4rem solid transparent",borderBottom: "0.4rem solid transparent",borderLeft: "0.8rem solid rgb(93, 93, 93)",}}></div>
                            <div style={{transform: "translate(0.5rem, 0.05rem)", width: "0.25rem", height: "0.9rem", backgroundColor: "rgb(93, 93, 93)"}}></div>
                            <div style={{transform: "translate(1rem, -0.85rem)", width: "0.25rem", height: "0.9rem", backgroundColor: "rgb(93, 93, 93)"}}></div>
                        </div>
                    </button>
                    
                    <button className="mix-btn">
                        {/* LIST */}
                        <div>
                            <div style={{width: "0.25rem", height: "1.1rem", backgroundColor: "rgb(93, 93, 93)", transform: "rotate(90deg)", borderRadius: "5px"}}></div>
                            <div style={{width: "0.25rem", height: "1.1rem", backgroundColor: "rgb(93, 93, 93)", transform: "rotate(90deg)", borderRadius: "5px", margin: "-0.7rem 0"}}></div>
                            <div style={{width: "0.25rem", height: "1.1rem", backgroundColor: "rgb(93, 93, 93)", transform: "rotate(90deg)", borderRadius: "5px"}}></div>
                        </div>
                    </button>
                    
                </div>
            </div>
        )

    }

}

export default Menu;
