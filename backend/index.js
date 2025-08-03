const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();
// const stripe = require('stripe')(process.env.PAYMENT_SECRET);
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// Middleware
app.use(cors());
app.use(express.json());

// Routes
            // SET TOKEN .
const verifyJWT = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).send({ error: true, message: 'Unauthorize access' })
    }
    const token = authorization?.split(' ')[1]
    jwt.verify(token, 'c8b85d082be53f826454e4459fae0c79d436dde47a203e8f5d5ee123a7b78085b023ee39cd82195c90e28bc508beba1b65cea2966113ba3d00e1c9f05b8313cc', (err, decoded) => {
        if (err) {
            return res.status(403).send({ error: true, message: 'forbidden user or token has expired' })
        }
        req.decoded = decoded;
        next()
    })
}

// MONGO DB ROUTES
//const uri="mongodb+srv://amruthasunkara:amrutha%401243@yoga-master-server.29di2qr.mongodb.net/?retryWrites=true&w=majority&appName=yoga-master-server";
const uri = "mongodb+srv://amruthasunkara:amrutha%401243@yoga-master-server.29di2qr.mongodb.net/?retryWrites=true&w=majority&appName=yoga-master-server";


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const bcrypt = require("bcryptjs");
         await client.connect();
        // Connect the client to the server	(optional starting in v4.7)
        const database = client.db("yoga-master");
        const userCollection = database.collection("users");
        const classesCollection = database.collection("classes");
        
        const instructorCollection = database.collection("instructors");
        const enrolledCollection = database.collection("enrolled");
        
        const appliedCollection = database.collection("applied");
        

                     // Verify admin
        const verifyAdmin = async (req, res, next) => {
            const email = req.decoded.email;
            const query = { email: email };
            const user = await userCollection.findOne(query);
            if (user.role === 'admin') {
                next()
            }
            else {
                return res.status(401).send({ error: true, message: 'Unauthorize access' })
            }
        }

        const verifyInstructor = async (req, res, next) => {
            const email = req.decoded.email;
            const query = { email: email };
            const user = await userCollection.findOne(query);
            if (user.role === 'instructor' || user.role === 'admin') {
                next()
            }
            else {
                return res.status(401).send({ error: true, message: 'Unauthorize access' })
            }
        }


      
        app.post("/api/verify-password", async (req, res) => {
  const { plainPassword, hashedPassword } = req.body;

  try {
    const isValid = await bcrypt.compare(plainPassword, hashedPassword);
    res.json({ valid: isValid });
  } catch (err) {
    console.error("Error verifying password:", err);
    res.status(500).json({ valid: false, error: "Server error" });
  }
});


app.post('/new-user', async (req, res) => {
  const newUser = req.body;

  // 1. Check if email already exists (optional but good)
  const existingUser = await userCollection.findOne({ email: newUser.email });
  if (existingUser) {
    return res.status(409).send({ error: true, message: "User already exists" });
  }

  // 2. Hash the password before saving
  const hashedPassword = await bcrypt.hash(newUser.password, 10);
  newUser.password = hashedPassword;

  // 3. Save user to MongoDB
  const result = await userCollection.insertOne(newUser);

  // 4. Generate JWT with entire user data (excluding password)
  const payload = {
    id: result.insertedId,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role || "student", // Optional: add default role
  };

  const token = jwt.sign(payload, 'c8b85d082be53f826454e4459fae0c79d436dde47a203e8f5d5ee123a7b78085b023ee39cd82195c90e28bc508beba1b65cea2966113ba3d00e1c9f05b8313cc', {
    expiresIn: '24h'
  });

  res.send({ message: "User registered successfully", token });
});

        app.post('/api/set-token', (req, res) => {
            const user = req.body;
            const token = jwt.sign(user,'c8b85d082be53f826454e4459fae0c79d436dde47a203e8f5d5ee123a7b78085b023ee39cd82195c90e28bc508beba1b65cea2966113ba3d00e1c9f05b8313cc' , { expiresIn: '24h' })
            res.send({ token })
        })


                        // GET ALL USERS
        app.get('/users',async (req, res) => {
            const users = await userCollection.find({}).toArray();
            res.send(users);
        })
               // GET USER BY ID
        app.get('/users/:id',async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const user = await userCollection.findOne(query);
            res.send(user);
        })
                //GET USER BY EMAIL
        app.get('/user/:email',verifyJWT,verifyAdmin, async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const result = await userCollection.findOne(query);
            res.send(result);
        })
                // Delete a user

        app.delete('/delete-user/:id',verifyJWT,verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await userCollection.deleteOne(query);
            res.send(result);
        })
                  // UPDATE USER
        app.put('/update-user/:id',verifyJWT,verifyAdmin,async (req, res) => {
            const id = req.params.id;
            const updatedUser = req.body;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name: updatedUser.name,
                    email: updatedUser.email,
                    role: updatedUser.option,
                    address: updatedUser.address,
                    phone: updatedUser.phone,
                    about: updatedUser.about,
                    photoUrl: updatedUser.photoUrl,
                    skills: updatedUser.skills ? updatedUser.skills : null,
                }
            }
            const result = await userCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })


                        // ! CLASSES ROUTES


        app.post('/new-class',async (req, res) => {
            const newClass = req.body;
            // newClass.availableSeats = parseInt(newClass.availableSeats)
            const result = await classesCollection.insertOne(newClass);
            res.send(result);
        });

               // GET ALL CLASSES ADDED BY INSTRUCTOR
        app.get('/classes/:email',async (req, res) => {
            const email = req.params.email;
            const query = { instructorEmail: email };
            const result = await classesCollection.find(query).toArray();
            res.send(result);
        })

                      // GET ALL CLASSES
        app.get('/classes', async (req, res) => {
            const query = { status: 'approved' };
            const result = await classesCollection.find(query).toArray();
            res.send(result);
        })
        app.get('/classes-manage', async (req, res) => {
            const result = await classesCollection.find().toArray();
            res.send(result);
        })

                      // Change status of a class
        app.put('/change-status/:id',async (req, res) => {
            const id = req.params.id;
            const status = req.body.status;
            console.log(req.body)
            const reason = req.body.reason;
            const filter = { _id: new ObjectId(id) };
            console.log("🚀 ~ file: index.js:180 ~ app.put ~ reason:", reason)
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    status: status,
                    reason: reason
                }
            }
            const result = await classesCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })
                    // * GET APPROVED CLASSES
        app.get('/approved-classes', async (req, res) => {
            const query = { status: 'approved' };
            const result = await classesCollection.find(query).toArray();
            res.send(result);
        })

              // GET ALL INSTRUCTORS


        // ✅ POST Instructor
