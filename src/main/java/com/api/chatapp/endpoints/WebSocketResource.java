package com.api.chatapp.endpoints;

import com.api.chatapp.models.MessageEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketResource {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/room/{roomId}")
    public void send(@Payload MessageEntity message, @DestinationVariable int roomId) {
        this.messagingTemplate.convertAndSend("/topic/room/" + roomId, message);
    }
}
