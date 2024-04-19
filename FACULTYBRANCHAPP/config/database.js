module.exports = {
  development: {
    username: process.env.DBUSER,
    password: process.env.DBPASSWORD || "",
    database: process.env.DBNAME,
    host: process.env.DBHOST,
    dialect: "mysql",
  },
};
