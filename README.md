# BPMN Low code example

This example shows you how workflow engines can help you building your microservices: you can use them to orchestrate the microservices, simplify and make them more flexible.
This demonstration is about presenting a web application for a Space Travels Agency: you can view a list of space trips, book them and retrieve their boarding passes.


## Logical architecture diagram

The application is built using a microservices architecture: there is a frontend React application with an Apollo GraphQL server to manage the REST calls; for the backend we have got different microservices in charge of managing various functionalities.

![Events and Commands](images/bpmn-low-code-demo-architecture.png)

 
In this diagram I have put Flowable and Camunda in the brackets for the backend microservices: they are workflow engines with an opensource and a commercial version. For this example I am using the opensource version of both.
With regards to the scope of this example, the React frontend application and the Apollo GraphQL server are out of scope, same as the “Travels manager”, “Customer manager” and “Payments” microservices.
The microservices in scope are the “Boarding Pass manager” and the “Generate boarding pass”.


## Project structure

### web-app-client
Frontend app built with React.

### web-app-server
Apollo-GraphQL server

### boarding-pass-manager
Spring-boot microservice with an embedded Flowable workflow engine.

### generate-boarding-pass module
Spring-boot microservice with an embedded Camunda workflow engine.

### Postman
Postman collection to interact with the Flowable REST module.

