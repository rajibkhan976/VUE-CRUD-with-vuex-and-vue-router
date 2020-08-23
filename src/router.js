import Vue from "vue";
import Router from "vue-router";
import Dashboard from './components/Dashboard.vue';
import PostCard from './components/PostCard.vue';
import PostModal from './components/PostModal.vue';

Vue.use(Router);

const routes = [
	{
		path: "/home",
		name: "home",
		component: Dashboard
	},
	{
		path: "/posts",
		name: "posts",
		component: PostCard
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