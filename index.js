import express from "express";
// import User, { cities } from "./Models/User.js"; // Adjust the path based on your directory structure
import bcrypt from "bcrypt";
import crypto from "crypto"; // Import the 'crypto' module
import jwt from "jsonwebtoken"; // Import the jsonwebtoken library
import nodemailer from "nodemailer";
const app = express();
const port = process.env.PORT || 8000; // Use process.env.PORT for flexibility
import cors from "cors";
const SECRET = process.env.SECRET || "topsecret";
import cookieParser from "cookie-parser";
import multer from "multer";
import bucket from "./Bucket/Firebase.js";
import fs from "fs";
import path from "path";
import { Doctor, citiesModel, Teacher, tweetModel2, Groccery, Ofice_rent, Transportation_Detail, Staff_Salary, Electricity_Bill, Water_Bill, Gas_Bill } from "./Models/User.js";
import { tweetModel } from "./Models/User.js";

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.options("*", cors());

const storage = multer.diskStorage({
  destination: "/tmp",
  filename: function (req, file, cb) {
    console.log("mul-file: ", file);
    cb(null, `${new Date().getTime()}-${file.originalname}`);
  },
});
const upload = multer({ storage });
app.use(express.json());




app.get("/api/v1/products", async (req, res) => {
  try {
    const result = await tweetModel.find().exec(); // Using .exec() to execute the query
    // console.log(result);
    res.send({
      message: "Got all products successfully",
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Server error",
    });
  }
});


app.get("/api/v1/Transportation_Detail", async (req, res) => {
  try {
    const result = await Transportation_Detail.find().exec(); // Using .exec() to execute the query
    // console.log(result);
    res.send({
      message: "Got all products successfully",
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Server error",
    });
  }
});


app.get("/api/v1/Groccery", async (req, res) => {
  try {
    const result = await Groccery.find().exec(); // Using .exec() to execute the query
    // console.log(result);
    res.send({
      message: "Got all products successfully",
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Server error",
    });
  }
});

app.get("/api/v1/Teacher", async (req, res) => {
  try {
    const result = await Teacher.find().exec(); // Using .exec() to execute the query
    // console.log(result);
    res.send({
      message: "Got all products successfully",
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Server error",
    });
  }
});
app.get("/api/v1/Doctors", async (req, res) => {
  try {
    const result = await Doctor.find().exec(); // Using .exec() to execute the query
    // console.log(result);
    res.send({
      message: "Got all products successfully",
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Server error",
    });
  }
});

app.get("/api/v1/Office-Rent", async (req, res) => {
  try {
    const result = await Ofice_rent.find().exec(); // Using .exec() to execute the query
    // console.log(result);
    res.send({
      message: "Got all products successfully",
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Server error",
    });
  }
});


app.get("/api/v1/Staff-salaries", async (req, res) => {
  try {
    const result = await Staff_Salary.find().exec(); // Using .exec() to execute the query
    // console.log(result);
    res.send({
      message: "Got all products successfully",
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Server error",
    });
  }
});

// Update IP

app.post("/api/v1/updates/:id", upload.any(), async (req, res) => {
  try {
    const body = req.body;
    const id = req.params.id;
    console.log("req.body: ", req.body);

    tweetModel
    .findByIdAndUpdate(
      id,
      {
        patientName: body.patientName,
        patientAge:  body.patientAge,
        AdmissionDate:  body.AdmissionDate,
        AdmissionFee:  body.AdmissionFee,
        MonthlyFee: body.MonthlyFee,
        RequiredAmount: body.RequiredAmount,
        PatientDescription: body.PatientDescription,
      },
      { new: true }
    )
    .then((updatedProduct) => {
      console.log("Product Updated successfully", updatedProduct);
      res.status(200).send();
    })
    .catch((error) => {
      console.error("Error updating product:", error);
      res.status(500).send();
    });



  } catch (error) {
    console.log("error: ", error);
    res.status(500).send();
  }
});



