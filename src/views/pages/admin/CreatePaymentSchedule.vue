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

                    <h6 class="text-center">Step 2/6</h6>

                    

                    <div class="table table-responsive"> 


                        <div v-for="payment_stage in payment_stages" :key="payment_stage.id" class="d-flex justify-content-start">
                            <div class="form-group">
                                <label for="">Stage</label>
                                <input type="text" class="form-control" :value="payment_stage.stage">
                            </div>
                            <div class="form-group">
                                <label for="">Percent</label>
                                <input type="text" class="form-control" :value="payment_stage.percent">
                            </div>

                            <div class="form-group">
                                <label for="">Amount</label>
                                <input type="text" class="form-control" :value="payment_stage.amount">
                            </div>

                            <div class="form-group">
                                <label for="">A Boundary</label>
                                <input type="date" class="form-control" :value="new Date(Date.parse(payment_stage.aboundary_date))">
                            </div>

                            <div class="form-group">
                                <label for="">B Boundary</label>
                                <input type="date" class="form-control" :value="payment_stage.bboundary_date">
                            </div>

                            <div class="form-group">
                                <label for="">==</label>
                                <button class="btn btn-primary">update</button>
                            </div>
                        </div>



                    </div>




                </div>

                

           

                <div class="col-md-12 py-3 ">

                    
                        <div class="form-group">
                            <label for="">Number of stages</label>
                            <input v-model="no_stages" type="number" class="form-control">
                        </div>

                        <div class="form-group">
                            <label for="">Amount</label>
                            <input v-model="amount" type="number" class="form-control">
                        </div>

                        <div class="form-group">
                            <label for="">Payment Plan</label>
                            <input v-model="payment_plan_id" type="number" class="form-control">
                        </div>

                        <div class="form-group">
                            <label for="">User Id</label>
                            <input v-model="user_id" type="number" class="form-control">
                        </div>

                        <div class="form-group">
                            <label for="">Start Date</label>
                            <input v-model="start_date" type="date" class="form-control">
                        </div>

                        <div class="form-group">
                            <label for="">Number of Months</label>
                            <input v-model="no_months" type="number" class="form-control">
                        </div>

                        <div class="form-group">
                            <button @click="createStages()" class="btn btn-primary">Submit</button>
                        </div>

                        

                    <!-- <div class="form-group">

                        <button @click="create_payment_plan()" class="btn btn-primary float-right">Submit</button>

                    </div> -->


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
          
            user_data: [],
            building_projects: [],

            no_stages: '',
            amount: '',
            payment_plan_id: '',
            user_id: '',
            start_date: '',
            no_months: '',

            payment_stages: []
  
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

        },



        createStages(){

            alert(this.no_stages);

            this.axios({
                url: process.env.VUE_APP_URL+'/api/create_payment_stage',
                data:{
                    no_stages: this.no_stages,
                    amount: this.amount,
                    payment_plan_id: this.payment_plan_id,
                    user_id: this.user_id,
                    start_date: this.start_date, 
                    no_months: this.no_months, 
                },
                method: 'post',
                
            })
            .then((response)=>{

                console.log(response)

                // this.building_projects = response.data.building_projects

            })
            .catch((response)=>{

                console.log(response)

            });

        },

        paymentStages(){


            this.axios({
                url: process.env.VUE_APP_URL+'/api/payment_plan_stages',
                data:{
                    payment_plan_id: 39
                },
                method: 'post',
                
            })
            .then((response)=>{

                console.log(response)

                this.payment_stages =response.data


            })
            .catch((response)=>{

                console.log(response)

            });

        }
     
    },

    mounted() {

        // alert(process.env.VUE_APP_URL+'/api/building_projects')
        this.getUserData()
        this.get_building_projects()

        this.paymentStages()
    },
}
</script>

