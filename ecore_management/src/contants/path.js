const path = {
	HOME: '/',
	HOME_PAGE: '/ecommerce',
	// login
	ADMIN_LOGIN: '/admin/login',
	// user
	PROFILE: '/profile',
	// product
	PRODUCTS: '/products',
	ACTION_PRODUCT: '/product/action-product/',
	ACTION_PRODUCT_ID: '/product/action-product/:product_id',
	// employee
	EMPLOYEES: '/employees',
	// customer
	CUSTOMERS: '/customers',
	// user
	USERS: '/users',
	ACTION_USER: "/user/action-user/",
	ACTION_USER_ID: "/user/action-user/:user_id",
	USER_DETAIL: "/user/detail/",
	USER_DETAIL_ID: "/user/detail/:user_id",
	// category
	CATEGORIES: '/categories',
	ACTION_CATEGORY: '/categories/action-category/',
	ACTION_CATEGORY_ID: '/categories/action-category/:category_id',
	ADD_CATE_CHILL:'/categories/add-cate-chill/:category_id',
	// contract
	CONTRACT: '/contract',
	// endow
	ENDOW: '/endow',
	// service
	SERVICE: '/service', //index
	ACTION_SERVICE: '/service/action-service/', //add new service
	ACTION_SERVICE_ID: '/service/action-service/:service_id', //edit service

	// garage
	GARAGE: '/garage',

	// news
	NEWS: '/news',
	ACTION_NEWS: '/news/action-news/',
	ACTION_NEWS_ID: '/news/action-news/:news_id',
	NEWS_DETAIL: '/news/detail/',
	NEWS_DETAIL_ID: '/news/detail/:news_id',

	//groups
	GROUPS: '/groups',
	GROUP_DETAIL: '/group/detail/',
	GROUP_DETAIL_ID: '/group/detail/:group_id',
	ACTION_GROUP: '/group/action-group/',
	ACTION_GROUP_ID: '/group/action-group/:group_id',

	// box
	BOX: "/box",
	BOX_DETAIL: "/box/detail/",
	BOX_DETAIL_ID: "/box/detail/:box_id",
	ACTION_BOX: '/box/action-box/',
	ACTION_BOX_ID: '/box/action-box/:box_id',

	//car
	ACTION_CAR: "/car/action-car/",
	ACTION_CAR_ADD: "/car/action-car/:user_id/",
	ACTION_CAR_EDIT: "/car/action-car/:user_id/:car_id",
	CAR_DETAIL: "/car/detail/",
	CAR_DETAIL_ID: "/car/detail/:car_id",

	// tire
	TIRE: "/tire",
	ACTION_TIRE: "/tire/action-tire/",
	ACTION_TIRE_ID: "/tire/action-tire/:tire_id",
	//status service
	STATUS_SERVICE: "/status-service",
}

export default path
