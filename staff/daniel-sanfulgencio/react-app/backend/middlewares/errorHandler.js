import { errors } from "common"

const { FormatError, ExistenceError, AuthError, DuplicityError, ContentError } = errors

const errorHandler = (error, req, res, next) => {
    if (error instanceof TypeError || error instanceof RangeError || error instanceof FormatError || error instanceof ContentError) {
        res.status(400).send({ name: error.name, message: error.message })
    } else if (error instanceof AuthError) {
        res.status(401).send({ name: error.name, message: error.message })
    } else if (error instanceof ExistenceError) {
        res.status(404).send({ name: error.name, message: error.message })
    } else if (error instanceof DuplicityError) {
        res.status(409).send({ name: error.name, message: error.message })
    } else {
        res.status(500).send({ name: 'ServerError', message: error.message })
    }
}

export default errorHandler