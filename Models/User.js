import mongoose from 'mongoose';
const mongodbURI = process.env.mongodbURI || "mongodb+srv://samrajafri018:12345@cluster0.b8ydbpc.mongodb.net";
/////////////////////////////////////////////////////////////////////////////////////////////////

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});


const doctorSchema = new mongoose.Schema({
    name: String,
    salary: String,
    number: String,
    address: String,
  });
  
export const Doctor = mongoose.model('Doctor', doctorSchema);
  
const teacherSchema = new mongoose.Schema({
    name: String,
    salary: String,
    number: String,
    Salaryinformation: String,
  });
  
export const Teacher = mongoose.model('Teacher', teacherSchema);


// Expense
const groccerySchema = new mongoose.Schema({
    totalAmount: String,
    date: String,
    items: String,
  });
  
export const Groccery = mongoose.model('Groccery', groccerySchema);


const officerentSchema = new mongoose.Schema({
    rentAmount: String,
    officeAddress: String,
    officeArea: String,
  });
  
export const Ofice_rent = mongoose.model('Office_Rent', officerentSchema);

const   transportationSchema = new mongoose.Schema({
    staffName: String,
    transportationType: String,
    transportationFuel: String,
  });
  
export const Transportation_Detail = mongoose.model('Transportation', transportationSchema);




const   staffSchema = new mongoose.Schema({
    staffName: String,
    staffSalary: String,
    staffNumber: String,
    staffAddress: String,

  });
  
export const Staff_Salary = mongoose.model('Staff_Salary', staffSchema);



const   electricitySchema = new mongoose.Schema({
    billMonth: String,
    payableAmout: String,
    dueAmount: String,
     billingDate : String,
     dueDate :  String,

  });
  
export const Electricity_Bill = mongoose.model('Electricty_Bill', electricitySchema);




const   waterSchema = new mongoose.Schema({
    billMonth: String,
    payableAmout: String,
    dueAmount: String,
     billingDate : String,
     dueDate :  String,

  });
  
export const Water_Bill = mongoose.model('water_Bill', waterSchema);


const   gasSchema = new mongoose.Schema({
    billMonth: String,
    payableAmout: String,
    dueAmount: String,
     billingDate : String,
     dueDate :  String,

  });
  
export const Gas_Bill = mongoose.model('gas_Bill', gasSchema);










const productSchema = new mongoose.Schema({
    patientName: { type: String },
    patientAge: { type: Number },
    AdmissionDate: { type: Date },
    AdmissionFee: { type: Number },
    MonthlyFee: { type: Number },
    RequiredAmount: { type: Number },
    PatientDescription: { type: String },
    paymentDetail :{type : Array},
  });
  

export const tweetModel = mongoose.model('Patients', productSchema);

  




const productSchema2 = new mongoose.Schema({
    projectName:{ type: String },
    projectVillage : { type: String },
    projectCategory: { type: String },
    amountRequired:  { type: Number },
    collectedAmount:  { type: Number },  
    projectDescription:  { type: String }, 
    imageUrl: { type: Array  ,  required: true },
    createdOn: { type: Date, default: Date.now },
    paymentDetail :{type : Array},
    });
export const tweetModel2 = mongoose.model('ProductsAll2', productSchema2);

const citiesSchema = new mongoose.Schema({
    cities: [{ type: String }],
    });
export const citiesModel = mongoose.model('Cities', citiesSchema);



const User = mongoose.model('User', userSchema);
mongoose.connect(mongodbURI);
////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////

export default User;
