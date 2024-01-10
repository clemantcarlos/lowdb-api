import app from './app.js'
import {createConnection} from './database.js'

await createConnection()
app.listen(3000)

console.log('Server is running on port http://localhost:3000');