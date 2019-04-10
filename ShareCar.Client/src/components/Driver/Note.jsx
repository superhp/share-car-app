import * as React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "../../styles/note.css"
import "../../styles/genericStyles.css"
import api from "../../helpers/axiosHelper"

export class Note extends React.Component {

    state = {
        editing: false,
        value: this.props.noteValue ? this.props.noteValue : "",
        temporaryValue: this.props.noteValue ? this.props.noteValue : ""
    }

    render() {
        return (
            <div
                className="note-container"
            >
                {!this.state.editing
                    ? <div>
                        <div>
                            <TextField
                                disabled
                                id="outlined-disabled"
                                margin="normal"
                                multiline
                                variant="outlined"
                                value={this.state.value}
                            />
                        </div>
                        <div>
                            <Button
                                variant="contained"
                                className="generic-color"
                                onClick={() => { this.setState({ editing: true }) }}
                            >
                                Edit
                </Button>
                        </div>
                    </div>
                    : <div>
                        <div>
                            <TextField
                                id="outlined-disabled"
                                multiline
                                onChange={(e) => { this.setState({ temporaryValue: e.target.value }) }}
                                margin="normal"
                                variant="outlined"
                                value={this.state.temporaryValue}
                            />
                        </div>
                        <div>
                            <Button
                                variant="contained"
                                className="save-btn"
                                onClick={() => { this.setState({ editing: false, value:this.state.temporaryValue }, () => {this.props.updateNote(this.state.value)}) }}
                            >
                                Save
                                        </Button>
                            <Button
                                variant="contained"
                                className="cancel-btn"
                                onClick={() => { this.setState({ temporaryValue : this.state.value, editing: false }) }}
                            >
                                Cancel
                                        </Button>
                        </div>
                    </div>
                }
            </div>
        );
    }
}