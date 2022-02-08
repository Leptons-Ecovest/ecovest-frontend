<template>
   <div class="nk-content-body">
        <div class="nk-content-wrap">
            <div class="nk-block-head nk-block-head-lg">
                <div class="nk-block-between-md g-4">
                    <div class="nk-block-head-content">
                        <h2 class="nk-block-title fw-normal">Leptons Projects</h2>
                          <router-link v-if="admin" to="/admin/add-project" class="btn btn-primary">Add Project</router-link>
                       
                    </div>
                </div>
            </div><!-- .nk-block-head -->
         
        </div>

        <div class="container">

            

            <div class="row">

                <div v-for="building_project in building_projects" :key="building_project.index" class="col-lg-4 col-md-6 p-2">

                    <div style="max-width: 200px;" class="card card-bordered product-card">
                        <div class="product-thumb">
                            <a >
                                <img class="card-img-top" v-bind:src="getImageUrl(building_project.featured_image)" alt="" >
                            </a>
                            <ul class="product-badges">
                                <li><span class="badge badge-success">New</span></li>
                            </ul>
                           
                        </div>
                        <div class="card-inner text-center">
                            <ul class="product-tags">
                                <li><a href="#">Smart Watch</a></li>
                            </ul>
                            <h5 class="product-title"><a >{{building_project.title}}</a></h5>
                            <div class="product-price text-primary h5">N{{building_project.property_price}} Million</div>
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
            admin: false,
            
            user_data: [],
            building_projects: []
  
        }
    },

    methods: {

        getImageUrl(imgUrl){

            return imgUrl;

        },
        getUserData(){
            this.user_data = JSON.parse(localStorage.getItem('user_data'));


            if(localStorage.getItem('user_role') == 'admin'){

                this.user = false
                this.admin = true
            }
        },
        get_building_projects(){

            this.axios({
                url: process.env.VUE_APP_URL+'/api/building_projects',
                method: 'GET',
                
            })
            .then((response)=>{

                console.log(response.data.building_projects)

                this.building_projects = response.data.building_projects

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
    },
}
</script>

