module.exports = (mongoose) => {
      var schema = mongoose.Schema(
         { 
            nameProject: String,
            sumariesIssue: String,
            descriptionsIssue: String,
            isDone:Boolean,
        
         },
         {
           timestamps: true
         }
          );
          //refine the _id to id
       schema.method("toJSON", function () {
         const { __v, _id, ...object } = this.toObject();
         object.id = _id;
         return object;
       });

       const Issue = mongoose.model("issue", schema);
       return Issue;
 
};