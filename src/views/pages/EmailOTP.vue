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
                                        <h5 class="nk-block-title">Enter OTP</h5>
                                        <div class="nk-block-des">
                                            <p>An OTP has been sent to your mail</p>
                                        </div>
                                    </div>
                                </div><!-- .nk-block-head -->
                                <div action="#" class="form-validate is-alter" autocomplete="off">
                                    <div class="form-group">
                                        <div class="form-label-group">
                                            <label class="form-label" for="email-address">OTP</label>
                                            <a class="link link-primary link-sm d-none" tabindex="-1" href="#">Need Help?</a>
                                        </div>
                                        <div class="form-control-wrap">
                                            <input v-model="otp" autocomplete="off" type="text" class="form-control form-control-lg" required id="email-address" placeholder="Enter OTP">
                                        </div>
                                    </div><!-- .form-group -->
                                   
                                    <div class="form-group">
                                        <button @click="submit()" class="btn btn-lg btn-primary btn-block">Submit</button>
                                    </div>
                                </div><!-- form -->
                               
                               
                            </div><!-- .nk-block -->
</template>

<script>
import { useToast } from 'vue-toastification'

const toast = useToast()

export default {

    data() {
        return {
             fullPage: false,
             otp: this.$route.params.id,

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

                  this.axios({
                      method: 'post',
                      url: process.env.VUE_APP_URL+'/api/verify_otp',
                       data: {
                            otp: this.$route.params.idthis.$route.params.id,
                            // password: this.password
                        },
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Content-type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': 'Bearer ' +localStorage.getItem('user_token')
                        },
                  })
                  .then((response)=>{
                 

                    console.log(response)

                    localStorage.setItem('user_role', response.data.user_data.role)
                    // localStorage.setItem('user_token', response.data.access_token)
                    localStorage.setItem('user_data', JSON.stringify(response.data.user_data))

                    
                    loader.hide()

                    toast.success('Email Verified');

                    return this.$router.push('/user')

                                
        
                        
                    })
                  .catch((response)=>{

                            console.log(response);

                            toast.error('Invalid OTP');

                            loader.hide()

                  })  


            },
            onCancel() {
                console.log('User cancelled the loader.')
                // loader.hide()
            }
    },
    
}
</script>

