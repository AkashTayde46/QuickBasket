class ApiFeatures {
    constructor(query, queryStr){
        this.query = query; // http://localhost:5000/api/v1/products?keyword=samosa  here query is keyword=samosa
        this.queryStr = queryStr;
    }
    search(){
        const keyword = this.queryStr.keyword ? {
         name:{
            $regex:this.queryStr.keyword,
            $options:"i", //"i" refers case insensitive
         }
        }:{};

        console.log(keyword)
        this.query = this.query.find({...keyword});
        return this;
    }
    filter(){
        const queryCopy = {...this.queryStr} //main copy should not change
        console.log(queryCopy);
        //Removing some field from category
        const removeFields = ["keyword", "page","limit"];
        removeFields.forEach(key => delete queryCopy[key]);
        console.log(queryCopy);
        
        
        // filter for price and ratings
        console.log(queryCopy);
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);

        this.query =  this.query.find(JSON.parse(queryStr)); 
        console.log(queryStr)
        // this.query is find method
        return this; 
    
    }
    pagination(resultPerPage){
const currentPage = Number(this.queryStr.page) || 1;  //To show 10 products on one page
const skip = resultPerPage*(currentPage-1);

this.query = this.query.limit(resultPerPage).skip(skip);
return this;
    }
};
module.exports = ApiFeatures