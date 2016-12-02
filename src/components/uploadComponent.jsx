import React from 'react';
import { Icon, FABButton } from 'react-mdl';

import { readFile } from '../flux/actions/readFile';
import store from '../flux/store';

export default class UploadComponent extends React.Component {
    constructor(props) {
        super(props);

        // bind methods
        this.onFileUpload = this.onFileUpload.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onInputChange = this.onInputChange.bind(this);

        this.state = {
            inputValue: '',
            // i found that the best way to manage the drag/drop state was to keep track of the count of enters/leaves
            // count <= 0, then has left. count > 0, then has entered.
            enterCount: 0,
        };
    }

    onFileUpload(file) {
        // send the file to the store
        store.dispatch(readFile(file));
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
        const isDropTarget = this.state.enterCount > 0;

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
        const buttonStyle = {
            display: isDropTarget ? 'none' : 'inline-block',
            cursor: 'pointer',
            marginTop: '24px',
            marginBottom: '24px',
        };
        const divContainerStyle = {
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '24px',
            borderStyle: isDropTarget ? 'dashed' : 'solid',
            borderColor: isDropTarget ? 'black' : 'rgba(0,0,0,0)',
            borderWidth: '2px',
        };
        const dropTitleStyle = {
            display: isDropTarget ? 'inline-block' : 'none',
            height: '56px',
        };

        return (
            <div style={divContainerStyle} onDrop={this.onDrop}
                 onDragOver={this.onDragOver} onDragEnter={this.onDragEnter}
                 onDragEnd={this.onDragEnd} onDragLeave={this.onDragLeave}>
                <h3>Select, or drop a metadata.xml file</h3>
                <FABButton colored style={buttonStyle}>
                    <label style={labelStyle}>
                        <Icon name='file_upload' />
                        <input type='file' style={inputStyle} onChange={this.onInputChange} value={this.state.inputValue} />
                    </label>
                </FABButton>
                <h3 style={dropTitleStyle}>Release to upload.</h3>
            </div>
        );
    }
}
