const AuthenticationController = require("../../controllers/AuthenticationController");

/**
 * @swagger
 * definitions:
 *   Login:
 *      type: object
 *      required:
 *        - username
 *        - password
 *      properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 *
 * /api/v1/login:
 *   post:
 *     description: Login to the application and generate JWT
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/Login'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *            plain/text:
 *                schema:
 *                  type: string
 *                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjM4ZTRhNmQ2ZjQyMDM1YmM0ZjJhMzkiLCJpYXQiOjE2NDc4OTU3MTgsImV4cCI6MTY0Nzk4MjExOH0.2YdRqhVQ896WqhPfffuI6XMF8xF09_PEXosaJNCv2RU
 *       400:
 *         description: Bad requests
 *         content:
 *            plain/text:
 *                schema:
 *                  type: string
 */

const loginUser = async (req, res) => {
  const response = await AuthenticationController.login(req);
  res.status(200).send(response);
};

module.exports = loginUser;
