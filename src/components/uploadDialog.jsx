import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Icon, FABButton, Snackbar } from 'react-mdl';

export default class UploadDialog extends React.Component {
    constructor(props) {
        super(props);

        // bind methods
        this.toggleDialog = this.toggleDialog.bind(this);
        this.onFileUpload = this.onFileUpload.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onSnackbarTimeout = this.onSnackbarTimeout.bind(this);

        this.state = {
            isOpen: false,
            inputValue: '',
            showSnackbar: false,
            snackbarText: '',
            // i found that the best way to manage the drag/drop state was to keep track of the count of enters/leaves
            // count <= 0, then has left. count > 0, then has entered.
            enterCount: 0,
        };
    }
    toggleDialog() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    onSnackbarTimeout() {
        this.setState({
            showSnackbar: false,
        });
    }

    onFileUpload(file) {
        if (!file) {
            this.setState({
                showSnackbar: true,
                snackbarText: 'Invalid File',
            });
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            console.log(reader.result);
        };
        reader.readAsText(file);
    }

    // drag and drop methods
    onDragEnter(evt) {
        evt.preventDefault();
        this.setState({
            enterCount: this.state.enterCount + 1,
        });
    }
    onDragLeave(evt) {
        evt.preventDefault();
        this.setState({
            enterCount: this.state.enterCount - 1,
        });
    }
    onDragOver(evt) {
        evt.preventDefault();
    }
    onDragEnd(evt) {
        evt.preventDefault();
    }

    onDrop(evt) {
        evt.preventDefault();
        this.onFileUpload(evt.dataTransfer.files[0]);
        this.setState({
            enterCount: 0,
        });
    }
    onInputChange(ev) {
        this.onFileUpload(ev.target.files[0]);
        // clear the input field in case the user wants to re-select the same file
        this.setState({
            inputValue: '',
        });
    }

    render() {
        const inputStyle = {
            opacity: 0,
            height: '100%',
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            cursor: 'pointer',
        };
        const labelStyle = {
            display: 'block',
            height: '100%',
            width: '100%',
            cursor: 'pointer',
            position: 'relative',
        };

        const isDropTarget = this.state.enterCount > 0;
        return (
            <span>
                <a className={this.props.className} href="#" onClick={this.toggleDialog}>
                    Upload Metadata.xml
                </a>
                <Dialog open={this.state.isOpen} style={{ width: '600px' }} onCancel={this.toggleDialog}
                        onDrop={this.onDrop}
                        onDragOver={this.onDragOver} onDragEnter={this.onDragEnter}
                        onDragEnd={this.onDragEnd} onDragLeave={this.onDragLeave}>

                    <DialogTitle>Select, or drop a metadata.xml file</DialogTitle>
                    <DialogContent style={{ textAlign: 'center' }}>
                        <FABButton colored style={{ display: isDropTarget ? 'none' : 'inline-block', cursor: 'pointer' }}>
                            <label style={labelStyle}>
                                <Icon name="file_upload" />
                                <input type="file" style={inputStyle} onChange={this.onInputChange} value={this.state.inputValue} />
                            </label>
                        </FABButton>
                        <h3 style={{ display: isDropTarget ? 'inline-block' : 'none' }}>Release to upload.</h3>
                    </DialogContent>
                    <DialogActions>
                        <Button type="button" onClick={this.toggleDialog}>Cancel</Button>
                    </DialogActions>
                </Dialog>
                <Snackbar active={this.state.showSnackbar} onTimeout={this.onSnackbarTimeout}
                          onClick={this.onSnackbarTimeout} action="Close">{this.state.snackbarText}</Snackbar>
            </span>
        );
    }
}
