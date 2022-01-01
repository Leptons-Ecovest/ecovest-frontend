<template>

<div class="nk-body bg-dark npc-default pg-auth">
    <div class="nk-app-root">
        <!-- main @s -->
        <div class="nk-main ">
            <!-- wrap @s -->
            <div class="nk-wrap nk-wrap-nosidebar">
                <!-- content @s -->
                <div class="nk-content ">
                    <div class="nk-split nk-split-page nk-split-md">
                        <div class="nk-split-content nk-block-area nk-block-area-column nk-auth-container bg-white">
                            <div class="absolute-top-right d-lg-none p-3 p-sm-5">
                                <a href="#" class="toggle btn-white btn btn-icon btn-light" data-target="athPromo"><em class="icon ni ni-info"></em></a>
                            </div>
                                <router-view></router-view>
                            <div class="nk-block nk-auth-footer">
                                <div class="nk-block-between">
                                   
                                </div>
                                <div class="mt-3">
                                    <p>&copy; 2021 Leptons. All Rights Reserved.</p>
                                </div>
                            </div><!-- .nk-block -->
                        </div><!-- .nk-split-content -->
                        <div class="nk-split-content nk-split-stretch bg-lighter d-flex toggle-break-lg toggle-slide toggle-slide-right" data-content="athPromo" data-toggle-screen="lg" data-toggle-overlay="true">
                            <div class="slider-wrap w-100 w-max-550px p-3 p-sm-5 m-auto">
                                <div class="slider-init" data-slick='{"dots":true, "arrows":false}'>
                                    <div class="slider-item">
                                        <div class="nk-feature nk-feature-center">
                                            <div class="nk-feature-img">
                                                <img class="round" src="https://leptonsmulticoncept.com/wp-content/uploads/2021/06/rvsdd-fnl_5-Photo.jpg" srcset="https://leptonsmulticoncept.com/wp-content/uploads/2021/06/rvsdd-fnl_5-Photo.jpg 2x" alt="">
                                            </div>
                                            <div class="nk-feature-content py-4 p-sm-5">
                                                <h4>Leptons</h4>
                                                <p>
                                                    Putting your home in the spotlight
                                                </p>
                                            </div>
                                        </div>
                                    </div><!-- .slider-item -->
                                    <div class="slider-item">
                                        <div class="nk-feature nk-feature-center">
                                            <div class="nk-feature-img">
                                                <img class="round" src="https://leptonsmulticoncept.com/wp-content/uploads/2020/06/oak-3-scaled.jpg" srcset="images/slides/promo-b2x.png 2x" alt="">
                                            </div>
                                            <div class="nk-feature-content py-4 p-sm-5">
                                                <h4>Leptons</h4>
                                                <p>
                                                    We build ambientic homes for families
                                                    
                                                </p>
                                            </div>
                                        </div>
                                    </div><!-- .slider-item -->
                                    <div class="slider-item">
                                        <div class="nk-feature nk-feature-center">
                                            <div class="nk-feature-img">
                                                <img class="round" src="https://leptonsmulticoncept.com/wp-content/uploads/2021/03/rvssddnw_8-Photo-2-1.jpg" srcset="images/slides/promo-c2x.png 2x" alt="">
                                            </div>
                                            <div class="nk-feature-content py-4 p-sm-5">
                                                <h4>Leptons</h4>
                                                <p>
                                                    Complete control of your property at your finger tips.    
                                                </p>
                                            </div>
                                        </div>
                                    </div><!-- .slider-item -->
                                </div><!-- .slider-init -->
                                <div class="slider-dots"></div>
                                <div class="slider-arrows"></div>
                            </div><!-- .slider-wrap -->
                        </div><!-- .nk-split-content -->
                    </div><!-- .nk-split -->
                </div>
                <!-- wrap @e -->
            </div>
            <!-- content @e -->
        </div>
        <!-- main @e -->
    </div>

</div>
  

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
                    canCancel: true,
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

                  
                      this.email = this.username

                      console.log(response)
                    if (this.email == 'liyeanthony@gmail.com' && this.password == '08036483438') {
                
                        localStorage.setItem('user_role', '5')
                        localStorage.setItem('user_data', JSON.stringify(response.data))
                   
                        loader.hide()
                        toast.success('Login Successful');

                     return this.$router.push('/BoardAdmin/Dashboard')
                     
                    
                    }
                    if (this.email == 'admin@rtvrs.com.ng' && this.password == 'admin@2021') {
                
                        localStorage.setItem('user_role', '6')
                    
                   
                        loader.hide()
                        toast.success('Login Successful');

                      return this.$router.push('/Admin/Dashboard');
                     
                    
                    }if(response.data.defaultSystemRole == 5){

                        // alert('yes state')
                        localStorage.setItem('user_role', '5')
                        console.log('here')
                        localStorage.setItem('user_data', JSON.stringify(response.data))
                        console.log('there')
                        
                        loader.hide()
                        toast.success('Login Successful');

                        return this.$router.push('/BoardAdmin/Dashboard')
                        
                    }else{

                        this.$router.push('/login');
                        toast.error('Invalid Credentials');

                    }
                        
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

