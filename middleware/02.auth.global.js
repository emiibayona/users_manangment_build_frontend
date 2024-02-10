export default defineNuxtRouteMiddleware(async (to) => {
  const app = useNuxtApp();
  const store = useAuthStore(app.$pinia);
  store.rehydrateUser().then(() => {
    if (!store.getUser) {
      return navigateTo("/login");
    }
    return navigateTo(to.fullPath);
  });
});
