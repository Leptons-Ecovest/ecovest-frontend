<template>
   <div class="nk-content-body">
        <div class="nk-content-wrap">
            <div class="nk-block-head nk-block-head-lg">
                <div class="nk-block-between-md g-4">
                    <div class="nk-block-head-content">
                        <h2 class="nk-block-title fw-normal">Members Subscriptions</h2>

                     
                       
                    </div>
                </div>
            </div><!-- .nk-block-head -->
         
        </div>

        <div class="container table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th></th>
                        <th>Fullname</th>
                        <th>Email</th>
                        <th>Project</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user_plan in payment_plans" :key="user_plan.index">
                        <td></td>
                        <td>
                            <img style="width: 54px; height: 54px; border-radius: 50%;" :src="getImgUrl(user_plan.user.avatar)" alt="">
                        </td>
                        <td>{{user_plan.user.name}}</td>
                        <td>{{user_plan.user.email}}</td>
                        <td>{{user_plan.building_project.title}}</td>
                        <td>
                            <button @click="loadPaymentSchedule(user_plan.id)" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                                Details
                            </button>
                            <router-link class="ml-2 btn btn-secondary" :to="{name: 'update-progress',params:{id:user_plan.id}}">Update</router-link>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- Button trigger modal -->


<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Name: </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div style="min-height: 230px;" class="modal-body table-responsive">
          <div class="">
            <table class="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Due Date</th>
                        <th>Expected Amount</th>
                        <th>Amount Paid</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="payment_schedule in user_payment_schedules" :key="payment_schedule.index">
                        <td>#</td>
                        <td>{{payment_schedule.payment_due_date}}</td>
                        <td>{{payment_schedule.expected_amount}} Million</td>
                        <td>
                            <input :id="payment_schedule.id" type="number" class="form-control" :value="payment_schedule.amount_paid">
                        </td>
                        <td>{{payment_schedule.status}}</td>
                        <td>

                            <button v-if="loading"  class="btn btn-primary" disabled>updating...</button>

                            <button v-else @click="updatePaymentPlan(payment_schedule.id)" class="btn btn-primary">update</button>

                      
                            <!-- <router-link target="_blank" :to="{name: 'update-payment-plan', params:{id: payment_schedule.id}}" class="btn btn-primary">update payment</router-link> -->
                        </td>
                    </tr>
                </tbody>
            </table>
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
import { useToast } from 'vue-toastification'

const toast = useToast()
export default {
    data() {
        return {
            payment_plans: [],
            user_payment_schedules: [],
            plan: null,
            loading: false
        }
    },

    methods: {

        loadPaymentSchedule(index){

            // alert(index)
                       this.plan = 
                    this.payment_plans.filter(element => 
                                        (element.id == index))

                    this.plan = this.plan[0]

                    this.user_payment_schedules = this.plan.payment_schedules

                    console.log(this.user_payment_schedules)
        },

        getImgUrl(url){
            return url;
        },
        getPaymentPlans(){

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
                url: process.env.VUE_APP_URL+'/api/payment_plans',
                method: 'get',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' +localStorage.getItem('user_token')
                },

            })
            .then((response)=>{

                this.payment_plans = response.data

                loader.hide()

                console.log(response)
            })
            .catch((response)=>{

                loader.hide()

                console.log(response)
            })


        },

        updatePaymentPlan(payment_schedule_id){

            this.loading = true
            var payment_amount = document.getElementById(payment_schedule_id).value

            // alert(payment_amount)


            this.axios({
                url: process.env.VUE_APP_URL + '/api/update_payment_plan',
                method: 'post',
                headers:{
                    'Authorization': 'Bearer '+localStorage.getItem('user_token')
                },
                data:{
                    payment_schedule_id: payment_schedule_id,
                    payment_amount: payment_amount
                }
            })
            .then((response) =>{
                this.loading = false
                console.log(response)

                 toast.success('Plan Updated');

                this.getPaymentPlans()


            })
            .catch((response) =>{
                console.log(response)
            })

        }
    },

    mounted() {
        this.getPaymentPlans()
    },
}
</script>