import axios from "axios";
import { serverOrigin } from "../config";
import { ACTION_TYPE } from "./actions";

const controls = {
	[ ACTION_TYPE.FETCH_FROM_API ]: ( action ) => {
		return axios.get( action.path );
	},
	[ ACTION_TYPE.GRAPHQL ]: ( action ) => {
		return axios.post( serverOrigin + "/graphql", action.data );
	},
};
export default controls;
