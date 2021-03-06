/* eslint-disable eqeqeq */
var helpers = {
  /**
   * Generate API Respose JSON using parameters provided
   *
   * @param {Object} res Response Object
   * @param {Object} req Request Object
   * @param {string} msg Message|Error or Message or Error. (general message, success message or error message. If want to send both message & error, use pipe separeted string.). Default is empty string.
   * @param {number} code HTTP Status Code. Default is 400.
   * @param {string[]} data Response Payload. Default is empty array.
   *
   * @returns {string} API Respose in JSON format
   */
  generateApiResponse: async function(
    res,
    req,
    msg = "",
    code = 400,
    result = []
  ) {
    var success = false;
    var status = "failure";
    var message = "";
    var error = "";
    var requestToken = null;

    if (msg == "" || msg.split("|").length <= 1) {
      message = msg;
      error = msg;
    } else {
      let messages = msg.split("|");
      message = messages[0];
      error = messages[1];
    }

    if (code == 200) {
      success = true;
      status = "ok";
      error = "";
    }

    if (req != null && typeof req.query.request_token != "undefined") {
      requestToken = req.query.request_token;
    }

    // eslint-disable-next-line no-return-await
    return await res
      .status(code)
      .json({ requestToken, success, status, code, message, error, result });
  },
  /**
   * Log error message to console.
   * @param {string} msg Error Message
   * @param {object} err Actual error stack object
   */
  logError: (msg = "Something went wrong.", err = null) => {
    // eslint-disable-next-line no-console
    console.error(
      `\n--Error Start--\nTimestamp: ${new Date()}\n${msg} :- ${err}\n--Error End--`
    );
  },
  /**
   * Log general message to console.
   * @param {string} msg Error Message
   */
  logMessage: (msg = "Task completed successfully.") => {
    // eslint-disable-next-line no-console
    console.log(
      `\n--Message Start--\nTimestamp: ${new Date()}\n${msg}\n--Message End--`
    );
  }
};

module.exports = helpers;
