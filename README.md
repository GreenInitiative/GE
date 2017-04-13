# How to run the project ? 

> npm run serve
which runs below in command line

C:\GreenEngageUI>npm run serve

> @ serve C:\GreenEngageUI
> gulp serve


#Reference on yeoman and pushing a new app from local to git remote repository

http://yeoman.io/codelab/
https://help.github.com/articles/adding-an-existing-project-to-github-using-the-command-line/


#Optimize files for production

#To create a production version of our application, we’ll want to:

lint our code,
concatenate and minify our scripts and styles to save on those network requests,
compile the output of any preprocessors we’re using, and
generally make our application really lean.
we can achieve all of this just by running:

npm run build

Your lean, production-ready application is now available in a dist folder in the root of your mytodo project. These are the files that you can put on your server using FTP or any other deployment service.

# Build and preview the production-ready app

npm script:

npm run serve:dist
It will build your project and launch a local web server.


# To create a new Angular JS component
The Fountain Angular generator also supports creating new pipes, directives, services and components for you. 
A new components can be scaffolded by running yo fountain-angular1:component componentName, which will create your component 
file but also add a new componentName.spec.js for your unit test.


#Find more sub-generators

To find out all the sub-generators for installed Yeoman generators, you can use 
yo --generators:


# Where to go next

Angular2 (angular.io) a framework to develop across all platforms.
Webpack (webpack.github.io) a module bundler who takes modules with dependencies and generates static assets representing those modules.




#list generators 

yo --generators

fountain-webapp 

npm install --global fountain-webapp
npm install --global generator-fountain-angular1

http://fountainjs.io/doc/usage/
