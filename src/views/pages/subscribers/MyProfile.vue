<template>
   <div class="nk-content-body">
        <div class="nk-content-wrap">
            <div class="nk-block-head nk-block-head-lg">
                <div class="nk-block-between-md g-4">
                    <div class="nk-block-head-content">
                        <h2 class="nk-block-title fw-normal">Profile</h2>
                       
                    </div>
                </div>
            </div><!-- .nk-block-head -->
         
        </div>

        <div class="container py-3">


                            <div class="row">
                         
                                <div class="col-md-10">

                                   


                                    <div class="container ">
                                        <div class="row">
                                        <div class="col-sm-4 ">
                                            <div class="form-group mx-auto text-center">

                                            

                                                  <img 
                                                onclick="document.getElementById('customFile').click()" 
                                                id="previewImg" 
                                                style="height: 120px; width: 120px; object-fit: cover; border-radius: 50%;" 
                                                class="shadow border border-primary" 
                                                :src="avatar??'https://eu.ui-avatars.com/api/?name='+name"
                                                 >

                                                 
                                                  <img 
                                                onclick="document.getElementById('customFile').click()" 
                                                id="previewImg2" 
                                                style="height: 120px; width: 120px; object-fit: cover; border-radius: 50%;" 
                                                class="shadow border border-primary d-none" 
                                                src=""
                                                 >

                                                 

                                                <div class="text-center d-none">
                                                    <input @change="previewFile4" ref="file" type="file" id="customFile"  > 
                                                </div>


                                            </div> 
                                        </div>
                                        <div class="col-md-4 pt-md-5 px-md-5 text-center d-none">
                                            <div class="form-group pt-5 ">
                                                <button @click="deleteAvatar()" class="btn-danger btn signup-btn btn-block">Delete</button></div>
                                        </div>
                                        <div class="col-md-4 pt-md-5 px-md-5 text-center">
                                            <div class="form-group pt-5 ">
                                                <button @click="uploadAvatar()" class="btn-primary btn signup-btn btn-block">Upload</button></div>
                                        </div>

                                        </div>

                                    </div>

                                     <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="mt-3" for="">Name</label>
                                                <input v-model="name"  type="text" class="form-control">
                                            </div>
                                        </div>
                                        
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="mt-3" for="">Email Address</label>
                                                <input v-model="email" type="text" class="form-control" disabled  >
                                            </div>

                                        </div>
                                    </div>


                                    <div class="row ">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="mt-3" for="">Phone</label>
                                                <input v-model="phone"  type="text" class="form-control">
                                            </div>
                                        </div>
                                        
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="mt-3" for="">Gender</label>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" v-model="gender" id="exampleRadios1" value="male" :checked="gender=='male'?'yes':''">
                                                    <label class="form-check-label" for="exampleRadios1">
                                                        Male
                                                    </label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" v-model="gender" id="exampleRadios2" value="female" :checked="gender=='female'?'yes':''">
                                                    <label class="form-check-label" for="exampleRadios2">
                                                        Female
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="mt-3" for="">Date of Birth</label>
                                                <input v-model="dob"  type="date" class="form-control">
                                            </div>
                                        </div>

                                         <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="mt-3" for="">Address</label>
                                                <input v-model="residential_address"  type="text" class="form-control">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="mt-3" for="">Next of Kin Name </label>
                                                <input type="text" v-model="nok_name" class="form-control" placeholder="Next of Kin Name">
                                            </div>
                                        </div>
                                        
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="mt-3" for="">Next of Kin Email</label>
                                                <input  type="text" v-model="nok_email" class="form-control" placeholder="Next of Kin Email">
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="mt-3" for="">Next of Kin Phone</label>
                                                <input  type="text" v-model="nok_phone" class="form-control">
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="mt-3" for="">Next of Kin Address</label>
                                                <input  type="text" v-model="nok_address" class="form-control" placeholder="Next of Kin Address">
                                            </div>
                                        </div>


                                    </div>

                                  

                                    

                                </div>
                            </div>
                    


                    <div class="col-md-12 mx-auto py-5">
                        
                            <button v-if="loading" class="btn btn-primary btn-lg ">Updating...</button>

                            <button v-else @click="updateProfile()" class="btn btn-primary btn-lg  ">Save</button>
                        
                    </div>
           
        </div>


      
        <!-- footer @s -->
      
        <!-- footer @e -->
    </div>
