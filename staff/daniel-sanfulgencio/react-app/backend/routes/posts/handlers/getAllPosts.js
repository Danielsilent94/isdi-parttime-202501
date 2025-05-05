import { validator } from "common"
import logic from "../../../logic"

const getAllPosts = (req, res, next) => {
    const id = req.userId

    try {
        validator.id(id)

        logic.getAllPosts(id, (error, posts) => {
            if (error) next(error)
            else res.status(200).send(JSON.stringify({ posts }))
        })
    } catch (error) {

    }
}