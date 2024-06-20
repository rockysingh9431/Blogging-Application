const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const { createTokenForUser } = require("../services/authentication");
const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageUrl: {
      type: String,
      default: "/images/default.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

/*

The schema.pre() function in Mongoose is used to define pre-save middleware, also known as "hooks."
Pre-save middleware functions are executed before a document (record) is saved to the database. 
These functions can perform various tasks such as data validation, modification, or executing custom 
logic before the document is saved.
*/
userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;
  const salt = randomBytes(16).toString();
  const hashPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashPassword;
  return next();
});


/*

// Instance of user
const newUser = new User({
  username: 'john_doe',
  email: 'john@example.com',
  password: 'hashed_password',
});

here newUSer is innstance of model user

The userSchema.static() function in Mongoose basically defines methods/function that will directly called on model
itself.

here matchPasswordAndGenerateToken is a static method defined on the userSchema. 
*/
userSchema.static(
  "matchPasswordAndGenerateToken",
  async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("User Not Found");

    const salt = user.salt;
    const hashPassword = user.password;

    const userProvidedHash = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    if (hashPassword !== userProvidedHash)
      throw new Error("Incorrect password provided");

    const token = createTokenForUser(user);
    return token;
    // return { ...user, password: undefined, salt: undefined };
  }
);
const USER = model("users", userSchema);

module.exports = USER;
 