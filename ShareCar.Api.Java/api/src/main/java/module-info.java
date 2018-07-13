module api {
    exports com.cognizant.sharecar.api.spi;
    exports com.cognizant.sharecar.api.model;

    requires spring.context;
    requires spring.web;
    requires spring.beans;
    requires jackson.annotations;
}