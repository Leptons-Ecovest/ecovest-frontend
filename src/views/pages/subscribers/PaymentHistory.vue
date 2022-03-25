<template>
   <div class="nk-content-body">
        <div class="nk-content-wrap">
            <div class="nk-block-head nk-block-head-lg">
                <div class="nk-block-between-md g-4">
                    <div class="nk-block-head-content">
                        <h2 class="nk-block-title fw-normal">My Payment History</h2>

                        <h6>Project Title: {{title}}</h6>
                        <h6>Project Location: {{location}}</h6>
                        <h6>Project Payment Plan: {{payment_plan}}</h6>
                        <h6>Date Created: {{date_created}}</h6>
                       
                    </div>
                </div>
            </div><!-- .nk-block-head -->
         
        </div>

        <div class="container py-3">
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
                    <tr v-for="payment_schedule,key in payment_schedules" :key="key">
                        <td>{{key + 1}}</td>
                        <td>{{payment_schedule.payment_due_date}}</td>
                        <td>{{payment_schedule.expected_amount}} Million</td>
                        <td>{{payment_schedule.amount_paid}}</td>
                        <td>{{payment_schedule.status}}</td>
                    </tr>
                </tbody>
            </table>
        </div>

       

      
        <!-- footer @s -->
      
        <!-- footer @e -->
    </div>
</template>
<script>
export default {
    data() {
        return {
           
            payment_schedules: [],
            title: '',
            location: '',
            payment_plan: '',
            date_created: '',
  
        }
    },

    methods: {
        getUserData(){
            this.user_data = JSON.parse(localStorage.getItem('user_data'));


            if(localStorage.getItem('user_role') == 'admin'){

                this.user = false
            }
        },
      

        load_payment_schedules(){

            // alert(this.building_project_title)
            // alert(this.subscribers_email)
            // alert(this.start_date)
            // alert(this.description)

            this.axios({
                    method: "get",
                    url: process.env.VUE_APP_URL+'/api/payment_plans',
                    params: {
                        start_date: this.start_date,
                        payment_plan_id : this.$route.params.id
         

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
                this.payment_schedules = response.data

                this.title = response.data[0].payment_plan.building_project.title
                this.location = response.data[0].payment_plan.building_project.location
                this.payment_plan = response.data[0].payment_plan.building_project.payment_plan
                this.date_created = response.data[0].payment_plan.created_at

               
            })
            .catch((response)=>{
                console.log(response)
            })

        }
     
    },

    mounted() {

        // alert(localStorage.getItem('user_token'))


        this.getUserData()
     
        this.load_payment_schedules()
    },
}
</script>

