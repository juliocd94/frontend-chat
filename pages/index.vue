<template>

  <div class="layout-wrapper d-lg-flex">
              <!-- Start left sidebar-menu -->
              <sidebar-menu/>
              <!-- end left sidebar-menu -->
  
              <!-- start chat-leftsidebar -->
              <ChatLeftSidebar :online="online">
                <div class="chat-message-list px-2" slot="chats" data-simplebar>
                  <ul class="list-unstyled chat-list chat-user-list">
                    <template v-for="m in perfil.chat_perfils">
                      <Chat :chat="m" @establecerChat="establecerChat" :online="online" >
                      </Chat>
                    </template>
                  </ul>
                </div>
              </ChatLeftSidebar>

              <!-- Start User chat -->
              <start-user-chat  v-if="chat_actual.id!=''" :online="online" :chat="chat_actual" :isVisible="isVisible" @closeChat="closeChat" @updateChats="updateChats">
              </start-user-chat>
        </div>
  </template>
  
  
  <script>
import ChatLeftSidebar from '../components/ChatLeftSidebar.vue';
import SidebarMenu from '../components/SidebarMenu.vue';
import StartUserChat from '../components/StartUserChat.vue';
import Chat from '../components/widget/Chat.vue';
  export default {
  components: { SidebarMenu, ChatLeftSidebar, StartUserChat, Chat },
    name: 'Index',
  
    data(){
      return{
        perfil: {
          chat_perfils: []
        },
        chat_actual: {
          id: '',
          chat_id: '',
          mensajes:[]
        },
        user: {
          perfil_id:""
        },
        online: [],
        isVisible: false,
        isLoading:true, 
      }
    },
  
    methods:{
      Logout() {
        localStorage.removeItem('userChat')
        this.$router.push('/auth/login')
      },

      conectarSocket() {
        this.$socket.main.emit("newOnline", this.user)
        this.$socket.main.on('updateOnline',(users)=>{
          this.online = users
        })
        this.$socket.main.on('userChannel:notificar-user-'+this.user.user.id,(param)=>{
          this.GetPerfil()
        })
      },

      async GetPerfil() {
        const res = await this.$api.$get('perfils/' + this.user.user.perfil.id)
        this.perfil = res
        this.$socket.main.emit('chatChannel','mensaje-recibido-user-'+this.user.user.id)
      },

      async updateChats() {
        const res = await this.$api.$get('perfils/' + this.user.user.perfil.id)
        this.perfil = res
      },

      establecerChat(chat){
        const newChat = chat
        if(this.chat_actual.id!=newChat.id){
          this.chat_actual = {...newChat}
        }
        if(newChat.sinLeer>0){
          this.$socket.main.emit('meChannel','leer-chat-'+newChat.id)
        }
        this.isVisible=true
      },

      closeChat(){
        this.isVisible =false
      }
    },
  
    mounted(){
      this.$nextTick(async () => {
        let ls = localStorage.getItem('userChat')
        let user = JSON.parse(ls)
        if (user == null) {
          this.$router.push('/auth/login')
        }
        this.user = user
        await this.GetPerfil()
      })
    },
    beforeDestroy() {
      this.$socket.main.emit("destroyOnline", this.user)
    }
  }
  </script>
  