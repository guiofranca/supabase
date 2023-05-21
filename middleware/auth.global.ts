import { useUser } from "~/stores/UserStore";

const anonymousRoutes = [
    'login',
    'index'
];

export default defineNuxtRouteMiddleware(async (to, from) => {
    const user = useUser();
    
    if (to.name == undefined)
        return abortNavigation();
    if (isAnAnonymousRoute(to.name!.toString()))
        return;
    if (user.isNotLoggedIn)
        return navigateTo('login');
})

function isAnAnonymousRoute(name: string): boolean {
    let matches = anonymousRoutes.filter(routeName => routeName == name);
    return matches.length > 0;
}