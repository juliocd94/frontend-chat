<template>
    <div class="user-chat w-100 overflow-hidden " :class="isVisible==true?'user-chat-show':''">
      <div class="d-lg-flex">
        <!-- start chat conversation section -->
        <div class="w-100 overflow-hidden position-relative">
          <div class="p-3 p-lg-4 border-bottom user-chat-topbar">
            <div class="row align-items-center">
              <div class="col-sm-4 col-8">
                <div class="d-flex align-items-center">
                  <div class="d-block d-lg-none me-2 ms-0">
                    <a href="javascript: void(0);" @click="$emit('closeChat')" class="user-chat-remove text-muted font-size-16 p-2"><i
                        class="ri-arrow-left-s-line"></i></a>
                  </div>
                  <div class="me-3 ms-0">
                    <div class="chat-user-img align-self-center">
                      <div class="avatar-xs">
                        <span class="avatar-title rounded-circle bg-soft-primary text-primary">
                          {{chat.destino.letra}}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="flex-grow-1 overflow-hidden">
                    <h5 class="font-size-16 mb-0 text-truncate">
                      <a href="#" class="text-reset user-profile-show">{{chat.destino.perfil.nombre}}</a>
                      <i v-if="isOnline==true" class="ri-record-circle-fill font-size-10 text-success d-inline-block ms-1"></i>
                    </h5>
                  </div>
                </div>
              </div>
              <div class="col-sm-8 col-4">
                <ul class="list-inline user-chat-nav text-end mb-0">
                  <li class="list-inline-item">
                    <div class="dropdown">
                      <button class="btn nav-btn dropdown-toggle" type="button" data-bs-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        <i class="ri-search-line"></i>
                      </button>
                      <div class="dropdown-menu p-0 dropdown-menu-end dropdown-menu-md">
                        <div class="search-box p-2">
                          <input type="text" class="form-control bg-light border-0" placeholder="Search.." />
                        </div>
                      </div>
                    </div>
                  </li>
  
                  <li class="list-inline-item d-none d-lg-inline-block me-2 ms-0">
                    <button type="button" class="btn nav-btn" data-bs-toggle="modal" data-bs-target="#audiocallModal">
                      <i class="ri-phone-line"></i>
                    </button>
                  </li>
  
                  <li class="list-inline-item d-none d-lg-inline-block me-2 ms-0">
                    <button type="button" class="btn nav-btn" data-bs-toggle="modal" data-bs-target="#videocallModal">
                      <i class="ri-vidicon-line"></i>
                    </button>
                  </li>
  
                  <li class="list-inline-item d-none d-lg-inline-block me-2 ms-0">
                    <button type="button" class="btn nav-btn user-profile-show">
                      <i class="ri-user-2-line"></i>
                    </button>
                  </li>
  
                  <li class="list-inline-item">
                    <div class="dropdown">
                      <button class="btn nav-btn dropdown-toggle" type="button" data-bs-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        <i class="ri-more-fill"></i>
                      </button>
                      <div class="dropdown-menu dropdown-menu-end">
                        <a class="dropdown-item d-block d-lg-none user-profile-show" href="#">View profile
                          <i class="ri-user-2-line float-end text-muted"></i></a>
                        <a class="dropdown-item d-block d-lg-none" href="#" data-bs-toggle="modal"
                          data-bs-target="#audiocallModal">Audio <i class="ri-phone-line float-end text-muted"></i></a>
                        <a class="dropdown-item d-block d-lg-none" href="#" data-bs-toggle="modal"
                          data-bs-target="#videocallModal">Video
                          <i class="ri-vidicon-line float-end text-muted"></i></a>
                        <a class="dropdown-item" href="#">Archive
                          <i class="ri-archive-line float-end text-muted"></i></a>
                        <a class="dropdown-item" href="#">Muted
                          <i class="ri-volume-mute-line float-end text-muted"></i></a>
                        <a class="dropdown-item" href="#">Delete
                          <i class="ri-delete-bin-line float-end text-muted"></i></a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- end chat user head -->
  
          <!-- start chat conversation -->
          <div class="chat-conversation p-3 p-lg-4" data-simplebar="init">
  
            <ul id="scroll" class="list-unstyled mb-0">
  
              <template v-for="m in mensajesList">
                <li :class="m.chat_perfil_id == chat.id?'right':''">
                  <div class="conversation-list px-2 m-0">
                    <div class="chat-avatar">
                      <div class="chat-user-img align-self-center">
                        <div class="avatar-xs">
                          <span class="avatar-title rounded-circle bg-soft-primary text-primary">
                            {{m.chat_perfil_id == chat.id?chat.letra:chat.destino.letra}}
                          </span>
                        </div>
                      </div>
                    </div>
  
                    <div class="user-chat-content">
                      <div class="ctext-wrap">
                        <div class="ctext-wrap-content">
                          <p class="mb-0">
                            {{m.mensaje}}
  
                          </p>
                          <p class="chat-time mb-0">
                            <span class="align-middle">{{ m.hora }}</span>
                            <span v-if="m.chat_perfil_id == chat.id">
                              <i v-if="m.estado == 0" class="ri-time-line align-middle"></i>
  
                              <i v-else-if="m.recibido > 0 && m.leido > 0"
                                class="ri-check-double-line align-middle text-primary"></i>
                              <i v-else-if="m.recibido > 0" class="ri-check-double-line align-middle"></i>
                              <i v-else class="ri-check-line align-middle"></i>
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </template>
  
              <li v-if="isTyping==true">
                <div class="conversation-list px-2 m-0">
                  <div class="chat-avatar">
                    <div class="chat-user-img align-self-center">
                      <div class="avatar-xs">
                        <span class="avatar-title rounded-circle bg-soft-primary text-primary">
                          {{chat.destino.letra}}
                        </span>
                      </div>
                    </div>
                  </div>
  
                  <div class="user-chat-content">
                    <div class="ctext-wrap">
                      <div class="ctext-wrap-content">
                        <p class="mb-0">
                          Escribiendo
                          <span class="animate-typing">
                            <span class="dot"></span>
                            <span class="dot"></span>
                            <span class="dot"></span>
                          </span>
                        </p>
                      </div>
                    </div>
  
                  </div>
                </div>
              </li>
  
            </ul>
  
          </div>
          <!-- end chat conversation end -->
  
          <!-- start chat input section -->
          <div class="chat-input-section p-3 p-lg-4 border-top mb-0">
            <div class="row g-0">
              <div class="col">
                <input type="text" class="form-control form-control-lg bg-light border-light" v-model="mensaje.mensaje"
                  @keyup.enter="enviarMensaje()" @keypress="Escribir()" placeholder="Escribe un mensaje..." />
              </div>
              <div class="col-auto">
                <div class="chat-input-links ms-md-2 me-md-0">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item" data-bs-toggle="tooltip" data-bs-placement="top" title="Emoji">
                      <button type="button" class="btn btn-link text-decoration-none font-size-16 btn-lg waves-effect">
                        <i class="ri-emotion-happy-line"></i>
                      </button>
                    </li>
                    <li class="list-inline-item" data-bs-toggle="tooltip" data-bs-placement="top" title="Attached File">
                      <button type="button" class="btn btn-link text-decoration-none font-size-16 btn-lg waves-effect">
                        <i class="ri-attachment-line"></i>
                      </button>
                    </li>
                    <li class="list-inline-item">
                      <button type="button" @click="enviarMensaje()"
                        class="btn btn-primary font-size-16 btn-lg chat-send waves-effect waves-light">
                        <i class="ri-send-plane-2-fill"></i>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <!-- end chat input section -->
        </div>
        <!-- end chat conversation section -->
  
  
      </div>
      <!-- End User chat -->
  
      <!-- end modal -->
    </div>
  </template>

