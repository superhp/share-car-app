module service {
    exports com.cognizant.sharecar.service.spi to app;

    requires api;
    requires spring.boot.autoconfigure;
    requires spring.boot;
    requires spring.beans;
    requires spring.context;
}