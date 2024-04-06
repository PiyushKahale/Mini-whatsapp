const mongoose = require('mongoose');
const Chat = require('./models/chat');

main()
.then(res => {console.log(res);})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsApp');
}

let allChats = [
    {
        from: "Piyush",
        to: "Prem",
        message: "Come to Lobby",
        created_at: new Date(),
    },
    {
        from: "Rahul",
        to: "Piyush",
        message: "Me nhi yenar",
        created_at: new Date(),
    },
    {
        from: "Prem",
        to: "Rahul",
        message: "Ye re ptkn natk nko karu",
        created_at: new Date(),
    },
    {
        from: "Rahul",
        to: "Pres",
        message: "Nahi re bho, Game Delete",
        created_at: new Date(),
    },
    {
        from: "Piyush",
        to: "Aditya",
        message: "Block kr re yala",
        created_at: new Date(),
    },
    {
        from: "Rahul",
        to: "All",
        message: "Kara kara bhosadat jaa",
        created_at: new Date(),
    }
];

Chat.insertMany(allChats);