<template>

<div class="nk-body bg-white npc-subscription has-aside ">
    <div class="nk-app-root">
        <!-- main @s -->
        <div class="nk-main ">
            <!-- wrap @s -->
            <div class="nk-wrap ">
                <div class="nk-header nk-header-fixed is-light">
                    <div class="container-lg wide-xl">
                        <div class="nk-header-wrap">
                            <div class="nk-header-brand">
                                <a  class="logo-link">
                                    <img class="logo-light logo-img" src="https://leptonsmulticoncept.com/wp-content/uploads/fbrfg/apple-touch-icon.png"  >
                                    <img class="logo-dark logo-img" src="https://leptonsmulticoncept.com/wp-content/uploads/fbrfg/apple-touch-icon.png"  >
                                    <span class="nio-version"></span>
                                </a>
                            </div><!-- .nk-header-brand -->
                            <div class="nk-header-tools">
                                <ul class="nk-quick-nav">
                                    <li class="dropdown user-dropdown">
                                        <a class="dropdown-toggle" data-toggle="dropdown">
                                            <div class="user-toggle">
                                                <div class="user-avatar sm">
                                                    <em class="icon ni ni-user-alt"></em>
                                                </div>
                                                <div class="user-name dropdown-indicator d-none d-sm-block">{{user_data.name}}</div>
                                            </div>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-md dropdown-menu-right dropdown-menu-s1">
                                            <div class="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
                                                <div class="user-card">
                                                    <div class="user-avatar">
                                                        <span>AB</span>
                                                    </div>
                                                    <div class="user-info">
                                                        <span class="lead-text">{{user_data.name}}</span>
                                                        <span class="sub-text">{{user_data.email}}</span>
                                                    </div>
                                                    <div class="user-action">
                                                        <a class="btn btn-icon mr-n2" href="html/subscription/profile-setting.html"><em class="icon ni ni-setting"></em></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="dropdown-inner">
                                                <ul class="link-list">
                                                    <li><a href="html/subscription/profile.html"><em class="icon ni ni-user-alt"></em><span>View Profile</span></a></li>
                                                    <li><a href="html/subscription/profile-setting.html"><em class="icon ni ni-setting-alt"></em><span>Account Setting</span></a></li>
                                                    
                                                </ul>
                                            </div>
                                            <div class="dropdown-inner">
                                                <ul class="link-list">
                                                    <li><a @click="logout()" ><em class="icon ni ni-signout"></em><span>Sign out</span></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li><!-- .dropdown -->
                                    <li class="dropdown notification-dropdown">
                                        <a href="#" class="dropdown-toggle nk-quick-nav-icon mr-lg-n1" data-toggle="dropdown">
                                            <div class="icon-status icon-status-info"><em class="icon ni ni-bell"></em></div>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-xl dropdown-menu-right dropdown-menu-s1">
                                            <div class="dropdown-head">
                                                <span class="sub-title nk-dropdown-title">Notifications</span>
                                                <a href="#">Mark All as Read</a>
                                            </div>
                                            <div class="dropdown-body">
                                                <div class="nk-notification">
                                                    <div class="nk-notification-item dropdown-inner">
                                                        <div class="nk-notification-icon">
                                                            <em class="icon icon-circle bg-warning-dim ni ni-curve-down-right"></em>
                                                        </div>
                                                        <div class="nk-notification-content">
                                                            <div class="nk-notification-text">You have requested to <span>Widthdrawl</span></div>
                                                            <div class="nk-notification-time">2 hrs ago</div>
                                                        </div>
                                                    </div>
                                                    <div class="nk-notification-item dropdown-inner">
                                                        <div class="nk-notification-icon">
                                                            <em class="icon icon-circle bg-success-dim ni ni-curve-down-left"></em>
                                                        </div>
                                                        <div class="nk-notification-content">
                                                            <div class="nk-notification-text">Your <span>Deposit Order</span> is placed</div>
                                                            <div class="nk-notification-time">2 hrs ago</div>
                                                        </div>
                                                    </div>
                                                    <div class="nk-notification-item dropdown-inner">
                                                        <div class="nk-notification-icon">
                                                            <em class="icon icon-circle bg-warning-dim ni ni-curve-down-right"></em>
                                                        </div>
                                                        <div class="nk-notification-content">
                                                            <div class="nk-notification-text">You have requested to <span>Widthdrawl</span></div>
                                                            <div class="nk-notification-time">2 hrs ago</div>
                                                        </div>
                                                    </div>
                                                    <div class="nk-notification-item dropdown-inner">
                                                        <div class="nk-notification-icon">
                                                            <em class="icon icon-circle bg-success-dim ni ni-curve-down-left"></em>
                                                        </div>
                                                        <div class="nk-notification-content">
                                                            <div class="nk-notification-text">Your <span>Deposit Order</span> is placed</div>
                                                            <div class="nk-notification-time">2 hrs ago</div>
                                                        </div>
                                                    </div>
                                                    <div class="nk-notification-item dropdown-inner">
                                                        <div class="nk-notification-icon">
                                                            <em class="icon icon-circle bg-warning-dim ni ni-curve-down-right"></em>
                                                        </div>
                                                        <div class="nk-notification-content">
                                                            <div class="nk-notification-text">You have requested to <span>Widthdrawl</span></div>
                                                            <div class="nk-notification-time">2 hrs ago</div>
                                                        </div>
                                                    </div>
                                                    <div class="nk-notification-item dropdown-inner">
                                                        <div class="nk-notification-icon">
                                                            <em class="icon icon-circle bg-success-dim ni ni-curve-down-left"></em>
                                                        </div>
                                                        <div class="nk-notification-content">
                                                            <div class="nk-notification-text">Your <span>Deposit Order</span> is placed</div>
                                                            <div class="nk-notification-time">2 hrs ago</div>
                                                        </div>
                                                    </div>
                                                </div><!-- .nk-notification -->
                                            </div><!-- .nk-dropdown-body -->
                                            <div class="dropdown-foot center">
                                                <a href="#">View All</a>
                                            </div>
                                        </div>
                                    </li><!-- .dropdown -->
                                    <li class="d-lg-none">
                                        <a  class="toggle nk-quick-nav-icon mr-n1" data-target="sideNav"><em class="icon ni ni-menu"></em></a>
                                    </li>
                                </ul><!-- .nk-quick-nav -->
                            </div><!-- .nk-header-tools -->
                        </div><!-- .nk-header-wrap -->
                    </div><!-- .container-fliud -->
                </div>
                <!-- main header @e -->
                <!-- content @s -->
                <div class="nk-content ">
                    <div class="container wide-xl">
                        <div class="nk-content-inner">
                            <div class="nk-aside" data-content="sideNav" data-toggle-overlay="true" data-toggle-screen="lg" data-toggle-body="true">
                                <div class="nk-sidebar-menu" data-simplebar>
                                    <!-- Menu -->
                                    <ul v-if="user" class="nk-menu">
                                        <li class="nk-menu-heading">
                                            <h6 class="overline-title">Menu</h6>
                                        </li>
                                        <li class="nk-menu-item">
                                            <router-link to="/user" class="nk-menu-link">
                                                <span class="nk-menu-icon"><em class="icon ni ni-dashboard"></em></span>
                                                <span class="nk-menu-text">Dashboard</span>
                                            </router-link>
                                        </li>
                                         <li class="nk-menu-item">
                                            <router-link to="/user/projects" class="nk-menu-link">
                                                <span class="nk-menu-icon"><em class="icon ni ni-file-text"></em></span>
                                                <span class="nk-menu-text">Leptons Projects</span>
                                            </router-link>
                                        </li>
                                        <li class="nk-menu-item">
                                            <router-link to="/user/my-projects" class="nk-menu-link">
                                                <span class="nk-menu-icon"><em class="icon ni ni-file-text"></em></span>
                                                <span class="nk-menu-text">My Projects</span>
                                            </router-link>
                                        </li>
                                        <li class="nk-menu-item">
                                            <router-link to="/user/payment-history" class="nk-menu-link">
                                                <span class="nk-menu-icon"><em class="icon ni ni-report-profit"></em></span>
                                                <span class="nk-menu-text">Payment History</span>
                                            </router-link>
                                        </li>
                                        <li class="nk-menu-item">
                                            <router-link to="/user/profile" class="nk-menu-link">
                                                <span class="nk-menu-icon"><em class="icon ni ni-users"></em></span>
                                                <span class="nk-menu-text">My Profile</span>
                                            </router-link>
                                        </li>
                                        <li class="nk-menu-item">
                                            <router-link to="/user/messages" class="nk-menu-link">
                                                <span class="nk-menu-icon"><em class="icon ni ni-download-cloud"></em></span>
                                                <span class="nk-menu-text">Messages</span>
                                            </router-link>
                                        </li>
                                        <li class="nk-menu-item">
                                            <router-link to="/user/support" class="nk-menu-link">
                                                <span class="nk-menu-icon"><em class="icon ni ni-account-setting"></em></span>
                                                <span class="nk-menu-text">Support</span>
                                            </router-link>
                                        </li>
                                      
                                        
                                    </ul>

                                    <ul v-else class="nk-menu">
                                        <li class="nk-menu-heading">
                                            <h6 class="overline-title">Menu</h6>
                                        </li>
                                        <li class="nk-menu-item">
                                            <router-link to="/admin" class="nk-menu-link">
                                                <span class="nk-menu-icon"><em class="icon ni ni-dashboard"></em></span>
                                                <span class="nk-menu-text">Dashboard</span>
                                            </router-link>
                                        </li>
                                        <li class="nk-menu-item">
                                            <router-link to="/admin/members" class="nk-menu-link">
                                                <span class="nk-menu-icon"><em class="icon ni ni-file-text"></em></span>
                                                <span class="nk-menu-text">Members</span>
                                            </router-link>
                                        </li>
                                        <li class="nk-menu-item">
                                            <router-link to="/admin/projects" class="nk-menu-link">
                                                <span class="nk-menu-icon"><em class="icon ni ni-report-profit"></em></span>
                                                <span class="nk-menu-text">Projects</span>
                                            </router-link>
                                        </li>
                                        <li class="nk-menu-item">
                                            <router-link to="/admin/messages" class="nk-menu-link">
                                                <span class="nk-menu-icon"><em class="icon ni ni-users"></em></span>
                                                <span class="nk-menu-text">Messages</span>
                                            </router-link>
                                        </li>
                                        <li class="nk-menu-item">
                                            <router-link to="/admin/members-subscriptions" class="nk-menu-link">
                                                <span class="nk-menu-icon"><em class="icon ni ni-download-cloud"></em></span>
                                                <span class="nk-menu-text">Subscriptions</span>
                                            </router-link>
                                        </li>
                                        <li class="nk-menu-item">
                                            <router-link to="/admin/support" class="nk-menu-link">
                                                <span class="nk-menu-icon"><em class="icon ni ni-account-setting"></em></span>
                                                <span class="nk-menu-text">Support</span>
                                            </router-link>
                                        </li>
                                      
                                        
                                    </ul>
                                    
                                    <!-- Menu -->
                                    <ul class="nk-menu nk-menu-sm d-none">
                                        <!-- Menu -->
                                        <li class="nk-menu-heading">
                                            <span>Help Center</span>
                                        </li>
                                        <li class="nk-menu-item">
                                            <a href="html/subscription/faqs.html" class="nk-menu-link">
                                                <span class="nk-menu-text">FAQs</span>
                                            </a>
                                        </li>
                                        <li class="nk-menu-item">
                                            <a href="html/subscription/contact.html" class="nk-menu-link">
                                                <span class="nk-menu-text">Contact</span>
                                            </a>
                                        </li>
                                        <li class="nk-menu-item">
                                            <a href="html/subscription/support.html" class="nk-menu-link">
                                                <span class="nk-menu-text">Support</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div><!-- .nk-sidebar-menu -->
                                <div class="nk-aside-close">
                                    <a  class="toggle" data-target="sideNav"><em class="icon ni ni-cross"></em></a>
                                </div><!-- .nk-aside-close -->
                            </div><!-- .nk-aside -->
                               
                                    <router-view></router-view>

                                    
                               
                        </div>
                    </div>
                </div>
                <!-- content @e -->
            </div>
            <!-- wrap @e -->
        </div>
        <!-- main @e -->
    </div>

</div>
  

</template>

<script>
export default {
    data() {
        return {
            user: true,
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
        logout(){

            alert('logging out')

            localStorage.setItem('user_role', '')
            localStorage.setItem('user_data', '')
            localStorage.setItem('access_token', '')

            this.$router.push('/login');

        }
    },

    mounted() {
        this.getUserData()
    },
}
</script>

