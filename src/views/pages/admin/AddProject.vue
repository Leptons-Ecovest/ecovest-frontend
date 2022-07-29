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

                        <div  class=" d-flex flex-wrap justify-content-start">
                            <div id="previewImg" class="">
    
                            </div>
                        </div>



                        <div class=" py-3">
                            <label for="">Floor Plan</label> <br>
                            <input @change="previewFile4" ref="file1" type="file" id="customFile"  multiple> 
                        </div>

                        <div  class=" d-flex flex-wrap justify-content-start">
                            <div id="previewImg2" class="">
    
                            </div>
                        </div>

                        <div class=" py-3">
                            <label for="">3D of Project</label> <br>
                            <input @change="previewFile5" ref="file2" type="file" id="customFile2"  multiple> 
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


                        <div  class=" d-flex flex-wrap justify-content-start">
                            <div id="previewImg3" class="">
    
                            </div>
                        </div>



                        <div class="form-group">
                            <label for="">Featured Image</label>
                            <input @change="handleFileUpload" type="file" ref="file3" class="form-control-file" >
                        </div>


                </div>

                <div class="col-md-12 py-3 ">

                    <div class="form-group">

                        <button @click="add_project()" class="btn btn-primary float-right">Submit</button>

                    </div>


                </div>

            </div>





        </div>

        <div class="container">

            

            <div class="row">

                <div v-for="building_project in building_projects" :key="building_project.index" class="col-lg-4 col-md-6 p-2">

                    <div  class="card card-bordered product-card">
                        <div class="product-thumb">
                            <a >
                                <img class="card-img-top" v-bind:src="getImgUrl(building_project.featured_image)" alt="" >
                            </a>
                            <ul v-if="building_project.status=='active'" class="product-badges">
                                <li><button @click="deactivateProject(building_project.id)" class="badge badge-danger">Deactivate</button></li>
                            </ul>
                             <ul v-else class="product-badges">
                                <li><button @click="activateProject(building_project.id)"  class="badge badge-success">Activate</button></li>
                            </ul>
                           
                        </div>
                        <div class="card-inner text-center">
                            <ul class="product-tags">
                             
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

import { useToast } from 'vue-toastification'

