db.createUser({
  user: "kai",
  pwd: "password",
  roles: [{
    role: "readWrite",
    db: "admin"
  }]
})
