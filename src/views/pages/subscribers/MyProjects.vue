<template>
   <div class="nk-content-body">
        <div class="nk-content-wrap">
            <div class="nk-block-head nk-block-head-lg">
                <div class="nk-block-between-md g-4">
                    <div class="nk-block-head-content">
                        <h2 class="nk-block-title fw-normal">My Projects</h2>


                       
                    </div>
                </div>
            </div><!-- .nk-block-head -->
         
        </div>

        <div class="container">


            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
  <li class="nav-item" role="presentation">
    <a class="nav-link active" id="pills-home-ab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Status</a>
  </li>
  <li class="nav-item" role="presentation">
    <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Description</a>
  </li>
  <li class="nav-item" role="presentation">
    <a class="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Project Payment Plan</a>
  </li>
</ul>
<div class="tab-content" id="pills-tabContent">
  <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">...</div>
  <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">...</div>
  <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">...</div>
</div>
            <div class="row">
                <div class="col-md-10">
                    <div v-for="project,key in my_projects" :key="key" class="card shadow">
                        <div class="card-body d-flex justify-content-around">
                           <div class="c p-1">
                               <img style="width: 120px; height: 120px; object-fit: cover; border-raduis: 23px;" :src="project.building_project.featured_image??'https://leptonsmulticoncept.com/wp-content/uploads/fbrfg/apple-touch-icon.png'" alt="">

                           </div>
                           <div class="d">
                               <h4>{{project.description}}</h4>
                               <div class="t text-primary">
                                <h6> {{project.building_project.title}}</h6>
                               <h6> {{project.building_project.location}}</h6>
                               
                               <h6> {{project.building_project.payment_plan}}</h6>
                               </div>

                               <router-link :to="{name: 'my-payment-history', params:{id:project.id}}" class="btn btn-primary mt-1 float-right">details</router-link>
                              

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
            my_projects: []
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
                            opacity: 0
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

                 this.my_projects = response.data.payment_plan

                //  this.building_project = response.data.payment_plan.building_project

                // this.payment_schedules = response.data.payment_plan.payment_schedules

                // this.unpaid_schedules = response.data.unpaid_schedules[0]

                // this.next_payment = this.payment_schedules[0]

                console.log(response)
            })
            .catch((response)=>{

                loader.hide()
                console.log(response)
            })

        },
    },
    

    mounted() {
        // alert('im here')
        this.load_payment_plan()
    },


}
</script>