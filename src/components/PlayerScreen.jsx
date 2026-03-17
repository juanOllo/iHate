import React from "react";

class PlayerScreen extends React.Component {

    // constructor(props) {
    //     super(props);
    // }

    render(){

        return(
            <div>
                <img id="screen-cover" className="screen-cover" alt="cover" 
                    src={this.props.cover} 
                />
                            
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
            </div>
        )

    }

}

export default PlayerScreen;
