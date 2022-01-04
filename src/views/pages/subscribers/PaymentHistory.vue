<template>
   <div class="nk-content-body">
        <div class="nk-content-wrap">
            <div class="nk-block-head nk-block-head-lg">
                <div class="nk-block-between-md g-4">
                    <div class="nk-block-head-content">
                        <h2 class="nk-block-title fw-normal">My Payment Plan</h2>
                       
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
                    <tr v-for="payment_schedule in payment_schedules" :key="payment_schedule.index">
                        <td>#</td>
                        <td>{{payment_schedule.payment_due_date}}</td>
                        <td>{{payment_schedule.expected_amount}} Million</td>
                        <td>{{payment_schedule.amount_paid}}</td>
                        <td>{{payment_schedule.status}}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="container py-3 d-none">

            <div class="row">

                <div class="col-md-6">

                    <div class="form-group">
                        <label >Building Projects</label>
                        <select class="form-control" v-model="building_project_title" >

                   

                            <option v-for="building_project in building_projects" :key="building_project.index" >{{building_project.title}}</option>

                        </select>
                    </div>

                    <div class="form-group">
                        <label >Subscribers Email</label>
                        <input type="text" class="form-control" v-model="subscribers_email" placeholder="Enter Subscriber email">
                    </div>

                    <div class="form-group">
                        <label >Date</label>
                        <input type="date" class="form-control" v-model="start_date" placeholder="">
                    </div>

                    <div class="form-group">
                        <label >Description</label>
                        <input type="text" class="form-control" v-model="description" placeholder="">
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
export default {
    data() {
        return {
            building_project_title: '',
            description: '',
            subscribers_email: '',
            start_date: '',
            user_data: [],
            building_projects: [],

            payment_schedules: []
  
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

        load_payment_plan(){

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

                this.payment_schedules = response.data.payment_plan.payment_schedules

                console.log(response)
            })
            .catch((response)=>{
                console.log(response)
            })

        }
     
    },

    mounted() {

        // alert(localStorage.getItem('user_token'))
        this.getUserData()
        this.get_building_projects()
        this.load_payment_plan()
    },
}
</script>

