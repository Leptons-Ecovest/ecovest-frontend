<template>
   <div class="nk-content-body">
        <div class="nk-content-wrap">
            <div class="nk-block-head nk-block-head-lg">
                <div class="nk-block-between-md g-4">
                    <div class="nk-block-head-content">
                        <h2 class="nk-block-title fw-normal">Update Progress</h2>
                        <h6>Subscriber details:</h6>
                       
                    </div>
                </div>
            </div><!-- .nk-block-head -->
         
        </div>

        <div class="container py-3">


            <div v-for="report,index in reports" :key="index.id" class="card mb-3 border shadow">
                <div class="card-body">
                    <h6>{{report.payment_plan.building_project.title}}</h6>
                    <p>{{report.description}}</p>
                    <p>{{report.issues}}</p>
                    <p class="badge badge-warning">{{report.stage}} {{report.percentage_completion}}%</p>
                    
                    <div class="media">
                        <p class="text-muted">media files...</p>
                    </div>
                    <div class="assetx d-flex justify-content-start flex-wrap">
                        <div v-for="image,index in report.assets" :key="index.id" class="p-1">
                            <img style="max-height: 120px; max-width: 120px;" :src="image.media_url" alt="">
                        </div>

                    </div>
                    <span class="float-right">2 days ago</span>
                </div>
            </div>


            <h4 class="py-3">New Report.</h4>

                  <div  class="col-md-12 ">

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
                        <option value="Foundation">Foundation</option>
                        <option value="Slab">Slab</option>
                        <option value="Interior Design">Interior Design</option>
        
                    </select>
                </div>

            </div>
            <div class="col-md-6">

                <div class="form-group">
                  <label for="">Percentage Completion</label>
                  <select v-model="percent" name="" id="" class="form-control">
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="60">60</option>
                      <option value="80">80</option>
                      <option value="100">100</option>
                  </select>
                </div>
                
            </div>
          </div>




          <div class="form-group py-3">
              <button @click="submitReport()" class="btn btn-success float-right">Update</button>
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
            media: [],
            reports: [],
            description: '',
            issues: '',
            stage: '',
            percent: ''
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

            alert(total_file)

             for(var i=0; i<total_file; i++)
            {
                alert(event.target.files[i].type)



                if (event.target.files[i].type.includes('video')) {

                    document.getElementById("previewImg").insertAdjacentHTML("afterend", "<div class=' p-2'><video class='border border-primary' style='width: 200px; height: 200px; object-fit: cover;' src='"+URL.createObjectURL(event.target.files[i])+"' controls></video></div>");
                    
                } else {

                    document.getElementById("previewImg").insertAdjacentHTML("afterend", "<div class=' p-2'><img class='border border-primary' style='width: 200px; height: 200px; object-fit: cover;' src='"+URL.createObjectURL(event.target.files[i])+"'></div>");
                    
                }

                
                
            }


        },

        submitReport(){

            // console.log(this.$route.params.id);

            let formData = new FormData();

            var mediax = this.$refs.file.files;

            for (let index = 0; index < mediax.length; index++) {

                formData.append('assets[]',this.$refs.file.files[index]);
                
            }


            formData.append('building_project_id', this.$route.params.id)

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



                // this.profileData = response.data


                console.log(response)
            })
            .catch((response)=>{

                console.log(response)
            })

        },

        getReports(){

            this.axios({
                url: process.env.VUE_APP_URL+'/api/progress_report',
                method: 'get',

                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' +localStorage.getItem('user_token')
                },

            })
            .then((response)=>{



                this.reports = response.data


                console.log(response)
            })
            .catch((response)=>{

                console.log(response)
            })
            
        }

        
    },

    mounted() {

        this.getReports()
    },
}
</script>