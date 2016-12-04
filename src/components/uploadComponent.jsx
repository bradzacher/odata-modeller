import React from 'react';
import { Icon, FABButton, Snackbar } from 'react-mdl';

import { readFile } from '../flux/actions/readFile';
import store from '../flux/store';

let id = 0;

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
        this.onSnackbarTimeout = this.onSnackbarTimeout.bind(this);

        this.state = {
            inputValue: '',
            showSnackbar: false,
            snackbarText: '',
            // i found that the best way to manage the drag/drop state was to keep track of the count of enters/leaves
            // count <= 0, then has left. count > 0, then has entered.
            enterCount: 0,
        };

        this.id = id;
        id += 1;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.parseError) {
            this.setState({
                showSnackbar: true,
                snackbarText: nextProps.parseError,
            });
        }
    }

    onFileUpload(file) {
        if (this.props.hasExistingMetadata) {
            // todo - make nicer....
            if (!confirm('You have existing metadata - do you want to overwrite it?')) {
                return;
            }
        }
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

    onSnackbarTimeout() {
        this.setState({
            showSnackbar: false,
        });
    }

    render() {
        const isDropTarget = this.state.enterCount > 0;

        const inputStyle = {
            opacity: 0,
            height: 'calc(100% - 48px)',
            width: '100%',
            position: 'absolute',
            top: '24px',
            left: 0,
            cursor: 'pointer',
        };
        const labelStyle = {
            display: 'block',
            marginTop: '24px',
            marginBottom: '24px',
            cursor: 'pointer',
        };
        const buttonStyle = {
            display: isDropTarget ? 'none' : 'inline-block',
            cursor: 'pointer',
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

        const inputId = `upload-button${this.id}`;

        return (
            <div style={divContainerStyle} onDrop={this.onDrop}
                 onDragOver={this.onDragOver} onDragEnter={this.onDragEnter}
                 onDragEnd={this.onDragEnd} onDragLeave={this.onDragLeave}>
                <h3>Select, or drop a metadata.xml file</h3>
                <div style={{ position: 'relative' }}>
                    <label style={labelStyle} htmlFor={inputId}>
                        <FABButton colored style={buttonStyle}>
                            <Icon name='file_upload' />
                        </FABButton>
                    </label>
                    <input type='file' name={inputId} style={inputStyle} onChange={this.onInputChange} value={this.state.inputValue} />
                </div>
                <h3 style={dropTitleStyle}>Release to upload.</h3>
                <Snackbar active={this.state.showSnackbar} onTimeout={this.onSnackbarTimeout}
                          onClick={this.onSnackbarTimeout} action='Close'>
                    {this.state.snackbarText}
                </Snackbar>
            </div>
        );
    }
}

UploadComponent.defaultProps = {
    hasExistingMetadata: false,
    parseError: null,
};

UploadComponent.propTypes = {
    hasExistingMetadata: React.PropTypes.bool,
    parseError: React.PropTypes.string,
};
