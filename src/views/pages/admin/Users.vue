<template>
    <div class="nk-content-body">

         <div class="nk-content-wrap">
            <div class="nk-block-head nk-block-head-lg">
                <div class="nk-block-between-md g-4">
                    <div class="nk-block-head-content">
                        <h2 class="nk-block-title fw-normal">All Members</h2>
                       
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
                        <th>Name</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id">
                        <td></td>
                        <td>
                            <img style="width: 50px; height: 50px; border-radius: 50%;" class="shadow" :src="getImgUrl(user.avatar)" alt="">


                        </td>
                        <td>{{user.name}}</td>
                        <td>{{user.email}}</td>
                        <td>
                            <button @click="viewUser(user.id)" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                           Details
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- Button trigger modal -->


<!-- Modal -->
                            <div class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">{{user_data.name}}</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary">Save changes</button>
                                </div>
                                </div>
                            </div>
                            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            users : [],

            user_data: []
        }
    },

    methods: {

        viewUser(index){

                    this.user_data = 
                    this.users.filter(element => 
                                        (element.id == index))

                    this.user_data = this.user_data[0]

                    console.log(this.user_data[0])

        },

        getImgUrl(url){
            return url;
        },
        getUsers(){

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
                url: process.env.VUE_APP_URL+'/api/users',
                method: 'get',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' +localStorage.getItem('user_token')
                },

            })
            .then((response)=>{

                loader.hide()
               

                console.log(response)

                this.users = response.data
            })
            .catch((response)=>{

                console.log(response)
            })

        }
    },

    mounted() {
        this.getUsers()
    },
}
</script>