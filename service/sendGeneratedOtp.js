const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;

const client = require("twilio")(accountSid, authToken, { lazyLoading: true });

const sendGeneratedOtp = async (user, res) => {
  try {
    client.verify.v2.services(serviceSid).verifications.create({
      to: "+91" + user.phone,
      channel: "sms",
    });

    res.cookie("email", user.email);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendGeneratedOtp,
};
