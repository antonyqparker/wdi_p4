var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, unique: true },
  address1: { type: String },
  address2: String,
  city: { type: String },
  postcode: { type: String },
  country: { type: String },
  passwordHash: { type: String }
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
    this.passwordHash = bcrypt.hashSync(this._password, bcrypt.genSaltSync(8));
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