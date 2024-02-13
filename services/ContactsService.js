import { api } from "#imports";

export default {
  list: async function (query = {}) {
    return api
      .get("contacts", { params: query })
      .then((res) => res)
      .catch((res) => res.response);
  },
  create: async function (body) {
    return api
      .post("contacts", body)
      .then((res) => res)
      .catch((res) => res.response);
  },
  update: async function ({ id, body }) {
    return api
      .put(`contacts/${id}`, body)
      .then((res) => res)
      .catch((res) => res.response);
  },
};
