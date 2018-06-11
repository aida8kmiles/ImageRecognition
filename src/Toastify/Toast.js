import React, {Component} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Toast.css';
//https://github.com/fkhadra/react-toastify#installation

class Toast extends Component {
	notify() {
		toast("Wow so easy !", {
			position: toast.POSITION.BOTTOM_RIGHT,
			className: 'dark-toast',
			progressClassName: 'transparent-progress',
			bodyClassName: 'dark-toast-body',
			autoClose: 500000
		});
	}

	render() {
		return (
			<div>
				<button onClick={this.notify.bind(this)}>Notify !</button>
          		<ToastContainer />
			</div>
		);
	}
}

export default Toast;