const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground').then(
  () => console.log("Connected to MongoDB") 
).catch(err => console.log("Could not connect to MongoDB", err))

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,  
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
  const course = new Course({
    name: 'Angular Course',
    author: 'Mosh',
    tags: ['angular', 'frontend'],
    isPublished: true 
  });
  const result = await course.save();
  console.log(result);
}

async function getCourses(){
  // eq (equal)
  // ne (not equal)
  // gt (grater than)
  // gte (greater than or equal to)
  // lt (less than)
  // lte (less than or equal to)
  // in 
  // nin (not in)

  //logical operators
  // or 
  // and

  const pageNumber = 2;
  const pageSize = 10;


  const courses = await Course
    .find({ author: 'Mosh', isPublished: true })
    // pagination
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    //.find({ price: { $gte: 10, $lte: 20 } })  // get courses with prices between 10 and 20 
    //.find({ price: { $in: [10, 15, 20] } }) // get courses with proces 10, 15, 20 
    // .find()
    // .or([ {author: 'Mosh'}, {isPublished: true} ])
    // .and([ {author: 'Mosh'}, {isPublished: true} ])
    //author starts with 'Mosh'
    // .find({ author: /^Mosh/})
    // ends with Hamedani 
    // .find({ author: /Hamedani$/i})
    // contains Mosh
    // .find({ author: /.*Mosh.*/})
    .sort({ name: 1 })
    // use count to get numbers of documents which meet find criteria
    // .count() 
    .select({ name: 1, tags: 1 });
   
  console.log(courses);
}

async function updateCourse(id){
  // Approach Query first
  //  const course = await Course.findById(id)
  //  if(!course) return;
   
  //  if (course.isPublished) return; 

  //  course.isPublished = true;
  //  course.author  = 'Another author'

  // const result = await course.save();
  // console.log(result)

  // Approach: Update first
  const result = await Course.update({ _id: id}, {
    $set: {
      author: 'Mosh',
      isPublished: false,
    } 
  })
  console.log(result)

}


async function removeCourse(id){
  // const result  = await Course.deleteOne({ _id: id}) 
   const course  = await Course.findByIdAndDelete(id) 
   console.log(course);
}


updateCourse('5c864f865d12194111ab0cc9')
removeCourse('5c864f865d12194111ab0cc9')
// getCourses()
// createCourse()
