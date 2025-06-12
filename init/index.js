const mongoose=require("mongoose")
const Listing=  require("../modules/listing.js")
const intiData=require("./data.js")
const MOGO_URL='mongodb://127.0.0.1:27017/urbanStay'

main().then((res)=>{
    console.log("Connection Success")
}).catch((err)=>{
console.log("Connection Failed")
})
async function main() {
    await mongoose.connect(MOGO_URL)
    
}

const initDB=async()=>{
    await Listing.deleteMany({});
    intiData.data=intiData.data.map((obj)=>({...obj, owner:"66d622760a2f626137f75186"}))
    await Listing.insertMany(intiData.data);
    console.log("Data inserted")
} 
initDB();