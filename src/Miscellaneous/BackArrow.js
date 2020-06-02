import React, {Component} from 'react';
import { FaArrowLeft } from 'react-icons/fa';

class BackArrow extends Component {
    render() {
        return(
            <button className='back-arrow' onClick={this.props.goBack}>
                <FaArrowLeft size={45}/>
            </button>
        );
    }
}

export default BackArrow
