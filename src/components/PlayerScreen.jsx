import React from "react";

class PlayerScreen extends React.Component {

    render(){
        return(
            <div>
                <div className="screen-title"
                    style={this.props.songsListDisplay ? {filter: "blur(0.07rem)"} : {}}
                >
                    <input className="progress-bar"
                        type="range"
                        value={this.props.currentSongCurrentTime}
                        min="0"
                        max={this.props.duration || 0}
                        onChange={(e) => {
                            if (!this.props.songsListDisplay) {
                                this.props.handleSeek(e);
                            }
                        }}
                    />
                    <p>{this.props.title || "()"}</p>

                    {
                        this.props.isSongsListShuffled ?
                            <div style={{scale: "0.9", opacity: "0.7", transform: "translate(-9rem, -20.8em)", backgroundColor: "white", height: "2rem", width: "2rem", borderRadius: "50%"}}>
                                <div style={{scale: "0.8", transform: "translate(0.1rem, 0.6rem)", display: "flex", gap: "0.05rem", backgroundColor: ""}}>
                                    <div style={{width: "0.8rem", height: "1rem", background: "linear-gradient(white 0%, white 49%, gray 50%, gray 100%)", borderRadius: "50%", transform: "rotate(-90deg)"}}>
                                        <div style={{scale: "0.7", width: "0.8rem", height: "1rem", background: "white", borderRadius: "50%"}}></div>
                                    </div>
                                    <div style={{width: "0.8rem", height: "1rem", background: "linear-gradient(white 0%, white 49%, gray 50%, gray 100%)", borderRadius: "50%", transform: "rotate(90deg)"}}>
                                        <div style={{scale: "0.7", width: "0.8rem", height: "1rem", background: "white", borderRadius: "50%"}}></div>
                                    </div>
                                    <div style={{transform: "translate(-0.5rem, -0.05rem)", width: "0", height: "0", borderTop: "0.2rem solid transparent",borderBottom: "0.2rem solid transparent",borderLeft: "0.4rem solid gray",}}></div>
                                    <div style={{transform: "translate(-0.95rem, 0.65rem)", width: "0", height: "0", borderTop: "0.2rem solid transparent",borderBottom: "0.2rem solid transparent",borderLeft: "0.4rem solid gray",}}></div>
                                </div>
                            </div>
                            :
                            null
                    }
                </div>

                <img id="screen-cover" className="screen-cover" alt="cover" 
                    src={this.props.cover} 
                    style={this.props.songsListDisplay ? {filter: "blur(0.07rem)"} : {}}
                />

                {
                    this.props.songsListDisplay ?
                        <div className="player-list-display">
                            <div id="player-songs-arrow" className="player-songs-arrow"></div>

                            <div id="player-songs-list" className="player-songs-list"
                                style={{marginTop: (-1.5 - ( 2.1 * (this.props.songListIndex)) + "rem")}}
                            >
                                {
                                    this.props.songs.map((elem, index) => {
                                        return(
                                            <div className={"player-list-song" + (this.props.songListIndex === index ? " focused-option player-list-song-focus" : "")}
                                                // style={{animation: `player-songs-list-appears 0.5s ease-in-out ${(0.03*(index+1)) + "s"} forwards`}}
                                            >
                                                <p style={elem.title.length > 23 && this.props.songListIndex === index ? {animation: "player-list-p-too-long-title 15s ease 0s infinite"} : {}}>
                                                    {elem.title}
                                                </p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        :
                        null
                }

                {
                    // Si la cancion esta en pausa y no esta visible la lista de canciones se aplica
                    //  un filtro de pausa
                    !this.props.isPlayingSong && !this.props.songsListDisplay?
                        <div className="player-pause-filter">
                            <div style={{backgroundColor: "rgba(255, 255, 255, 0.5)", width: "0.7rem", height: "2rem", margin: "auto 0.6rem auto auto"}}></div>
                            <div style={{backgroundColor: "rgba(255, 255, 255, 0.5)", width: "0.7rem", height: "2rem", margin: "auto auto auto 0"}}></div>
                        </div>
                        :
                        null
                }
            </div>
        )

    }

}

export default PlayerScreen;
