// module for creating AJAX request to API

import axios from 'axios';

axios.defaults.baseURL = 'http://fe-zadanie.herokuapp.com';

export default {
	// get all feeds from DB
	getAllFeeds() {
		return axios.get('/feeds');
	},
	// get one feed from DB
	getFeed(id) {
		return axios.get(`/feed/${id}`);
	},
	// create new feed in DB
	createFeed(newFeed) {
		return axios.put('/feed', newFeed);
	},
	// update feed in DB
	updateFeed(id, newFeed) {
		return axios.put(`/feed/${id}`, newFeed);
	},
	// create new comment in DB
	createComment(id, newComment) {
		return axios.put(`/feed/${id}/comment`, newComment);
	},
	// delete feed in DB
	deleteFeed(id) {
		return axios.delete(`/feed/${id}`);
	},
	// delete comment in DB
	deleteComment(commentId) {
		return axios.delete(`/comment/${commentId}`);
	},
}