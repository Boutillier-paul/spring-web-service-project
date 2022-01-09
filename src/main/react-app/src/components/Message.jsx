import React from 'react';

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            text: this.props.text,
            mine: this.props.mine,
        }
    }

    render(){
        let styleBox
        let styleTypo

        if(!this.state.mine){
            styleBox = {display: 'block', background: 'white', maxWidth: '50%', width: 'max-content', boxSizing: 'border-box', borderRadius: 50, padding: '1px 40px', margin: '50px 0'}
            styleTypo = {textAlign: 'justify', flexGrow: 1, color: 'black', display: 'flex', flexDirection: 'column', margin: '10px 0', lineHeight: '25px'}
        }
        else{
            styleBox = {display: 'block', background: '#1976d2', maxWidth: '50%', width: 'max-content', boxSizing: 'border-box', borderRadius: 50, padding: '1px 40px', margin: '50px 0', marginRight: '0', marginLeft: 'auto'}
            styleTypo = {textAlign: 'justify', flexGrow: 1, color: 'white', display: 'flex', flexDirection: 'column', margin: '10px 0', lineHeight: '25px'}
        }


        return(

            <Box sx={styleBox}>
                <Typography variant="p" component="div" sx={styleTypo}>
                    <strong>{this.state.username}</strong>
                    {this.state.text}
                </Typography>
            </Box>
        )
    }
}

export default Message;