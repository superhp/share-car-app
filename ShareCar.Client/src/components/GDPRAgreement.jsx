import * as React from "react";
import Modal from 'react-responsive-modal';

export class GDPRAgreement extends React.Component<>{
    state = {
        open: false
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    handleCheck = () => {
        this.props.checkBoxClick();
    };

    render() {
        const { open } = this.state;
        return (
            <div>

                <div>
                    <input type="checkbox" onChange={this.handleCheck} defaultChecked={false} />

                   <span> I agree that my personal and Cognizant email will be saved. </span><a onClick={this.onOpenModal}>Read More.</a>
                </div>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <h2>GDPR</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                        pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
                        hendrerit risus, sed porttitor quam.
                   </p>
                </Modal>
            </div>

        );
    }
}
export default GDPRAgreement;