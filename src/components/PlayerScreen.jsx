import React from "react";

class PlayerScreen extends React.Component {

    // constructor(props) {
    //     super(props);
    // }

    render(){

        return(
            <div>
                <div className="screen-title">
                    <input className="progress-bar"
                        type="range"
                        value={this.props.currentSongCurrentTime}
                        min="0"
                        max={this.props.duration || 0}
                        onChange={this.props.handleSeek}
                    />
                    <p>{this.props.title || "()"}</p>
                </div>

                <img id="screen-cover" className="screen-cover" alt="cover" 
                    src={this.props.cover} 
                />

                {
                    this.props.songsListDisplay ?
                        <div className="player-list-display">
                            <div className="player-songs-arrow"></div>

                            <div className="player-songs-list"
                                style={{marginTop: (-1.5 - ( 2.1 * (this.props.songListIndex)) + "rem")}}
                            >
                                {
                                    this.props.songs.map((elem, index) => {
                                        return(
                                            <div className={"player-list-song" + (this.props.songListIndex === index ? " focused-option player-list-song-focus" : "")}>
                                                {elem.title}
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
