const apis = {
	login: {
		uri: 'users/login'
	},
	reload: {
		uri:'user/get-user-info'
	},
	logout: {
		uri: 'user/logout'
	},
	changePassword: {
		uri: 'users/change-password'
	},
	refreshToken:{
		uri: "users/refresh-token"
	},

	// user
	getUser:{
		uri: "users/all-paging",
	},
	user:{
		uri: "users/"
	},
	myProfile: {
		uri: "/users/get/my-profile"
	},
	// upload file
	uploadArray: {
		uri: "uploads/upload-array",
	},
	// category
	getCate:{
		uri: 'categories/all-paging'
	},
	categories:{
		uri: 'categories/'
	},
	// product
	getProduct:{
		uri:'products/all-paging'
	},
	getProductById:{
		uri:'products/'
	},
	updateProduct:{
		uri:'product/'
	},

	// news
	getNews:{
		uri: "news/all/paging",
	},
	news:{
		uri: "news/"
	},

	//group
	getGroup:{
		uri: "groups//all/paging"
	},
	groups:{
		uri: "groups/"
	},
	// posts
	getPostsByGroup:{
		uri: 'posts/all/paging'
	},
	// black box
	getBox: {
		uri: "box/all-paging"
	},
	box:{
		uri:'box/'
	},
	// car
	getCar: {
		uri: 'car/all-paging'
	},
	car: {
		uri: 'car/'
	},
	// tire
	getTire: {
		uri: "tire/all/paging"
	},
	tire: {
		uri: "tire/"
	},
	// service
	getService:{
		uri: "services/all-paging",
	}

}
export default apis
