<template>
   <div class="nk-content-body">
        <div class="nk-content-wrap">
            <div class="nk-block-head nk-block-head-lg">
                <div class="nk-block-between-md g-4">
                    <div class="nk-block-head-content">
                        <h2 class="nk-block-title fw-normal">Create Payment Plan</h2>
                       
                    </div>
                </div>
            </div><!-- .nk-block-head -->
         
        </div>

        <div class="container py-3">

            <div class="row">

                <div class="col-md-12">

                    <h6 class="text-center ">Step 2/2</h6>

                    

                    <div class="table-responsive pt-3"> 

                        <table class="table">
                            <thead>

                                <tr>

                                    <th>Stages</th>
                                    <th>Percentage</th>
                                    <th>Amount</th>
                                    <th>A Boundary</th>
                                    <th>B Boundary</th>
                                    <th></th>
                                    
                                    
                                </tr>

                            </thead>
                            <tbody>
                                <tr v-for="payment_stage in payment_stages" :key="payment_stage.id" >
                                    <td>
                                        {{payment_stage.stage}}
                                    </td>
                                    <td>
                                        <div class="form-group">
                                 
                                            <input  type="text" :id="'percent'+payment_stage.id" class="form-control" :value="payment_stage.percent">
                                        </div>
                                    </td>
                                    <td >
                                        
                                        <div style="width:120px;" class="form-group">
                                            
                                            <input type="text" :id="'amount'+payment_stage.id" class="form-control" :value="payment_stage.amount">
                                        </div>
    
                                    </td>
                                    <td>
    
                                        <div class="form-group">
                                
                                            <input :id="'aboundary'+payment_stage.id" type="date" class="form-control" :value="moment(payment_stage.aboundary_date).format('YYYY-MM-DD')">
                                        </div>
                                        
                                    </td>
                                    <td>
                                        <div class="form-group">
                                            
                                            <input :id="'bboundary'+payment_stage.id" type="date" class="form-control" :value="moment(payment_stage.bboundary_date).format('YYYY-MM-DD')">
                                        </div>
                                        
                                    </td>
                                    <td>
    
                                        <div  class="form-group">
                                          
                                            <button :id="'updateBtn'+payment_stage.id" @click="updateStages(
                                                payment_stage.id,
                                                'percent'+payment_stage.id,
                                                'amount'+payment_stage.id,
                                                'aboundary'+payment_stage.id,
                                                'bboundary'+payment_stage.id,
                                                'updateBtn'+payment_stage.id

                                            )" class="btn btn-primary">update</button>
                                        </div>
                                        
                                    </td>
                                </tr>

                            </tbody>

                        </table>


                        <div class="accordion" id="accordionExample">
                            <div class="card">
                                <div class="card-header" id="headingOne">
                                    <h2 class="mb-0">
                                        <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        <h6>Send Offer Contract</h6>
                                        </button>
                                    </h2>
                                </div>

                                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                    <div class="card-body col-md-6 mx-auto">

                                        <div class="form-group py-1">
                                            <div class="custom-file">
                                                <input @change="previewFile1" type="file"  class="custom-file-input" ref="brochure" aria-describedby="inputGroupFileAddon01">
                                                <label class="custom-file-label" for="inputGroupFile01">Upload Brochure</label>
                                            </div>
                                        </div>
                                        <div class="form-group py-1">
                                            <div class="custom-file">
                                                <input @change="previewFile2" type="file"  class="custom-file-input" ref="offer_letter" aria-describedby="inputGroupFileAddon01">
                                                <label class="custom-file-label" for="inputGroupFile01">Upload Offer Letter</label>
                                            </div>
                                        </div>
                                        <div class="form-group text-center">
                                            <button v-if="email_loading"  class="btn btn-primary btn-lg" disabled>Submiting...</button>
                                            <button v-else @click="uploadFiles()" class="btn btn-primary btn-lg">Submit</button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>




                </div>

                

           

                <div class="col-md-12 py-3 ">

                    
                        <div class="form-group">
                            <label for="">Number of stages</label>
                            <input v-model="no_stages" type="number" class="form-control">
                        </div>

                        <div class="form-group">
                            <label for="">Amount</label>
                            <input v-model="amount" type="number" class="form-control">
                        </div>

                        <div class="form-group">
                            <label for="">Start Date</label>
                            <input v-model="start_date" type="date" class="form-control">
                        </div>

                        <div class="form-group">
                            <label for="">Number of Months</label>
                            <input v-model="no_months" type="number" class="form-control">
                        </div>

                        <div class="form-group">
                            <button @click="createStages()" class="btn btn-primary">Submit</button>
                        </div>

                        

                    <!-- <div class="form-group">

                        <button @click="create_payment_plan()" class="btn btn-primary float-right">Submit</button>

                    </div> -->


                </div>

            </div>





        </div>

      
        <!-- footer @s -->
      
        <!-- footer @e -->
    </div>
