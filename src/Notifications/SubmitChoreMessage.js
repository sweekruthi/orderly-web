import React, {Component} from 'react';
import DragAndDrop from "./DragAndDrop";
import Request from "superagent";
import {USER_INFO_URL} from "../App/URLStor";
import Cookies from 'js-cookie';
import MemberCircle from "../Households/MemberCircle";

class SubmitChoreMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            name: this.getSubmitter(),
            members: [],
            submitted: false
        }
        this.createMemberCircles = this.createMemberCircles.bind(this);
        this.submitMessage = this.submitMessage.bind(this);
    }

    handleDrop = (files) => {
        if (!this.state.submitted) {
            let fileList = this.state.files
            for (let i = 0; i < files.length; i++) {
                if (!files[i].name) return
                fileList.push(URL.createObjectURL(files[i]))
            }
            this.setState({files: fileList})
        }
    }

    setContent() {
        if (this.state.files.length === 0) {
            return <div className='submit-box-text'>Add Files Here</div>
        } else {
            return <img src={this.state.files[0]} alt="cant find" width='100%' height='100%'/>
        }
    }

    getSubmitter() {
        let userRequestObject = {
            username: Cookies.get('username')
        }
        let result = "";
        Request
            .post(USER_INFO_URL)
            .send(userRequestObject)
            .then(res => {
                result = res.body.firstname + " " + res.body.lastname;
            })
        return result;
    }

    createMemberCircles() {
        let members = [];
        for (let i = 0; i < this.state.members.length; i++) {
            members.push(<MemberCircle circleSize={20} nameSize="10pt" member={this.state.members[i]}
                                       memberSpacing='approve-member-spacing'/>)
        }

        return members;
    }

    submitMessage(e) {
        this.props.submit();
        e.currentTarget.classList.toggle('submit-button-hidden');
        document.querySelector('.option-button-selected').classList.toggle('option-button-selected');
        this.setState(
            {
                submitted: true
            }
        )
    }

    render() {
        return (
            <div className='submit-message'>
                <DragAndDrop handleDrop={this.handleDrop} submitted={this.state.submitted}>
                <div style={{height: 150, width: 150}}>
                    {this.setContent()}
                </div>
                </DragAndDrop>
                <div className='submit-details'>
                    <div className='submit-title'>Submitted By: evan bacon{this.state.name}</div>
                    <div className='submit-approve'>
                        <div className='approved-title'>Approved By: </div>
                        {this.createMemberCircles()}
                    </div>
                </div>
                <button className='submit-button' onClick={this.submitMessage}>Submit</button>
            </div>
        )
    }
}

export default SubmitChoreMessage;