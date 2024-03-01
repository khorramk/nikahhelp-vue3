import Vue from "vue";
import VueRouter from "vue-router";
// import DHome from "@/views/dashboard/DHome.vue";
// import AboutPage from "@/components/landing-page/about.vue";
// import HelpPage from "@/components/landing-page/help.vue";
// import PrivacyPolicy from "@/components/landing-page/privacy-policy.vue";
// import TermsAndConditionPage from "@/components/landing-page/terms-condition.vue";
// import SafetyAndGuidancePage from "@/components/landing-page/safety-guidance.vue";
// import UserAgreement from "@/components/landing-page/user-agreement.vue";
// import Signup from "@/views/auth/Signup.vue";
// import Login from "@/views/auth/Login.vue";
// import AdminLogin from "@/views/admin/AdminLogin.vue";
// import EmailVerification from "@/views/auth/EmailVerification.vue";
// import VerifyEmail from "@/views/auth/VerifyEmail.vue";
// import Success from "@/views/auth/Success.vue";
// import ForgetPassword from "@/views/auth/ForgetPassword.vue";
// import ResetPassword from "@/views/auth/ResetPassword.vue";

// import NotificationPage from "@/views/notification/NotificationPage.vue";
// import BlockList from "@/views/blocklist/BlockList.vue";
// import Support from "@/views/support/Index.vue";

//Shortlist Section
// import Shortlist from "@/views/shortlist/Shortlist.vue";
// import AllShortlist from "@/views/shortlist/AllShortlist.vue";
// import AllTeamShortlist from "@/views/shortlist/AllTeamShortlist.vue";

//Subscription Section
// import Subscription from "@/views/subscription/Subscription.vue";
// import SubscriptionPayment from "@/views/subscription/SubscriptionPayment.vue";
// import SubscriptionSuccess from "@/views/subscription/SubscriptionSuccess.vue";

//Manage Team Section
// import ManageTeam from "@/views/team/ManageTeam.vue";
// import CreateTeamPage2 from "@/views/team/CreateTeamPage2.vue";
// import CreateTeamPage3 from "@/views/team/CreateTeamPage3.vue";
// import CreateTeamPage4 from "@/views/team/CreateTeamPage4.vue";
// import CreateTeamPage5 from "@/views/team/CreateTeamPage5.vue";
// import JoinTeamPassword from "@/views/team/JoinTeamPassword.vue";

//Connections Section
// import Connections from "@/views/connections/Connections.vue";

//Profile Section
// import Profile from "@/views/profile/Profile.vue";
// import ProfileView from "@/views/profile/ProfileView.vue";

//Admin Section
// import AdminDashboard from "@/views/admin/AdminDashboard.vue";
// import AdminFlag from "@/views/admin/flag.vue";
// import AdminSystem from "@/views/admin/admin-system.vue";
// import AdminUsers from "@/views/admin/users.vue";
// import DocumentDetails from "@/views/admin/document-details.vue";
// import AdminTeams from "@/views/admin/teams.vue";
// import AdminSupport from "@/views/admin/support.vue";
// import AdminApproval from "@/views/admin/approval.vue";
// import SystemAdmin from "@/views/admin/system-admin.vue";
// import UsersList from "@/views/admin/user-list.vue";
// import DeletedUsersList from "@/views/admin/deleted-user-list.vue";
// import TeamList from "@/views/admin/team-list.vue";
// import DeletedTeamList from "@/views/admin/deleted-team-list.vue";
// import Test from "../components/development/Test.vue";
// import TestChat from "../components/development/Chat.vue";
// import ApproveUsers from "@/views/admin/approve-users.vue";
// import ApproveDocuments from "@/views/admin/approve-documents.vue";
// import UserCandidateDetails from "@/views/admin/user-candidate-profile.vue";

//Search Section
// import Search from "@/views/search/Search.vue";
// import AdvanceSearch from "@/views/search/AdvanceSearch.vue";
// import UnAuthSearch from "@/views/search/UnAuthSearch.vue";

// import Logout from "../components/logout/logout.vue";

// import Settings from "../views/settings/Settings.vue";

// import store from "../store";
// import Header from "../components/header/header.vue";

// import ChatWindow from "@/views/chat/ChatWindow.vue";


