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

                <div class="col-md-6">

                    <h6 class="text-center">Step 2/6</h6>

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
                        <text-area type="text" class="form-control" v-model="description" placeholder=""></text-area>
                    </div>


                </div>

           

                <div class="col-md-12 py-3 ">

                    <div class="form-group">

                        <button @click="create_payment_plan()" class="btn btn-primary float-right">Submit</button>

                    </div>


                </div>

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
            building_project_title: '',
            description: '',
            subscribers_email: '',
            start_date: '',
            user_data: [],
            building_projects: []
  
        }
    },

    methods: {
        getUserData(){
            this.user_data = JSON.parse(localStorage.getItem('user_data'));


            if(localStorage.getItem('user_role') == 'admin'){

                this.user = false
            }
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

        create_payment_plan(){

            // alert(this.building_project_title)
            // alert(this.subscribers_email)
            // alert(this.start_date)
            // alert(this.description)

                let loader = this.$loading.show({
                    // Optional parameters
                    container: this.fullPage ? null : this.$refs.formContainer,
                    canCancel: false,
                    onCancel: this.onCancel,
                    color: '#6CC3EC',
                });

            this.axios({
                    method: "post",
                    url: process.env.VUE_APP_URL+'/api/create_payment_plan',
                    data: {
                        start_date: this.start_date,
                        subscribers_email: this.subscribers_email,
                        building_project_title: this.building_project_title,
                        description: this.description

                    },
                    headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' +localStorage.getItem('user_token')
                },
            })
            .then((response)=>{

                 loader.hide()
                    toast.success('Plan created successfully!!');
                console.log(response)
            })
            .catch((response)=>{
                console.log(response)
            })

        }
     
    },

    mounted() {

        // alert(process.env.VUE_APP_URL+'/api/building_projects')
        this.getUserData()
        this.get_building_projects()
    },
}
</script>

