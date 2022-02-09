<template>
    <div class="nk-content-body">
        <div class="nk-content-wrap">
            <div class="nk-block-head nk-block-head-lg">
                <div class="nk-block-between-md g-4">
                    <div class="nk-block-head-content">
                        <h2 class="nk-block-title fw-normal">Welcome, {{user_data.name}}</h2>
                        <div class="nk-block-des">
                            <p>Welcome to our dashboard. Manage your account and your subscriptions.</p>
                        </div>
                    </div>
                </div>
            </div><!-- .nk-block-head -->


            <div class="nk-block">
                <div class="container-fluid">

                    <div class="row">
                        <div class="col-md-6 p-3">

                            <div class="card card-bordered">
                                <div class="card-body">
                                    <h6>Current Project</h6>
                                    <h4 class="py-2">{{building_project.title}}</h4>
                                    <h6>Location: <br>{{building_project.location}}</h6>
                                    <h6>Payment Plan: <br>{{building_project.payment_plan}}</h6>


                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 p-3">

                            <div class="card border">
                                <div class="card-body">

                                    <h4 class="py-2">Next Payment</h4>

                                    <h6> {{ next_payment.payment_due_date }} </h6>
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
                            <h6 class="card-title">Payment History</h6>
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
                    <tr v-for="payment_schedule in payment_schedules" :key="payment_schedule.index">
                        <td>#</td>
                        <td>{{payment_schedule.payment_due_date}}</td>
                        <td>{{payment_schedule.expected_amount}} Million</td>
                        <td>{{payment_schedule.amount_paid}}</td>
                        <td>
                            <span class="badge badge-primary">{{payment_schedule.status}}</span>
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
             payment_schedules: [],
             building_project: [],
             next_payment: []
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

                 this.building_project = response.data.payment_plan.building_project

                this.payment_schedules = response.data.payment_plan.payment_schedules

                this.next_payment = this.payment_schedules[0]

                console.log(response)
            })
            .catch((response)=>{
                console.log(response)
            })

        },
        getUserData(){
            this.user_data = JSON.parse(localStorage.getItem('user_data'));


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

