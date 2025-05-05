import { validator } from "common"
import logic from "../../../logic/index.js"

const getUsername = (req, res, next) => {
    const id = req.userId

    try {
        validator.id(id)
        logic.getUsername(id, (error, username) => {
            if (error) next(error)
            else res.status(200).send(username)
        })
    } catch (error) {
        next(error)
    }

}

export default getUsername