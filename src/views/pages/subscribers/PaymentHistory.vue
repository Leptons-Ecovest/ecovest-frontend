<template>
   <div class="nk-content-body">
        <div class="nk-content-wrap">
            <div class="nk-block-head nk-block-head-lg">
                <div class="nk-block-between-md g-4">
                    <div class="nk-block-head-content">
                        <h2 class="nk-block-title fw-normal">My Project Details</h2>

                        <h6>Project Title: {{title}}</h6>
                        <h6>Project Location: {{location}}</h6>
                        <h6>Project Payment Plan: {{description}}</h6>
                        <h6>Date Created: {{created_at}}</h6>
                       
                    </div>
                </div>
            </div><!-- .nk-block-head -->
         
        </div>



<div class="accordion" id="accordionExample">
  <div class="card">
    <div class="card-header" id="headingOne">
      <h2 class="mb-0">
        <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          <h6>Project Assets</h6>
        </button>
      </h2>
    </div>

    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
      <div class="card-body">
                    <h6>Floor Plan and 3D Designs</h6>

                    <div class="d-flex justify-content-start flex-wrap">


                        
                      <div v-for="asset,key in assets" :key="key" class="p-1">
                        
                        <a :href="asset.media_url" target="_blank">

                          <img class="shadow" style="max-height: 100px; " :src="asset.media_url" alt="">

                        </a>
                        
                      </div>
        
                   
        
                        <!-- <div class="p-1"><img class="shadow" style="max-height: 250px; " src="https://wpmedia.roomsketcher.com/content/uploads/2021/12/07133333/RoomSketcher-High-Quality-3D-Floor-Plans.jpg" alt=""></div> -->
                    </div>


      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingTwo">
      <h2 class="mb-0">
        <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          <h6>My Payment History</h6>
        </button>
      </h2>
    </div>
    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
      <div class="card-body">
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
                        <td>{{payment_schedule.bboundary_date}}</td>
                        <td>₦ {{payment_schedule.amount}} </td>
                        <td>₦ {{payment_schedule.amount_remitted}}</td>
                        <td>{{payment_schedule.status}}</td>
                    </tr>
                </tbody>
            </table>
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingThree">
      <h2 class="mb-0">
        <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          <h6>My Project Progress Report</h6>
        </button>
      </h2>
    </div>
    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
      <div class="card-body">
        
         <div style="height: 450px; overflow: scroll;" class="c">

            <div v-for="report,index in reports" :key="index.id" class="card mb-3 border shadow">
                        <div class="card-body">
                            <h6>Description:</h6>
                            <p>{{report.description_work}}</p>
                            <h6>Issues:</h6>
                            <p>{{report.issues}}</p>
                            <p class="badge badge-warning">{{report.stage}}</p>
                            
                           
                            <div class="assetx d-flex justify-content-start flex-wrap">
                                <div v-for="image,index in report.assets" :key="index.id" class="p-1">
                                    <img style="max-height: 120px; max-width: 120px;" :src="image.media_url" alt="">
                                </div>
        
                            </div>
                            <span class="font-weight-bold">Percentage Completion: {{report.percentage_completion}}%</span>
                            <span class="float-right">{{report.created_at}}</span>
                        </div>
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
           
            payment_schedules: [],

            payment_plan: '',
            date_created: '',
            reports: [],

            assets: [],

            title: '',
            location: '',
            description: '',
            created_at: '',
            
  
        }
    },

    methods: {
        getUserData(){
            this.user_data = JSON.parse(localStorage.getItem('user_data'));


            if(localStorage.getItem('user_role') == 'admin'){

                this.user = false
            }
        },
      

        async load_payment_schedules(){

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

                this.payment_plan = response.data

                this.title = response.data.building_project.title??''

                this.location = response.data.building_project.location??''

                this.description = response.data.building_project.description??''

                this.created_at = response.data.created_at??''


                this.payment_schedules = response.data.stages


                // console.log()



                this.assets = response.data.building_project.assets

                console.log(this.assets)
               
            })
            .catch((response)=>{
                console.log(response)
            })

        },

        getReports(){


            this.axios({
                url: process.env.VUE_APP_URL+'/api/get_reports',
                method: 'post',
                data:{
                    payment_plan_id: this.$route.params.id
                },
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' +localStorage.getItem('user_token')
                },

            })
            .then((response)=>{

                 console.log(response)

                this.reports = response.data


               
            })
            .catch((response)=>{

                console.log(response)
            })
            
        },
     
    },

    mounted() {

        // alert(localStorage.getItem('user_token'))


        this.getUserData()
     
   

        this.getReports()

        this.load_payment_schedules()
    },
}
</script>