app.post('/as-instructors', async (req, res) => {
  try {
    const newInstructor = req.body;
    newInstructor.status = newInstructor.status || "approved"; // default status
    const result = await instructorCollection.insertOne(newInstructor);
    res.send(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET All Instructors
app.get('/instructors', async (req, res) => {
  try {
    const query = { status: 'approved' }; // only approved instructors
    const instructors = await instructorCollection.find(query).toArray();
    res.send(instructors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

      
        app.put('/update-class/:id',async (req, res) => {
            const id = req.params.id;
            const updatedClass = req.body;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name: updatedClass.name,
                    description: updatedClass.description,
                    price: updatedClass.price,
                    availableSeats: parseInt(updatedClass.availableSeats),
                    videoLink: updatedClass.videoLink,
                    status: 'pending'
                }
            }
            const result = await classesCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })



        app.get('/popular_classes', async (req, res) => {
            const result = await classesCollection.find().sort({ totalEnrolled: -1 }).limit(6).toArray();
            res.send(result);
        })


        app.get('/popular-instructors', async (req, res) => {
            const pipeline = [
                {
                    $group: {
                        _id: "$instructorEmail",
                        totalEnrolled: { $sum: "$totalEnrolled" },
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "_id",
                        foreignField: "email",
                        as: "instructor"
                    }
                },
                {
                    $project: {
                        _id: 0,
                        instructor: {
                            $arrayElemAt: ["$instructor", 0]
                        },
                        totalEnrolled: 1
                    }
                },
                {
                    $sort: {
                        totalEnrolled: -1
                    }
                },
                {
                    $limit: 6
                }
            ]
            const result = await classesCollection.aggregate(pipeline).toArray();
            res.send(result);

        })

        // // Admins stats 
        app.get('/admin-stats', async (req, res) => {
            // Get approved classes and pending classes and instructors 
            const approvedClasses = (await classesCollection.find({ status: 'approved' }).toArray()).length;
            const pendingClasses = (await classesCollection.find({ status: 'pending' }).toArray()).length;
            const instructors = (await userCollection.find({ role: 'instructor' }).toArray()).length;
            const totalClasses = (await classesCollection.find().toArray()).length;
            const totalEnrolled = (await enrolledCollection.find().toArray()).length;
            // const totalRevenue = await paymentCollection.find().toArray();
            // const totalRevenueAmount = totalRevenue.reduce((total, current) => total + parseInt(current.price), 0);
            const result = {
                approvedClasses,
                pendingClasses,
                instructors,
                totalClasses,
                totalEnrolled,
                // totalRevenueAmount
            }
            res.send(result);

        })

        app.get('/enrolled-classes/:email',async (req, res) => {
            const email = req.params.email;
            const query = { userEmail: email };
            const pipeline = [
                {
                    $match: query
                },
                {
                    $lookup: {
                        from: "classes",
                        localField: "classesId",
                        foreignField: "_id",
                        as: "classes"
                    }
                },
                {
                    $unwind: "$classes"
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "classes.instructorEmail",
                        foreignField: "email",
                        as: "instructor"
                    }
                },
                {
                    $project: {
                        _id: 0,
                        classes: 1,
                        instructor: {
                            $arrayElemAt: ["$instructor", 0]
                        }
                    }
                }

            ]
            const result = await enrolledCollection.aggregate(pipeline).toArray();
            // const result = await enrolledCollection.find(query).toArray();
            res.send(result);
        })

        
        app.get('/applied-instructors/:email',   async (req, res) => {
            const email = req.params.email;
            const result = await appliedCollection.findOne({email});
            res.send(result);
        });
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Yoga Master Server is running!');
})


// Listen
app.listen(port, () => {
    console.log(`SERVER IS RUNNING ON PORT ${port}`);
})

