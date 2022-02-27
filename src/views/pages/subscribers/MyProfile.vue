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
                                        <div class="col-md-4 ">
                                            <div class="form-group mx-auto text-center">

                                            

                                                  <img 
                                                onclick="document.getElementById('customFile').click()" 
                                                id="previewImg" 
                                                style="height: 189px; width: 189px; object-fit: cover; border-radius: 50%;" 
                                                class="shadow border border-primary" 
                                                :src="business_logo??'https://eu.ui-avatars.com/api/?name='+profileData.name"
                                                 >

                                                 
                                                  <img 
                                                onclick="document.getElementById('customFile').click()" 
                                                id="previewImg2" 
                                                style="height: 189px; width: 189px; object-fit: cover; border-radius: 50%;" 
                                                class="shadow border border-primary d-none" 
                                                src=""
                                                 >

                                                 

                                                <div class="text-center d-none">
                                                    <input @change="previewFile4" ref="file" type="file" id="customFile"  > 
                                                </div>


                                            </div> 
                                        </div>
                                        <div class="col-md-4 pt-md-5 px-md-5 text-center">
                                            <div class="form-group pt-5 ">
                                                <button class="btn-danger btn signup-btn btn-block">Delete</button></div>
                                        </div>
                                        <div class="col-md-4 pt-md-5 px-md-5 text-center">
                                            <div class="form-group pt-5 ">
                                                <button class="btn-primary btn signup-btn btn-block">Upload</button></div>
                                        </div>

                                        </div>

                                    </div>


                                     <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="">Business Name</label>
                                                <input v-model="business_name" style="background-color: lightgrey" type="text" class="form-control">
                                            </div>
                                        </div>
                                        
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="">Email Address</label>
                                                <input v-model="email" style="background-color: lightgrey" type="text" class="form-control" disabled  >
                                            </div>
                                        </div>
                                    </div>


                                    <div class="row py-4">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="">Contact Person Name</label>
                                                <input v-model="contact_name" style="background-color: lightgrey" type="text" class="form-control">
                                            </div>
                                        </div>
                                        
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="">Contact Person Phone</label>
                                                <input v-model="contact_phone" style="background-color: lightgrey" type="text" class="form-control">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row py-4">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="">Country/ Country Code: </label>
                                                <input style="background-color: lightgrey" type="text" class="form-control">
                                            </div>
                                        </div>
                                        
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="">Phone</label>
                                                <input style="background-color: lightgrey" type="text" class="form-control">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row py-4">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label for="">About</label>
                                                <textarea style="background-color: lightgrey" name="" id="" cols="30" rows="5" v-model="bio" class="form-control"></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    

                                </div>
                            </div>
                    


                    <div class="col-md-12 mx-auto py-5">
                        
                            <button v-if="loading" class="btn btn-dark text-primary btn-lg col-md-3">Updating...</button>

                            <button v-else @click="updateProfile()" class="btn btn-dark text-primary btn-lg col-md-3 ">Save</button>
                        
                    </div>
           
        </div>


      
        <!-- footer @s -->
      
        <!-- footer @e -->
    </div>
</template>
<script>
export default {
    data() {
        return {

            profileData: [],

            loading: false,

            description: '',
            country: '',
            city: '',
            available_to_travel: '',
            category_id: 1,
            contact_name: '',
            contact_phone: '',

            pix1: '',
            pix2: '',
            pix3: '',

            bio: '',

            business_name: '',
            email: '',

            business_logo: '',
            business_logo2: ''

  
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

                 this.business_logo = this.$refs.file.files[0];

               
            }

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

                this.profileData = response.data,
                this.business_logo = response.data.profiles[0].business_logo_url

  
            
                this.contact_name = response.data.profiles[0].contact_name
                this.contact_phone = response.data.profiles[0].contact_phone
                this.bio = response.data.profiles[0].bio
                this.business_name = response.data.profiles[0].business_name
                this.email = response.data.email

                console.log(response.data)
            })
            .catch((response)=>{

                console.log(response)
            })


        },

        updateProfile(){

            this.loading = true

            let formData = new FormData();

            formData.append('contact_name', this.contact_name);
            formData.append('contact_phone', this.contact_phone);
            formData.append('business_name', this.business_name);
            formData.append('email', this.email);
            formData.append('business_logo', this.business_logo);
            formData.append('bio', this.bio);

             this.axios({
                url: process.env.VUE_APP_URL+'/api/profiles',
                method: 'post',
                  headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' +localStorage.getItem('user_token')
                    },
                    data: formData

            })
            .then((response)=>{


                this.loading = false

                // this.profileData = response.data

                console.log(response)
            })
            .catch((response)=>{

                this.loading = false

                console.log(response)
            })


        },

     
    },

    mounted() {
        this.loadProfile()
    },
}
</script>

