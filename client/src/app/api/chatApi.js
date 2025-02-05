import axios from "axios";

// create new group
export const createGroupApi = async (groupForm) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const { data } = await axios.post(`/api/v1/group/create`, groupForm, config);
  return data;
};

//find chats of user
export const findChatsOfUserApi = async () => {
  const { data } = await axios.get(`/api/v1/chats`);
  return data;
};
