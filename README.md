# Guilherme Camacho - Project presentation

### Hi, this is my test to join the Uello team.

## Front End
#### ( directory `/uello-client`)
The frontend is developed in React JS in version 16.5


### `npm install` 
This will be install all dependencies to project 

### `ng serve`
Runs the app in the development mode.
Open [http://localhost:4200](http://localhost:4200) to view it in the browser.
The page will reload if you make edits.
You will also see any lint errors in the console.

### `bg build`
Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

## Back End
#### ( directory `/`)
The backend of the project is done in a framework created by myself.
What I call  [globalrestfull](https://github.com/guiters/globalrestful) you can find it on my github

It functions as an api incorporator where it is automatically interpreted through a **.json** file.

#### How it works?

By interpreting the pattern inside the .json file, it is possible to find several keys that make the whole process of connection and integrity of the data.

**View the file `/backend/view/pattern/client.json`**

### Explanation:
- The key (**drive**) is how that endpoint will have its data source
- The key (**database**) the name of the database
- The key (**connections**) the name of the connection that will be used with the database
- The key (**table**) makes the direct connection with the table in the base
- The array (**columns**) that lists all the columns within that table.
- The key (**limitpage**) brings a complete pagination to the api in order to display only the amount informed
 > To access the other pages just to enter the key (page = page number) in de URL as GET
- The (**where**) can be two other objects (require and optional) these getting another object containing the column name as key and value as a [regex](https://medium.com/trainingcenter/entendendo-de-uma-vez-por-todas-express%C3%B5es-regulares-parte-7-66be1ac1f72d) to validate what is inserted inside that key.
- And by the end the object (**requires**) that it brings a unique other called (REQUEST) this will contain all the modes of use of that endpoint within the standard REST
	- GET = LIST CONTENT
	- POST = CREATE CONTENT
	- PUT = EDIT CONTENT
	- DELETE = REMOVE CONTENT

### PHP Server in development mode
#### `php -S 0.0.0.0:8000` in directory of `/backend`

### Mysql Server 
#### `mysql DBNAME < /backend/mysqldump.sql`

### Configure the api to connect with mysql
Open the file `/backend/model/drivers/server.config.json`


Edit file with the connection data (IMPORTANT: **The key is the connections name in pattern file**)


`host: "IPOFSERVER"`

`username: "USEROFSERVER"`

`password: "PASSWORDOFSERVER"`