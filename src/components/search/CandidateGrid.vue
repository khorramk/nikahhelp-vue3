<template>
	<!-- Card -->
	<div class="card shadow-default" id="cardResponsive">
		<div class="row no-gutters p-1">
			<div class="col-md-6 col-sm-6 col-6" id="flex-container">
				<img
					:src="candidate.image ? candidate.image : avatarSrc"
					alt=""
					class="card-img"
					id="card-image"
				/>
			</div>
			<div class="col-md-6 col-sm-6 col-6" id="flex-container-list">
				<div class="card-body py-2 d-flex flex-column h-full justify-content-between">
					<div>
						<h5 class="card-title">{{ candidate.candidate.name }}</h5>
						<hr />
						<ul class="desc-list">
							<!-- Location -->
							<li class="flex-between-start">
								<span class="flex-30 label-text">Location</span>
								<span class="flex-70">:
									<span class="ml-1">{{ candidate.candidate.location_name }}
									</span>
								</span>
							</li>
							<!-- Age -->
							<li class="flex-between-start">
								<span class="flex-30 label-text">Age</span>
								<span class="flex-70">:
									<span class="ml-1">{{ candidate.candidate.age }} </span>
								</span>
							</li>
							
							<!-- Religion -->
							<li class="flex-between-start">
								<span class="flex-30 label-text">Religion</span>
								<span class="flex-70">:
									<span class="ml-1">{{ candidate.candidate.religion }}</span>
								</span>
							</li>
							<template v-if="onceMore">
								<li class="flex-between-start">
									<span class="flex-30 label-text">Ethnicity</span>
									<span class="flex-70">:
										<span class="ml-1">{{ candidate.candidate.ethnicity }} </span>
									</span>
								</li>
								<li class="flex-between-start">
									<span class="flex-30 label-text">Hobby</span>
									<span class="flex-70">:
										<span class="ml-1">  </span>
									</span>
								</li>
							</template>
						</ul>
					
						</div>

						<div>
							<div class="d-flex align-items-center justify-content-between mb-3">
								<a-button type="primary" block class="d-flex align-items-center mr-2" shape="round" size="small">
									<img src="@/assets/icon/star-fill-white.svg" alt="Icon" height="12px" />
								<span class="ml-2">Shortlist</span>
								</a-button>
								<a-button type="primary" block class="d-flex align-items-center ml-2"  shape="round" size="small">
									<img src="@/assets/icon/connect.svg" alt="Icon" height="13px" />
									<span class="ml-2">Connect</span>
								</a-button>
							</div>
							<a-button
								type="primary"
								shape="round"
								block
								@click="modalVisibility"
							>
								View More Details
							</a-button>
						</div>
				</div>
			</div>
		</div>
		<Modal
			v-model="visible"
			@ok="handleOk"
			:width="400"
		>
			<div class="details-modal">
				<h3>We have found several matches for you</h3>
				<p>
					Register for free and start in no time by exploring MatrimonyAssist with a candidate and rep profile.
				</p>
				<p>
					We request all users on MatrimonyAssist to verify their email and
					mobile number to help build and maintain trust.
				</p>
				<div>
					<div class="text-center">
						<a href="/login" class="btn btn-sm btn-secondary btn-brand ml-2 signInDesign">
							Sign in
						</a>
					</div>

					<div class="text-center">
						<span class="text-center">or</span>
					</div>
					<div class="text-center">
						<a href="/signup" class="btn btn-sm btn-secondary ml-2 joinNowDesign">
							Join now
						</a>
					</div>
				</div>
			</div>
		</Modal>
	</div>
</template>

<script>
import Modal from '@/components/ui/Modal.vue'

export default {
  props: ["candidate"],
  components: {
	  Modal
  },
  data() {
    return {
      visible: false,
	  onceMore: false,
	  avatarSrc: "https://www.w3schools.com/w3images/avatar2.png",
    };
  },
  methods: {
    modalVisibility() {
		if(!this.onceMore) {
			this.onceMore = true;
			return;
		}
      	this.visible = true;
    },
    handleOk() {
      this.visible = false;
    }
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";

.card {
	@media (max-width: 768px) {
		height: 300px;
	}

	#card-image {
		height: 250px;	
		width: 100%; 
		float: left;
		margin-right: 30px;
		display: flex;

		@media (max-width: 768px) {
			width: 100%;		
				
		}

		@media (max-width: 368px) {
			height: 80%;
			width: 80%;	
			display: block;
			
		}	

		@media (max-width: 358px) {
			height: 80%;
			width: 80%;	
			display: block;
			
		}	
	}
	.card-body {
		.desc-list {
			margin-top: -10px;
			line-height: 1.5;
		}
		@media (max-width: 476px) {
			font-size: 12px;
			line-height: 1;	
		}

		
		@media (max-width: 368px) {
			margin-left: -25px;
			
		}	
		@media (max-width: 350px) {
			font-size: 10px;
			
		}
		
		.card-title {
			margin-top: -5px;
			margin-bottom: -10px;
			@media (max-width: 476px) {
				margin-top: -10px;
				margin-bottom: -10px;			
				font-size: 14px;
			}
			@media (max-width: 387px) {
				font-size: 12px;
				margin-bottom: -10px;
			}

			@media (max-width: 350px) {
				font-size: 11px;
				margin-bottom: -10px;
			}
		}
		.btn-brand {
			background: $color-brand;
		}
	}

}

.joinNowDesign {
	background-color: #e51f76;
	padding: 3px 12px;
}

.signInDesign {
	padding: 3px 12px;
}
.signInDesign, .joinNowDesign {
	box-shadow: 1px 3px 3px 1px #bfbfbf !important;
	border: 2px solid #fff;
	min-width: 90px;
}
#flex-container {
	display: flex;
}

#flex-container-list {
	margin-right: -10px;
	@media (max-width:768px) {
		display: flex;
		
	}
}

.details-modal {
	&>h3 {
		font-size: 18px;
	}
	p {
		font-size: 13px;
	}
}
.joinNowDesign:hover {
	background-color:#e51f76;
	border: 1px solid #e51f76;

}
</style>