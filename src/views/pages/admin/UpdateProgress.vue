<template>
   <div class="nk-content-body">
        <div class="nk-content-wrap">
            <div class="nk-block-head nk-block-head-lg">
                <div class="nk-block-between-md g-4">
                    <div class="nk-block-head-content">
                        <h2 class="nk-block-title fw-normal">Update Progress</h2>
                        <h6>Subscriber details: {{reports[0]?.subscribers.name}}</h6>
                        <h6>Project details: {{reports[0]?.payment_plan.building_project.title}}</h6>
                       
                    </div>
                </div>
            </div><!-- .nk-block-head -->
         
        </div>

        <div class="container py-3">

             

            <div class="row">
                <div style="height: 440px; overflow: scroll;" class="col-md-6">
                 <h4 class="py-3">Reports</h4>
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
                <div class="col-md-6">

                    <div  class=" ">
    
                          <h4 class="py-3">New Report.</h4>
                          
                        <div  class=" d-flex flex-wrap justify-content-start">
                            <div id="previewImg" class="">
    
                            </div>
                        </div>
    
    
                                                <div class="form-group mx-auto text-center">
    
    
    
                                                
    
                                                      <!-- <img 
                                                    onclick="document.getElementById('customFile').click()" 
                                                    id="previewImg" 
                                                    style="height: 189px; width: 189px; object-fit: cover;" 
                                                    class="shadow border border-primary" 
                                                    :src="avatar??'https://eu.ui-avatars.com/api/?name='+name"
                                                     >
    
                                                     
                                                      <img 
                                                    onclick="document.getElementById('customFile').click()" 
                                                    id="previewImg2" 
                                                    style="height: 189px; width: 189px; object-fit: cover;" 
                                                    class="shadow border border-primary d-none" 
                                                    src=""
                                                     > -->
    
                                                     
    
                                                    <div class="text-center py-3">
                                                        <input @change="previewFile4" ref="file" type="file" id="customFile"  multiple> 
                                                    </div>
    
    
                                                </div> 


                                        <div class="form-group">
                                            <label for="">Description</label>
                                            <textarea v-model="description" name="description" class="form-control" placeholder="Description of progress of work" id="" cols="30" rows="5"></textarea>
                                        </div>
                                        <div class="form-group">
                                            <label for="">Issues</label>
                                            <textarea v-model="issues" name="description" class="form-control" placeholder="Description of progress of work" id="" cols="30" rows="5"></textarea>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="">Stage</label>
                                                    <select v-model="stage" id="" class="form-control">
                                                        <option value="Site clearance & preliminary works">Site clearance & preliminary works</option>
                                                        <option value="Foundation">Foundation</option>
                                                        <option value="Oversite concrete works">Oversite concrete works</option>
                                                        <option value="Ground floor column works">Ground floor column works</option>
                                                        <option value="Suspended slab works">Suspended slab works</option>
                                                        <option value="First floor ( and above) column works">First floor ( and above) column works</option>
                                                        <option value="Blockwork ">Blockwork </option>
                                                        <option value="Roof beam works">Roof beam works</option>
                                                        <option value="Roof structure">Roof structure</option>
                                                        <option value="Exterior windows">Exterior windows</option>
                                                        <option value="Exterior plastering">Exterior plastering</option>
                                                        <option value="Interior Design">Interior Design</option>
                                                        <option value="External electricals">External electricals</option>
                                                        <option value="External plumbing works">External plumbing works</option>
                                                        <option value="Other external works">Other external works</option>
                                                       
                                        
                                                    </select>
                                                </div>

                                            </div>
                                            <div class="col-md-6">

                                                <div class="form-group">
                                                <label for="">Percentage Completion</label>
                                                <input type="number" v-model="percent" step="10" max="100" class="form-control" id="">
                                                <!-- <select v-model="percent" name="" id="" class="form-control">
                                                    <option value="10">10</option>
                                                    <option value="20">20</option>
                                                    <option value="60">60</option>
                                                    <option value="80">80</option>
                                                    <option value="100">100</option>
                                                </select> -->
                                                </div>
                                                
                                            </div>
                                        </div>




                                        <div v-if="loading" class="form-group py-3">
                                            <button  class="btn btn-success float-right" disabled>Submitting...</button>
                                        </div>
                                        <div v-else class="form-group py-3">
                                            <button @click="submitReport()" class="btn btn-success float-right">Submit</button>
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
            media: [],
            reports: [],
            description: '',
            issues: '',
            stage: '',
            percent: '',
            userDatax: [],
            loading: false
        }
    },
    methods: {

        previewFile4(event){


            console.log(event)

            var total_file = event.target.files.length;            

           var mediax = this.$refs.file.files;

            for (let index = 0; index < mediax.length; index++) {

                this.media.push(this.$refs.file.files[index]);
                
            }

            console.log(this.media)

            

             for(var i=0; i<total_file; i++)
            {
                



                if (event.target.files[i].type.includes('video')) {

                    document.getElementById("previewImg").insertAdjacentHTML("afterend", "<div class=' p-2'><video class='border border-primary' style='width: 200px; height: 200px; object-fit: cover;' src='"+URL.createObjectURL(event.target.files[i])+"' controls></video></div>");
                    
                } else {

                    document.getElementById("previewImg").insertAdjacentHTML("afterend", "<div class=' p-2'><img class='border border-primary' style='width: 200px; height: 200px; object-fit: cover;' src='"+URL.createObjectURL(event.target.files[i])+"'></div>");
                    
                }

                
                
            }


        },

        submitReport(){


            this.loading = true

            // console.log(this.$route.params.id);

            let formData = new FormData();

            var mediax = this.$refs.file.files;

            for (let index = 0; index < mediax.length; index++) {

                formData.append('assets[]',this.$refs.file.files[index]);
                
            }


            formData.append('payment_plan_id', this.$route.params.id)

            formData.append('description', this.description)
            formData.append('issues', this.issues)
            formData.append('stage', this.stage)
            formData.append('percent', this.percent)

        


            this.axios({
                url: process.env.VUE_APP_URL+'/api/progress_report',
                data: formData,
                method: 'post',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Access-Control-Allow-Origin': '*',
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' +localStorage.getItem('user_token')
                },

            })
            .then((response)=>{

                this.loading = false


                toast.success('Report Submitted');

                // this.profileData = response.data


                console.log(response)

                this.getReports()
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

        this.userDatax = JSON.parse(localStorage.getItem('user_data'));

        this.getReports()
        
    },
}
</script>