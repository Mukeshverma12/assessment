import mongoose, { connect } from "mongoose";

function connectTOMongodb() {
    mongoose.set("strictQuery", false);
    return connect('mongodb+srv://mukeshv:QE9QbPEEsUN0D4qB@cluster0.i4usf.mongodb.net/?retryWrites=true&w=majority').then(() => {
        console.log("connected");

    })
        .catch((err:any) => {
            console.log(err);

        })
}

export default connectTOMongodb;