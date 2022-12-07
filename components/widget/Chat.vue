<template>
    <li class="unread"  :class="isTyping == true ? 'typing' : ''">
      <a href="javascript:void(0)" @click="$emit('establecerChat', chat)">
        <div class="d-flex">
          <div
            class="chat-user-img align-self-center me-3 ms-0"
            :class="isOnline == true ? 'online' : ''"
          >
            <div class="avatar-xs">
              <span
                class="avatar-title rounded-circle bg-soft-primary text-primary"
              >
                {{ chat.destino.letra }}
              </span>
            </div>
            <span class="user-status"></span>
          </div>
          <div class="flex-grow-1 overflow-hidden">
            <h5 class="text-truncate font-size-15 mb-1">
              {{ chat.destino.perfil.nombre }}
            </h5>
            <p
              class="chat-user-message text-truncate mb-0"
              v-if="chat.ultimo.length > 0"
            >
              <span v-if="chat.ultimo[0].chat_perfil_id == chat.id">
                <i
                  v-if="chat.ultimo[0].leido > 0 && chat.ultimo[0].recibido > 0"
                  class="ri-check-double-fill align-middle me-1 ms-0 text-primary"
                ></i>
                <i
                  v-else-if="chat.ultimo[0].recibido > 0"
                  class="ri-check-double-fill align-middle me-1 ms-0"
                ></i>
                <i v-else class="ri-check-fill align-middle me-1 ms-0"></i>
              </span>
              <span v-if="isTyping==true">
                Escribiendo<span class="animate-typing"
                ><span class="dot ms-1"></span><span class="dot ms-1"></span
                ><span class="dot ms-1"></span
              ></span>
              </span>
             <span v-else>
  
               {{chat.ultimo[0].mensaje}}
             </span>
            </p>
          </div>
          <div class="font-size-11" v-if="chat.ultimo.length > 0">
            {{ chat.ultimo[0].hora }}
          </div>
          <div class="unread-message" v-if="chat.sinLeer > 0">
            <span class="badge badge-soft-danger rounded-pill">{{
              chat.sinLeer
            }}</span>
          </div>
        </div>
      </a>
    </li>
  </template>

<script>
export default {

props: {
    chat: {
      type: Object,
      default: () => {},
    },
    online: {
      type: Array,
      default: [],
    }
  },
  data() {
    return {
      isTyping:false
    };
  },
  computed: {
    isOnline() {
      let buscar = this.online.filter(
        (u) => u.user.id == this.chat.destino.perfil.user_id
      );
      if (buscar.length > 0) {
        return true;
      }
      return false;
    },
  },
  methods: {
    conectar(){
      this.$socket.main.on('chatChannel:escribir-chat-' + this.chat.id, (param) => {
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
    }
  },
  mounted() {
    this.conectar()
  },
};
</script>

<style>

</style>