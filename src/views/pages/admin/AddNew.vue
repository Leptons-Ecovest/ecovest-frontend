<template>
    <div class="nk-content-body">

         <div class="nk-content-wrap">
            <div class="nk-block-head nk-block-head-lg">
                <div class="nk-block-between-md g-4">
                    <div class="nk-block-head-content">
                        
                        <h2 class="nk-block-title fw-normal">Add New Member</h2>

                        <h6 class="text-info">Please note this is form will create a new user and your will proceed to set up a building project for this user. The final step will carry the disbursement of offer letter will contains. Offer Contract to be signed and Brochure.</h6>

  
                    </div>
                </div>
            </div><!-- .nk-block-head -->
         
        </div>


        <div class="container table-responsive">



            <div class="col-md-10">

                <h6 class="text-center">Step 1/3</h6>

                <div class="form-group">
                    <label for="">Name</label>
                    <input type="text" class="form-control" v-model="name" placeholder="Enter Subscriber Name">
                </div>

                <div class="form-group">
                    <label for="">Email</label>
                    <input type="email" class="form-control" v-model="email" placeholder="Enter Subscribers Email">
                </div>

                <div class="form-group">
                    <label for="">Password</label>
                    <input type="text" class="form-control" placeholder="Chill on this the system will create one 😄." disabled>
                </div>

                <div class="form-group">
                     <button v-if="loading"  class="btn btn-primary" disabled>Creating new user please wait...</button>
                    <button v-else @click="submit()" class="btn btn-primary">Submit</button>
                </div>


            </div>



        </div>
        
    </div>
</template>

<script>
import { useToast } from 'vue-toastification'

const toast = useToast()

export default {
    data() {
        return {
            name: '',
            email: '',
            loading: false
        }
    },

    methods: {

        submit() {

            this.loading = true


            // let loader = this.$loading.show({
            //     // Optional parameters
            //     container: this.fullPage ? null : this.$refs.formContainer,
            //     canCancel: false,
            //     onCancel: this.onCancel,
            //     color: '#6CC3EC',
            // });


            
            this.axios({
                    method: "post",
                    url: process.env.VUE_APP_URL+'/api/add_new_user',
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
                        'Authorization': 'Bearer ' +localStorage.getItem('user_token')
                    },
                    
                    })
                    .then( (response) =>{
                        //handle success

                        this.loading = false

                        console.log(response)

                        return this.$router.push('create-payment-plan2/'+ response.data.id)

                        // localStorage.setItem('user_role', response.data.user_data.role)
                        // localStorage.setItem('user_token', response.data.access_token)
                        // localStorage.setItem('user_data', JSON.stringify(response.data.user_data))

                        
                        // loader.hide()

                            // toast.success('Login Successful');

 
                

                        // return this.$router.push('/verify')

                    
                    })
                    .catch( (response)=> {

                        // alert(response);
                        //handle error
                        console.log(response);

                        toast.error('Something went wrong');

                        // loader.hide()

                    });

        
        },
    },
}
</script>