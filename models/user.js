var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address1: { type: String, required: true },
  address2: String,
  city: { type: String, required: true },
  postcode: { type: String, required: true },
  country: { type: String, required: true },
  passwordHash: { type: String, required: true }
}, {
  timestamps: true
});

userSchema.set('toJSON', {
  transform: function(doc, ret){
    delete ret.passwordHash;
    delete ret.__v;
    return ret;
  } 
});

userSchema.virtual('password')
  .set(function(password){
    this._password = password;
    this.passwordHash = bcrypt.hashSync(this._password,
      bcrypt.genSaltSync(8));
  });

userSchema.virtual('passwordConfirmation')
  .set(function(passwordConfirmation){
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.path('passwordHash')
  .validate(function(passwordHash){
    if(!this._password){
      return this.invalidate('password', 'A password is required');
    }
    if(this._password !== this._passwordConfirmation){
      return this.invalidate('passwordConfirmation', 'Passwords do not match');
    }
  });

  userSchema.methods.validatePassword = function(password){
    return bcrypt.compareSync(password, this.passwordHash);
  }

var User = mongoose.model('User', userSchema);

module.exports = User;