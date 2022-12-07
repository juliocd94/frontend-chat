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
                            <h4>Iniciar sesión</h4>
                        </div>
                        <div class="card">
                            <div class="card-body p-4">
                                <div class="p-3">
                                    <div class="formulario">
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
                                            <div class="float-end">
                                                <a href="auth-recoverpw.html" class="text-muted font-size-13">Recuperar contraseña</a>
                                            </div>
                                            <label class="form-label">Contraseña</label>
                                            <div class="input-group mb-3 bg-soft-light rounded-3">
                                                <span class="input-group-text text-muted" id="basic-addon4">
                                                    <i class="ri-lock-2-line"></i>
                                                </span>
                                                <input v-model="form.password" type="password" class="form-control form-control-lg border-light bg-soft-light" placeholder="Enter Password" aria-label="Enter Password" aria-describedby="basic-addon4">
                                            </div>
                                        </div>
                                        <div class="d-grid">
                                            <button class="btn btn-primary waves-effect waves-light" @click="login()">Iniciar sesión</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mt-5 text-center">
                            <p>¿No tienes una cuenta? <nuxt-link to="/auth/register" class="fw-medium text-primary">Registrarse</nuxt-link> </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>

export default {

    data(){
        return{
            user: {},
            form: {
                email:"",
                password: ""
            }
        }
    },

    methods:{
        async login(){
            await this.$api.$post('login-user', this.form)
            .then((res)=>{
                let user = res
                localStorage.setItem('userChat',JSON.stringify(user))
                this.$router.push("/")
            })
            .catch((e)=>{
                console.log(e)
            })
        },
    },
    
    mounted(){
        let ls = localStorage.getItem('userChat')
        let user = JSON.parse(ls)
        if(user!=null){
            this.$router.push('/')
        }
        // this.$swal("hola mundo");
    }

}
</script>

<style>

</style>