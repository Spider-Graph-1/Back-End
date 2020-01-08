const Users = require('./users-model.js');

module.exports = (req, res, next) => {
    const {id} = req.params;

    if(id && (id !== undefined)) {
        Users.findById(id)
            .then(() => {
                next();
            })
            .catch((err) => res.status(500).json({message: "A user with that ID could not be found."}))
    } else {
        res.status(500).json({message: "We're all in trouble."})
    }
}