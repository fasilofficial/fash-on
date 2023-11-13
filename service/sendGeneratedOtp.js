const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const bcrypt = require("bcrypt");

const sendGeneratedOtp = async (user, res) => {
  try {
    var generatedOtp = "";
    let digits = "0123456789";
    for (let i = 0; i < 6; i++) {
      generatedOtp += digits[Math.floor(Math.random() * 10)];
    }
    await client.messages.create({
      from: "+18564520062",
      to: "+91" + user.phone,
      body: `Your OTP from Fash-on is: ${generatedOtp}. Please use this code to verify your account.`,
    });
    res.cookie("generatedOtp", await bcrypt.hash(generatedOtp, 10), {
      maxAge: 60000,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendGeneratedOtp,
};
