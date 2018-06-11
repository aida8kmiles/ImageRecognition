import {MyConstants} from './MyConstants.js';
const MyReducer = (state = {
  example: null,
  tab: 'upload', //upload, request(s), monitor
  list: null,
  images: {},
  images_highres: {},
  learn: 'pending',
  search: 'pending',
  image: '',
  image_name: '',
  progress_bar: {},
  imageMatch: null,
  uploadedFiles: null,
  searchProgress: false,
  monitor_bandwidth: 0,
  monitor_cpu: 0,
  monitor_disk: 0,
  monitor_memory: 0,
  monitor_logs: '',
}, action) => {

  switch(action.type) {
	  case 'SET_BANDWIDTH':
		  state = {
			...state,
			monitor_bandwidth: action.payload
		  };
		  break;
	  case 'SET_CPU':
		  state = {
			...state,
			monitor_cpu: action.payload
		  };
		  break;
	  case 'SET_DISK':
		  state = {
			...state,
			monitor_disk: action.payload
		  };
		  break;
	  case 'SET_MEMORY':
		  state = {
			...state,
			monitor_memory: action.payload
		  };
		  break;
	  case 'SET_LOGS':
		  state = {
			...state,
			monitor_logs: action.payload
		  };
		  break;
	  case 'SET_IMAGE':
		  state = {
			...state,
			image: action.payload
		  };
		  break;
	  case 'SET_IMAGE_NAME':
		  state = {
			...state,
			image_name: action.payload
		  };
		  break;
	  case 'SEARCH_PROGRESS':
		  state = {
			...state,
			searchProgress: action.payload
		  };
		  break;
	  case 'GET_AWS_IMAGE_MATCH_CUSTOM':
	  case 'GET_AWS_IMAGE_MATCH_FULFILLED':
		  state = {
			...state,
			imageMatch: action.payload
		  };
	  		break;
    case MyConstants.TEST:
      state = {
        ...state,
        example: action.payload
      };
      break;
    case MyConstants.TAB:
      state = {
        ...state,
        tab: action.payload
      };
      break;
	case MyConstants.LEARN:
      state = {
        ...state,
        learn: action.payload
      };
      break;
	case MyConstants.SEARCH:
      state = {
        ...state,
        search: action.payload
      };
      break;
	case 'UPLOADED_FILES':
		state = {
			...state,
			uploadedFiles: action.payload
		};
		break;
	case 'GET_AWS_LIST_FULFILLED':
		state = {
			...state,
			list: action.payload
		};
		break;
	case 'GET_AWS_IMAGE':
	case 'GET_AWS_IMAGE_FULFILLED':
		let images = state.images;
		images[action.payload.name] = action.payload.data;
		state = {
			...state,
			images: images
		};
		break;
	case 'GET_AWS_IMAGE_HIGH_CLEAR':
		state = {
			...state,
			images_highres: {},
		};
		break;
	case 'GET_AWS_IMAGE_HIGH_FULFILLED':
		let images_highres = state.images_highres;
		images_highres[action.payload.name] = action.payload.data;
		state = {
			...state,
			images_highres: images_highres
		};
		break;
	case 'GET_AWS_IMAGE_HIGH_REJECTED':
		let images_highresErr = state.images_highres;
		images_highresErr[action.payload.name] = action.payload.data;
		state = {
			...state,
			images_highres: images_highresErr
		};
		break;
	case 'GET_AWS_IMAGE_ALL':
		state = {
			...state,
			images: action.payload
		};
		break;
	case 'GET_AWS_PROGRESS_BAR':
		let progress_bar = state.progress_bar;
		progress_bar[action.payload.key] = action.payload.perc;
		state = {
			...state,
			progress_bar: progress_bar
		};
		break;
    default:
      break;
  }

  return state;
};

export default MyReducer;