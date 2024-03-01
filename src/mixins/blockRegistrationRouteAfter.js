export default {
    created() {
        const user = JSON.parse(localStorage.getItem('user'));

    if ( user && user?.data_input_status > 4) {
        this.$router.push({ name: 'NotFound'});
    }
},
}