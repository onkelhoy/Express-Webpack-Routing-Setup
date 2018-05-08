# Express-Webpack-Routing-Setup
Simple yet elegant solution to bind a bunch of projects under one scope using 
Webpack & Express 

## Add a new Project
In order to add a new project follow the guide below
1. navigate to source folder
2. create folder with project-name
3. create an *app.js*  
4. create a *template* file 

The app.js uses es6 so imports are ok, scss is also used (just make sure to import it in the app.js file). The *template* file must have the name *template*, the extension can be both *html* or *pug*

## Todo List
- [x] Split enviroments (dev/prod)
  - [x] create a dev and prod for webpack
  - [x] create a default
- [x] Use of enviroment files and bin files 
- [x] template should be both pug or html
- [ ] whenever build delete first the apps folder
- [x] add tree view for all projects
- [ ] try shell scripts to start both server & webpack dev server
- [ ] fix folder structure (have everything inside and apps & public outside for easy creation of new projects)
- [ ] fix hot reload (try only use webpack and with help of folders perhaps getting the routes)
 
