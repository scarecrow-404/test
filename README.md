## Back-end Questions
1. Assuming the system currently has three microservices: Customer API, Master Data API, 
and Transaction Data API, there is a new feature that requires data from all three 
microservices to be displayed in near real-time. The current technology stack includes 
REST APIs and an RDBMS database. How would you design a new API for this feature?

        it can be make with 2 approach 
        First, by using API gateway to parallel call for 3 service
        by using connection pool or
   
        Second, by using event driven (event message) by RabbitMQ
        to make API subscribe to an event then pre-aggregate the response
##
2. Assuming the team has started planning a new project, the project manager asks you for a 
performance test strategy plan for this release. How would you recommend proceeding to 
the project manager?

        First of all it need to determine an acceptable response time, goal,
        critical business logic then make a detailed test plans 
        for Load Testing,Stress Testing,Endurance Testing then identify
        bottleneck to make a change for better performance 
##
3. Design and develop two APIs using NestJS and Postgres
      clone this repo and then

       cd ./test

    install package

       npm install

    create database for local pg name

       products_db

   or if you want to config a database then create .env file in root of test which is locate at /test/test/

       DB_HOST=
       DB_PORT=
       DB_USERNAME=
       DB_PASSWORD=
       DB_NAME=

   then run typeOrm migration

       npm run migration:run

   then run a nest server

       npm run start 
        
   

##
