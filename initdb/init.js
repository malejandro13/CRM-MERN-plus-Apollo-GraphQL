db.createUser({
	user: "user",
	pwd: "secretPassword",
	roles: [ { role: "readWrite", db: "crmdb" } ]
})
