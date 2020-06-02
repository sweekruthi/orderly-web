import React, {Component} from 'react';
import DragAndDrop from "./DragAndDrop";
import Request from "superagent";
import {USER_INFO_URL} from "../App/URLStor";
import Cookies from 'js-cookie';

class SubmitChoreMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            name: this.getSubmitter(),
            members: []
        }
    }

    handleDrop = (files) => {
        let fileList = this.state.files
        for (let i = 0; i < files.length; i++) {
            if (!files[i].name) return
            fileList.push(URL.createObjectURL(files[i]))
        }
        this.setState({files: fileList})
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

    createMembersCircle() {

    }

    render() {
        return (
            <div className='submit-message'>
                <DragAndDrop handleDrop={this.handleDrop}>
                <div style={{height: 150, width: 150}}>
                    {this.setContent()}
                </div>
                </DragAndDrop>
                <div className='submit-details'>
                    <div className='submit-title'>Submitted By: {this.state.name}</div>
                    <div>
                        <div className='approved-title'>Approved By: </div>
                        {this.createMemberCircles()}
                    </div>
                </div>
            </div>
        )
    }
}

export default SubmitChoreMessage;