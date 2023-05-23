<template>
    <div class="nk-content-body">

         <div class="nk-content-wrap">
            <div class="nk-block-head nk-block-head-lg">
                <div class="nk-block-between-md g-4">
                    <div class="nk-block-head-content">
                        
                        <h2 class="nk-block-title fw-normal">All Members</h2>

                        <router-link to="/admin/new-user" class="btn btn-primary shadow" disabled>Add New Member</router-link>

                        <button v-if="loading"  class="btn btn-primary shadow d-none" disabled>Please wait...</button>
                        <button v-else @click="sendOfferLetters()" class="btn btn-primary shadow d-none">Send Offer Letter(s)</button>
                       
                    </div>
                </div>
            </div><!-- .nk-block-head -->
         
        </div>


        <div class="container table-responsive">


            <table class="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>OTP</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div class="form-group form-check d-none">
                                <input type="checkbox" class="form-check-input" >
                                <label class="form-check-label" for="exampleCheck1">All</label>
                            </div>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr v-for="user in users" :key="user.id">
                        <td>
                              <div class="form-group form-check d-none">
                                <input type="checkbox" class="form-check-input" v-model="all_user_ids" :value="user.id" id="exampleCheck1">
                            </div>
                        </td>
                        <td>
                            <img style="width: 50px; height: 50px; border-radius: 50%;" class="shadow" :src="getImgUrl(user.avatar)" alt="">


                        </td>
                        <td>{{user.name}}</td>
                        <td>{{user.email}}</td>
                        <td>{{user.otp}}</td>
                        <td>
                            <button @click="viewUser(user.id)" type="button" class="btn btn-primary btn-sm btn-block" data-toggle="modal" data-target="#exampleModal">
                           Details
                            </button> <br>

                            <router-link :to="'/admin/create-payment-plan2/'+user.id" class="btn btn-warning btn-sm btn-block">Create Plan</router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- Button trigger modal -->


<!-- Modal -->
                            <div class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">{{user_data.name}}</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">

                                        <div class="container py-3">


                                                            <div class="row">
                                                        
                                                                <div class="col-md-12">

                                                                


                                                                    <div class="container ">
                                                                        <div class="row">
                                                                        <div class="col-md-6 ">
                                                                            <div class="form-group mx-auto text-center">

                                                                            

                                                                                <img 
                                                                                onclick="document.getElementById('customFile').click()" 
                                                                                id="previewImg" 
                                                                                style="height: 100px; width: 100px; object-fit: cover; border-radius: 50%;" 
                                                                                class="shadow border border-primary" 
                                                                                :src="avatar??'https://eu.ui-avatars.com/api/?name='+name"
                                                                                >

                                                                                
                                                                                <img 
                                                                                onclick="document.getElementById('customFile').click()" 
                                                                                id="previewImg2" 
                                                                                style="height: 100px; width: 100px; object-fit: cover; border-radius: 50%;" 
                                                                                class="shadow border border-primary d-none" 
                                                                                src=""
                                                                                >

                                                                                

                                                                                <div class="text-center d-none">
                                                                                    <input @change="previewFile4" ref="file" type="file" id="customFile"  > 
                                                                                </div>


                                                                            </div> 
                                                                        </div>
                                                                        <div class="col-md-6 pt-md-5 px-md-5 text-center d-none">
                                                                            <div class="form-group pt-5 ">
                                                                                <button @click="deleteAvatar()" class="btn-danger btn signup-btn btn-block">Delete</button></div>
                                                                        </div>
                                                                        <div class="col-md-4 px-md-5 text-center">
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
                                                                                <input v-model="gender"  type="text" class="form-control">
                                                                            </div>
                                                                        </div>

                                                                        <div class="col-md-6">
                                                                            <div class="form-group">
                                                                                <label class="mt-3" for="">Date of Birth</label>
                                                                                <input v-model="dob"  type="text" class="form-control">
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
                                                                                <label class="mt-3" for="">Next of Kin Name: </label>
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
                                        
                                    </div>
                                    <div class="modal-footer d-none">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary">Save changes</button>
                                    </div>
                                    </div>
                                </div>
                            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            users : [],

            user_data: [],

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

            all_user_ids: [],

            loading: false
        }
    },

    methods: {

        viewUser(index){

            console.log(index)

                    this.user_data = 
                    this.users.filter(element => 
                                        (element.id == index))

                    this.user_data = this.user_data[0]

                        this.residential_address =  this.user_data?.profile.residential_address
                        this.phone =  this.user_data.profile?.phone
                        this.gender =  this.user_data.profile?.gender
                        this.nok_name =  this.user_data.profile?.nok_name
                        this.nok_email =  this.user_data.profile?.nok_email
                        this.nok_phone =  this.user_data.profile?.nok_phone
                        this.nok_address =  this.user_data.profile?.nok_address
                        this.nin =  this.user_data.profile?.nin
                        this.dob =  this.user_data.profile?.dob

                        this.avatar =  this.user_data.avatar
                        this.name =  this.user_data.name
                        this.email = this.user_data.email

                    console.log(this.user_data[0])

                    return index;

        },

        getImgUrl(url){
            return url;
        },
        getUsers(){

             let loader = this.$loading.show({
                    // Optional parameters
                    container: this.fullPage ? null : this.$refs.formContainer,
                    canCancel: false,
                    onCancel: this.onCancel,
                    color: '#6CC3EC',
                    loader: 'bars',
                    opacity: 0.3
                });


             this.axios({
                url: process.env.VUE_APP_URL+'/api/users',
                method: 'get',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' +localStorage.getItem('user_token')
                },

            })
            .then((response)=>{

                loader.hide()
               

                console.log(response)

                this.users = response.data
            })
            .catch((response)=>{

                loader.hide()

                console.log(response)
            })

        },


        sendOfferLetters(){

            this.loading = true;


            this.axios({
                url: process.env.VUE_APP_URL+'/api/send_batch',
                method: 'post',
                data: {
                    ids: this.all_user_ids
                },
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    
                },

            })
            .then((response)=>{   
                
                this.loading = false;

                console.log(response)
         
            })
            .catch((response)=>{

                console.log(response)
            })

            


            console.log(this.all_user_ids)
        }
    },

    mounted() {
        this.getUsers()
    },
}
</script>