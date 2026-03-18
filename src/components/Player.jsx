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

    render(){
        return(
            <div className="aparato">
                <div className="screen">
                    {
                        this.state.currentSong ?
                            <PlayerScreen
                                cover={this.props.covers[this.state.currentSong.album-1]}
                                currentSongCurrentTime={this.state.currentSongCurrentTime}
                                duration={this.state.audio.duration}
                                title={this.state.currentSong?.title}
                                handleSeek={this.handleSeek}

                                songs={this.props.songs}
                                songsListDisplay={this.state.songsListDisplay}
                                songListIndex={this.state.songListIndex}
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
                    >PREV</button>
                    
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
                    >NEXT</button>
                    
                    <button className="play-pause-btn"
                        onClick={() => {
                            if (this.state.songsListDisplay) {
                                this.setState({ 
                                    songsListDisplay: !this.state.songsListDisplay, 
                                    currentSongCurrentTime: 0,
                                }, () => {
                                    this.playSong(this.state.songListIndex);
                                })
                            } else if (!this.state.isPlayingSong) {
                                this.playSong();
                            } else {
                                this.pauseSong();
                            }
                        }}
                    >P/P</button>
                    
                    <button className="mix-btn"
                        onClick={() => this.setState({ 
                            songsListDisplay: !this.state.songsListDisplay,
                            songListIndex: this.props.songs.indexOf(this.state.currentSong),
                         })}
                    >LIST</button>
                    
                </div>
            </div>
        )
    }
}

export default Aparato;