app.post("/api/v1/updatesDoctor/:id", upload.any(), async (req, res) => {
  try {
    const body = req.body;
    const id = req.params.id;
    console.log(id)
    console.log("req.body: ", req.body);
    const { name, salary, number, address } = req.body;


    Doctor
    .findByIdAndUpdate(
      id,
      {
        name: name,
        salary: salary,
        number: number,
        address: address,
      },
      { new: true }
    )
    .then((updatedProduct) => {
      console.log("Product Updated successfully", updatedProduct);
      res.status(200).send();
    })
    .catch((error) => {
      console.error("Error updating product:", error);
      res.status(500).send();
    });



  } catch (error) {
    console.log("error: ", error);
    res.status(500).send();
  }
});




app.post("/api/v1/updatesTeacher/:id", upload.any(), async (req, res) => {
  try {
    const body = req.body;
    const id = req.params.id;
    console.log(id)
    console.log("req.body: ", req.body);
    const { doctorName, doctorSalary, doctorNumber, address } = req.body;

    Teacher
    .findByIdAndUpdate(
      id,
      {
        name: doctorName,
        salary: doctorSalary,
        number: doctorNumber,
        Salaryinformation : address,
      },
      { new: true }
    )
    .then((updatedProduct) => {
      console.log("Product Updated successfully", updatedProduct);
      res.status(200).send();
    })
    .catch((error) => {
      console.error("Error updating product:", error);
      res.status(500).send();
    });



  } catch (error) {
    console.log("error: ", error);
    res.status(500).send();
  }
});


app.post("/api/v1/updatesGroccery/:id", upload.any(), async (req, res) => {
  try {
    const body = req.body;
    const id = req.params.id;
    console.log(id)
    console.log("req.body: ", req.body);
    const { name, salary, address} = req.body;

    Groccery
    .findByIdAndUpdate(
      id,
      {
        totalAmount : name,
        date : salary,
        items  : address,
      },
      { new: true }
    )
    .then((updatedProduct) => {
      console.log("Product Updated successfully", updatedProduct);
      res.status(200).send();
    })
    .catch((error) => {
      console.error("Error updating product:", error);
      res.status(500).send();
    });



  } catch (error) {
    console.log("error: ", error);
    res.status(500).send();
  }
});


app.post("/api/v1/updatesTransportation/:id", upload.any(), async (req, res) => {
  try {
    const body = req.body;
    const id = req.params.id;
    console.log(id)
    console.log("req.body: ", req.body);
    const { name, salary, address} = req.body;

    Transportation_Detail
    .findByIdAndUpdate(
      id,
      {
        staffName : name,
        transportationType : salary,
        transportationFuel  : address,
      },
      { new: true }
    )
    .then((updatedProduct) => {
      console.log("Product Updated successfully", updatedProduct);
      res.status(200).send();
    })
    .catch((error) => {
      console.error("Error updating product:", error);
      res.status(500).send();
    });



  } catch (error) {
    console.log("error: ", error);
    res.status(500).send();
  }
});


app.post("/api/v1/updatesOffice/:id", upload.any(), async (req, res) => {
  try {
    const body = req.body;
    const id = req.params.id;
    console.log(id)
    console.log("req.body: ", req.body);
    const { name, salary, number} = req.body;

    Ofice_rent
    .findByIdAndUpdate(
      id,
      {
        rentAmount : name,
        officeAddress : salary,
        officeArea  : number,
      },
      { new: true }
    )
    .then((updatedProduct) => {
      console.log("Product Updated successfully", updatedProduct);
      res.status(200).send();
    })
    .catch((error) => {
      console.error("Error updating product:", error);
      res.status(500).send();
    });



  } catch (error) {
    console.log("error: ", error);
    res.status(500).send();
  }
});

