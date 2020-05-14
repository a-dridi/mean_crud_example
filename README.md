## MEAN Stack - Introduction into creating a MEAN stack app with Angular 9

This tutorial will show you how to create a "MEAN stack" (app stack) app with backwards compatibility for older browsers.
We will create a web app which does "CRUD" (stands for: create, replace, update and delete) operations.

To install dependencies:
`npm install`


If you want to start this app, then run these 2 commands in seperate terminals:
In the "backend" folder
`npm run dev`

In the "frontend" folder
`ng serve --open`

If you want to build this app to host on a web server (production use), then use these commands:
Go to the "backend" folder. Copy all your JavaScript files into the folder "src". After that run this command:
`npm run build`

In the "frontend" folder
`ng build --prod`
