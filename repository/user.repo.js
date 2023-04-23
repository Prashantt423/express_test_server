const { User } = require("../model/user.model");
const sampleData = require("../sample_data");
const populateIfNotAnyData = async () => {
  const users = await getAllUsers();
  if (users.length > 0) {
    return;
  }
  try {
    const formattedUserData = sampleData.map((data) => ({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      gender: data.gender.toLocaleLowerCase(),
      income: parseFloat(data.income.substring(1)),
      city: data.city,
      car: data.car,
      quote: data.quote,
      phone_price: parseInt(data.phone_price),
    }));
    User.insertMany(formattedUserData)
      .then((docs) => {
        console.log("Users inserted successfully!");
        User.collection
          .createIndex({ last_name: 1, quote: 1, email: 1 })
          .then((d) => {
            console.log("Index created");
            User.collection
              .getIndexes({ full: true })
              .then((indexes) => {
                console.log("indexes:", indexes);
              })
              .catch(console.error);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (e) {
    console.log(e);
  }
};
const getAllUsers = async () => {
  try {
    return await User.find();
  } catch (e) {
    console.log(e);
  }
};
const getAllUsersWithIncomeAndCars = async (income, car1, car2) => {
  try {
    return await User.find({
      income: { $lt: income },
      $expr: {
        $regexMatch: {
          input: "$car",
          regex: {
            $concat: [
              ".*(",
              { $toLower: car1 },
              "|",
              { $toLower: car2 },
              ").*",
            ],
          },
          options: "i",
        },
      },
    });
  } catch (e) {
    console.log(e);
  }
};
const getByGenderAndIncome = async (gender, phone_price) => {
  try {
    return await User.find({
      gender: gender,
      phone_price: { $gt: phone_price },
    });
  } catch (e) {
    console.log(e);
  }
};
const getByLastNameAndQuote = async (char, count) => {
  try {
    return await User.find({
      last_name: new RegExp(`^${char}`, "i"),
      $expr: {
        $gt: [{ $strLenCP: "$quote" }, count]
      },
      $expr: {
        $regexMatch: {
          input: "$email",
          regex: { $concat: [".*", { $toLower: "$last_name" }, ".*"] },
          options: "i",
        },
      },
    });
  } catch (e) {
    console.log(e);
  }
};
const getUserWithNoDigitInEmail = async (car1, car2, car3) => {
  try {
    return await User.find({
      email: { $not: { $regex: /\d/ } },
      $expr: {
        $regexMatch: {
          input: "$car",
          regex: {
            $concat: [
              ".*(",
              { $toLower: car1 },
              "|",
              { $toLower: car2 },
              "|",
              { $toLower: car3 },
              ").*",
            ],
          },
          options: "i",
        },
      },
    });
  } catch (e) {
    console.log(e);
  }
};
const getGroupedUser = async () => {
  try {
    return await User.aggregate([
      {
        $group: {
          _id: "$city",
          user_count: { $sum: 1 },
          avg_income: { $avg: "$income" },
        },
      },
      {
        $match: {
          _id: { $ne: null },
        },
      },
      {
        $project: {
          _id: 0,
          city: "$_id",
          user_count: "$user_count",
          avg_income: "$avg_income",
        },
      },
      {
        $sort: {
          user_count: -1,
          avg_income: -1,
        },
      },
      {
        $limit: 10,
      },
    ]);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAllUsers,
  getAllUsersWithIncomeAndCars,
  getByGenderAndIncome,
  populateIfNotAnyData,
  getByLastNameAndQuote,
  getUserWithNoDigitInEmail,
  getGroupedUser,
};
