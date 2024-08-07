/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     tags:
 *       - Authentication
 *     description: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@mailinator.com
 *               password:
 *                 type: string
 *                 example: string123
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     email:
 *                       type: string
 *                       example: admin@mailinator.com
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsaW5hdG9yLmNvbSIsImlhdCI6MTcyMjkyNjc4NiwiZXhwIjoxNzIyOTMwMzg2fQ.f-TVQfJUmbBYej1bCltSR05m-Gos0RFJt9MNrCcGbn8
 *       400:
 *         description: Validation errors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: object
 *                   additionalProperties:
 *                     type: string
 *             examples:
 *               email-required:
 *                 summary: Email is required
 *                 value:
 *                   errors:
 *                     email: "Email is required"
 *               invalid-email:
 *                 summary: Enter a valid email address
 *                 value:
 *                   errors:
 *                     email: "Enter a valid email address"
 *               password-required:
 *                 summary: Password is required
 *                 value:
 *                   errors:
 *                     password: "Password is required"
 *
 *       401:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 *             examples:
 *               unauthorized:
 *                 summary: Unauthorized access
 *                 value:
 *                   error: "Unauthorized"
 */

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: User logout
 *     tags:
 *       - Authentication
 *     description: Logout a user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful logout
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logged out successfully
 *             examples:
 *               success:
 *                 summary: Successful logout
 *                 value:
 *                   message: "Logged out successfully"
 *       401:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             examples:
 *               token-invalidated:
 *                 summary: Token has been invalidated
 *                 value:
 *                   error: "Token has been invalidated"
 *
 *       403:
 *         description: Forbidden access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             examples:
 *               token-not-valid:
 *                 summary: Token is not valid
 *                 value:
 *                   error: "Token is not valid"
 */
