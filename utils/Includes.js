import ApiError from "./ApiError.js";

export const userIncludes = (loginUser, searchUser) => {
  if (!loginUser || !searchUser) {
    throw new ApiError(400, "User not found");
  }

  let status = "noRelation";

  if (loginUser?._id.toString() === searchUser?._id.toString()) {
    status = "self";
  } else if (searchUser?.friends?.includes(loginUser._id)) {
    status = "friends";
  } else if (searchUser?.friendRequests?.includes(loginUser._id)) {
    status = "sendedRequest";
  } else if (loginUser?.friendRequests?.includes(searchUser._id)) {
    status = "receivedRequest";
  }

  return status;
};

export class UserRelation {
  constructor(status) {
    this.status = status;
  }

  self() {
    if (this.status === "self") {
      throw new ApiError(400, "Cannot add yourself");
    }
    return this;
  }
  friends() {
    if (this.status === "friends") {
      throw new ApiError(400, "Already your friend");
    }
    return this;
  }
  sendedRequest() {
    if (this.status === "sendedRequest") {
      throw new ApiError(400, "Request already sended");
    }
    return this;
  }
  receivedRequest() {
    if (this.status === "receivedRequest") {
      throw new ApiError(400, "Already received request");
    }
    return this;
  }
  noRelation() {
    if (this.status === "noRelation") {
      throw new ApiError(400, "No request received");
    }
    return this;
  }
}
