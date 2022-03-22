<template>
   <div class="nk-content-body">
        <div class="nk-content-wrap">
            <div class="nk-block-head nk-block-head-lg">
                <div class="nk-block-between-md g-4">
                    <div class="nk-block-head-content">
                        <h2 class="nk-block-title fw-normal">Messages</h2>


                       
                    </div>
                </div>
            </div><!-- .nk-block-head -->
         
        </div>
        <!-- footer @s -->

        <div class="container">

            <div class="list-group">
              
                <a v-for="notification,key in notifications" :key="key" class="list-group-item list-group-item-action mb-1">
                    <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{{notification.tite}}</h5>
                    
                    </div>
                    <p class="mb-1">{{notification.message}}</p>
                    <small class="text-muted">{{notification.created_at}}</small>
                </a>
                
            </div>


        </div>
      
        <!-- footer @e -->
    </div>
</template>
<script>

export default {

    data() {
        return {
            notifications: []
        }
    },

    methods: {
        getNotifications(){
            this.axios({
                url: process.env.VUE_APP_URL +'/api/notifications',
                method: 'get',
                headers:{
                    'Authorization': 'Bearer ' +localStorage.getItem('user_token')
                }
            })
            .then((response) =>{

                this.notifications = response.data

                console.log(response)

            })
            .catch((response) =>{

                console.log(response)

            })
        }
    },
    

    mounted() {
        // alert('im here')

        this.getNotifications()
    },


}
</script>