export default defineNuxtRouteMiddleware(async (to) => {
  const app = useNuxtApp();
  const store = useAuthStore(app.$pinia);
  store.rehydrateUser().then((res) => {
    if (
      !store.getUser ||
      res?.data?.error /*error getting user*/ ||
      res?.status === 500 /*error with token*/
    ) {
      return navigateTo("/login");
    }

    if (to.fullPath.includes("login")) {
      return navigateTo(to.fullPath.replace("login", "contacts"));
    }
    return navigateTo(to.fullPath);
  });
});
