package com.api.chatapp.endpoints;

import com.api.chatapp.dao.UserDao;
import com.api.chatapp.models.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;

import com.api.chatapp.service.JwtUserDetailsService;
import com.api.chatapp.config.JwtTokenUtil;
import com.api.chatapp.models.JwtRequest;
import com.api.chatapp.models.JwtResponse;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import static java.util.Objects.isNull;

@Path("auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class JwtAuthResource {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @Autowired
    private UserDao userDao;

    @POST
    @Path("login")
    public Response createAuthenticationToken(JwtRequest authenticationRequest) throws Exception {

        try{
            authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

            final UserDetails userDetails = userDetailsService
                    .loadUserByUsername(authenticationRequest.getUsername());

            final String token = jwtTokenUtil.generateToken(userDetails);

            return Response
                    .status(Response.Status.OK)
                    .entity(new JwtResponse(token, userDao.findByUsername(authenticationRequest.getUsername()).getId()))
                    .build();

        } catch (UsernameNotFoundException e) {
            return Response
                    .status(Response.Status.NOT_FOUND)
                    .entity("User not found")
                    .build();

        } catch (Exception e) {
            return Response
                    .status(Response.Status.UNAUTHORIZED)
                    .entity("Bad Credentials")
                    .build();
        }
    }

    @POST
    @Path(("register"))
    public Response saveUser(UserEntity user){
        if(isNull(userDao.findByUsername(user.getUsername()))){
            return Response
                    .status(Response.Status.OK)
                    .entity(userDetailsService.save(user))
                    .build();
        }

        return Response
                .status(Response.Status.BAD_REQUEST)
                .entity("User already exists")
                .build();
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}
