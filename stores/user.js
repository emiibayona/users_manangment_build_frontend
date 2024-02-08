export default defineStore("user", () => {
  const user = ref(null);
  const userIsLogged = computed(() => !!user.value);
  function setUser(us) {
    user.value = us;
  }

  return { user, setUser, userIsLogged };
});
