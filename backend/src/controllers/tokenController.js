import Token from "../models/token.model.js";
import Joi from "joi";
import generateRandomToken from '../utils/generateToken.js';
import moment from "moment";

const myCustomValidation = (value, helpers) => {
    if (typeof value !== 'number') return helpers.error('any.invalid')
    
    if (value % 100 === 0) {
      // your logic above
      return value
    } else return helpers.error('number must be multiple of 100')
  }

  
function validate(req){
    const schema = Joi.object({
        amount:Joi.number().custom(myCustomValidation,"custom validation for multiple of 100")
    })
    return schema.validate(req)
}

const tokenController = {
  async createToken(req, res) {
      const {error} = validate(req.body);
      if (error) {
          return res.send({
              success:false,
              message:error.message,
              data:null
          })
      }
      let token  = await Token.findOne({tokenNumber:req.body.tokenNumber})
      if(token) return res.send({
          success:false,
          message:'token already exist',
          data: null
      })
      else{
          token = new Token()
          token.tokenNumber = generateRandomToken();
          token.status = "VALID";
          token.expiresAt = moment().add((req.body.amount/100), 'days').format();

          token.save()
          .then((token) =>
            res.send({
              success: true,
              message: "token successfully created",
              data: token,
            })
          )
          .catch((err) => res.send({
              success: false,
              message:"something went wrong",
              data:null
          }));
      }
  },

  async getall(req, res) {
    Token.find()
      .then((tokens) =>
        res.send({
          success: true,
          message: "get all tokens successful",
          data: tokens,
        })
      )
      .catch((err) => res.send({
        success: false,
        message:"couldn't fetch tokens",
        data:null
    }));
  },

  async readTokenById(req, res) {
    await Token.findById(req.params.id)
      .then((token) => res.send({
        success: true,
        message: 'Get token successful',
        data: token
      }).status(201))
      .catch((err) => res.send({
        success: false,
        message: 'Get token Failed',
        data: null
      }).status(400));
  },

  async updateToken(req, res) {
    console.log(req.params.id);
    await Token.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    })
      .then((updatedToken) => res.send({
        success: true,
        message: 'Update token successful',
        data: updatedToken
      }).status(201))
      .catch((err) => res.send({
        success: false,
        message: 'Update token failed',
        data: null
      }).status(400));
  },

  async deleteToken(req, res) {
    await Token.findOneAndRemove(req.params.id)
      .then((deletedToken) => res.send({
        success: true,
        message: 'Delete token successfull',
        data: deletedToken
      }).status(201))
      .catch((err) => res.send({
        success: false,
        message: 'Delete token failed',
        data: null
      }).status(400));
  },
};

export default tokenController;