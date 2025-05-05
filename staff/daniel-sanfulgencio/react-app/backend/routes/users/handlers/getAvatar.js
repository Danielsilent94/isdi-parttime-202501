import { validator } from "common"
import logic from "../../../logic/index.js"

const getAvatar = (req, res, next) => {
    const id = req.userId

    try {
        validator.id(id)

        logic.getAvatar(id, (error, retrivedAvatar) => {
            if (error) next(error)
            else res.status(200).send(retrivedAvatar)
        })
    } catch (error) {
        next(error)
    }
}

export default getAvatar