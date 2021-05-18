# CSE 310 - Team Project (Desktop App in Electron)

This is the desktop app, built with Electron, for our team project in CSE 310


## Setting Up App For Testing/Viewing
Do get this setup, you need to follow the instructions below:
 - Open the terminal, either in VSCode (or in another editor of your choice)
 - Navigate to the folder with the code (the "desktop-app" folder)
 - Run the following command to install the necessary Node modules:  
    `npm install express ejs`
 - Now you should be able to run the app by doing the following:  
    `npm start`


## Some Details on How This App Works
If you don't understand Electron, Node.js, Express.js, nor ejs, here are some details that may help you understand how it works:
 - In Node.js, you add other "libraries" (in Node.js they are called "modules"). In the `main.js` we import 2 important Node modules: `electron` (only getting specific functions by using the `{[module-method], [module-method]}`) and `express`. These run the main program, the other 2, are just helper modules.
 - Near the top of `main.js`, we have the following function:
    ```javascript
function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    mainWindow.loadURL('http://localhost:5500/')
}
    ```
   This is the function used to create the main window (`BrowserWindow` is one of the methods imported from `electron`)
 - We then have the `app.whenReady()` function. This function is called when the app is ready (hence the name...)
 - We call a `.then` on that function which just allows us to write code that will be ran after the app is ready.
 - The code inside that `.then` is for spinning-up a new web server (which is run on the machine that is running the app).
    - `expressApp.set('view engine', 'ejs')` just sets the templating engine that we want Express to use
    - `.set('views', path.join(__dirname,'views'))` is setting where Express is supposed to look when rendering a page with ejs
    - `.use(bodyParser.urlencoded({extended: false}))` just makes it easier to get data from POST and GET requests
    - `.use(express.static(path.join(__dirname, 'public')))` tells Express to leave paths into the public folder to just go there instead of using trying to use another route
    - `.use(routes)` references the file that we manage the different routes
    - The following is where we finally actually spin-up the server, and then we create the window
        ```javascript
.listen(5500, () => {
    createWindow()
})
        ```
 - More coming soon...