const toast = useToast()
export default {
    data() {
        return {
            
            user_data: [],
            building_projects: [],
            title : '',
            location : '',
            apartment_size : '',
            payment_plan : '',
            property_price : '',
            facilities : '',
            estate_facilities : '',
            duration : '',
            file: '',

            media: [],

            mediay: [],

  
        }
    },

    methods: {

        
        activateProject(id){

             let loader = this.$loading.show({
                    // Optional parameters
                    container: this.fullPage ? null : this.$refs.formContainer,
                    canCancel: false,
                    onCancel: this.onCancel,
                    color: '#6CC3EC',
                    loader: 'bars',
                    opacity: 0.3
                });
            
             this.axios({
                url: process.env.VUE_APP_URL+'/api/activate_project',
                method: 'post',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' +localStorage.getItem('user_token')
                },
                data: {
                    building_project_id : id
                },

            })
            .then((response)=>{

                loader.hide()

                console.log(response)


                this.get_building_projects();

                toast.success('Project Activated');


                
            })
            .catch((response)=>{

                 loader.hide()

                console.log(response)

                toast.danger('An error occured');
            })


        },

        deactivateProject(id){

             let loader = this.$loading.show({
                    // Optional parameters
                    container: this.fullPage ? null : this.$refs.formContainer,
                    canCancel: false,
                    onCancel: this.onCancel,
                    color: '#6CC3EC',
                    loader: 'bars',
                    opacity: 0.3
                });
            
             this.axios({
                url: process.env.VUE_APP_URL+'/api/deactivate_project',
                method: 'post',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' +localStorage.getItem('user_token')
                },
                data: {
                    building_project_id : id
                },

            })
            .then((response)=>{

                loader.hide()

                console.log(response)


                this.get_building_projects();

                toast.warning('Project Removed');


                
            })
            .catch((response)=>{

                 loader.hide()

                console.log(response)

                toast.danger('An error occured');
            })


        },

        getImgUrl(url){

            return url;

        },

        handleFileUpload(event){

            console.log(event)

            this.file = this.$refs.file3.files[0];

            document.getElementById("previewImg3").insertAdjacentHTML("afterend", "<div class=' p-2'><img class='border border-primary' style='width: 100px; height: 100px; object-fit: cover;' src='"+URL.createObjectURL(event.target.files[0])+"'></div>");

            console.log(this.file)
        },

        getUserData(){
            this.user_data = JSON.parse(localStorage.getItem('user_data'));


            if(localStorage.getItem('user_role') == 'admin'){

                this.user = false
            }
        },

        get_building_projects(){

                 let loader = this.$loading.show({
                    // Optional parameters
                    container: this.fullPage ? null : this.$refs.formContainer,
                    canCancel: false,
                    onCancel: this.onCancel,
                    color: '#6CC3EC',
                    loader: 'bars',
                    opacity: 0.3
                });


            this.axios({
                url: process.env.VUE_APP_URL+'/api/building_projects',
                method: 'GET',
                
            })
            .then((response)=>{

                loader.hide()
                console.log(response)

                // console.log(response.data.building_projects)

                this.building_projects = response.data.building_projects

            })
            .catch((response)=>{

                console.log(response)

            });

        },

        add_project(){


                let loader = this.$loading.show({
                    // Optional parameters
                    container: this.fullPage ? null : this.$refs.formContainer,
                    canCancel: false,
                    onCancel: this.onCancel,
                    color: '#6CC3EC',
                    loader: 'bars',
                    opacity: 0.3
                });

                let formData = new FormData();

                var mediax = this.$refs.file1.files;

                var mediay = this.$refs.file2.files;

                
            for (let index = 0; index < mediax.length; index++) {

                formData.append('floor_plans[]',this.$refs.file1.files[index]);
                
            }

            
            for (let index = 0; index < mediay.length; index++) {

                formData.append('project3ds[]',this.$refs.file2.files[index]);
                
            }

                formData.append('featured_image', this.file);
                formData.append('title', this.title);
                formData.append('location', this.location);
                formData.append('apartment_size', this.fiapartment_sizele);
                formData.append('payment_plan', this.payment_plan);
                formData.append('property_price', this.property_price);
                formData.append('facilities', this.facilities);
                formData.append('estate_facilities', this.estate_facilities);
                formData.append('duration', this.duration);







            this.axios({

                
                    method: 'post',
                    url: process.env.VUE_APP_URL+'/api/create_project',
                    data: formData,
            })
            .then((response)=>{


                console.log(response)

                    loader.hide()


                     this.get_building_projects()

                toast.success('Project Added Successfully');


            })
            .catch((response)=>{

                    loader.hide()
                console.log(response)

                 toast.error('An error occured');
            })
        },

        previewFile4(event){


            console.log(event)

            var total_file = event.target.files.length;            

           var mediax = this.$refs.file1.files;

            for (let index = 0; index < mediax.length; index++) {

                this.media.push(this.$refs.file1.files[index]);
                
            }

            console.log(this.media)

            

             for(var i=0; i<total_file; i++)
            {
                



                if (event.target.files[i].type.includes('video')) {

                    document.getElementById("previewImg").insertAdjacentHTML("afterend", "<div class=' p-2'><video class='border border-primary' style='width: 200px; height: 200px; object-fit: cover;' src='"+URL.createObjectURL(event.target.files[i])+"' controls></video></div>");
                    
                } else {

                    document.getElementById("previewImg").insertAdjacentHTML("afterend", "<div class=' p-2'><img class='border border-primary' style='width: 100px; height: 100px; object-fit: cover;' src='"+URL.createObjectURL(event.target.files[i])+"'></div>");
                    
                }

                
                
            }


        },

        previewFile5(event){


            console.log(event)

            var total_file2 = event.target.files.length;            

           var mediay = this.$refs.file2.files;

            for (let index = 0; index < mediay.length; index++) {

                this.mediay.push(this.$refs.file2.files[index]);
                
            }

            console.log(this.mediay)

            

             for(var i=0; i<total_file2; i++)
            {
                



                if (event.target.files[i].type.includes('video')) {

                    document.getElementById("previewImg2").insertAdjacentHTML("afterend", "<div class=' p-2'><video class='border border-primary' style='width: 200px; height: 200px; object-fit: cover;' src='"+URL.createObjectURL(event.target.files[i])+"' controls></video></div>");
                    
                } else {

                    document.getElementById("previewImg2").insertAdjacentHTML("afterend", "<div class=' p-2'><img class='border border-primary' style='width: 100px; height: 100px; object-fit: cover;' src='"+URL.createObjectURL(event.target.files[i])+"'></div>");
                    
                }

                
                
            }


        },
     
    },

    mounted() {

        // alert(process.env.VUE_APP_URL+'/api/building_projects')
        this.getUserData()
        this.get_building_projects()
    },
}
</script>