app.post("/api/v1/updatesStaffSalary/:id", upload.any(), async (req, res) => {
  try {
    const body = req.body;
    const id = req.params.id;
    console.log(id)
    console.log("req.body: ", req.body);
    const { staffName, staffSalary, staffNumber ,staffAddress } = req.body;
    Staff_Salary
    .findByIdAndUpdate(
      id,
      {
        staffName: staffName,
        staffSalary: staffSalary,
        staffNumber: staffNumber,
        staffAddress: staffAddress, 
      },
      { new: true }
    )
    .then((updatedProduct) => {
      console.log("Product Updated successfully", updatedProduct);
      res.status(200).send();
    })
    .catch((error) => {
      console.error("Error updating product:", error);
      res.status(500).send();
    });



  } catch (error) {
    console.log("error: ", error);
    res.status(500).send();
  }
});




app.post("/api/v1/updated/completed/:id", upload.any(), async (req, res) => {
  try {
    const body = req.body;
    const id = req.params.id;
    console.log("req.body: ", req.body);
    console.log("req.files: ", req.files);

    const uploadedFiles = req.files.map((file) => {
      console.log("uploaded file name: ", file.originalname);
      console.log("file type: ", file.mimetype);
      console.log("file name in server folders: ", file.filename);
      console.log("file path in server folders: ", file.path);

      return new Promise((resolve, reject) => {
        bucket.upload(
          file.path,
          {
            destination: `tweetPictures/${file.filename}`,
          },
          (err, gcsFile) => {
            if (!err) {
              gcsFile
                .getSignedUrl({
                  action: "read",
                  expires: "03-09-2999",
                })
                .then((urlData) => {
                  console.log("public downloadable url: ", urlData[0]);
                  fs.unlinkSync(file.path); // Delete the local file

                  resolve(urlData[0]);
                })
                .catch((err) => {
                  console.error("Error getting signed URL:", err);
                  reject(err);
                });
            } else {
              console.error("Error uploading to GCS:", err);
              reject(err);
            }
          }
        );
      });
    });

    Promise.all(uploadedFiles).then((urls) => {
      let array = urls;
      tweetModel2
        .findByIdAndUpdate(
          id,
          {
            projectName: body.projectName,
            projectCategory: body.projectCategory,
            amountRequired: body.amountRequired,
            projectDescription: body.projectDescription,
            imageUrl: array,
          },
          { new: true }
        )
        .then((updatedProduct) => {
          console.log("Product Updated successfully", updatedProduct);
          res.status(200).send();
        })
        .catch((error) => {
          console.error("Error updating product:", error);
          res.status(500).send();
        });
    });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).send();
  }
});
app.get("/api/v1/AllUser", async (req, res) => {
  try {
    const result1 = await User.find().exec(); // Using .exec() to execute the query
    // console.log(result);
    res.send({
      message: "Got all users successfully",
      data: result1,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Server error",
    });
  }
});
app.get("/api/v1/selectuserproducts", async (req, res) => {
  try {
    const emailid = req.params.email;

    const existingUser = await tweetModel.findOne({ email: emailid });

    res.send({
      message: "Got user products successfully",
      data: existingUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Server error",
    });
  }
});
app.delete("/api/v1/customer/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedData = await tweetModel.deleteOne({ _id: id });

    if (deletedData.deletedCount !== 0) {
      res.send({
        message: "Product has been deleted successfully",
      });
    } else {
      res.status(404).send({
        message: "No Product found with this id: " + id,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Server error",
    });
  }
});
app.delete("/api/v1/customer2/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedData = await Doctor.deleteOne({ _id: id });

    if (deletedData.deletedCount !== 0) {
      res.send({
        message: "Product has been deleted successfully",
      });
    } else {
      res.status(404).send({
        message: "No Product found with this id: " + id,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Server error",
    });
  }
});

app.delete("/api/v1/customer3/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedData = await Teacher.deleteOne({ _id: id });

    if (deletedData.deletedCount !== 0) {
      res.send({
        message: "Product has been deleted successfully",
      });
    } else {
      res.status(404).send({
        message: "No Product found with this id: " + id,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Server error",
    });
  }
});

app.delete("/api/v1/customer4/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedData = await Groccery.deleteOne({ _id: id });

    if (deletedData.deletedCount !== 0) {
      res.send({
        message: "Product has been deleted successfully",
      });
    } else {
      res.status(404).send({
        message: "No Product found with this id: " + id,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Server error",
    });
  }
});

