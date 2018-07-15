module repository {

    exports com.cognizant.sharecar.repository.spi;
    exports com.cognizant.sharecar.repository.entity;

    requires spring.context;
    requires spring.boot.autoconfigure;
    requires spring.boot;
    requires spring.beans;
    requires spring.data.jpa;
    requires java.persistence;
}