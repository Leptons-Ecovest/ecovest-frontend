<template>
   <div class="nk-content-body">
        <div class="nk-content-wrap">
            <div class="nk-block-head nk-block-head-lg">
                <div class="nk-block-between-md g-4">
                    <div class="nk-block-head-content">
                        <h2 class="nk-block-title fw-normal">Welcome, {{user_data.name}} </h2>
                        <div class="nk-block-des">
                            <p>Welcome to our dashboard. Manage your account and your subscriptions.</p>
                        </div>
                    </div>
                </div>
            </div><!-- .nk-block-head -->
         
            <div class="nk-block">
                <div class="card card-bordered">
                    <div class="card-inner card-inner-md">
                        <div class="card-title-group">
                            <h6 class="card-title">Payment History</h6>
                            <div class="card-action">
                                <a href="html/subscription/payments.html" class="link link-sm">See All <em class="icon ni ni-chevron-right"></em></a>
                            </div>
                        </div>
                    </div>
                    <table class="table table-tranx">
                        <thead>
                            <tr class="tb-tnx-head">
                                <th class="tb-tnx-id"><span class="">#</span></th>
                                <th class="tb-tnx-info">
                                    <span class="tb-tnx-desc d-none d-sm-inline-block">
                                        <span>Bill For</span>
                                    </span>
                                    <span class="tb-tnx-date d-md-inline-block d-none">
                                        <span class="d-md-none">Date</span>
                                        <span class="d-none d-md-block">
                                            <span>Issue Date</span>
                                            <span>Due Date</span>
                                        </span>
                                    </span>
                                </th>
                                <th class="tb-tnx-amount">
                                    <span class="tb-tnx-total">Total</span>
                                    <span class="tb-tnx-status d-none d-md-inline-block">Status</span>
                                </th>

                                </tr>
                        </thead>
                        <tbody>
                            <tr class="tb-tnx-item">
                                <td class="tb-tnx-id">
                                    <a href="#"><span>4947</span></a>
                                </td>
                                <td class="tb-tnx-info">
                                    <div class="tb-tnx-desc">
                                        <span class="title">Enterprize Year Subscrition</span>
                                    </div>
                                    <div class="tb-tnx-date">
                                        <span class="date">10-05-2019</span>
                                        <span class="date">10-13-2019</span>
                                    </div>
                                </td>
                                <td class="tb-tnx-amount">
                                    <div class="tb-tnx-total">
                                        <span class="amount">$599.00</span>
                                    </div>
                                    <div class="tb-tnx-status">
                                        <span class="badge badge-dot badge-warning">Due</span>
                                    </div>
                                </td>
                            </tr><!-- .tb-tnx-item -->
                            <tr class="tb-tnx-item">
                                <td class="tb-tnx-id">
                                    <a href="#"><span>4904</span></a>
                                </td>
                                <td class="tb-tnx-info">
                                    <div class="tb-tnx-desc">
                                        <span class="title">Maintenance Year Subscription</span>
                                    </div>
                                    <div class="tb-tnx-date">
                                        <span class="date">06-19-2019</span>
                                        <span class="date">06-26-2019</span>
                                    </div>
                                </td>
                                <td class="tb-tnx-amount">
                                    <div class="tb-tnx-total">
                                        <span class="amount">$99.00</span>
                                    </div>
                                    <div class="tb-tnx-status"><span class="badge badge-dot badge-success">Paid</span></div>
                                </td>
                            </tr><!-- .tb-tnx-item -->
                            <tr class="tb-tnx-item">
                                <td class="tb-tnx-id">
                                    <a href="#"><span>4829</span></a>
                                </td>
                                <td class="tb-tnx-info">
                                    <div class="tb-tnx-desc">
                                        <span class="title">Enterprize Year Subscrition</span>
                                    </div>
                                    <div class="tb-tnx-date">
                                        <span class="date">10-04-2018</span>
                                        <span class="date">10-12-2018</span>
                                    </div>
                                </td>
                                <td class="tb-tnx-amount">
                                    <div class="tb-tnx-total">
                                        <span class="amount">$599.00</span>
                                    </div>
                                    <div class="tb-tnx-status"><span class="badge badge-dot badge-success">Paid</span></div>
                                </td>
                            </tr><!-- .tb-tnx-item -->
                        </tbody>
                    </table>
                </div><!-- .card -->
            </div><!-- .nk-block -->
        </div>
        <!-- footer @s -->
      
        <!-- footer @e -->
    </div>
</template>
<script>
export default {
    data() {
        return {
            
            user_data: []
        }
    },

    methods: {
        getUserData(){
            this.user_data = JSON.parse(localStorage.getItem('user_data'));


            if(localStorage.getItem('user_role') == 'admin'){

                this.user = false
            }
        },
     
    },

    mounted() {
        this.getUserData()
    },
}
</script>

