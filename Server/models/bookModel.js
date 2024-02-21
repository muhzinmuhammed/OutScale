import { model, Schema } from "mongoose";

const BookSchema = new Schema(
  {

    id: {
        type: String,
        required: true,
      },
      userid: {
        type: String,
       
      },
      title: {
        type: String,
       
      },
      imageUrl: {
        type: String,
        
      },
     
      status: {
        type:Boolean,
        default:true
    
      },
     

    userId: {
         type: Schema.Types.ObjectId,
         ref: "user"
         },
         body:{
          type:String,

          
        }

  },
  
  
  
  {
    timestamps: true,
  }
);

//Create text indexes for bookName and content
BookSchema.index({ bookName: "text" });
BookSchema.index({ content: "text" });

export default model("books", BookSchema);