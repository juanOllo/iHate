import React from "react";

class PlayerScreen extends React.Component {

    // constructor(props) {
    //     super(props);
    // }

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
                                                <p style={elem.title.length > 23 && this.props.songListIndex === index ? {animation: "player-list-p-too-long-title 15s ease 2s infinite"} : {}}>
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
            </div>
        )

    }

}

export default PlayerScreen;
