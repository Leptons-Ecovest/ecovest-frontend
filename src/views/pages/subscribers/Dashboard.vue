<template>
    <div class="nk-content-body">
        <div class="nk-content-wrap">
            <div class="nk-block-head nk-block-head-lg">
                <div class="nk-block-between-md g-4">
                    <div class="nk-block-head-content">
                        <h2 class="nk-block-title fw-normal">Welcome, {{user_data.name}}</h2>
                        <div class="nk-block-des">
                            <p>Welcome to our dashboard. Manage your account and your projects.</p>
                        </div>
                    </div>
                </div>
            </div><!-- .nk-block-head -->


            <div class="nk-block">
                <div class="container-fluid">

                    <div class="row match-height">
                        <div class="col-md-12 p-3">
                         
                            <div  id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                                <ol class="carousel-indicators">
                                    <li v-for="payment_plan,key in payment_plans" :key="key" data-target="#carouselExampleIndicators" :data-slide-to="key" class="active"></li>
                                  
                                </ol>
                                <div class="carousel-inner">
                                    <div v-for="payment_plan,key in payment_plans" :key="key" :class="'carousel-item '+(key==0?'active':'')">

                                        <div style="min-height: 280px;" class="card card-bordered bg-dark">
                                            <div class="card-header">
                                                <button class="btn btn-primary btn-sm float-right">{{payment_plan.status}}</button>
                                            </div>
                                            <div  class="card-body text-white  py-2">

                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <h3> {{payment_plan.id * 2340}}</h3>
                                                        <span class="text-muted">Project Code</span>

                                                        <h4 class="pt-3"><span class="text-primary">{{payment_plan.building_project.title}}</span></h4>
                                                        <span class="text-muted">Project Title</span>

                                                        <h4 class="pt-3"><span class="text-primary">{{payment_plan.building_project.location}}</span></h4>
                                                        <span class="text-muted">Project Location</span>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="pt-3">
                                                                <div  style="height: 35px;" class="progress progress-lg shadow">
                                                                    <div :style="'height:35px; width: '+payment_plan.percent_completion+'%;'" class="progress-bar" data-progress="75">{{payment_plan.percent_completion}}%</div>
                                                                </div>
                                                        </div>
                                                        <div class=" pt-3">
                                                            <span class="text-muted ">Project Progress</span>

                                                        </div>
                                                        <div class=" pt-3">

                                                            <h4><span class="text-primary pt-5">{{payment_plan.stages[0].aboundary_date}}</span></h4>
                                                            <span class="text-muted">Next Payment</span>

                                                        </div> 
                                                        <div class="pt-3">
                                                            <router-link :to="'/user/payment-history/'+payment_plan.id" class="btn btn-primary">details</router-link>
                                                        </div>  

                                                    
                                                    </div>
                                            
                                                

                                                </div>


                                         </div>
                                        </div>
                                    
                                    </div>
                                    
                                </div>
                                <div class="bg-dark">
                                    <button style="margin-top: 280px;" class="carousel-control-prev" type="button" data-target="#carouselExampleIndicators" data-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Previous</span>
                                    <button class="btn-primar py-5 btn"></button>
                                </button>
                                <button style="margin-top: 280px;" class="carousel-control-next" type="button" data-target="#carouselExampleIndicators" data-slide="next">
                                    <span class=" carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Next</span>
                                    <button class="btn-primar py-5 btn"></button>
                                </button>
                                </div>
                            </div>


           

                            
                        </div>

                        <div class="col-md-12 p">

                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th style="width: 230px;">Amount Due</th>

                                        <th style="width: 230px;">amount Remitted</th>
                                        <th>Status</th>

                                    </tr>
                                </thead>
                            </table>

                            <div v-for="payment_plan,key in payment_plans" :key="key" class="car">
                               
                                  
                                    <table class="table table-striped">
                                        <tr v-for="stage,key in payment_plan.stages" :key="key" >
                                            <td>{{key + 1}}</td>
                                            <td style="width: 230px;" >₦ {{stage.amount}}</td>
                                            <td style="width: 230px;" >₦ {{stage.amount_remitted}}</td>
                                            <td>{{stage.status}}</td>
                                        </tr>
                                    </table>

                               
                            </div>

                        </div>
                     
                    </div>


                </div>
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
            
             user_data: [],

             unpaid_schedules_notify_list: [],

             unpaid_schedules_notify_list_filtered: [],
     

             next_payment: [],
             unpaid_schedules: [],
             
             paid_schedules: [],
             unpaid_schedules_building_project: [],
             payment_plans: []
        }
    },

    methods: {

        load_payment_plan(){

                       let loader = this.$loading.show({
                            // Optional parameters
                            container: this.fullPage ? null : this.$refs.formContainer,
                            canCancel: false,
                            onCancel: this.onCancel,
                            color: '#6CC3EC',
                            loader: 'bars',
                            opacity: 0.3
                        });

  

            // alert(this.building_project_title)
            // alert(this.subscribers_email)
            // alert(this.start_date)
            // alert(this.description)

            this.axios({
                    method: "get",
                    url: process.env.VUE_APP_URL+'/api/payment_plans',
                    data: {
                        start_date: this.start_date,
        
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

                 loader.hide()

                 this.payment_plans = response.data


            })
            .catch((response)=>{

                loader.hide()
                console.log(response)
            })

        },
        getUserData(){
            this.user_data = JSON.parse(localStorage.getItem('user_data'));

            console.log(this.user_data)

            if(localStorage.getItem('user_role') == 'admin'){

                this.user = false
            }
        },
     
    },

    mounted() {
        this.getUserData()

        this.load_payment_plan()
    },
}
</script>

