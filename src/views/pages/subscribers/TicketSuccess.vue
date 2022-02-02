<template>
   <div class="nk-content-body">
        <div class="nk-content-wrap">
            <div class="nk-block-head nk-block-head-lg">
                <div class="nk-block-between-md g-4">
                    <div class="nk-block-head-content">
                       
                          <router-link v-if="admin" to="/admin/add-project" class="btn btn-primary">Add Project</router-link>
                       
                    </div>
                </div>
            </div><!-- .nk-block-head -->
         
        </div>

        <div class="container">
 <h2 class=" text-center">Ticket Submitted Successfully</h2>
            
        <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_9n1h4nww.json"  background="transparent"  speed="1"  style="max-width: 400px; max-height: 400px; "  class="mx-auto text-center"   autoplay></lottie-player>


        </div>
        <!-- footer @s -->
      
        <!-- footer @e -->
    </div>
</template>
<script>
export default {
    

    mounted() {
        // alert('im here')
    },


}
</script>