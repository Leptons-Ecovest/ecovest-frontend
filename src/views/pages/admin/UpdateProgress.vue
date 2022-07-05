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
                    <h6>Project Title</h6>
                    <p>Description of work done</p>
                    <div class="media">
                        <p class="text-muted">media files...</p>
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
              <textarea name="description" class="form-control" placeholder="Description of progress of work" id="" cols="30" rows="5"></textarea>
          </div>
          <div class="form-group">
              <button @click="submitReport()" class="btn btn-success">Update</button>
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
            reports: []
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

            //    if(event.target.files.length > 0){
            //     var src = URL.createObjectURL(event.target.files[0]);

            //     document.getElementById("previewImg").classList.add('d-none')
            //     document.getElementById("previewImg2").classList.remove('d-none')
            //     var preview = document.getElementById("previewImg2");
            //     preview.src = src;
               
            //     // preview.style.display = "block";

            //      this.avatar = this.$refs.file.files[0];

               
            // }

        },

        submitReport(){

            let formData = new FormData();

            formData.append('assets[]', this.$refs.file.files)
            formData.append('payment_plan_id', this.$router.params.id)

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