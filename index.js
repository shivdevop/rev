const express=require("express")
const app=express()

require("dotenv").config()
PORT=process.env.PORT || 3000

// for body parsing 
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// create an inmemory array of user objects
users=[
    {
        name:"shivam",
        kidneys:[
            {healthy:true},
            {healthy:false}
        ]
    },
    {
        name:"John",
        kidneys:[
            {healthy:true},
            {healthy:true}
        ]
    }
]





//user can check how many kidneys they have and their health status
app.get("/",(req,res)=>{
    let JohnKidneys=users[0].kidneys
    let numberOfKidneys=JohnKidneys.length
    let healthyKidneys=JohnKidneys.filter(kidney=>kidney.healthy)
    let healthyKidneysCount=healthyKidneys.length
    let unhealthyKidneysCount=numberOfKidneys-healthyKidneysCount
    res.json({
        numberOfKidneys:numberOfKidneys,
        healthyKidneysCount:healthyKidneysCount,
        unhealthyKidneysCount:unhealthyKidneysCount
    })
})

//user can add a new kidney, 
app.post("/",(req,res)=>{
    let newKidneyStatus=req.body.healthy
    let newKidney={ healthy:newKidneyStatus }
    users[0].kidneys.push(newKidney)
    res.json({
        msg:"success"
    })
})



app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})