app.delete("/api/v1/customer5/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedData = await Ofice_rent.deleteOne({ _id: id });

    if (deletedData.deletedCount !== 0) {
      res.send({
        message: "Product has been deleted successfully",
      });
    } else {
      res.status(404).send({
        message: "No Product found with this id: " + id,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Server error",
    });
  }
});

app.delete("/api/v1/customer6/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedData = await Transportation_Detail.deleteOne({ _id: id });

    if (deletedData.deletedCount !== 0) {
      res.send({
        message: "Product has been deleted successfully",
      });
    } else {
      res.status(404).send({
        message: "No Product found with this id: " + id,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Server error",
    });
  }
});


app.delete("/api/v1/customer7/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedData = await Staff_Salary.deleteOne({ _id: id });

    if (deletedData.deletedCount !== 0) {
      res.send({
        message: "Product has been deleted successfully",
      });
    } else {
      res.status(404).send({
        message: "No Product found with this id: " + id,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Server error",
    });
  }
});




app.post("/api/v1/addPatient", (req, res) => {
  try {
    const body = req.body;

    console.log(   'This is body ' , body)
    console.log(body.patientName);

    // Assuming you have a patient model or schema defined, replace 'YourPatientModel' with your actual patient model
    let newPatient = new tweetModel({
      patientName: body.patientName,
      patientAge: body.patientAge,
      AdmissionDate: body.AdmissionDate,
      AdmissionFee: body.AdmissionFee,
      MonthlyFee: body.MonthlyFee,
      RequiredAmount: body.RequiredAmount,
      PatientDescription: body.PatientDescription,
    });    

    // Save the new patient to the database
    newPatient.save()
      .then(savedPatient => {
        console.log("Patient added successfully:", savedPatient);
        res.status(201).json(savedPatient);
      })
      .catch(error => {
        console.error("Error adding patient:", error);
        res.status(500).send("Internal Server Error");
      });

  } catch (error) {
    console.error("Error handling request:", error);
    res.status(400).send("Bad Request");
  }
});

