import React from 'react';
import { Dialog, DialogContent, DialogActions, Button } from 'react-mdl';
import UploadComponent from './uploadComponent.jsx';

export default class UploadDialog extends React.Component {
    constructor(props) {
        super(props);

        // bind methods
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);

        this.state = {
            isOpen: false,
        };
    }
    openDialog() {
        this.setState({
            isOpen: true,
        });
    }
    closeDialog() {
        this.setState({
            isOpen: false,
        });
    }

    render() {
        return (
            <span>
                <a className={this.props.className} href='#' onClick={this.openDialog}>
                    Upload Metadata.xml
                </a>
                <Dialog open={this.state.isOpen} style={{ width: '600px' }} onCancel={this.closeDialog}>
                    <DialogContent style={{ textAlign: 'center', padding: '0' }}>
                        <UploadComponent onUpload={this.closeDialog} />
                    </DialogContent>
                    <DialogActions>
                        <Button type='button' onClick={this.closeDialog}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </span>
        );
    }
}