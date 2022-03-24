const UserController = require("../../controllers/UserController");

/**
 * @swagger
 * definitions:
*   User:
*      type: array
*      items:
*        type: object
*        properties:
*           op:
*              type: string
*              example: replace
*           path:
*              type: string
*              example: /username
*           value:
*              type: string
*              example: sarahMiller
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
 * /api/v1/users/{id}:
 *   patch:
 *     description: Update User
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/User'
 *     parameters:
 *       - name: id
 *         description: User id
 *         in: path
 *         required: true
 *         type: string
 *     security:
 *        - jwt: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *            application/json:
 *                schema:
 *                  $ref: '#/definitions/Login'
 *       400:
 *         description: Bad requests
 *         content:
 *            plain/text:
 *                schema:
 *                  type: string
 *       401:
 *         description: Unauthorized
 *         content:
 *            plain/text:
 *                schema:
 *                  type: string
 */
const updateUser = async (req, res) => {
  const response = await UserController.updateUser(req);

  res.status(200).json(response);
};

module.exports = updateUser;
