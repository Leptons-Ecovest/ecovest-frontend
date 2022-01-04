<template>
   <div class="nk-content-body">
        <div class="nk-content-wrap">
            <div class="nk-block-head nk-block-head-lg">
                <div class="nk-block-between-md g-4">
                    <div class="nk-block-head-content">
                        <h2 class="nk-block-title fw-normal">Add New Projects</h2>
                       
                    </div>
                </div>
            </div><!-- .nk-block-head -->
         
        </div>

        <div class="container py-3">

            <div class="row">

                <div class="col-md-6">

                    <div class="form-group">
                        <label >Project Title</label>
                        <input type="text" class="form-control" v-model="title" placeholder="Project Title">
                    </div>

                    <div class="form-group">
                        <label >Location</label>
                        <input type="text" class="form-control" v-model="location" placeholder="location">
                    </div>

                    <div class="form-group">
                        <label >Apartment Size (m2)</label>
                        <input type="number" class="form-control" v-model="apartment_size" placeholder="Apartment Size">
                    </div>

                    <div class="form-group">
                        <label >Payment Plan</label>
                        <input type="text" class="form-control" v-model="payment_plan" placeholder="Payment Plan">
                    </div>

                </div>

                <div class="col-md-6">

                    <div class="form-group">
                        <label >Property Price</label>
                        <input type="number" class="form-control" v-model="property_price" placeholder="Property Prize">
                    </div>

                    <div class="form-group">
                        <label >Facilities</label>
                        <input type="text" class="form-control" v-model="facilities" placeholder="Property facilities">
                    </div>

                    <div class="form-group">
                        <label >Estate Facilities</label>
                        <input type="text" class="form-control" v-model="estate_facilities" placeholder="Estate facilities">
                    </div>

                    <div class="form-group">
                        <label >Duration</label>
                        <input type="number" class="form-control" v-model="duration" placeholder="Duration">
                    </div>

                    <div class="form-group">
                        <label >Featured Image</label>
                        <input type="file" class="form-control" placeholder="Duration">
                    </div>


                </div>

                <div class="col-md-12 py-3 ">

                    <div class="form-group">

                        <button class="btn btn-primary float-right">Submit</button>

                    </div>


                </div>

            </div>





        </div>

        <div class="container">

            

            <div class="row">

                <div v-for="building_project in building_projects" :key="building_project.index" class="col-lg-4 col-md-6 p-2">

                    <div style="max-width: 200px;" class="card card-bordered product-card">
                        <div class="product-thumb">
                            <a >
                                <img class="card-img-top" src="https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img/https://leptonsmulticoncept.com/wp-content/uploads/2021/04/IMG-20210222-WA0020.jpg" alt="" >
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
            
            user_data: [],
            building_projects: []
  
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

        }
     
    },

    mounted() {

        // alert(process.env.VUE_APP_URL+'/api/building_projects')
        this.getUserData()
        this.get_building_projects()
    },
}
</script>

