<template>
	<!-- Card -->
	<div class="m-2 shadow-default gridCardDesign">
		<div class="row no-gutters p-1">
			<div class="col-12" id="flex-container">
				<img
					:src="candidate.image ? candidate.image + `?token=${token}` : avatarSrc"
					alt=""
					id="card-image"
				/>
			</div>
			<div class="col-12" id="flex-container-list">
				<div class="card-body py-2 d-flex flex-column h-full justify-content-between">
					<div>
						<h5 class="card-title">{{ candidate.candidate.name }}</h5>

						<ul class="desc-list">
							<!-- Location -->
							<li class="flex-between-start">
								<span class="flex-30 label-text">Location</span>
								<span class="flex-70">:
									<span class="ml-1">{{ candidate.candidate.location_name }}</span>
								</span>
							</li>
							<!-- Age -->
							<li class="flex-between-start">
								<span class="flex-30 label-text">Age</span
								><span class="flex-70"
									>:
									<span class="ml-1">{{ candidate.candidate.age }} </span></span
								>
							</li>
							<!-- Religion -->
							<li class="flex-between-start">
								<span class="flex-30 label-text">Religion</span
								><span class="flex-70"
									>:
									<span class="ml-1"
										>{{ candidate.candidate.religion }}
									</span></span
								>
							</li>

							<li class="flex-between-start">
								<span class="flex-30 label-text">Ethnicity</span>
								<span class="flex-70">:
									<span class="ml-1">{{ candidate.candidate.ethnicity }} </span>
								</span>
							</li>
						</ul>
						
					</div>
					<div class="mt-2">	
						<div class="d-flex align-items-center justify-content-between mb-3">
							<a-button
								@click="modalVisibility"
								type="primary" block class="d-flex align-items-center mr-2" shape="round" size="small">
								Shortlist
							</a-button>
							<a-button @click="modalVisibility" type="primary" block class="d-flex align-items-center ml-2"  shape="round" size="small">
								Team listed
							</a-button>
						</div>
						<a-button
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
	</div>
</template>

<script>
export default {
	props: ["candidate"],
	created() {
		this.token = JSON.parse(localStorage.getItem("token"));
	},
	data() {
		return {
			visible: false,
			avatarSrc: "https://www.w3schools.com/w3images/avatar2.png",
			token: "",
		};
	},
	methods: {
		modalVisibility() {
			this.$router.push(`/user/profile/${this.candidate.id}`);
		},
		handleOk() {
			this.visible = false;
		},
	},
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.card {
	@media (max-width: 558px) {
		height: 280px;
	}
	.card-img {
		height: 250px;	
		float: left;
		margin-right: 0px;
		width: 100%;
		@media (max-width: 671px) {
			height: 100%;
			display: block;
		}

		@media (max-width: 610px) {
			height: 100%;
			display: block;
		}

		@media (max-width: 588px) {
			height: 90%;
			display: block;
		}

		@media (max-width: 552px) {
			height: 85%;
		}

		
		@media (max-width: 537px) {
			height: 80%;
		}

			
		@media (max-width: 525px) {
			height: 70%;
		}

		@media (max-width: 409px) {
			height: 60%;
		}
	}
	.card-body {
		float: right;
		overflow: hidden;
		
		@media (max-width: 511px) {
			margin-left: -10px;
			margin-top: -8px;
		}
		.desc-list {
			line-height: 1.5;
			
			@media (max-width: 679px) {
				font-size: 12px;
				line-height: 1;
			}
			
			
			@media (max-width: 543px) {
				font-size: 10px;
				margin-top: -10px;
			
			}

			
			@media (max-width:365px) {
				font-size: 8px;
			}
		}
		.btn-brand {
			background: $color-brand;
		}
		.card-title {
			@media (max-width: 610px) {
				font-size: 15px;
				margin-bottom: -10px;
			}

			@media (max-width: 543px) {
				font-size: 11px;
			}

			@media (max-width: 387px) {
				font-size: 10px;
			}

			
			@media (max-width: 376px) {
				font-size: 9px;
			}

			
			@media (max-width: 365px) {
				font-size: 8px;
			}
		}
	}

	#flex-container {
		display: flex;
	}

	#flex-container-list {
		margin-right: -10px;
		display: flex;
	}
}



#viewMoreDetails {
	align-items: center;
	width: 80%;
	padding: 3px 0;
	position: absolute;
	bottom: 5px;

		
	@media (max-width: 671px) {
		bottom: -60px;
	}


	@media (max-width: 584px) {
		font-size: 12px;
	}

	@media (max-width: 542px) {
		font-size: 10px;
		bottom: -100px;
	}

	
	@media (max-width: 501px) {
		font-size: 10px;
		bottom: -115px;
	}
	@media (max-width: 482px) {
		font-size: 10px;
		bottom: -100px;
		padding: 1px 2px;
	}
}

#connectButton {
	margin: 7px;
	padding-left: 9px;
	padding-right: 9px;
	margin-bottom: 0px;
	position: absolute;
	right: 25px;
	bottom: 35px;

		

	@media (max-width: 772px) {
		bottom: 35px;
	}


	
	@media (max-width: 671px) {
		bottom: -30px;
		margin-left: -100px;
		left: 128px;
	}

	@media (max-width: 542px) {
		font-size: 10px;
		bottom: -75px;
	}

	@media (max-width: 511px) {
		margin-left: -110px;
	}	
	@media (max-width: 482px) {
		font-size: 8px;
		bottom: -60px;
		padding: 1px 2px;
	}
}


#shortlistButton {
	margin-left: 7px;
	padding-left: 9px;
	padding-right: 9px;
	margin-bottom: 0px;
	position: absolute;
	bottom: 35px;

	@media (max-width: 772px) {
		bottom: 60px;
	}

	
	@media (max-width: 671px) {
		bottom: -7px;
	}

	@media (max-width: 542px) {
		font-size: 10px;
		bottom: -55px;
	}
	@media (max-width: 482px) {
		font-size: 8px;
		bottom: -40px;
		padding: 1px 2px;
	}

}


.gridCardDesign {

		@media (max-width: 666px) {
		margin-right: 0px;
		margin-left: 5px;
	}

	@media (max-width: 463px) {
		height: 270px;
	}
	@media (max-width: 444px) {
		margin: 4px -25px 4px -20px;
	
	}

	

	@media (max-width: 380px) {
		margin: 2px -25px 4px -40px;
	}


	@media (max-width: 370px) {
		height: 290px;
		margin: 4px -25px 4px -40px;
	
	}

	
	@media (max-width: 359px) {
		margin: 4px -35px 4px -50px;
	
	}

	@media (max-width: 335px) {
		margin: 4px -40px 4px -40px;
	
	}
	
	@media (max-width: 330px) {
		margin: 4px -50px 4px -40px;
	
	}
}
</style>
