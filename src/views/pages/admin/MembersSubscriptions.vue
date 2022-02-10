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

        <div class="container">
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
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- footer @s -->
      
        <!-- footer @e -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            payment_plans: []
        }
    },

    methods: {
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



            axios({
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

                this.payment_plans = response.data.payment_plans

                loader.hide()

                console.log(response)
            })
            .catch((response)=>{

                loader.hide

                console.log(response)
            })


        }
    },

    mounted() {
        this.getPaymentPlans()
    },
}
</script>