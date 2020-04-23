const handleRegister = (req,res, postgres, bcrypt) => {
    const {email, name, password} = req.body;
    const hash = bcrypt.hashSync(password);

    if (!email || !name || !password){
        return res.status(400).json('required fields cannot be empty');
    }

    postgres.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
                .returning('*')
                .insert({
                    email: loginEmail[0],
                    name: name,
                    joined: new Date()
                })
                .then(user => {
                    res.json(user[0]);
                })
                .catch(error => console.log("something crashed", error))
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('unable to register'));
}

module.exports ={
    handleRegister: handleRegister
};