import Vue from "vue";
import Router from "vue-router";
import Dashboard from './components/Dashboard.vue';
import PostModal from './components/PostModal.vue';

Vue.use(Router);

const routes = [
	{
		path: "/",
		name: "home",
		component: Dashboard
	},
	{
		path: "/dashboard",
		name: "dashboard",
		component: Dashboard
	},
	{
		path: "/add",
		name: "add",
		component: PostModal
	}
];

export default new Router({
  routes // short for `routes: routes`
});