</template>
<script>
import { useToast } from 'vue-toastification'

const toast = useToast()
export default {
    data() {
        return {

            profileData: [],

            loading: false,

            residential_address: '',
            phone: '',
            gender: '',
            nok_name: '',
            nok_email: '',
            nok_phone: '',
            nok_address: '',
            nin: '',
            dob: '',
            avatar: '',
    
            name: '',
            email:'',

        
        }
    },

    methods: {


          
        previewFile4(event){


            console.log(event)

               if(event.target.files.length > 0){
                var src = URL.createObjectURL(event.target.files[0]);

                document.getElementById("previewImg").classList.add('d-none')
                document.getElementById("previewImg2").classList.remove('d-none')
                var preview = document.getElementById("previewImg2");
                preview.src = src;
               
                // preview.style.display = "block";

                 this.avatar = this.$refs.file.files[0];

               
            }

        },

        uploadAvatar(){
            let formData = new FormData();

            formData.append('avatar', this.avatar);
            formData.append('type', 'avatar');

            this.axios({
                url: process.env.VUE_APP_URL + '/api/profiles',
                method: 'post',
                data: formData,
                headers: {
                    'Authorization': 'Bearer ' +localStorage.getItem('user_token')
                }
            })
            .then((response) =>{

                toast.success('Profile picture Updated');

                console.log(response)
            })
            .catch((response) =>{

                console.log(response)
            })


        },

        deleteAvatar(){

            this.axios({
                url: process.env.VUE_APP_URL + '/api/profiles',
                method: 'post',
                data: {
                    type: 'avatar_remove'
                },
                headers: {
                    'Authorization': 'Bearer ' +localStorage.getItem('user_token')
                }
            })
            .then((response) =>{

                console.log(response)
            })
            .catch((response) =>{

                console.log(response)
            })



        },

        loadProfile(){
             this.axios({
                url: process.env.VUE_APP_URL+'/api/profiles',
                method: 'get',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' +localStorage.getItem('user_token')
                },

            })
            .then((response)=>{

                // this.profileData = response.data

                this.residential_address = response.data.profile?.residential_address,
                this.phone = response.data.profile?.phone,
                this.gender = response.data.profile?.gender,
                this.nok_name = response.data.profile?.nok_name,
                this.nok_email = response.data.profile?.nok_email,
                this.nok_phone = response.data.profile?.nok_phone,
                this.nok_address = response.data.profile?.nok_address,
                this.nin = response.data.profile?.nin,
                this.dob = response.data.profile?.dob,
                this.avatar = response.data.avatar,
                this.name = response.data.name,
                this.email = response.data.email,



                console.log(response)
            })
            .catch((response)=>{

                console.log(response)
            })


        },

        updateProfile(){

            this.loading = true

    
             this.axios({
                url: process.env.VUE_APP_URL+'/api/profiles',
                method: 'post',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' +localStorage.getItem('user_token')
                },
                data:{
                    residential_address: this.residential_address,
                    phone: this.phone,
                    gender: this.gender,
                    nok_name: this.nok_name,
                    nok_email: this.nok_email,
                    nok_phone: this.nok_phone,
                    nok_address: this.nok_address,
                    nin: this.nin,
                    dob: this.dob,
                    avatar: this.avatar,
                    bio: this.bio,
                    name: this.name,
                    email: this.email,
                },

            })
            .then((response)=>{


                this.loading = false

                 toast.success('Profile Updated');

                // this.profileData = response.data

                console.log(response)
            })
            .catch((response)=>{

                this.loading = false

                toast.error('An error occured');

                console.log(response)
            })


        },

     
    },

    mounted() {

        this.loadProfile()

    },
}
</script>

