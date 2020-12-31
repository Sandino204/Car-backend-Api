const exec = fn =>
    (req, res, next) => {
        Promise.resolve(fn(req, res, next))
            .catch(function (error) {
                next(error)
            })
    }

module.exports = exec