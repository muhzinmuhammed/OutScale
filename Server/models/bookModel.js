import { model, Schema } from "mongoose";

const BookSchema = new Schema(
  {

    bookName: {
        type: String,
        required: true,
      },
      description: {
        type: String,
       
      },
      content: {
        type: String,
       
      },
      imageUrl: {
        type: String,
        
      },
     
      status: {
        type:Boolean,
        default:true
    
      },
      bookPrice:{
        type:Number,
        required:true
        
      },

    userId: {
         type: Schema.Types.ObjectId,
         ref: "user"
         },
         

  },
  
  
  {
    timestamps: true,
  }
);

//Create text indexes for bookName and content
BookSchema.index({ bookName: "text" });
BookSchema.index({ content: "text" });

export default model("books", BookSchema);