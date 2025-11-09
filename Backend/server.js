
//IMPORTING MODULES
const express = require("express");
const mongoose = require("mongoose");         // MongoDB ODM
const cors = require("cors");                 // Allow cross-origin requests
const user = require('./models/Signup');      // User signup/login model
const product = require('./models/products'); // Product model
const cart = require('./models/Cart.js');     // Cart model
const dbconnection = require('./config/db');  // MongoDB connection config
const items = require('./models/products.js') //get product data from database
const bodyParser = require("body-parser")     //convert into js object thst easily acess req.body
const nodemailer = require('nodemailer')      //use for email
const feedback = require('./models/Feedback.js') //feedback
const Stripe = require("stripe");  //payment
const dotenv = require("dotenv"); //use for env variable
const Address = require('./models/address.js')
const orders = require('./models/Order.js')
const { ObjectId } = require("mongodb");
const AI = require('./models/ai.js')
const booked_doctors = require('./models/booked_doctors.js')
const bcrypt = require("bcrypt")
//req.body use for post
//req.query use for get



// Express-validator for input validation
const { body, validationResult } = require('express-validator');

const {

  Must_Have,
  Ayurvedic,
  Skin_care,
  Sport_Nutrition,
  Diabetes_Essentials,
  Health_Care_Devices,
  Health_Care,
  Vitamin,
  Personal_Care,
  Food_Drinks
} = require('./app.js');

const Cart = require('./models/Cart.js'); // Cart schema reference
const Orders = require("./models/Order.js");


// APP CONFIGURATION

const app = express();
app.use(cors());           // Allow frontend to access backend
app.use(express.json());   // Parse JSON request bodies

app.use(express.static("public"));
app.use(express.static("/dist"));
dotenv.config();
// USER SIGN-IN ROUTE

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userData = await user.findOne({ email });
    if (!userData) {
      return res.json({ message: 'No data found' });
    }

    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
      return res.json({ message: 'Password is incorrect' });
    }

    res.json({
      message: "Login Successful",
      name: userData.name,
      userId: userData._id
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});



