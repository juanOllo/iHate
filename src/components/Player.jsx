import React from "react";
import PlayerScreen from "./PlayerScreen.jsx"

class Aparato extends React.Component {
    constructor(props) {
        super(props);

        this.audioRef = React.createRef();

        this.state={
            // audio: new Audio(),
            audio: this.props.audio,
            currentSong: null,
            currentSongCurrentTime: this.props.lastSongPlayedCurrentTime || 0,
            // currentSongCoverIndex: this.props.lastSongPlayed?.album-1 || this.props.songs[0].album-1 || 0,
            currentSongCoverIndex: this.props.lastSongPlayed?.album-1 || 0,
            isPlayingSong: false,

            songsListDisplay: false,
            songListIndex: 0,
        }
    }

    componentDidMount() {
        const audio = this.state.audio;

        audio.addEventListener("timeupdate", () => {
            this.setState({ currentSongCurrentTime: audio.currentTime });
        });

        audio.addEventListener("loadedmetadata", () => {
            this.forceUpdate(); // para que el max del input se actualice
        });

        audio.addEventListener("ended", () => {
            this.playNextSong();
        })

        this.playSong(this.props.songs.indexOf(this.props.lastSongPlayed) || 0);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.currentSong !== this.state.currentSong) {
            const nuevoIndice = this.props.songs.indexOf(this.state.currentSong);

            if (nuevoIndice !== this.state.songListIndex) {
                this.setState({ songListIndex: nuevoIndice });
            }
        }
    }

    handleTimeUpdate = () => {
        this.setState({ currentSongCurrentTime: this.audioRef.current.currentTime });
    };

    // handleLoadedMetadata = () => {
    //     this.setState({ duration: this.audioRef.current.duration });
    // };

    handleSeek = (e) => {
        const newTime = e.target.value;
        // this.audioRef.current.currentTime = newTime;
        this.state.audio.currentTime = newTime;
        this.setState({ currentSongCurrentTime: newTime });
    };


    playSong(index){
        // Innecesario?
        this.pauseSong();

        let currentSong = this.state.currentSong || null;

        if(index >= 0){
            currentSong = this.props.songs[index];
        } else if (!this.state.currentSong) {
            currentSong = this.props.songs[0];
        } 

        const audio = this.state.audio;
        audio.src = currentSong.src;
        audio.currentTime = this.state.currentSongCurrentTime || 0;

        this.setState({
            currentSong,
            isPlayingSong: true,
            audio,
        }, () => {
            setTimeout(() => {
                this.state.audio.play();
            }, 100);
        })
    }

    pauseSong(){
        this.setState({
            isPlayingSong: false,
            currentSongCurrentTime:this.state.audio.currentTime,
        })

        this.state.audio.pause();
    }

    playNextSong(){
        if (!this.state.currentSong) {
            return;
        } else if (this.props.songs.indexOf(this.state.currentSong) < (this.props.songs.length - 1)) {
            const cover = document.getElementById("screen-cover");
            cover.style.animation = "screen-cover-disappear-to-left 0.5s ease-in-out 0s forwards";
            setTimeout(() => {
                this.setState({
                    currentSongCurrentTime: 0,
                }, () => {
                    this.playSong(this.props.songs.indexOf(this.state.currentSong) + 1);
                    cover.style.animation = "screen-cover-appear-from-right 0.5s ease-in-out 0.15s forwards";
                })
            }, 500);
        }
    }

    playPrevSong(){
        if (this.state.audio.currentTime < 10 && this.props.songs.indexOf(this.state.currentSong) > 0) {
            const cover = document.getElementById("screen-cover");
                cover.style.animation = "screen-cover-disappear-to-right 0.5s ease-in-out 0s forwards";
            setTimeout(() => {
                this.setState({
                    currentSongCurrentTime: 0,
                }, () => {
                    this.playSong(this.props.songs.indexOf(this.state.currentSong) - 1);
                    cover.style.animation = "screen-cover-appear-from-left 0.5s ease-in-out 0.15s forwards";
                })
            }, 500);
            
        } else {
            this.setState({
                currentSongCurrentTime: 0,
            }, () => {
                this.playSong();
            })
        }
    }

    disappearSongsListAnims(){
        const songsList = document.getElementById("player-songs-list");
        songsList.style.animation= "player-songs-list-disappears 0.3s ease-in-out 0s forwards";
        const arrowSongsList = document.getElementById("player-songs-arrow");
        arrowSongsList.style.animation= "fade-out 0.2s ease-in-out 0s forwards";

    }

    render(){
        return(
            <div className="aparato">
                <div className="screen">
                    {
                        this.state.currentSong ?
                            <PlayerScreen
                                cover={this.state.currentSong.album_cover}
                                currentSongCurrentTime={this.state.currentSongCurrentTime}
                                duration={this.state.audio.duration}
                                title={this.state.currentSong?.title}
                                handleSeek={this.handleSeek}

                                songs={this.props.songs}
                                songsListDisplay={this.state.songsListDisplay}
                                songListIndex={this.state.songListIndex}

                                isPlayingSong={this.state.isPlayingSong}
                            />
                            :
                            null
                    }
                </div>
                <div className="pad">
                    <button className="menu-btn"
                        onClick={() => {
                            this.props.updateLastSongPlayed(this.state.currentSong, this.state.currentSongCurrentTime);
                            this.pauseSong();
                            this.props.closePlayer();
                        }}
                    >MENU</button>
                    
                    <button className="prev-btn"
                        onClick={() => {
                            if (this.state.songsListDisplay) {
                                if (this.state.songListIndex > 0) {
                                    this.setState({ songListIndex: this.state.songListIndex - 1})                                
                                }
                            } else {
                                this.playPrevSong()
                            }
                        }}
                    >
                        <div style={{scale: "0.95", transform: "rotate(180deg)"}}>
                            <div style={{transform: "translate(-0.5rem, 0.9rem)", width: "0", height: "0", borderTop: "0.4rem solid transparent",borderBottom: "0.4rem solid transparent",borderLeft: "0.8rem solid rgb(93, 93, 93)",}}></div>
                            <div style={{transform: "translate(0.15rem, 0.08rem)", width: "0", height: "0", borderTop: "0.4rem solid transparent",borderBottom: "0.4rem solid transparent",borderLeft: "0.8rem solid rgb(93, 93, 93)",}}></div>
                            <div style={{transform: "translate(0.75rem, -0.8rem)", width: "0.25rem", height: "0.9rem", backgroundColor: "rgb(93, 93, 93)"}}></div>
                        </div>
                    </button>
                    
                    <button className="next-btn"
                        onClick={() => {
                            if (this.state.songsListDisplay) {
                                if (this.state.songListIndex < this.props.songs.length-1) {
                                    this.setState({ songListIndex: this.state.songListIndex + 1})      
                                }
                            } else {
                                this.playNextSong()
                            }
                        }}
                    >
                        <div style={{scale: "0.95"}}>
                            <div style={{transform: "translate(-0.5rem, 0.8rem)", width: "0", height: "0", borderTop: "0.4rem solid transparent",borderBottom: "0.4rem solid transparent",borderLeft: "0.8rem solid rgb(93, 93, 93)",}}></div>
                            <div style={{transform: "translate(0.15rem, -0.02rem)", width: "0", height: "0", borderTop: "0.4rem solid transparent",borderBottom: "0.4rem solid transparent",borderLeft: "0.8rem solid rgb(93, 93, 93)",}}></div>
                            <div style={{transform: "translate(0.75rem, -0.9rem)", width: "0.25rem", height: "0.9rem", backgroundColor: "rgb(93, 93, 93)"}}></div>
                        </div>
                    </button>
                    
                    <button className="play-pause-btn"
                        onClick={() => {

                            // Reproduce la cancion seleccionada de la lista
                            if (this.state.songsListDisplay) {
                                this.disappearSongsListAnims();

                                setTimeout(() => {
                                    this.setState({ songsListDisplay: !this.state.songsListDisplay })
                                }, 310);

                                // Evita la seleccion de la cancion actual
                                if (this.state.songListIndex !== this.props.songs.indexOf(this.state.currentSong)) {
                                    this.setState({ 
                                        currentSongCurrentTime: 0,
                                    }, () => {
                                        this.playSong(this.state.songListIndex);
                                    })
                                }

                            // Inicia o pausa la cancion actual
                            } else if (!this.state.isPlayingSong) {
                                this.playSong();
                            } else {
                                this.pauseSong();
                            }
                        }}
                    >
                        <div style={{scale: "0.95"}}>
                            <div style={{transform: "translate(-0.5rem, 0.9rem)", width: "0", height: "0", borderTop: "0.4rem solid transparent",borderBottom: "0.4rem solid transparent",borderLeft: "0.8rem solid rgb(93, 93, 93)",}}></div>
                            <div style={{transform: "translate(0.5rem, 0.05rem)", width: "0.25rem", height: "0.9rem", backgroundColor: "rgb(93, 93, 93)"}}></div>
                            <div style={{transform: "translate(1rem, -0.85rem)", width: "0.25rem", height: "0.9rem", backgroundColor: "rgb(93, 93, 93)"}}></div>
                        </div>
                    </button>
                    
                    <button className="mix-btn"
                        onClick={() => {
                            if (this.state.songsListDisplay) {
                                this.disappearSongsListAnims();
                            }
                            setTimeout(() => {
                                this.setState({ 
                                    songsListDisplay: !this.state.songsListDisplay,
                                    songListIndex: this.props.songs.indexOf(this.state.currentSong),
                                })
                            }, 310);
                        }}
                    >
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

export default Aparato;