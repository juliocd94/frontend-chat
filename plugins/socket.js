import io from "socket.io-client";
import Vue from "vue";

const socket = io.connect("http://localhost:3006/");

socket.on('connect', ()=>{
    console.log(socket.id)
})

export default ({app}, inject) => {
    inject("socket", Vue.observable({main: socket}));
};