</template>
<script>
import moment from "moment";
import { useToast } from 'vue-toastification'
const toast = useToast()

export default {
    data() {
        return {
            moment: moment,
            building_project_title: '',
            description: '',
            subscribers_email: '',
          
            user_data: [],
            building_projects: [],

            no_stages: '',
            amount: '',
            payment_plan_id: '',
            user_id: '',
            start_date: '',
            no_months: '',

            payment_stages: [],

            percents: [],

            brochure: '',
            offer_letter: '',
            user_email : '',

            email_loading: false


  
        }
    },
    methods: {

        previewFile1(event){

            alert('brochure')


            console.log(event)

               if(event.target.files.length > 0){
                // var src = URL.createObjectURL(event.target.files[0]);

                // document.getElementById("previewImg").classList.add('d-none')
                // document.getElementById("previewImg2").classList.remove('d-none')
                // var preview = document.getElementById("previewImg2");
                // preview.src = src;
               
                // preview.style.display = "block";

                 this.brochure = this.$refs.brochure.files[0];

               
            }

        },

        previewFile2(event){

            alert('offer letter')


            console.log(event)

               if(event.target.files.length > 0){
                // var src = URL.createObjectURL(event.target.files[0]);

                // document.getElementById("previewImg").classList.add('d-none')
                // document.getElementById("previewImg2").classList.remove('d-none')
                // var preview = document.getElementById("previewImg2");
                // preview.src = src;
               
                // preview.style.display = "block";

                 this.offer_letter = this.$refs.offer_letter.files[0];

               
            }

        },

        uploadFiles(){

            this.email_loading = true

            let formData = new FormData();

            formData.append('brochure', this.brochure);
            formData.append('offer_letter', this.offer_letter);
            formData.append('user_email', this.user_data.email);
            formData.append('payment_plans_id', this.$route.params.id)

            alert(this.$route.params.id)


            this.axios({
                url: process.env.VUE_APP_URL + '/api/send_letter',
                method: 'post',
                data: formData,
                headers: {
                    'Authorization': 'Bearer ' +localStorage.getItem('user_token'),
                     'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) =>{

                this.email_loading = false

                  toast.success('Uploads Successful');


                console.log(response)
            })
            .catch((response) =>{

                toast.error('Upload Error');

                console.log(response)
            })


        },
        formatDate(date){
            alert('jjk')
            return document.getElementById(date).value = "2014-02-09";
        },
        getUserData(){
            this.user_data = JSON.parse(localStorage.getItem('user_data'));

            this.user_email = this.user_data.email

           


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

        createStages(){


            this.axios({
                url: process.env.VUE_APP_URL+'/api/create_payment_stage',
                data:{
                    no_stages: this.no_stages,
                    amount: this.amount,
                    payment_plan_id: this.$route.params.id,
                    start_date: this.start_date, 
                    no_months: this.no_months, 
                },
                method: 'post',
                
            })
            .then((response)=>{

                console.log(response)

                this.paymentStages()

            })
            .catch((response)=>{

                console.log(response)

            });

        },

        paymentStages(){


            this.axios({
                url: process.env.VUE_APP_URL+'/api/payment_plan_stages',
                data:{
                    payment_plan_id: this.$route.params.id
                },
                method: 'post',
                
            })
            .then((response)=>{

                console.log(response)

                this.payment_stages =response.data


            })
            .catch((response)=>{

                console.log(response)

            });

        },

        updateStages(id, percent, amount, aboundary, bboundary, btnId){

            // alert(document.getElementById(percent).value)
            // alert(document.getElementById(amount).value)
            // alert(document.getElementById(aboundary).value)
            // alert(document.getElementById(bboundary).value)
            // alert(document.getElementById(btnId).innerHTML)

            document.getElementById(btnId).innerHTML='updating...'


            this.axios({
                url: process.env.VUE_APP_URL+'/api/update_payment_stage',
                method: 'post',
                data:{
                    id: id,
                    percent: document.getElementById(percent).value,
                    amount: document.getElementById(amount).value,
                    aboundary: document.getElementById(aboundary).value,
                    bboundary: document.getElementById(bboundary).value,
                    payment_plan_id: this.$route.params.id
                    
                }
                
            })
            .then((response)=>{

                this.paymentStages()

                document.getElementById(btnId).innerHTML='update'


                console.log(response)

                // console.log(response.data.building_projects)


            })
            .catch((response)=>{

                console.log(response)

            });


            console.log(document.getElementById('percent'))

        }
     
    },

    mounted() {

        // alert(moment().format())

        // alert(process.env.VUE_APP_URL+'/api/building_projects')
        this.getUserData()
        this.get_building_projects()

        this.paymentStages()
    },
}
</script>

