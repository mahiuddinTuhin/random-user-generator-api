const fs = require("fs");
const users = require("./../database/users.json");

const path = require("path");
const filePath = path.join(__dirname, "./../database/users.json");

module.exports.getAllUser = (req, res) => {
  console.log("geting all data");

  const currentPage = req?.query?.currentPage || 1;
  const userPerPage = req?.query?.usersQuantity || 3;
  //   console.log({ currentPage, userPerPage });
  const initial = (currentPage - 1) * userPerPage;
  const end = initial + Number(userPerPage);
  console.log({ initial, end });
  // const paginatedUsers = users?.slice(initial, end);
  const paginatedUsers = users;

  res.send(paginatedUsers);
};

module.exports.saveUser = (req, res) => {
  users.push(req.body);

  console.log(req.body);

  fs.writeFile(filePath, JSON.stringify(users), (err) => {
    if (err) {
      throw err;
    }

    console.log("New user added successfully");
  });

  // Send a success response to the client
  res.send("User added successfully");
};

module.exports.updateUser = (req, res) => {
  const id = req.params.id;

  const updatingUser = req.body;

  const changedUser = [
    ...users.map((user) => {
      return user.id === Number(id)
        ? { ...user, ...updatingUser }
        : { ...user };
    }),
  ];

  console.log(changedUser);

  fs.writeFile(filePath, JSON.stringify(changedUser), (err) => {
    if (err) {
      throw err;
    }

    console.log(" user updated successfully");
  });

  // Send a success response to the client
  res.send("User updated successfully");
};

module.exports.deleteUser = (req, res) => {
  const id = req.params?.id;
  const newUsers = [
    ...users.filter((user) => {
      if (user?.id !== Number(id)) {
        return { ...user };
      }
    }),
  ];

  fs.writeFileSync(filePath, JSON.stringify(newUsers), (err) => {
    if (err) {
      throw err;
    }

    console.log("User delete successfully");
  });

  res.send("User delete successfully");
};
