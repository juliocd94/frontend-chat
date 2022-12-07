<template>
    <div class="account-pages pt-sm-5">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-8 col-lg-6 col-xl-5">
                        <div class="text-center mb-4">
                            <a href="index.html" class="auth-logo mb-5 d-block">
                                <img src="assets/images/logo-dark.png" alt="" height="30" class="logo logo-dark">
                                <img src="assets/images/logo-light.png" alt="" height="30" class="logo logo-light">
                            </a>
                            <h4>Registrarse</h4>
                        </div>
                        <div class="card">
                            <div class="card-body p-4">
                                <div class="p-3">
                                    <div class="formulario">
                                        <div class="mb-3">
                                            <label class="form-label">Nombre</label>
                                            <div class="input-group bg-soft-light mb-3 rounded-3">
                                                <span class="input-group-text border-light text-muted" id="basic-addon6">
                                                    <i class="ri-user-2-line"></i>
                                                </span>
                                                <input v-model="form.nombre" type="text" class="form-control form-control-lg bg-soft-light border-light" placeholder="Ingrese el nombre" aria-label="Enter Username" aria-describedby="basic-addon6">
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Correo</label>
                                            <div class="input-group bg-soft-light rounded-3  mb-3">
                                                <span class="input-group-text text-muted" id="basic-addon5">
                                                    <i class="ri-mail-line"></i>
                                                </span>
                                                <input v-model="form.email" type="email" class="form-control form-control-lg bg-soft-light border-light" placeholder="Ingrese el correo" aria-label="Enter Email" aria-describedby="basic-addon5">
                                            </div>
                                        </div>
                                        <div class="mb-4">
                                            <label class="form-label">Contraseña</label>
                                            <div class="input-group bg-soft-light mb-3 rounded-3">
                                                <span class="input-group-text border-light text-muted" id="basic-addon7">
                                                    <i class="ri-lock-2-line"></i>
                                                </span>
                                                <input v-model="form.password" type="password" class="form-control form-control-lg bg-soft-light border-light" placeholder="Ingrese la contraseña" aria-label="Enter Password" aria-describedby="basic-addon7">
                                                
                                            </div>
                                        </div>
                                        <div class="d-grid">
                                            <button class="btn btn-primary waves-effect waves-light" @click="registro()">Registrar</button>
                                        </div>
                                        <div class="mt-4 text-center">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mt-3 text-center">
                            <p>¿Tienes una cuenta? <Nuxt-link to="/auth/login" class="fw-medium text-primary">Iniciar sesión</Nuxt-link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>
  
  <script>
  export default {
    name: 'IndexPage',

    data(){
        return{
            res: [],
            form: {
                email:"",
                nombre:"",
                password: ""
            }
        }

    },

    methods:{
        async registro(){
            await this.$api.$post('perfils', this.form)
            .then((res)=>{
                this.$swal("funciona registro");
                this.$router.push("/")
            })
            .catch((e)=>{
            })
        }
    },

    mounted(){
        this.$nextTick(async()=>{
            await this.$api.$get('perfiles')
            .then((res)=>{
                this.res = res;
            })
            .catch((e)=>{
            })
        })

    },
  }
  </script>
  