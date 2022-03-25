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
                        <div class="col-md-6 p-3">

                         
                            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                                <ol class="carousel-indicators">
                                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                                </ol>
                                <div class="carousel-inner">
                                    <div v-for="payment_plan,key in payment_plans" :key="key" :class="'carousel-item '+(key==0?'active':'')">

                                        <div style="height: 250px;" class="card card-bordered bg-dark">
                                            <div  class="card-body text-white py-2">
                                                <h6>Current Project</h6>
                                                
                                                <h6 class="">
                                                    <span class="">Description:</span> <br><h4>{{payment_plan.description}}</h4>
                                                </h6>
                                                <h4 class="pt-3"><span class="text-primary py-1">{{payment_plan.building_project.title}}</span></h4>
                                                <h6>Location: <br><span class="text-primary py-1">{{payment_plan.building_project.location}}</span></h6>
                                                <h6>Payment Plan: <br><span class="text-primary py-1">{{payment_plan.building_project.payment_plan}}</span></h6>


                                            </div>
                                        </div>
                                    
                                    </div>
                                    
                                </div>
                                <div class="bg-dark">
                                    <button style="margin-top: 250px;" class="carousel-control-prev" type="button" data-target="#carouselExampleIndicators" data-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Previous</span>
                                    <button class="btn-primar py-5 btn"></button>
                                </button>
                                <button style="margin-top: 250px;" class="carousel-control-next" type="button" data-target="#carouselExampleIndicators" data-slide="next">
                                    <span class=" carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Next</span>
                                    <button class="btn-primar py-5 btn"></button>
                                </button>
                                </div>
                            </div>

                            
                        </div>
                        <div class="col-md-6 p-3">

                            <div style="height: 230px;"  class="card border">
                                <div class="card-body">

                                    <h4 class="py-2">Next Payment</h4>
                       <h6> {{ unpaid_schedules_building_project.title}}</h6>
                       <h6> {{ unpaid_schedules_building_project.location}}</h6>
                       <h6> {{ unpaid_schedules_building_project.payment_plan}}</h6>
                       <h6> N {{ unpaid_schedules_building_project.property_price}}Million</h6>
                                    <h6> {{ unpaid_schedules.payment_due_date}}</h6>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>


 
         
            <div class="nk-block">
                <div class="card card-bordered">
                    <div class="card-inner card-inner-md">
                        <div class="card-title-group">
                            <h6 class="card-title">Latest Payment</h6>
                            <div class="card-action">
                                <a href="html/subscription/payments.html" class="link link-sm">See All <em class="icon ni ni-chevron-right"></em></a>
                            </div>
                        </div>
                    </div>
                    <table class="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Due Date</th>
                        <th>Expected Amount</th>
                        <th>Amount Paid</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="payment_schedule,key in paid_schedules" :key="key">
                        <td>{{key + 1}}</td>
                        <td>{{payment_schedule.payment_due_date}}</td>
                        <td>{{payment_schedule.expected_amount}} Million</td>
                        <td>{{payment_schedule.amount_paid}}</td>
                        <td>
                            <span :class="'badge badge-'+payment_schedule.color_code">{{payment_schedule.status}}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
                </div><!-- .card -->
            </div><!-- .nk-block -->
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

                 loader.hide()

                 this.payment_plans = response.data.payment_plan

                //  this.building_project = response.data.payment_plan.building_project

                // this.payment_schedules = response.data.payment_plan.payment_schedules

                this.unpaid_schedules = response.data.unpaid_schedules

                this.unpaid_schedules_building_project = response.data.unpaid_schedules.payment_plan.building_project

                this.paid_schedules = response.data.paid_schedules

                // this.next_payment = this.payment_schedules[0]

                console.log(response)

                console.log(this.unpaid_schedules)

                console.log(this.paid_schedules)

                console.log(this.unpaid_schedules_building_project)
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

