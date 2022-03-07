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
              <div class="row">
                  <div class="col-md-4 p-1">
                      <div style="height: 150px;" class="card border">
                          <div class="card-body">
                              <h6>Revenue</h6>
                              <h4 class="py-2">$ 0.00</h4>
                         <div class="c float-right">
                                  <button class="btn btn-outline-primary btn-sm">details</button>
                         </div>
                          </div>
                      </div>
                  </div>
                  <div class="col-md-4 p-1">
                      <div style="height: 150px;" class="card border">
                          <div class="card-body">
                              <h6>Projects</h6>
                              <h4 class="py-2">13</h4>
                                <div class="c float-right">
                                  <button class="btn btn-outline-primary btn-sm">details</button>
                         </div>
                          </div>
                      </div>
                  </div>
                  <div class="col-md-4 p-1">
                      <div style="height: 150px;" class="card border">
                          <div class="card-body">
                              <h6>Members</h6>
                              <h4 class="py-2 text-muted">15</h4>
                                <div class="c float-right">
                                  <button class="btn btn-outline-primary btn-sm">details</button>
                         </div>
                          </div>
                      </div>
                  </div>

                  <div class="col-md-4 p-1">
                      <div style="height: 150px;" class="card border">
                          <div class="card-body">
                              <h6>Tickets</h6>
                              <h4 class="py-2 text-muted">15/150</h4>
                              <span class="badge badge-primary">opened</span> /  <span class="badge badge-secondary">closed</span>
                            <div class="c float-right">
                                  <button class="btn btn-outline-primary btn-sm">details</button>
                         </div>
                          </div>
                      </div>
                  </div>
              </div>
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

