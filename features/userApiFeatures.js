class UserApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const search = this.queryStr.search
      ? {
          $or: [
            {
              username: {
                $regex: this.queryStr.search,
                $options: "i",
              },
            },
            {
              name: {
                $regex: this.queryStr.search,
                $options: "i",
              },
            },
          ],
        }
      : {};

    this.query = this.query.find({ ...search });
    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

export default UserApiFeatures;
