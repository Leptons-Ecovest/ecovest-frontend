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

        <div class="d-flex justify-content-start py-3">
            <div class="form-group col-md-10">
                <input type="text" class="form-control" v-model="key"
                    placeholder="Search email, fullname, project name ...">
            </div>
            <div class="">
                <button @click=getPaymentPlans() class="btn btn-primary">search</button>
            </div>
        </div>
        <div class="container">
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="sort" @click="filterPaymentPlans()"
                    name="inlineRadioOptions" id="inlineRadio1" :value="'az'">
                <label class="form-check-label" for="inlineRadio1">Sort A - Z</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="sort" @click="filterPaymentPlans()"
                    name="inlineRadioOptions" id="inlineRadio2" :value="'za'">
                <label class="form-check-label" for="inlineRadio2">Sort Z - A</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="sort" @click="filterPaymentPlans()"
                    name="inlineRadioOptions" id="inlineRadio2" :value="'latest'">
                <label class="form-check-label" for="inlineRadio2">Latest</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="sort" @click="filterPaymentPlans()"
                    name="inlineRadioOptions" id="inlineRadio2" :value="'latest'">
                <label class="form-check-label" for="inlineRadio2">Oldest</label>
            </div>
        </div>

        <div style="height: 540px; overflow: scroll;" class="container table-responsive">
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
                    <tr v-for="user_plan, index in payment_plans" :key="user_plan.index">
                        <td>{{ index + 1 }}</td>
                        <td>
                            <img style="width: 54px; height: 54px; border-radius: 50%;"
                                :src="getImgUrl(user_plan?.user?.avatar)" alt="">
                        </td>
                        <td>{{ user_plan?.user?.name }}</td>
                        <td>{{ user_plan?.user?.email }}</td>
                        <td>{{ user_plan?.building_project?.title }}</td>
                        <td>
                            <button @click="loadPaymentSchedule(user_plan.id)" type="button" class="btn btn-primary"
                                data-toggle="modal" data-target="#exampleModal">
                                Details
                            </button>
                            <router-link class="ml-2 btn btn-secondary"
                                :to="{ name: 'update-progress', params: { id: user_plan.id } }">Update</router-link>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- Button trigger modal -->


            <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
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
                                <div class="col-md-6 mx-auto py-5">
                                    <div class="form-group">
                                        <label for="">Percent</label>
                                        <input type="number" v-model="percentage" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label for="">Status</label>
                                        <select class="form-control" v-model="status" id="">
                                            <option :value="'Active'">Active</option>
                                            <option :value="'On Going'">On Going</option>
                                            <option :value="'Due'">Due</option>
                                            <option :value="'Revoked'">Revoked</option>
                                            <option :value="'Completed'">Completed</option>

                                        </select>
                                    </div>
                                    <div class="pb-3">
                                        <button @click="updatePlan()"
                                            class="btn btn-primary float-right">submit</button>
                                    </div>
                                </div>

                                <div class="accordion" id="accordionExample">

                                    <div class="card">
                                        <div class="card-header" id="headingOne">
                                            <h2 class="mb-0">
                                                <button class="btn btn-link btn-block text-left" type="button"
                                                    data-toggle="collapse" data-target="#collapseOne"
                                                    aria-expanded="true" aria-controls="collapseOne">
                                                    Collapsible Group Item #1
                                                </button>
                                            </h2>
                                        </div>

                                        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne"
                                            data-parent="#accordionExample">
                                            <div class="card-body">
                                                Some placeholder content for the first accordion panel. This panel is
                                                shown by default, thanks to the <code>.show</code> class.
                                            </div>
                                        </div>
                                    </div>

                                </div>

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
                                        <tr v-for="payment_schedule in user_payment_schedules"
                                            :key="payment_schedule.index">



                                            <td>#</td>

                                            <td style="max-width: 70px;">

                                                {{ payment_schedule.bboundary_date }}

                                            </td>
                                            <td style="max-width: 70px;"> ₦ {{ payment_schedule.amount }}</td>
                                            <td>
                                                <div class="accordion" id="accordionExample">

                                                    <div class="card">
                                                        <div class="card-header" id="headingOne">
                                                            <div class="mb-0">
                                                                <button class="btn btn-link btn-block text-left"
                                                                    type="button" data-toggle="collapse"
                                                                    :data-target="'#collapseOn' + payment_schedule.id"
                                                                    aria-expanded="true" aria-controls="collapseOne">
                                                                    <input :id="payment_schedule.id" type="number"
                                                                        class="form-control"
                                                                        :max="payment_schedule.amount"
                                                                        :value="payment_schedule.amount_remitted"
                                                                        disabled> edit

                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div :id="'collapseOn' + payment_schedule.id" class="collapse "
                                                            aria-labelledby="headingOne"
                                                            data-parent="#accordionExample">
                                                            <div class="card-body">
                                                                <input :id="'field' + payment_schedule.id" type="number"
                                                                    class="form-control" :max="payment_schedule.amount"
                                                                    :value="payment_schedule.amount_remitted"><br>
                                                                <label for="receipt">Upload Receipt</label>
                                                                <input type="file" @change="previewFile4" ref="file">
                                                                <button :id="'btn' + payment_schedule.id"
                                                                    @click="updatePaymentPlan(payment_schedule.id, 'field' + payment_schedule.id, 'btn' + payment_schedule.id)"
                                                                    class="btn btn-primary float-right mb-2">update</button>

                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </td>
                                            <td><span class="badge badge-primary">{{ payment_schedule.status }}</span>
                                            </td>
                                            <td class="d-none">



                                                <button :id="'btn' + payment_schedule.id"
                                                    @click="updatePaymentPlan(payment_schedule.id, this.id)"
                                                    class="btn btn-primary">update</button>


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
            loading: false,
            selected_id: '',
            key: ' ',
            sort: 'az',
            status: '',
            percentage: '',

            receipt: ''

        }
    },

    // add to component
    components: {

    },

    methods: {

        loadPaymentSchedule(index) {



            this.selected_id = index
            this.plan =
                this.payment_plans.filter(element =>
                    (element.id == index))

            this.plan = this.plan[0]

            this.user_payment_schedules = this.plan.stages

            console.log(this.user_payment_schedules)
        },

        getImgUrl(url) {
            return url;
        },

        getPaymentPlans() {

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
                url: process.env.VUE_APP_URL + '/api/payment_plans',
                
                method: 'get',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('user_token')
                },

            })
                .then((response) => {

                    this.payment_plans = response.data

                    loader.hide()

                    console.log(response)
                })
                .catch((response) => {

                    loader.hide()

                    console.log(response)
                })


        },

        filterPaymentPlans() {

            alert('filtered');

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
                url: process.env.VUE_APP_URL + '/api/payment_plans',
                params: {
                    key: this.key,
                    sort: this.sort
                },
                method: 'get',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('user_token')
                },

            })
                .then((response) => {

                    this.payment_plans = response.data

                    loader.hide()

                    console.log(response)
                })
                .catch((response) => {

                    loader.hide()

                    console.log(response)
                })


        },

        previewFile4(event) {


            console.log(event)

            if (event.target.files.length > 0) {
                // var src = URL.createObjectURL(event.target.files[0]);

                // var preview = document.getElementById("previewImg2");
                // preview.src = src;

                // preview.style.display = "block";

                this.receipt = event.target.files[0];

                console.log(this.receipt)


            }

        },

        updatePaymentPlan(id, payment_schedule_id, btn) {

            // alert(payment_schedule_id)

            var bbtn = document.getElementById(btn);

            bbtn.innerHTML = 'updating...';
            bbtn.disabled


            var payment_amount = document.getElementById(payment_schedule_id).value

            // alert(payment_amount)



            let formData = new FormData();

            formData.append('payment_schedule_id', id)
            formData.append('payment_amount', payment_amount)
            formData.append('receipt', this.receipt)




            this.axios({
                url: process.env.VUE_APP_URL + '/api/update_payment_plan',
                method: 'post',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('user_token')
                },
                data: formData
            })
                .then((response) => {

                    console.log(response)

                    bbtn.innerHTML = 'update';
                    bbtn.disabled

                    toast.success('Plan Updated');

                    this.getPaymentPlans()


                })
                .catch((response) => {
                    console.log(response)
                })

        },

        updatePlan() {

            // alert(this.selected_id)
            // alert(this.status)
            // alert(this.percentage)

            this.axios({
                url: process.env.VUE_APP_URL + '/api/update_plan',
                method: 'post',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('user_token')
                },
                data: {
                    payment_plan_id: this.selected_id,
                    status: this.status,
                    percentage: this.percentage
                }
            })
                .then((response) => {
                    this.loading = false
                    console.log(response)

                    toast.success('Plan Updated');

                    this.getPaymentPlans()


                })
                .catch((response) => {
                    console.log(response)
                })
        }
    },

    mounted() {
        this.getPaymentPlans()
    },
}
</script>