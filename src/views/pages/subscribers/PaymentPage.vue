<template>
   <div class="nk-content-body">
        <div class="nk-content-wrap">
            <div class="nk-block-head nk-block-head-lg">
                <div class="nk-block-between-md g-4">
                    <div class="nk-block-head-content">
                        <h2 class="nk-block-title fw-normal">Payment Page</h2>


                       
                    </div>
                </div>
            </div><!-- .nk-block-head -->
         
        </div>
        <!-- footer @s -->

        <div class="container">


            <div class="row">
                <div class="col-md-6">
                    <div class="card  border">
                        <div class="card-body">
                            <div class="d-flex justify-content-around py-3">
                                <div class="cs">

                                    <img style="height: 90px;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/GTBank_logo.svg/1200px-GTBank_logo.svg.png" alt="">

                                </div>

                                <div class="cs">

                                    <img style="height: 90px;" src="https://leptonsmulticoncept.com/wp-content/uploads/fbrfg/apple-touch-icon.png" alt="">

                                </div>
                            </div>
                            <h6 class="text-muted">Bank Name</h6>
                            <h6 class="font-weight-bold">Gt Bank</h6>
                            <h6 class="text-muted">Account Name</h6>
                            <h6 class="font-weight-bold">Leptons Multiconcept Limited</h6>
                            <h6 class="text-muted">Account Number</h6>
                            <h6 class="font-weight-bold">0286116021</h6>
                        </div>
                    </div>

                </div>
                <div class="col-md-6">
                    <h6 class="text-center">Upload Payment Proof</h6>
                            <lottie-player src="https://assets1.lottiefiles.com/temp/lf20_VdncQY.json"  background="transparent"  speed="1"  style="max-width: 200px; max-height: 200px; "  class="mx-auto text-center"   autoplay></lottie-player>
                                                 
                                                  <img 
                                                onclick="document.getElementById('customFile').click()" 
                                                id="previewImg2" 
                                                style="height: 189px; width: 189px; object-fit: cover;" 
                                                class="shadow border border-primary d-none " 
                                                src="https://assets1.lottiefiles.com/temp/lf20_VdncQY.json"
                                                 >

                                                 

                                                <div class="py-3">
                                                    <input @change="previewFile4" ref="file" class="form-control-input" type="file" id="customFile"  > 
                                                </div>


                                                <div class="c text-center py-2">
                                                    <router-link to="/user/upload-success" class="btn btn-primary">Submit</router-link>
                                                </div>

                    <div class="form-group d-none">
                        <div class="custom-file">
                            <input id="payment_proof" type="text" class="custom-file-input">
                            <label class="custom-file-label" for="payment_proof">Upload Payment</label>
                        </div>
                    </div>

                </div>
            </div>



        </div>
      
        <!-- footer @e -->
    </div>
</template>
<script>
export default {
    methods: {
                previewFile4(event){


            console.log(event)

               if(event.target.files.length > 0){
                var src = URL.createObjectURL(event.target.files[0]);

                document.getElementById("previewImg").classList.add('d-none')
                document.getElementById("previewImg2").classList.remove('d-none')
                var preview = document.getElementById("previewImg2");
                preview.src = src;
               
                // preview.style.display = "block";

                 this.avatar = this.$refs.file.files[0];

               
            }

        },
    },
}
</script>