import { InitRoute, lazyLoadComponent, lazyLoadView, InitAdminRoute } from './guard/guard'
// import SupportTickets from "@/views/admin/SupportTickets";
// import Reporter from "@/views/admin/Reporter";
// import Ticket from "@/views/admin/Ticket";
// import TicketDetails from "@/views/admin/support/TicketDetails";
// import SendTicketMessage from "@/views/admin/support/SendTicketMessage";
// import TicketMessages from "@/views/admin/support/TicketMessages";

Vue.use(VueRouter);
const AppRouter = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
    routes: [
        {
            path: "/",
            name: "Home",
            component: lazyLoadView('auth', 'Home'),
            beforeEnter: InitRoute,

        },

        {
            path: "/candidate-registration",
            name: "CandidateRegistration",
            component: lazyLoadView('candidate-registration', 'CandidateRegistration'),
            beforeEnter: InitRoute,

        },
        {
            path: '/not-found',
            name: "NotFound",
            component: lazyLoadView('not-found', '404'),
            beforeEnter: InitRoute,
        },
        {
            path: "/candidate-short-registration",
            name: "CandidateShortRegistration",
            component: lazyLoadView('candidate-registration', 'Candidate-Short-registration'),
            beforeEnter: InitRoute,

        },

        {
            path: "/representative-registration",
            name: "RepresentativeRegistration",
            component: lazyLoadView('representative-registration', 'RepresentativeRegistration'),
            beforeEnter: InitRoute,

        },
        {
            path: "/edit_candidate",
            name: "EditCandidateRegistration",
            component: lazyLoadView('candidate-registration', 'EditCandidateRegistration'),
            beforeEnter: InitRoute,

        },
        {
            path: "/edit_representative",
            name: "EditRepresentativeRegistration",
            component: lazyLoadView('representative-registration', 'EditRepresentativeRegistration'),
            beforeEnter: InitRoute,

        },
        {
            path: "/search",
            name: "AdvanceSearch",
            component: lazyLoadView('search', 'AdvanceSearch'),
            beforeEnter: InitRoute,
        },
        {
            path: "/admin",
            name: "Admin",
            component: lazyLoadView('admin', 'admin-system'),
            beforeEnter: InitAdminRoute,
            children: [{
                path: "",
                // component: AdminDashboard,
                component: lazyLoadView('admin', 'AdminDashboard'),
                name: "Admin",

            },
            {
                path: "dashboard",
                // component: AdminDashboard,
                component: lazyLoadView('admin', 'AdminDashboard'),
                name: 'AdminDashboard'

            },
            {
                path: "users",
                // component: AdminUsers,
                component: lazyLoadView('admin', 'users'),
                name: 'AdminUsers'

            },
            {
                path: "teams",
                // component: AdminTeams,
                component: lazyLoadView('admin', 'teams'),

            },
            {
                path: "approval",
                // component: AdminApproval,
                component: lazyLoadView('admin', 'approval'),

            },
            {
                path: "support",
                    name: "support",
                    // component: SupportTickets,
                    component: lazyLoadView('admin', 'SupportTickets'),
            },
            {
                path: "ticket",
                name: "ticket",
                // component: Ticket,
                component: lazyLoadView('admin', 'Ticket'),
            },
                {
                    path: "ticket-details",
                    name: "ticketDetails",
                    // component: TicketDetails
                    component: lazyLoadView('admin/support', 'TicketDetails'),
                },
                {
                    path: "ticket-messages",
                    name: "ticketMessages",
                    // component: TicketMessages
                    component: lazyLoadView('admin/support', 'TicketMessages'),
                },
                {
                    path: "send-ticket-message/:id",
                    name: "sendTicketMessage",
                    // component: SendTicketMessage,
                    component: lazyLoadView('admin/support', 'SendTicketMessage'),
                    props: true
                },
            {
                path: "flag",
                // component: AdminFlag,
                component: lazyLoadView('admin', 'flag'),

            },
            {
                path: "system_admin",
                // component: SystemAdmin,
                component: lazyLoadView('admin', 'system-admin'),

            },
            {
                path: "system-notification",
                // component: SystemAdmin,
                component: lazyLoadView('admin', 'system-notification'),

            },
            {
                path: "matrimony-users",
                // component: UsersList,
                component: lazyLoadView('admin', 'user-list'),
                name: "Users"

            },
            {
                path: "deleted_users",
                // component: DeletedUsersList,
                component: lazyLoadView('admin', 'deleted-user-list'),

            },
            {
                path: "active_teams",
                // component: TeamList,
                component: lazyLoadView('admin', 'team-list'),

            },
            {
                path: "deleted_Teams",
                // component: DeletedTeamList,
                component: lazyLoadView('admin', 'deleted-team-list'),

            },
            {
                path: "approve_users",
                // component: ApproveUsers,
                component: lazyLoadView('admin', 'approve-users'),

            },
            {
                path: "approve_documents",
                // component: ApproveDocuments,
                component: lazyLoadView('admin', 'approve-documents'),

            },
            {
                path: "document_details/:user_id",
                // component: DocumentDetails,
                component: lazyLoadView('admin', 'document-details'),

            },
            {
                path: "user_candidate_details/:user_id",
                // component: UserCandidateDetails,
                component: lazyLoadView('admin', 'user-candidate-profile')

            },
            ],
        },
        {
            path: "",
            name: 'root',
            component: lazyLoadComponent('system', 'matrimony-system'),
            redirect: '/manageteam',
            beforeEnter: InitRoute,
            children: [

                {
                    path: "/dashboard",
                    name: "DHome",
                    // component: DHome,
                    component: lazyLoadView('dashboard', 'DHome'),
                },

                {
                    path: "/jointeampassword",
                    name: "Join Team Password",
                    // component: JoinTeamPassword,
                    component: lazyLoadView('team', 'JoinTeamPassword'),
                },

                // {
                //     path: "/ui",
                //     name: "UI",
                //     component: Test,
                // },
                // {
                //     path: "/ui-chat",
                //     name: "UI-Chat",
                //     component: TestChat,

                // },
                {
                    path: "/chat-window",
                    name: "ChatWindow",
                    // component: ChatWindow,
                    component: lazyLoadView('chat', 'ChatWindow'),

                },
                {
                    path: "/support",
                    name: "Support",
                    // component: Support,
                    component: lazyLoadView('support', 'IndexNew'),

                },
                {
                    path: "/shortlist",
                    name: "Shortlist",
                    // component: Shortlist,
                    component: lazyLoadView('shortlist', 'Shortlist'),

                },
                {
                    path: "/shortlist/all",
                    name: "AllShortlist",
                    // component: AllShortlist,
                    component: lazyLoadView('shortlist', 'AllShortlist'),
                },
                {
                    path: "/shortlist/all/team",
                    name: "AllTeamShortlist",
                    // component: AllTeamShortlist,
                    component: lazyLoadView('shortlist', 'AllTeamShortlist'),

                },
                {
                    path: "/notifications",
                    name: "NotificationPage",
                    // component: NotificationPage,
                    component: lazyLoadView('notification', 'NotificationPage'),

                },
                {
                    path: "/blocklist",
                    name: "BlockList",
                    // component: BlockList,
                    component: lazyLoadView('blocklist', 'BlockList'),

                },
                {
                    path: "/manageteam",
                    name: "ManageTeam",
                    // component: ManageTeam,
                    component: lazyLoadView('team', 'ManageTeam'),
                    meta: {
                        requiresAuth: true,
                    },
                },
                {
                    path: "/subscription",
                    name: "Subscription",
                    // component: Subscription,
                    component: lazyLoadView('subscription', 'Subscription'),

                },
                {
                    path: "/subscription/:id?",
                    name: "SubscriptionTeam",
                    // component: Subscription,
                    component: lazyLoadView('subscription', 'Subscription'),

                },
                {
                    path: "/subscription/payment/:team/:id/:subId",
                    name: "SubscriptionPayment",
                    // component: SubscriptionPayment,
                    component: lazyLoadView('subscription', 'SubscriptionPayment'),

                },
                {
                    path: "/subscription/complete/success/:subName/:team",
                    name: "SubscriptionSuccess",
                    // component: SubscriptionSuccess,
                    component: lazyLoadView('subscription', 'SubscriptionSuccess'),

                },
                {
                    path: "/manageteam",
                    name: "ManageTeam",
                    // component: ManageTeam,
                    component: lazyLoadView('team', 'ManageTeam'),

                },

                {
                    path: "/create-team-2",
                    name: "CreateTeamPage2",
                    // component: CreateTeamPage2,
                    component: lazyLoadView('team', 'CreateTeamPage2'),

                },
                {
                    path: "/create-team-3",
                    name: "CreateTeamPage3",
                    // component: CreateTeamPage3,
                    component: lazyLoadView('team', 'CreateTeamPage3'),

                },
                {
                    path: "/create-team-4",
                    name: "CreateTeamPage4",
                    // component: CreateTeamPage4,
                    component: lazyLoadView('team', 'CreateTeamPage4'),

                },
                {
                    path: "/create-team-5/:team_id?",
                    name: "CreateTeamPage5",
                    // component: CreateTeamPage5,
                    component: lazyLoadView('team', 'CreateTeamPage5'),

                },
                {
                    path: "/connections",
                    name: "Connections",
                    // component: Connections,
                    component: lazyLoadView('connections', 'Connections'),

                },
                {
                    path: "/profile",
                    name: "Profile",
                    // component: Profile,
                    component: lazyLoadView('profile', 'Profile'),

                },
                {
                    path: "/user/profile/:id",
                    name: "ProfileView",
                    // component: ProfileView,
                    component: lazyLoadView('profile', 'ProfileView'),

                },

                // {
                //     path: "/search",
                //     name: "Search",
                //     component: Search,

                // },
                {
                    path: "/settings",
                    name: "Settings",
                    // component: Settings,
                    component: lazyLoadView('settings', 'Settings'),

                },

            ]
        },
        {
            path: "/visitor/search/:search",
            name: "UnAuthSearch",
            // component: UnAuthSearch,
            component: lazyLoadView('search', 'UnAuthSearch'),
            props: true,

        },
        {
            path: "/signup",
            name: "Signup",
            component: lazyLoadView('auth', 'Signup'),
            beforeEnter: InitRoute,
        },

        {
            path: "/login",
            name: "Login",
            component: lazyLoadView('auth', 'Login'),
            beforeEnter: InitRoute,
        },
        {
            path: "/admin/login",
            name: "AdminLogin",
            component: lazyLoadView('admin', 'AdminLogin'),
            beforeEnter: InitAdminRoute,
        },

        {
            path: "/email-verification",
            name: "EmailVerification",
            // component: EmailVerification,
            component: lazyLoadView('auth', 'EmailVerification'),
        },

        {
            path: "/email-verification-success",
            name: "Success",
            // component: Success,
            component: lazyLoadView('auth', 'Success'),

        },
        {
            path: "/emailVerify/:token",
            name: "VerifyEmail",
            // component: VerifyEmail,
            component: lazyLoadView('auth', 'VerifyEmail'),
            beforeEnter: InitRoute,

        },
        {
            path: "/forgot-password",
            name: "ForgetPassword",
            // component: ForgetPassword,
            component: lazyLoadView('auth', 'ForgetPassword'),
            beforeEnter: InitRoute,
        },
        {
            path: "/password-reset-token-verification/:token",
            name: "ResetPassword",
            // component: ResetPassword,
            component: lazyLoadView('auth', 'ResetPassword'),
        },

        {
            path: "/about",
            name: "About",
            // component: AboutPage,
            component: lazyLoadComponent('landing-page', 'about'),

        },
        {
            path: "/help",
            name: "Help",
            // component: HelpPage,
            component: lazyLoadComponent('landing-page', 'help')

        },
        {
            path: "/safety_guidance",
            name: "Safety_Guidance",
            // component: SafetyAndGuidancePage,
            component: lazyLoadComponent('landing-page', 'safety-guidance'),

        },
        {
            path: "/terms_condition",
            name: "Terms_Condition",
            // component: TermsAndConditionPage,
            component: lazyLoadComponent('landing-page', 'terms-condition'),

        },
        {
            path: "/privacy-cookie-policy",
            name: "PrivacyPolicy",
            // component: PrivacyPolicy,
            component: lazyLoadComponent('landing-page', 'privacy-policy'),
        },
        {
            path: "/user-agreement",
            name: "UserAgreement",
            // component: UserAgreement,
            component: lazyLoadComponent('landing-page', 'user-agreement'),
        },
    ]
});


export default AppRouter;
window.AppRouter = AppRouter;