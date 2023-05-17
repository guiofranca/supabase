const anonymousRoutes = [
    'login',
    'index'
];

export default defineNuxtRouteMiddleware(async (to, from) => {
    const user = useSupabaseUser();
    const isLoggedIn = user.value != null;
    const isNotLoggedIn = !isLoggedIn;
    
    if (to.name == undefined)
        return abortNavigation();
    if (isAnAnonymousRoute(to.name!.toString()))
        return;
    if (isNotLoggedIn)
        return navigateTo('login');
})

function isAnAnonymousRoute(name: string): boolean {
    let matches = anonymousRoutes.filter(routeName => routeName == name);
    return matches.length > 0;
}