import React from "react";
// import albumCover from "../temp/crystal-castles-album-1.jpg";
// import cancion from "../temp/Kerosene.mp3";

class Aparato extends React.Component {
    constructor(props) {
        super(props);

        this.audioRef = React.createRef();

        this.state={
            audio: new Audio(),
            songs: [],
            covers: [],
            currentSong: null,
            currentSongCurrentTime: 0,
            currentSongCoverIndex: 0,
            isPlayingSong: false,
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
        if (!this.state.currentSong) {
            this.state.currentSong = this.state.songs[0];
        } else if(index >= 0){
            this.state.currentSong = this.state.songs[index];
        }

        this.state.isPlayingSong = true;
        this.state.audio.src = this.state.currentSong.src;
        // this.state.audio.title = this.state.currentSong.title;
        this.state.audio.currentTime = this.state.currentSongCurrentTime || 0;

        this.state.audio.play();
    }

    pauseSong(){
        this.state.isPlayingSong = false;
        this.state.currentSongCurrentTime= this.state.audio.currentTime;

        this.state.audio.pause();
    }

    prevSong(){
        if (this.state.audio.currentTime < 10 && this.state.songs.indexOf(this.state.currentSong) > 0) {
            this.state.currentSongCurrentTime = 0;
            this.state.audio.currentTime = 0;
            this.playSong(this.state.songs.indexOf(this.state.currentSong) - 1);

            const tapa = document.getElementById("screen-tapa");
            tapa.style.animation = "screen-tapa-disappear 0.6s ease-in-out 0s forwards";
            setTimeout(() => {
                this.state.currentSongCoverIndex = this.state.currentSong.album - 1;
                tapa.style.animation = "screen-tapa-appear 0.6s ease-in-out 0.1s forwards";
            }, 700);
        } else {
            this.state.currentSongCurrentTime = 0;
            this.state.audio.currentTime = 0;
        }
    }

    nextSong(){
        if (!this.state.currentSong) {
            return;
        } else if (this.state.songs.indexOf(this.state.currentSong) < (this.state.songs.length - 1)) {
            this.state.currentSongCurrentTime = 0;
            this.state.audio.currentTime = 0;
            this.playSong(this.state.songs.indexOf(this.state.currentSong) + 1);

            const tapa = document.getElementById("screen-tapa");
            tapa.style.animation = "screen-tapa-disappear 0.6s ease-in-out 0s forwards";
            setTimeout(() => {
                this.state.currentSongCoverIndex = this.state.currentSong.album - 1;
                tapa.style.animation = "screen-tapa-appear 0.6s ease-in-out 0.1s forwards";
            }, 700);
        }
    }

    render(){
        return(
            <div className="aparato">
                <div className="screen">
                    {
                        this.state.currentSong ? 
                            <img id="screen-tapa" className="screen-tapa" src={this.state.covers[this.state.currentSongCoverIndex]} alt="cover" />
                            :
                            <div style={{width: "100%", height: "100%"}} alt="cover" />
                    }
                    <div className="screen-title">
                        <input className="progress-bar"
                            type="range"
                            value={this.state.currentSongCurrentTime}
                            min="0"
                            max={this.state.audio.duration || 0}
                            onChange={this.handleSeek}
                        />
                        <p>{this.state.currentSong?.title || "."}</p>
                    </div>
                </div>
                <div className="pad">
                    <button className="menu-btn">MENU</button>
                    
                    <button className="prev-btn"
                        onClick={() => this.prevSong()}
                    >PREV</button>
                    
                    <button className="next-btn"
                        onClick={() => this.nextSong()}
                    >NEXT</button>
                    
                    <button className="play-pause-btn"
                        onClick={() => {
                            if (!this.state.isPlayingSong) {
                                this.playSong();
                            } else {
                                this.pauseSong();
                            }
                        }}
                    >P/P</button>
                    
                    <button className="mix-btn">MIX</button>
                    
                </div>
            </div>
        )
    }
}

export default Aparato;