# Project Information

Hey there 😄 Welcome to my ticketing web app, there are a few system components which need to be installed to get this setup on your machine. 

Please ensure you have the following technologies installed and setup:
- Nodejs
- NPM
- Docker

This project depends on another project which supplies the backend functionality, please ensure you have this cloned and setup by following the README provided in the repo: 
- [https://github.com/HarryCravDev/support-ticket-backend](https://github.com/HarryCravDev/support-ticket-backend)

## Installation
1:
Let's start by installing all necessary packages to run this app. When you have support-ticket-front-end repo cloned, navigate your way to that folder using your OS command line tool. Once you are there run...


```bash
npm install
```

2: Navigate your way to the `.env` file which is located in the root of the repository. Once this file is open, set the `VITE_IP=` value to either your IP Address or 'Localhost'

```env
VITE_IP=192.123.4.56 or VITE_IP=localhost
```

 

## Usage

```javascript
import foobar

# returns 'words'
functon foo (){

}

# returns 'geese'
foobar.pluralize('goose')

# returns 'phenomenon'
foobar.singularize('phenomena')
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
[MIT](https://choosealicense.com/licenses/mit/)