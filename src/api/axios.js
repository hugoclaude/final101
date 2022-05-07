import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:3500'
    // make sure to change the base URL to the corresponding
    // address before taking the project live
});

// run this line in the server to start this local API to test the project:
// npx json-server -p 3500 -w data.db.json
// then launch the react app in annother terminal window: npm start