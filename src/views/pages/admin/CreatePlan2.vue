<template>
    <div class="nk-content-body">
         <div class="nk-content-wrap">
             <div class="nk-block-head nk-block-head-lg">
                 <div class="nk-block-between-md g-4">
                     <div class="nk-block-head-content">
                         <h2 class="nk-block-title fw-normal">Create Payment Plan</h2>
                        
                     </div>
                 </div>
             </div><!-- .nk-block-head -->
          
         </div>
 
         <div class="container py-3">
 
             <div class="row">
 
                 <div class="col-md-12">
 
                     <h6 class="text-center py-3">Step 1/4</h6>
 
                     <div class="form-group">
                         <label >Building Projects</label>
                         <select class="form-control" v-model="building_project_title" >
 
                    
 
                             <option v-for="building_project in building_projects" :key="building_project.index" >{{building_project.title}}</option>
 
                         </select>
                     </div>
 
                     <div class="form-group d-none">
                         <label >Subscribers Email</label>
                         <input type="text" class="form-control" v-model="subscribers_email" placeholder="Enter Subscriber email">
                     </div>
 
                     <div class="form-group">
                         <label >Date</label>
                         <input type="date" class="form-control" v-model="start_date" placeholder="">
                     </div>
 
                     <div class="form-group">
                         <label >Description</label>
                         <textarea  row="5" type="text" class="form-control" v-model="description" placeholder="Lets have some more details about the project for this user"></textarea>
                     </div>
 
                     <div class="form-group">
                         <button @click="next_stage()" class="btn btn-primary">Submit</button>
                     </div>
 
            
 
 
 
 
                 </div>
 
                 
 
            
 
 
             </div>
 
 
 
 
 
         </div>
 
       
         <!-- footer @s -->
       
         <!-- footer @e -->
     </div>
 </template>
 
<script>
import moment from "moment";

// import { useToast } from 'vue-toastification'

// const toast = useToast()



export default {
    data() {
        return {
            building_project_title: '',
            description: '',
            subscribers_email: '',
          
            user_data: [],
            building_projects: [],

            no_stages: '',
            amount: '',
            payment_plan_id: '',
            user_id: '',
            start_date: moment().format('YYYY-MM-DD'),
            no_months: '',

            payment_stages: []
  
        }
    },

    methods: {
        getUserData(){

            
            this.axios({
                    method: "post",
                    url: process.env.VUE_APP_URL+'/api/user_data',
                    data: {
                        user_id: this.$route.params.id,
                    },
                    headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' +localStorage.getItem('user_token')
                },
            })
            .then((response)=>{

                this.user_data = response.data
            })
            .catch((response)=>{
                console.log(response)
            })
        },
        get_building_projects(){

            this.axios({
                url: process.env.VUE_APP_URL+'/api/building_projects',
                method: 'GET',
                
            })
            .then((response)=>{

                // console.log(response.data.building_projects)

                this.building_projects = response.data.building_projects

            })
            .catch((response)=>{

                console.log(response)

            });

        },

        next_stage() {
            return this.$router.push({
                path: '/admin/create-payment-schedule/',
                query: {
                    start_date: this.start_date,
                    subscribers_email: this.user_data.email,
                    building_project_title: this.building_project_title,
                    description: this.description,
                }
            });
        },
     
    },

    mounted() {

        // alert(process.env.VUE_APP_URL+'/api/building_projects')
        this.getUserData()
        this.get_building_projects()

       
    },
}
</script>