app.post('/signup', [

  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { name, email, password, confirmPassword } = req.body;


    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const hashpassword = await bcrypt.hash(password, 10)


    const existingUser = await user.findOne({ email });
    if (existingUser) return res.status(409).json({ error: 'Email already exists' });

    const newUser = await user.create({ name, email, password: hashpassword });
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 5. PRODUCT CATEGORY ROUTES

app.get('/must_have', (req, res) => res.json(Must_Have));
app.get('/ayurvedic', (req, res) => res.json(Ayurvedic));
app.get('/skin_care', (req, res) => res.json(Skin_care));
app.get('/sport_nutrition', (req, res) => res.json(Sport_Nutrition));
app.get('/diabetes_essentials', (req, res) => res.json(Diabetes_Essentials));
app.get('/health_care_devices', (req, res) => res.json(Health_Care_Devices));
app.get('/health_care', (req, res) => res.json(Health_Care));
app.get('/vitamin', (req, res) => res.json(Vitamin));
app.get('/personal_care', (req, res) => res.json(Personal_Care));
app.get('/food_drinks', (req, res) => res.json(Food_Drinks));


//ADD ITEM TO CART 
app.post('/qty', async (req, res) => {
  try {
    const { id, username, name, price, previous_mrp, discount, image, description } = req.body;

    const existingPro = await cart.findOne({ name });
    if (existingPro) {
      return res.json({ message: 'Item already in cart' });
    }

    const newItem = new Cart({
      id,
      username,
      name,
      price,
      previous_mrp,
      description,
      discount,
      image
    });

    await newItem.save();
    res.json({ message: "Item added to cart", item: newItem });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  }
});



app.get('/qty', async (req, res) => {

  try {
    const { qty, index } = req.query;
    console.log("Qauntiyty", qty)
    console.log("Index : ", index)

    const products = await cart.find();

    const product = products[index];
    product.qty = qty;
    await product.save();

    res.json("Quantity updated in cart")
  }

  catch (err) {
    res.json("Not Work")
  }

});



app.get("/api/products/:id", (req, res) => {
  const id = req.params.id;

  const allProducts = [
    ...Must_Have,
    ...Ayurvedic,
    ...Skin_care,
    ...Sport_Nutrition,
    ...Diabetes_Essentials,
    ...Health_Care_Devices,
    ...Health_Care,
    ...Vitamin,
    ...Personal_Care,
    ...Food_Drinks
  ];

  const product = allProducts.find(item => String(item.id) === String(id));
  if (!product) {
    return res.status(404).json({ message: "Item not found" });
  }

  res.json({
    product,
    keyBenefits: product.keyBenefits || [],
    faqs: product.faqs || [],
    frequentlyBought: []
  });
});


// GET ALL CART DATA

app.get('/prodata', async (req, res) => {
  try {
    const prodata = await cart.find();
    res.json(prodata.length > 0 ? prodata : []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET CART ITEMS FOR A USER


app.get("/cart", async (req, res) => {
  try {
    const { username } = req.query;
    const cartItems = await cart.find({ username });
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//DELETE CART ITEM BY INDEX 
app.delete('/cart/:index', async (req, res) => {
  try {
    const { index } = req.params;

    const cartItems = await cart.find();

    if (index < 0 || index >= cartItems.length) {
      return res.status(404).json({ message: 'Invalid index' });
    }


    const itemToDelete = cartItems[index];
    await cart.findByIdAndDelete(itemToDelete._id);

    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



//Search Product
app.get('/Home/search', async (req, res) => {
  try {
    const { searchQuery } = req.query; // get query param from URL

    //regex use for search 
    const samedata = await items.find({
      name: { $regex: searchQuery, $options: 'i' },
    });


    if (samedata) {
      console.log('ok');
      res.json({ status: 'ok', data: samedata });
    } else {
      console.log('not ok');
      res.json({ status: 'not ok' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


app.get('/feedback', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.query
    const send = await new feedback({ name, email, phone, subject, message })
    await send.save();
    res.json("Feedback send Successfully")
  }
  catch (err) {
    err.json("Not Send")
  }
})


//ROOT ROUTE



let otpStore = {}; // { email: otp }


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "gautamdoliya69@gmail.com", //  Gmail
    pass: "kphj kzgc tuoa hqto" // Gmail App Password
  }
});

//  Send OTP
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = otp;

  try {
    await transporter.sendMail({
      from: `"My App" <YOUR_EMAIL@gmail.com>`,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}`,
      html: `
      <!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="color-scheme" content="light dark">
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>TonicHub Pharmacy — OTP Verification</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background: #f6f7fb;
      font-family: Inter, Segoe UI, Roboto, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    .container {
      max-width: 560px;
      margin: 24px auto;
      padding: 0 16px;
    }
    .card {
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 6px 24px rgba(16,24,40,.06);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg,#0ea5e9,#6366f1);
      padding: 32px 24px 24px;
      color: #fff;
      text-align: center;
    }
    .logo {
      max-width: 120px;
      height: auto;
      margin: 0 auto 12px;
      display: block;
    }
    .brand {
      font-size: 20px;
      font-weight: 700;
      letter-spacing: .5px;
    }
    .content {
      padding: 28px 24px;
    }
    h1 {
      margin: 0 0 12px;
      font-size: 22px;
      color: #111827;
    }
    p {
      margin: 0 0 14px;
      color: #374151;
      line-height: 1.6;
      font-size: 15px;
    }
    .otp {
      font-size: 30px;
      letter-spacing: 8px;
      font-weight: 800;
      padding: 16px;
      text-align: center;
      border: 2px dashed #e5e7eb;
      border-radius: 12px;
      background: #fafafa;
      color: #111827;
      margin: 20px 0;
    }
    .meta {
      font-size: 13px;
      color: #6b7280;
      margin-top: 20px;
    }
    .footer {
      padding: 18px;
      text-align: center;
      color: #9ca3af;
      font-size: 12px;
      background: #f9fafb;
    }
    @media (prefers-color-scheme: dark) {
      body { background: #0b1020; }
      .card { background: #0f172a; border: 1px solid #1f2a44; }
      h1, .otp { color: #e5e7eb; }
      p, .meta, .footer { color: #cbd5e1; }
      .otp { background: #0b1222; border-color: #1f2a44; }
      .footer { background: #111827; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="header">
        <!--  Company Logo -->
        <div class="brand">TonicHub Pharmacy</div>
      </div>
      <div class="content">
        <h1>Verify your email</h1>
        <p>Hello,</p>
        <p>Use the One-Time Password (OTP) below to complete your verification. The code will expire in <b>10 minutes</b>.</p>
        <div class="otp">${otp}</div>
        <p class="meta">If you did not request this, you can safely ignore this email.</p>
      </div>
      <div class="footer">
        Sent by TonicHub Pharmacy • Do not share this code with anyone.
      </div>
    </div>
    <p class="meta" style="text-align:center;margin-top:12px">
      Trouble seeing the code? Your OTP is: <b>${otp}</b>
    </p>
  </div>
</body>
</html>

`

    });

    res.json({ success: true, message: "OTP sent to email" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Failed to send OTP" });
  }
});

//  Verify OTP
app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  if (otpStore[email] === otp) {
    delete otpStore[email];
    res.json({ success: true, message: "OTP Verified" });
  } else {
    res.json({ success: false, message: "Invalid OTP" });
  }
});


//Address send to database 
app.get('/address', async (req, res) => {
  try {
    const { fullname, pincode, email, state, city, address, phonenumber } = req.query
    console.log(fullname, pincode, email, state, city, address, phonenumber)
    const send = new Address({ fullname, pincode, email, state, city, address, phonenumber })
    await send.save()
    res.json("Data Ayya")
  }
  catch (err) {
    err.json("Nahi Gaya Data")
  }
})


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
app.post('/checkout', async (req, res) => {
  try {
    const { coupon } = req.body;
    let discount = Number(coupon) || 0;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item, index) => {
        let finalPrice = item.price;


        if (index === 0) {
          finalPrice = finalPrice - discount + 49;
        }

        console.log("Final Price is", finalPrice);

        return {
          price_data: {
            currency: "inr",
            product_data: { name: item.name },
            unit_amount: Math.max(1, Math.round(finalPrice * 100)),
          },
          quantity: item.qty,
        };
      }),
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel"
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});


//Orders
app.post('/orders', async (req, res) => {
  try {
    const ordersArray = req.body.orders;
    for (const order of ordersArray) {
      await orders.findOne({
        username: order.username,
        name: order.name
      });
      const newOrder = new orders(order);
      await newOrder.save();

    }

    res.status(200).json({ message: "Orders saved successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.get('/orderdata', async (req, res) => {
  try {
    const orderdata = await orders.find()
    res.json(orderdata)
  }
  catch (err) {
    res.err("data not send")
  }
})

app.get('/orderdata/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const orderdata = await orders.findOne({ _id: new ObjectId(id) })
    if (!orderdata) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(orderdata)
  }
  catch (err) {
    res.err("data not send")
  }
})

app.post("/forget-password", async (req, res) => {
  const { email, password } = req.body
  const hashpassword = await bcrypt.hash(password, 10)
  try {
    const UpdatePassword = await user.findOneAndUpdate({ email },
      { $set: { password: hashpassword } },
      { new: true }
    )

    if (!UpdatePassword) {
      return res.json("User not found")
    }

    res.json("Password Updated")
  }
  catch (err) {
    res.status(500).json("Server Error")
  }
})

app.post('/aidata', async (req, res) => {
  try {
    const { usertext, response } = req.body

    console.log("usertext", usertext)
    console.log(response)

    const data = new AI({
      usertext,
      response
    })

    await data.save()
    res.json(usertext)
  } catch (error) {
    res.json(error)
  }
})


app.post('/booked_doctors', async (req, res) => {
  try {

    const {
      id,
      name,
      specialization,
      experience,
      image,
      availability,
      contact,
      email,
      fee,
      rating,
      reviews,
      location,
      languages,
      consultationType,
      nextSlot,
      badges,
      education,
      about
    } = req.body;

    const existsDoctor = await booked_doctors.findOne({ name })

    if (existsDoctor) {
      res.json("Doctor are Already Booked");
    }

    const data = new booked_doctors({
      id,
      name,
      specialization,
      experience,
      image,
      availability,
      contact,
      email,
      fee,
      rating,
      reviews,
      location,
      languages,
      consultationType,
      nextSlot,
      badges,
      education,
      about
    })

    await data.save()
    res.json("Data send Successfully");
  } catch (error) {
    res.json(error)
  }
})

app.get('/booked_doctors', async (req, res) => {
  try {
    const data = await booked_doctors.find();
    res.json(data)
  } catch (error) {
    res.json(error)
  }
})


app.listen(3000, () => console.log("✅ Server running on port 3000"));
