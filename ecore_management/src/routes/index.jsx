import paths from "../contants/path";
import LoginAdmin from "../pages/loginAdmin";
import Products from "../pages/products/Products";
import Users from "../pages/users/Users";
import Categories from "../pages/categories/Categories";
import Contract from "../pages/contract/Contract";
import Endow from "../pages/endow/Endow";
import Service from "../pages/services/Service";
import Ecommerce from "../pages/Ecommerce";
import AcionService from "../pages/services/acionService";
import ActionProduct from "../pages/products/actionProduct";
import Profile from "../pages/users/Profile";
import ActionCategory from "../pages/categories/actionCategory";
import Garage from "../pages/garage/Garage";
import ActionUser from "../pages/users/actionUser";
import News from "../pages/news/News";
import ActionNews from "../pages/news/actionNews";
import NewsDetail from "../pages/news/NewsDetail";
import Box from "../pages/box/Box";
import ActionBox from "../pages/box/actionBox";
import Groups from "../pages/groups/Groups";
import GroupDetail from "../pages/groups/GroupDetail";
import BoxDetail from "../pages/box/BoxDetail";
import UserDetail from "../pages/users/UserDetail";
import ActionGroup from "../pages/groups/ActionGroup";
import ActionCar from "../pages/car/ActionCar";
import StatusService from "../pages/statusService/StatusService";
import AddCateChill from "../pages/categories/AddCateChill";
import ActionTire from "../pages/tire/ActionTire";
import Tire from "../pages/tire/Tire";
import CarDetail from "../pages/car/CarDetail";


const privateRoutes = [
	// home
	{path: paths.HOME, component: <Ecommerce/>},
	{path: paths.HOME_PAGE, component: <Ecommerce/>},
	// user
	{path: paths.USERS, component: <Users/>},
	{path: paths.ACTION_USER, component: <ActionUser/>},
	{path: paths.ACTION_USER_ID, component: <ActionUser/>},
	{path: paths.PROFILE, component: <Profile/>},
	{path: paths.USER_DETAIL, component: <UserDetail/>},
	{path: paths.USER_DETAIL_ID, component: <UserDetail/>},
	// category
	{ path: paths.CATEGORIES, component: <Categories /> },
	{ path: paths.ACTION_CATEGORY, component: <ActionCategory /> },
	{ path: paths.ACTION_CATEGORY_ID, component: <ActionCategory /> },
	{path: paths.ADD_CATE_CHILL, component: <AddCateChill/>},

	// contract
	{path: paths.CONTRACT, component: <Contract/>},
	// endow
	{path: paths.ENDOW, component: <Endow/>},
	// service
	{path: paths.SERVICE, component: <Service/>},
	{path: paths.ACTION_SERVICE, component: <AcionService/>},
	{path: paths.ACTION_SERVICE_ID, component: <AcionService/>},
	// product
	{path: paths.PRODUCTS, component: <Products/>},
	{path: paths.ACTION_PRODUCT, component: <ActionProduct/>},
	{path: paths.ACTION_PRODUCT_ID, component: <ActionProduct/>},
	// garage
	{path: paths.GARAGE, component: <Garage/>},
	//news
	{path: paths.NEWS, component: <News/>},
	{path: paths.ACTION_NEWS, component: <ActionNews/>},
	{path: paths.ACTION_NEWS_ID, component: <ActionNews/>},
	{path: paths.NEWS_DETAIL, component: <NewsDetail/>},
	{path: paths.NEWS_DETAIL_ID, component: <NewsDetail/>},
	//group
	{path: paths.GROUPS, component: <Groups/>},
	{path: paths.GROUP_DETAIL, component: <GroupDetail/>},
	{path: paths.GROUP_DETAIL_ID, component: <GroupDetail/>},
	{path: paths.ACTION_GROUP, component: <ActionGroup/>},
	{path: paths.ACTION_GROUP_ID, component: <ActionGroup/>},
	// box
	{path: paths.BOX, component: <Box/>},
	{path: paths.BOX_DETAIL, component: <BoxDetail/>},
	{path: paths.BOX_DETAIL_ID, component: <BoxDetail/>},
	{path: paths.ACTION_BOX, component: <ActionBox/>},
	{path: paths.ACTION_BOX_ID, component: <ActionBox/>},
	// car
	{path: paths.ACTION_CAR, component: <ActionCar/>},
	{path: paths.ACTION_CAR_ADD, component: <ActionCar/>},
	{path: paths.ACTION_CAR_EDIT, component: <ActionCar/>},
	{path: paths.CAR_DETAIL, component: <CarDetail/>},
	{path: paths.CAR_DETAIL_ID, component: <CarDetail/>},

	//tire
	{path: paths.TIRE, component: <Tire/>},
	{path: paths.ACTION_TIRE, component: <ActionTire/>},
	{path: paths.ACTION_TIRE_ID, component: <ActionTire/>},

	//status-service
	{path: paths.STATUS_SERVICE, component: <StatusService/>}
];

const routes = [{path: paths.ADMIN_LOGIN, component: <LoginAdmin/>}];

export {routes, privateRoutes};
