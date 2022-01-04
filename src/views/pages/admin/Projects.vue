<template>
   <div class="nk-content-body">
        <div class="nk-content-wrap">
            <div class="nk-block-head nk-block-head-lg">
                <div class="nk-block-between-md g-4">
                    <div class="nk-block-head-content">
                        <h2 class="nk-block-title fw-normal">Leptons Projects</h2>

                        <router-link v-if="admin" to="/admin/add-project" class="btn btn-primary">Add Project</router-link>
                       
                    </div>
                </div>
            </div><!-- .nk-block-head -->
         
        </div>
        <!-- footer @s -->
      
        <!-- footer @e -->
    </div>
</template>
<script>
export default {
    data() {
        return {
            user: true,
            admin: false,
            user_data: [],
       
        }
    },

    methods: {
        getUserData(){
            this.user_data = JSON.parse(localStorage.getItem('user_data'));


            if(localStorage.getItem('user_role') == 'admin'){

                this.user = false
                this.admin = true
            }
        },
        get_building_projects(){

            this.axios({
                url: process.env.VUE_APP_URL+'/api/building_projects',
                method: 'GET',
                
            })
            .then((response)=>{

                console.log(response.data)

            })
            .catch((response)=>{

                console.log(response)

            });

        }
     
    },

    mounted() {
        this.getUserData()
        this.get_building_projects()
    },
}
</script>

