<template>
    <div>
        <div hoverable class="container-card round-border">
            <div class="clearfix float-my-children">
                <img src="@/assets/candidate.png" class="candidate-image round-border" width=300>
                <div>
                    <h5 class="top-and-bottom-margin">{{candidate_name}}</h5>
                    <a-divider/>
                    <div class="form-clearfix form-container">
                        <div class="label-columns">
                            <div>Location</div>
                            <div>Age</div>
                            <div>Religion</div>
                            <div>Ethenicity</div>
                            <div>Hobby</div>
                            <div class="top-and-bottom-margin"><a-badge count="Shortlisted" :number-style="{ backgroundColor: '#79bbee' }" /></div>
                        </div>
                        <div class="value-columns">
                            <div>:{{location}}</div>
                            <div>:{{age}}</div>
                            <div>:{{religion}}</div>
                            <div>:{{ethenicity}}</div>
                            <div>:{{hobby}}</div>
                            <div class="top-and-bottom-margin"><a-badge count="Teamlisted" :number-style="{ backgroundColor: '#79bbee' }" /></div>
                        </div>
                        <br/>
                        <div><a-button><strong>View More Details</strong></a-button></div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
	name: "CandidateCard",
	props: [
        'candidate_name',
        'location',
        'age',
        'religion',
        'ethenicity',
        'hobby'
        ]
};
</script>


<style scoped>
.candidate-image{
    margin-right: 0px;
    margin-top: 0px;
    margin-bottom: 0px;
    margin-left: 20px;
}
.round-border{
    border-radius: 15px;
}
.container-card{
    margin: 10px;
    padding: 0px !important;
    padding: 15px;
    box-shadow: 0 0 5px 3px #d3d3d3 !important;
}
/* tell the container's children to float left: */
.float-my-children > * {
    float:left;
    margin:5px;
}


/* this is called a clearfix. it makes sure that the container's children floats are cleared, without using extra markup */
.clearfix {
    *zoom:1; /* for IE */
    padding: 0px !important;
}

.clearfix:before,
.clearfix:after {
    content: " ";
    display: table;
}

.clearfix:after {
    clear: both;
}


.form-container > *{
    float:left;
}

.form-clearfix {
    *zoom:1; /* for IE */
    padding: 0px !important;
}

.form-clearfix:before,
.form-clearfix:after {
    content: " ";
    display: table;
}

.form-clearfix:after {
    clear: both;
}

.top-and-bottom-margin{
    margin-top:20px;
    margin-bottom:20px;
}
</style>