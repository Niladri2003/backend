const Todo = require("../models/Todo");

exports.getTodo = async(req,res) => {
    try {
         //fetch all todo items from database
         const todos=await Todo.find({});

         //response 
         res.status(200)
         .json({
            success:true,
            data:todos,
            message:"Entire todo data is fetched",
         });

    }
    catch(err) {
        console.error(err);
        console.log(err);
        res.status(500)
        .json({
            success:false,
            data:"internal server error",
            message:"Server Error",
        })


    }
}
exports.getTodoById=async(req,res)=>{
    try{
        //extract todo items basis on id
        const id= req.params.id;
        const todo=await Todo.findById({_id:id});
        // data for given id not foud
        if(!todo){
            return res.status(404).json({
                success:false,
                message:"No data found with given id",
            })
        }
        res.status(200).json({
            success:true,
            data:todo,
            message:`Todo ${id} data successfully fetched`,
        })



    }catch(err){

        console.error(err);
        console.log(err);
        res.status(500)
        .json({
            success:false,
            data:"internal server error",
            message:"Server Error",
        })

    }
}