<script>
export default {
    props: {
        chat: {
            type: Object,
            default: () => { }
        },
        isVisible: {
            type: Boolean,
            default: false
        },
        online: {
            type: Array,
            default: []
        }
    },
    data() {
    return {
      mensaje: {
        mensaje: '',
        tipo: 1
      },
      isTyping:false,
    };
  },
  watch: {
    mensajesList() {

      setTimeout(() => {
        this.bottomScroll()
      }, 500)
      this.conectarSocket()
    },

    isTyping(){
      this.bottomScroll()
    },
    chat(){
      this.chat_model = this.chat
    }
  },
  computed: {
    mensajesList() {
      return this.chat.mensajes.sort(function(a, b){return a.id - b.id});
      // return this.chat.mensajes.reverse();
    },
    isOnline(){
      let buscar = this.online.filter((u)=>u.user.id==this.chat.destino.perfil.user_id)
      if(buscar.length>0){
        return true
      }
      return false
    },

  },
  methods: {

    Escribir(){
      this.$socket.main.emit('chatChannel', 'escribir-chat-user-' + this.chat.destino.id)
      this.$socket.main.emit('chatChannel', 'escribir-chat-' + this.chat.destino.id)
    },
    bottomScroll() {
      document.getElementById("scroll").scrollTop =
        document.getElementById("scroll").scrollHeight;
    },
    async enviarMensaje() {
      if (this.mensaje.mensaje != '') {
        let mensajes = this.mensajesList.reverse()
        let mensaje = {
          id:mensajes[0].id+1,
          mensaje: this.mensaje.mensaje,
          chat_perfil_id: this.chat.id,
          chat_id: this.chat.chat_id,
          estado: 0,
        }

        mensajes.push(mensaje)
        this.chat.mensajes = mensajes
        this.bottomScroll()
        this.mensaje.mensaje = ''
        let res = await this.$api.post("mensajes", mensaje)
        this.$socket.main.emit('userChannel', 'notificar-user-' + this.chat.destino.perfil.user_id)
        this.$socket.main.emit('chatChannel', 'update-chat-user-' + this.chat.destino.id)
        this.$emit('updateChats')
        this.chat.mensajes = res.data
      }
    },
    async GetMensajes() {

    const res = await this.$api.$get('chats/' + this.chat.chat_id)
    this.chat.mensajes = res
    },
    async leerMensajes() {

    await this.$api.$post('leerMensajes/' + this.chat.id,this.chat)
      this.$emit('updateChats')
    this.$socket.main.emit('chatChannel', 'chat-leido-' + this.chat.chat_id)
    },
    conectarSocket() {

      let socket = localStorage.getItem("socket_activo");
      socket = JSON.parse(socket);
      if (socket != null) {
        this.$socket.main.off(socket.s_1);
        this.$socket.main.off(socket.s_2);
        this.$socket.main.off(socket.s_3);
        this.$socket.main.off(socket.s_4);
        this.$socket.main.off(socket.s_5);

        localStorage.removeItem("socket_activo");

        this.$socket.main.on('chatChannel:mensaje-recibido-user-' + this.chat.destino.perfil.user_id, (param) => {
          this.$emit('updateChats')
          this.GetMensajes()
        })
        this.$socket.main.on('chatChannel:update-chat-user-' + this.chat.id, (param) => {
          this.GetMensajes()
          this.leerMensajes()
        })
        this.$socket.main.on('chatChannel:chat-leido-' + this.chat.chat_id, (param) => {
          this.$emit('updateChats')
          this.GetMensajes()
        })
        this.$socket.main.on('chatChannel:escribir-chat-user-' + this.chat.id, (param) => {
          if (this.isTyping == true) {
            return false;
          }

          setTimeout(() => {
            if (this.isTyping == false) {
              return false;
            }
            setTimeout(() => {
              if (this.isTyping == false) {
                return false;
              }
              this.isTyping = false;
              return false;
            }, 1000);
          }, 2000);
          this.isTyping = true;

        })
        this.$socket.main.on('meChannel:leer-chat-' + this.chat.id, (param) => {
          this.leerMensajes()
        })

      }
      let socket_activo = {
        s_1:
          'chatChannel:mensaje-recibido-user-' + this.chat.destino.perfil.user_id,
          s_2:'meChannel:leer-chat-' + this.chat.id,
          s_3:'chatChannel:chat-leido-' + this.chat.chat_id,
          s_4:'chatChannel:update-chat-user-' + this.chat.id,
          s_5:'chatChannel:escribir-chat-user-' + this.chat.id,
      };
      localStorage.setItem("socket_activo", JSON.stringify(socket_activo));
    },
  },
  mounted() {

       setTimeout(() => {
        this.bottomScroll()
      }, 500)
    this.conectarSocket()
  },
  beforeDestroy() { },
};
</script>
<style>
#scroll {
  overflow-y: scroll;
  height: 70vh;
  min-height: 70vh;
  max-height: 70vh;
  width: 100%;
}

#scroll::-webkit-scrollbar {
  -webkit-appearance: none;
}

#scroll::-webkit-scrollbar:vertical {
  width: 10px;
}

#scroll::-webkit-scrollbar-button:increment,
#scroll::-webkit-scrollbar-button {
  display: none;
}

#scroll::-webkit-scrollbar:horizontal {
  height: 10px;
}

#scroll::-webkit-scrollbar-thumb {
  background-color: #8f8f8fc7;
  border-radius: 20px;
  border: 1px solid #cececea2;
}

#scroll::-webkit-scrollbar-track {
  border-radius: 10px;
}

.chat-conversation {
  overflow: hidden;
  padding: 0;
}
</style>
