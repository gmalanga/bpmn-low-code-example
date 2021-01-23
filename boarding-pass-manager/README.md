# Spring Boot application with embedded Flowable engine and auto-deployed process

This example demonstrates how you can build a Spring Boot application having following configured:
* Embedded Flowable engine
* Flowable REST  module
* Process application and BPMN process automatically deployed on engine startup

## How is it done

1. To embed Flowable Engine you must add following dependency to your `pom.xml`:

```xml
...
<dependency>
    <groupId>org.flowable</groupId>
    <artifactId>flowable-spring-boot-starter</artifactId>
    <version>${flowable.version}</version>
</dependency>
<dependency>
    <groupId>org.flowable</groupId>
    <artifactId>flowable-spring-boot-starter-rest</artifactId>
    <version>${flowable.version}</version>
</dependency>
<dependency>
    <groupId>org.flowable</groupId>
    <artifactId>flowable-spring-boot-starter-actuator</artifactId>
    <version>${flowable.version}</version>
</dependency>
<dependency>
    <groupId>org.flowable</groupId>
    <artifactId>flowable-http</artifactId>
    <version>${flowable.version}</version>
</dependency>
...
```
 
## Run the application and check the result

You can then build the application with `mvn spring-boot:run` 

or `mvn clean install` and then run it with `java -jar` command.

Then go to 
- http://localhost:9999/process-api/repository/deployments in your browser to check the deployements.
- http://localhost:9999/process-api/repository/process-definitions in your browser to check the process definitions.
