<template>
                            <div class="nk-block nk-block-middle nk-auth-body">
                                <div class="brand-logo pb-5">
                                    <a href="html/index.html" class="logo-link">
                                        <img class="logo-light logo-img logo-img-lg" src="https://leptonsmulticoncept.com/wp-content/uploads/fbrfg/apple-touch-icon.png" srcset="images/logo2x.png 2x" alt="logo">
                                        <img class="logo-dark logo-img logo-img-lg" src="https://leptonsmulticoncept.com/wp-content/uploads/fbrfg/apple-touch-icon.png" srcset="images/logo-dark2x.png 2x" alt="logo-dark">
                                    </a>
                                </div>
                                <div class="nk-block-head">
                                    <div class="nk-block-head-content">
                                        <h5 class="nk-block-title">Sign-In</h5>
                                        <div class="nk-block-des">
                                            <p>Access the Leptons panel using your email and passcode.</p>
                                        </div>
                                    </div>
                                </div><!-- .nk-block-head -->
                                <div action="#" class="form-validate is-alter" autocomplete="off">
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
                                                <em class="passcode-icon icon-show icon ni ni-eye"></em>
                                                <em class="passcode-icon icon-hide icon ni ni-eye-off"></em>
                                            </a>
                                            <input v-model="password" autocomplete="new-password" type="password" class="form-control form-control-lg" required id="password" placeholder="Enter your passcode">
                                        </div>
                                    </div><!-- .form-group -->
                                    <div class="form-group">
                                        <button @click="submit()" class="btn btn-lg btn-primary btn-block">Sign in</button>
                                    </div>
                                </div><!-- form -->
                                <div class="form-note-s2 pt-4"> New on our platform? <router-link to="/register">Create an account</router-link>>
                                </div>
                                <div class="text-center pt-4 pb-3">
                                    <h6 class="overline-title overline-title-sap"><span>OR</span></h6>
                                </div>
                                <ul class="nav justify-center gx-4">
                                    <li class="nav-item"><a class="nav-link" href="#">Facebook</a></li>
                                    <li class="nav-item"><a class="nav-link" href="#">Google</a></li>
                                </ul>
                               
                            </div><!-- .nk-block -->
</template>

<script>
import { useToast } from 'vue-toastification'

const toast = useToast()

export default {

    data() {
        return {
             fullPage: false,
             email: '',
             username: '',
             password: '',
             role: '',
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
                        // alert('start')
                let loader = this.$loading.show({
                    // Optional parameters
                    container: this.fullPage ? null : this.$refs.formContainer,
                    canCancel: false,
                    onCancel: this.onCancel,
                    color: '#6CC3EC',
                });

                    setTimeout(() => {
                        loader.hide()
                    }, 5000)

                  
                  this.axios({
                      method: 'post',
                      url: 'http://localhost:9111/api/login',
                       data: {
                            email: this.email,
                            password: this.password
                        },
                  })
                  .then((response)=>{
                    //   alert(this.username)
                    //   alert(this.password)

                  
                    //   this.email = this.username

                      console.log(response)

                            this.axios({
                                method: "post",
                                url: 'http://localhost:9111/api/login',
                                data: {
                                    // name: this.name,
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

                                    return this.$router.push('/user/home')

                                
                                })
                                .catch( (response)=> {

                                    // alert(response);
                                    //handle error
                                    console.log(response);

                                   toast.error('Invalid Credentials');

                                    loader.hide()

                                });
            

                        
                    })
                  .catch((response)=>{
                      console.log(response)
                  })  


            },
            onCancel() {
                console.log('User cancelled the loader.')
                // loader.hide()
            }
    },
    
}
</script>

