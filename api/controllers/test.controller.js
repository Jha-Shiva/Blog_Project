import Test from "../models/test.model.js";

const testPost = async (req, res)=>{
    const {test} = req.body;
    const user = await Test.create({
        test
    })
    res.json({
        test
    })
}

export default testPost