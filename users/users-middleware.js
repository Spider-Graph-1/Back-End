const Users = require('./users-model.js');

module.exports = (req, res, next) => {
    const {id} = req.params;
    console.log(id);
    if(id && (id !== undefined)) {
        Users.findById(id)
            .then((response) => {
                console.log(response);
                if (response && response.length) {
                    next();
                } else {
                    res.status(500).json({message: "A user with that ID could not be found."})
                }
            })
            .catch((err) => console.log(err))
    } else {
        res.status(500).json({message: "We're all in trouble."})
    }
}