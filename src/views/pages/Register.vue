<template>
                            <div class="nk-block nk-block-middle nk-auth-body">
                                <div class="brand-logo pb-5">
                                    <a href="html/index.html" class="logo-link">
                                        <img class="logo-light logo-img logo-img-lg" src="https://leptonsmulticoncept.com/wp-content/uploads/fbrfg/apple-touch-icon.png"  >
                                        <img class="logo-dark logo-img logo-img-lg" src="https://leptonsmulticoncept.com/wp-content/uploads/fbrfg/apple-touch-icon.png" >
                                    </a>
                                </div>
                                <div class="nk-block-head">
                                    <div class="nk-block-head-content">
                                        <h5 class="nk-block-title">Sign Up</h5>
                                        <div class="nk-block-des">
                                            <p>Access the DashLite panel using your email and passcode.</p>
                                        </div>
                                    </div>
                                </div><!-- .nk-block-head -->
                                <div action="#" class="form-validate is-alter" autocomplete="off">
                                    <div class="form-group">
                                        <div class="form-label-group">
                                            <label class="form-label" for="email-address">Fullname</label>
                                            <a class="link link-primary link-sm d-none" tabindex="-1" href="#">Need Help?</a>
                                        </div>
                                        <div class="form-control-wrap">
                                            <input v-model="name" autocomplete="off" type="text" class="form-control form-control-lg" required id="email-address" placeholder="Enter your fullname">
                                        </div>
                                    </div><!-- .form-group -->
                                    <div class="form-group">
                                        <div class="form-label-group">
                                            <label class="form-label" for="email-address">Email</label>
                                            <a class="link link-primary link-sm d-none" tabindex="-1" href="#">Need Help?</a>
                                        </div>
                                        <div class="form-control-wrap">
                                            <input v-model="email" autocomplete="off" type="text" class="form-control form-control-lg" required id="email-address" placeholder="Enter your email address">
                                        </div>
                                    </div><!-- .form-group -->
                                    <div class="form-group">
                                        <div class="form-label-group">
                                            <label class="form-label" for="password">Passcode</label>
                                            <a class="link link-primary link-sm d-none" tabindex="-1" href="html/pages/auths/auth-reset.html">Forgot Code?</a>
                                        </div>
                                        <div class="form-control-wrap">
                                            <a tabindex="-1" href="#" class="form-icon form-icon-right passcode-switch lg" data-target="password">
                                                <em @click="togglePasswordVisibility()" class="passcode-icon icon-show icon ni ni-eye"></em>
                                                <em @click="togglePasswordVisibility()" class="passcode-icon icon-hide icon ni ni-eye-off"></em>
                                            </a>
                                            <input v-model="password" autocomplete="new-password" :type="passwordAttribute" class="form-control form-control-lg" required id="password" placeholder="Create a password">
                                        </div>
                                    </div><!-- .form-group -->

                                    <div class="form-group">
                                        <div class="form-label-group">
                                            <label class="form-label" for="password">Confirm Password</label>
                                            <a class="link link-primary link-sm d-none" tabindex="-1" href="html/pages/auths/auth-reset.html">Forgot Code?</a>
                                        </div>
                                        <div class="form-control-wrap">
                                            <a tabindex="-1" href="#" class="form-icon form-icon-right passcode-switch lg" data-target="password">
                                                <em @click="togglePasswordVisibility()" class="passcode-icon icon-show icon ni ni-eye"></em>
                                                <em @click="togglePasswordVisibility()" class="passcode-icon icon-hide icon ni ni-eye-off"></em>
                                            </a>
                                            <input v-model="password_confirmation" autocomplete="new-password" :type="passwordAttribute" class="form-control form-control-lg" required id="password" placeholder="Enter your passcode">
                                        </div>
                                    </div><!-- .form-group -->
                                    <div class="form-group">
                                        <button @click="submit()" class="btn btn-lg btn-primary btn-block">Sign up</button>
                                    </div>
                                </div><!-- form -->
                                <div class="form-note-s2 pt-4"> New on our platform? <a href="html/pages/auths/auth-register.html">Create an account</a>
                                </div>
                                <div class="text-center pt-4 pb-3">
                                    <h6 class="overline-title overline-title-sap"><span>OR</span></h6>
                                </div>
                                <ul class="nav justify-center gx-4">
                                    <li class="nav-item"><a class="nav-link" href="#">Facebook</a></li>
                                    <li class="nav-item"><a class="nav-link" href="#">Google</a></li>
                                </ul>
                                <div class="text-center mt-5">
                                    <span class="fw-500">I don't have an account? <a href="#">Try 15 days free</a></span>
                                </div>
                            </div><!-- .nk-block -->
</template>

<script>
// import LGA from '@/components/LGA.vue'


import { useToast } from 'vue-toastification'

const toast = useToast()

export default {

    components:{
        // LGA
    },

    data() {
        return {
             fullPage: false,

             name: '',
            
             email: '',
            password_confirmation: '',
             password: '',
            passwordAttribute: 'password'
        }
    },

    methods: {

        togglePasswordVisibility(){
       
            if(this.passwordAttribute == 'password'){
                this.passwordAttribute = 'text'
            }else{
                this.passwordAttribute = 'password'
            }

        },
                submit() {

// alert(this.name)
// alert(this.username)
// alert(this.email)
// alert(this.password)
// alert(this.referrer_code)

                        let loader = this.$loading.show({
                            // Optional parameters
                            container: this.fullPage ? null : this.$refs.formContainer,
                            canCancel: false,
                            onCancel: this.onCancel,
                            color: '#6CC3EC',
                        });
                       this.axios({
                                method: "post",
                                url: process.env.VUE_APP_URL+'/api/register',
                                data: {
                                    name: this.name,
                                    // username: this.username,
                                    email: this.email,
                                    // referrer_code: this.referrer_code,
                                    password: this.password
                                },
                                headers: {
                                    'Access-Control-Allow-Origin': '*',
                                    'Content-type': 'application/json',
                                    'Accept': 'application/json',
                                },
                                
                                })
                                .then( (response) =>{
                                    //handle success

                                    console.log(response)

                                    localStorage.setItem('user_role', response.data.user_data.role)
                                    localStorage.setItem('user_token', response.data.access_token)
                                    localStorage.setItem('user_data', JSON.stringify(response.data.user_data))

                                    
                                    loader.hide()

                                     toast.success('Login Successful');

                                    return this.$router.push('/verify')

                                
                                })
                                .catch( (response)=> {

                                    // alert(response);
                                    //handle error
                                    console.log(response);

                                   toast.error('Invalid Credentials');

                                    loader.hide()

                                });
            
                  
                    },

                    onCancel() {
                        console.log('User cancelled the loader.')
                    },

                   
    },

       mounted(){
        // console.log(this.$route.params.id)
        // this.referrer_code = this.$route.params.id
    }
    
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

