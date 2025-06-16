NOMBRE DE LA APP
<insertar imagen>


Description
ecommerce (concepto)

Functional Description
UseCases
Login
Register (create user)
Product reviews
Publish products
Filter/search products
Delete products
Update user access data (password/email)
Add to cart

UI/UX Design
Include link of main distribution to Figma

Technical Description
Technologies and libraries
React
Vite
Tailwind
react-router
Express
Node
Mongo+Mongoose
Mocha Chai
Bcrypt / Token Library (jose, jwt, etc)

Data Models
Users:
Id: Object Id
Password: string
Email: string
Name: string
Cart: [{
      item: productId,
      ammount: number}
]

Products:
Id: ObjectId
Name: string,
Description: string,
Price: number
Reviews: [ReviewId]

Reviews:
Id: object id
Text: string,
Author: UserId
Score: number
Product: ProductId

Test Coverage
<insertar captura de pantalla>