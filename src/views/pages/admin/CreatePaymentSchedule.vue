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

                    <h6 class="text-center ">Step 2/6</h6>

                    

                    <div class="table-responsive pt-3"> 

                        <table class="table">
                            <thead>

                                <tr>

                                    <th>Stages</th>
                                    <th>Percentage</th>
                                    <th>Amount</th>
                                    <th>A Boundary</th>
                                    <th>B Boundary</th>
                                    <th></th>
                                    
                                    
                                </tr>

                            </thead>
                            <tbody>
                                <tr v-for="payment_stage in payment_stages" :key="payment_stage.id" >
                                    <td>
                                        {{payment_stage.stage}}
                                    </td>
                                    <td>
                                        <div class="form-group">
                                 
                                            <input  type="text" :id="'percent'+payment_stage.id" class="form-control" :value="payment_stage.percent">
                                        </div>
                                    </td>
                                    <td >
                                        
                                        <div style="width:120px;" class="form-group">
                                            
                                            <input type="text" :id="'amount'+payment_stage.id" class="form-control" :value="payment_stage.amount">
                                        </div>
    
                                    </td>
                                    <td>
    
                                        <div class="form-group">
                                
                                            <input :id="'aboundary'+payment_stage.id" type="date" class="form-control" :value="moment(payment_stage.aboundary_date).format('YYYY-MM-DD')">
                                        </div>
                                        
                                    </td>
                                    <td>
                                        <div class="form-group">
                                            
                                            <input :id="'bboundary'+payment_stage.id" type="date" class="form-control" :value="moment(payment_stage.bboundary_date).format('YYYY-MM-DD')">
                                        </div>
                                        
                                    </td>
                                    <td>
    
                                        <div  class="form-group">
                                          
                                            <button :id="'updateBtn'+payment_stage.id" @click="updateStages(
                                                payment_stage.id,
                                                'percent'+payment_stage.id,
                                                'amount'+payment_stage.id,
                                                'aboundary'+payment_stage.id,
                                                'bboundary'+payment_stage.id,
                                                'updateBtn'+payment_stage.id

                                            )" class="btn btn-primary">update</button>
                                        </div>
                                        
                                    </td>
                                </tr>

                            </tbody>

                        </table>



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
import moment from "moment";
// import { useToast } from 'vue-toastification'
// const toast = useToast()

export default {
    data() {
        return {
            moment: moment,
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

            payment_stages: [],

            percents: [],


  
        }
    },
    methods: {
        formatDate(date){
            alert('jjk')
            return document.getElementById(date).value = "2014-02-09";
        },
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

        createStages(){


            this.axios({
                url: process.env.VUE_APP_URL+'/api/create_payment_stage',
                data:{
                    no_stages: this.no_stages,
                    amount: this.amount,
                    payment_plan_id: this.$route.params.id,
                    start_date: this.start_date, 
                    no_months: this.no_months, 
                },
                method: 'post',
                
            })
            .then((response)=>{

                console.log(response)

                this.paymentStages()

            })
            .catch((response)=>{

                console.log(response)

            });

        },

        paymentStages(){


            this.axios({
                url: process.env.VUE_APP_URL+'/api/payment_plan_stages',
                data:{
                    payment_plan_id: this.$route.params.id
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

        },

        updateStages(id, percent, amount, aboundary, bboundary, btnId){

            // alert(document.getElementById(percent).value)
            // alert(document.getElementById(amount).value)
            // alert(document.getElementById(aboundary).value)
            // alert(document.getElementById(bboundary).value)
            // alert(document.getElementById(btnId).innerHTML)

            document.getElementById(btnId).innerHTML='updating...'


            this.axios({
                url: process.env.VUE_APP_URL+'/api/update_payment_stage',
                method: 'post',
                data:{
                    id: id,
                    percent: document.getElementById(percent).value,
                    amount: document.getElementById(amount).value,
                    aboundary: document.getElementById(aboundary).value,
                    bboundary: document.getElementById(bboundary).value,
                    payment_plan_id: this.$route.params.id
                    
                }
                
            })
            .then((response)=>{

                this.paymentStages()

                document.getElementById(btnId).innerHTML='update'


                console.log(response)

                // console.log(response.data.building_projects)


            })
            .catch((response)=>{

                console.log(response)

            });


            console.log(document.getElementById('percent'))

        }
     
    },

    mounted() {

        // alert(moment().format())

        // alert(process.env.VUE_APP_URL+'/api/building_projects')
        this.getUserData()
        this.get_building_projects()

        this.paymentStages()
    },
}
</script>

