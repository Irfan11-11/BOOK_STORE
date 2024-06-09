const { authenticateToken } = require("./userAuth");
const Book = require("../Models/book");
const router = require("express").Router();
const order = require("../Models/order");
const User = require("../Models/user");




//place order
router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;
        for (const orderData of order) {
            const newOrder = new order({ user: id, book: orderData._id });
            const orderDataFromDb = await newOrder.save();
            //saving order in user model
            await User.findByIdAndUpdate(id, {
                $push: { orders: orderDataFromDb._id },
            });
            //clearing cart
            await User.findByIdAndUpdate(id, {
                $pull: { cart: orderData._id },
            })
        }
        return res.json({
            status: "success",
            message: "Order placed successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error occuped" })
    }
})

//get order history of perticular user
router.get("/get-order-history", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
            path: "orders",
            populate: { path: "book" },
        });

        const ordersData = userData.orders.reverse();
        return res.json({
            status: "success",
            data: ordersData

        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error Occured" })
    }
})

//get all orders ---admin
router.get("/get-all-orders",authenticateToken,async(req,res)=>{
    try {
        const userData = await order.find()
        .populate({
            path:"book",
        })
        .populate({
            path:"user",
        })
        .sort({
            createdAt:-1,
        })
        return res.json({
            status:"success",
            data:userData,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"An error accurred"})
    }
})

//update order --admin
router.put("/update-status/:id",authenticateToken,async(req,res)=>{
    try {
        const {id} = req.params;
        await order.findByIdAndUpdate(id,{status:req.body.status});
        return res.json({
            status:"success",
            message:"Status Updated Successfully",
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"An error accurred"})
    }
})

module.exports = router;