app.post("/api/v1/CompletedProject/:id", upload.any(), async (req, res) => {
  const id = req.params.id;

  try {
    // Assuming tweetModel has a method like findById to find a document by its ID
    const tweet = await tweetModel.findById(id);

    if (!tweet) {
      return res.status(404).json({ error: "Tweet not found" });
    }

    // Create a new instance of tweetModel2 with data from tweet
    let addProduct = new tweetModel2({
      projectName: tweet.projectName,
      projectVillage : tweet.projectVillage,
      projectCategory: tweet.projectCategory,
      amountRequired: tweet.amountRequired,
      collectedAmount: tweet.collectedAmount,
      projectDescription: tweet.projectDescription,
      imageUrl: tweet.imageUrl,
      paymentDetail : tweet.paymentDetail
    });

    // Save the new instance to the database
    addProduct.save().then(async (savedProduct) => {
      console.log(savedProduct, "Product added");

      try {
        const deletedData = await tweetModel.deleteOne({ _id: id });

        if (deletedData.deletedCount !== 0) {
          res.status(200).json({
            message: "Product has been deleted successfully",
          });
        } else {
          res.status(404).json({
            message: "No Product found with this id: " + id,
          });
        }
      } catch (deleteError) {
        console.error("Error deleting product:", deleteError);
        res.status(500).json({ error: "Error deleting product" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/api/v1/CompletedProject2/:id", upload.any(), async (req, res) => {
  const id = req.params.id;

  try {
    // Assuming tweetModel has a method like findById to find a document by its ID
    const tweet = await tweetModel2.findById(id);

    if (!tweet) {
      return res.status(404).json({ error: "Tweet not found" });
    }

    // Create a new instance of tweetModel2 with data from tweet
    let addProduct = new tweetModel({
      projectName: tweet.projectName,
      projectVillage : tweet.projectVillage,
      projectCategory: tweet.projectCategory,
      amountRequired: tweet.amountRequired,
      collectedAmount: tweet.collectedAmount,
      projectDescription: tweet.projectDescription,
      imageUrl: tweet.imageUrl,
      paymentDetail : tweet.paymentDetail
    });

    // Save the new instance to the database
    addProduct.save().then(async (savedProduct) => {
      console.log(savedProduct, "Product added");

      try {
        const deletedData = await tweetModel2.deleteOne({ _id: id });

        if (deletedData.deletedCount !== 0) {
          res.status(200).json({
            message: "Product has been deleted successfully",
          });
        } else {
          res.status(404).json({
            message: "No Product found with this id: " + id,
          });
        }
      } catch (deleteError) {
        console.error("Error deleting product:", deleteError);
        res.status(500).json({ error: "Error deleting product" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.put('/api/v1/paymentDetail/:id', async (req, res) => {
console.log(req.params.id)

const id = req.params.id;
console.log(req.body.paymentDetail)
try {
  // Assuming tweetModel has a method like findById to find a document by its ID
  const tweet = await tweetModel.findById(id);

  if (!tweet) {
    return res.status(404).json({ error: "Tweet not found" });
  }

  // Create a new instance of tweetModel2 with data from tweet
  let addProduct = new tweetModel({
    patientName: tweet.patientName,
    patientAge: tweet.patientAge,
    AdmissionDate: tweet.AdmissionDate,
    AdmissionFee: tweet.AdmissionFee,
    MonthlyFee: tweet.MonthlyFee,
    RequiredAmount: tweet.RequiredAmount,
    PatientDescription: tweet.PatientDescription,
    paymentDetail: req.body.paymentDetail
  });

  // Save the new instance to the database
  addProduct.save().then(async (savedProduct) => {
    console.log(savedProduct, "Product added");

    try {
      const deletedData = await tweetModel.deleteOne({ _id: id });

      if (deletedData.deletedCount !== 0) {
        res.status(200).json({
          message: "Product has been deleted successfully",
        });
      } else {
        res.status(404).json({
          message: "No Product found with this id: " + id,
        });
      }
    } catch (deleteError) {
      console.error("Error deleting product:", deleteError);
      res.status(500).json({ error: "Error deleting product" });
    }
  });
} catch (error) {
  console.error(error);
  res.status(500).json({ error: "Internal Server Error" });
}
});

// Update Api 

app.put('/api/v1/paymentUpdate/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const updatedData = await tweetModel.updateOne(
      { _id: id },
      { $set: { paymentDetail: req.body.paymentDetail } }
    );

    if (updatedData.nModified !== 0) {
      res.status(200).json({
        message: "Payment detail updated successfully",
      });
    } else {
      res.status(404).json({
        message: "No document found with this id: " + id,
      });
    }
  } catch (error) {
    console.error("Error updating payment detail:", error);
    res.status(500).json({ error: "Error updating payment detail" });
  }
});

app.put('/api/v1/paymentUpdate/Acheived/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const updatedData = await tweetModel2.updateOne(
      { _id: id },
      { $set: { paymentDetail: req.body.paymentDetail } }
    );

    if (updatedData.nModified !== 0) {
      res.status(200).json({
        message: "Payment detail updated successfully",
      });
    } else {
      res.status(404).json({
        message: "No document found with this id: " + id,
      });
    }
  } catch (error) {
    console.error("Error updating payment detail:", error);
    res.status(500).json({ error: "Error updating payment detail" });
  }
});

app.post('/api/add-doctor-detail', async (req, res) => {
  try {
    const { name, salary, number, address } = req.body;

    const newDoctor = new Doctor({
      name,
      salary,
      number,
      address,
    });
console.log(newDoctor)
    const savedDoctor = await newDoctor.save();
console.log(savedDoctor)
    res.status(201).json(savedDoctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/get-doctor-details', async (req, res) => {
  try {
    const doctorDetails = await Doctor.find();
    res.status(200).json(doctorDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/api/add-Teacher-detail', async (req, res) => {
  try {
    console.log("req.body" , req.body)
    const { TeacherName, TeacherSalary, TeacherNumber, TeacherAddress } = req.body;

    const newDoctor = new Teacher({
      name: TeacherName,
      salary: TeacherSalary,
      number: TeacherNumber,
      Salaryinformation: TeacherAddress,
    });
console.log(newDoctor)
    const savedDoctor = await newDoctor.save();
console.log(savedDoctor)
    res.status(201).json(savedDoctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/add-Groccery-detail', async (req, res) => {
  try {
    console.log("req.body" , req.body)
    const { amountRequired, grocceryDate, grocceryItems } = req.body;

    const newDoctor = new Groccery({
      totalAmount: amountRequired,
      date: grocceryDate,
      items: grocceryItems,
    });
    console.log(newDoctor)
    const savedDoctor = await newDoctor.save();
    console.log(savedDoctor)
    res.status(201).json(savedDoctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/api/add-Office-rent', async (req, res) => {
  try {
    console.log("req.body" , req.body)
    const { rentAmount, officeAddress, officeArea  } = req.body;

    const newDoctor = new Ofice_rent({
      rentAmount: rentAmount,
      officeAddress: officeAddress,
      officeArea: officeArea,
    });
    console.log(newDoctor)
    const savedDoctor = await newDoctor.save();
    console.log(savedDoctor)
    res.status(201).json(savedDoctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/api/add-Transportation-rent', async (req, res) => {
  try {
    console.log("req.body" , req.body)
    const { staffName, transportationType, transportationFuel  } = req.body;

    const newDoctor = new Transportation_Detail({
      staffName: staffName,
      transportationType: transportationType,
      transportationFuel: transportationFuel,
    });
    console.log(newDoctor)
    const savedDoctor = await newDoctor.save();
    console.log(savedDoctor)
    res.status(201).json(savedDoctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.post('/api/add-Transportation-rent', async (req, res) => {
  try {
    console.log("req.body" , req.body)
    const { staffName, transportationType, transportationFuel  } = req.body;

    const newDoctor = new Transportation_Detail({
      staffName: staffName,
      transportationType: transportationType,
      transportationFuel: transportationFuel,
    });
    console.log(newDoctor)
    const savedDoctor = await newDoctor.save();
    console.log(savedDoctor)
    res.status(201).json(savedDoctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/staff-salaries', async (req, res) => {
  try {
    console.log("req.body" , req.body)
    const { staffName, staffSalary, staffNumber, staffAddress  } = req.body;

    const newDoctor = new Staff_Salary({
      staffName: staffName,
      staffSalary: staffSalary,
      staffNumber: staffNumber,
      staffAddress: staffAddress,
    });
  
    console.log(newDoctor)
    const savedDoctor = await newDoctor.save();
    console.log(savedDoctor)
    res.status(201).json(savedDoctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/api/add-Electricity-bill', async (req, res) => {
  try {
    console.log("req.body" , req.body)
    const { billingMonth, payableAmount, dueAmount , billingDate,  dueDate  } = req.body;

    const newDoctor = new Electricity_Bill({
      billMonth: billingMonth,
      payableAmout: payableAmount,
      dueAmount: dueAmount,
       billingDate : billingDate,
       dueDate :  dueDate,
    });
    console.log(newDoctor)
    const savedDoctor = await newDoctor.save();
    console.log(savedDoctor)
    res.status(201).json(savedDoctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete("/api/v1/customer8/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedData = await Electricity_Bill.deleteOne({ _id: id });

    if (deletedData.deletedCount !== 0) {
      res.send({
        message: "Product has been deleted successfully",
      });
    } else {
      res.status(404).send({
        message: "No Product found with this id: " + id,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Server error",
    });
  }
});

app.get("/api/v1/Electricity-Bill", async (req, res) => {
  try {
    const result = await Electricity_Bill.find().exec(); // Using .exec() to execute the query
    // console.log(result);
    res.send({
      message: "Got all products successfully",
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Server error",
    });
  }
});
app.post("/api/v1/Electricity-Billed/:id", upload.any(), async (req, res) => {
  try {
    const body = req.body;
    const id = req.params.id;
    console.log(id)
    console.log("req.body: ", req.body);
    const { billMonth, payableAmout, dueAmount ,billingDate, dueDate } = req.body;
    Electricity_Bill
    .findByIdAndUpdate(
      id,
      {
        billMonth: billMonth,
        payableAmout: payableAmout,
        dueAmount: dueAmount,
        billingDate : billingDate,
         dueDate :  dueDate,
      },
      { new: true }
    )
    .then((updatedProduct) => {
      console.log("Product Updated successfully", updatedProduct);
      res.status(200).send();
    })
    .catch((error) => {
      console.error("Error updating product:", error);
      res.status(500).send();
    });



  } catch (error) {
    console.log("error: ", error);
    res.status(500).send();
  }
});
// Water


app.post('/api/add-Water-bill', async (req, res) => {
  try {
    console.log("req.body" , req.body)
    const { billingMonth, payableAmount, dueAmount , billingDate,  dueDate  } = req.body;

    const newDoctor = new Water_Bill({
      billMonth: billingMonth,
      payableAmout: payableAmount,
      dueAmount: dueAmount,
       billingDate : billingDate,
       dueDate :  dueDate,
    });
    console.log(newDoctor)
    const savedDoctor = await newDoctor.save();
    console.log(savedDoctor)
    res.status(201).json(savedDoctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete("/api/v1/customer9/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedData = await Water_Bill.deleteOne({ _id: id });

    if (deletedData.deletedCount !== 0) {
      res.send({
        message: "Product has been deleted successfully",
      });
    } else {
      res.status(404).send({
        message: "No Product found with this id: " + id,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Server error",
    });
  }
});
app.get("/api/v1/Water-Bill", async (req, res) => {
  try {
    const result = await Water_Bill.find().exec(); // Using .exec() to execute the query
    // console.log(result);
    res.send({
      message: "Got all products successfully",
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Server error",
    });
  }
});
app.post("/api/v1/Water-Billed/:id", upload.any(), async (req, res) => {
  try {
    const body = req.body;
    const id = req.params.id;
    console.log(id)
    console.log("req.body: ", req.body);
    const { billMonth, payableAmout, dueAmount ,billingDate, dueDate } = req.body;
    Water_Bill
    .findByIdAndUpdate(
      id,
      {
        billMonth: billMonth,
        payableAmout: payableAmout,
        dueAmount: dueAmount,
        billingDate : billingDate,
         dueDate :  dueDate,
      },
      { new: true }
    )
    .then((updatedProduct) => {
      console.log("Product Updated successfully", updatedProduct);
      res.status(200).send();
    })
    .catch((error) => {
      console.error("Error updating product:", error);
      res.status(500).send();
    });



  } catch (error) {
    console.log("error: ", error);
    res.status(500).send();
  }
});


// Gas 


app.post('/api/add-Gas-bill', async (req, res) => {
  try {
    console.log("req.body" , req.body)
    const { billingMonth, payableAmount, dueAmount , billingDate,  dueDate  } = req.body;

    const newDoctor = new Gas_Bill({
      billMonth: billingMonth,
      payableAmout: payableAmount,
      dueAmount: dueAmount,
       billingDate : billingDate,
       dueDate :  dueDate,
    });
    console.log(newDoctor)
    const savedDoctor = await newDoctor.save();
    console.log(savedDoctor)
    res.status(201).json(savedDoctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.delete("/api/v1/customer10/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedData = await Gas_Bill.deleteOne({ _id: id });

    if (deletedData.deletedCount !== 0) {
      res.send({
        message: "Product has been deleted successfully",
      });
    } else {
      res.status(404).send({
        message: "No Product found with this id: " + id,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Server error",
    });
  }
});
app.get("/api/v1/Gas-Bill", async (req, res) => {
  try {
    const result = await Gas_Bill.find().exec(); // Using .exec() to execute the query
    // console.log(result);
    res.send({
      message: "Got all products successfully",
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Server error",
    });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
