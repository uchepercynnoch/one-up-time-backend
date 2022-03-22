const ImageController = require("../../controllers/ImageController");

/**
 * @swagger
 * definitions:
 *   Image:
 *      type: object
 *      required:
 *        - url
 *      properties:
 *       url:
 *         type: string
 *         example: https://picsum.photos/200/300
 *
 * /api/v1/thumbnails:
 *   post:
 *     summary: Generate a 50x50 image thumbnail
 *     description: You must be authorized to access this resource. Copy and paste the JWT generated from login in the {Authorize} button above
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/Image'
 *     security:
 *        - jwt: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *            plain/text:
 *                schema:
 *                  type: string
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
const createThumbnail = async (req, res) => {
  await ImageController.getImageThumbnail(req, res);
};

module.exports = { createThumbnail };
