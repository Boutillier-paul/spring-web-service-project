package com.api.chatapp.config;

import com.api.chatapp.endpoints.*;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.servlet.ServletProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import javax.ws.rs.ApplicationPath;

@Component
@ApplicationPath("rest")
@Configuration
public class JerseyConfig extends ResourceConfig {

    public JerseyConfig(){

        register(CORSResponseFilter.class);
        register(WebSocketResource.class);
        register(UserResource.class);
        register(RoomResource.class);
        register(MessageResource.class);
        register(JwtAuthResource.class);

        property(ServletProperties.FILTER_FORWARD_ON_404, true);
    }
}