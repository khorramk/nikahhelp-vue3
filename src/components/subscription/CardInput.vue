<template>
	<div class="card-input">
		<div v-if="!this.payment_method" class="card-input form-group">
			<!-- <h6 class="text-center validate-text text-white pb-2">Validate Your Card</h6> -->
			<div class="form-group my-3">
				<label for="name" class="text-white ml-2">Name on Card</label>
				<input
					type="text"
					id="name"
					class="w-100 py-2 px-4 bg-white form-control input-round fs-14"
					v-model="name"
					placeholder="Your name on card"
				/>
			</div>
			<div class="form-group mt-3">
				<label for="billingAddress" class="text-white ml-2">Country </label>
				<!-- <input
					type="text"
					id="billingAddress"
					class="w-100 p-2"
					v-model="country"
					placeholder="Example: US, CA, BD"
				/> -->
				<select class="custom-select px-4 form-control input-round fs-14" style="color: rgba(0, 0, 0, .55);" v-model="country">
					<option value="" disabled>Select Country</option>
					<option
						v-for="c in $store.state.candidateInfo.countries"
						:value="c.iso2"
						:key="c.id"
					>
						{{ c.name }} 
						
						</option>
				</select>
			</div>
			<div class="form-row mt-3">
				<div class="form-group col-md-6">
					<label for="postCode" class="text-white ml-2">Post Code </label>
					<input
						type="text"
						id="postCode"
						class="w-100 py-2 px-4 bg-white form-control input-round fs-14"
						v-model="postCode"
						placeholder="Example: 1234"
					/>
				</div>
				<div class="form-group col-md-6">
					<label for="country" class="text-white ml-2">City </label>
					<input
						type="text"
						id="country"
						class="w-100 py-2 px-4 bg-white form-control input-round fs-14"
						v-model="city"
						placeholder="London"
					/>
				</div>
			</div>
			<label class="text-white ml-2 mt-3 mobile-screen-label">Card Number</label>
			<div ref="card" class="form-control rounded-pill px-4 cspt-9 fs-14"></div>
			<div class="mt-5 mb-3 text-right mobile-margin">
				<button class="check-card-btn" @click.prevent="submitPayment">
					<LoadingOutlined class="mr-2" v-if="loading" /> Check Card Validity
				</button>
			</div>
		</div>
		<div v-else class="text-center mt-5">
			<h4 class="text-white successful-validation-text">
				Your card has been validated successfully, click "Agree and Subscribe"
				to complete the payment.
			</h4>
		</div>
	</div>
</template>

<script>
import { LoadingOutlined } from "@ant-design/icons-vue";

let stripe = Stripe(`${import.meta.env.VITE_STRIPE_PUBLIC_KEY}`);
let elements = stripe.elements();

const style = {
	base: {
		border: "2px solid #aaa",
		borderRaidus: "20px",
		color: "#000",
	},
	invalid: {
		//All of the error styles go inside of here.
	},
};

export default {
	props: ["clientSecret"],
	components: {
		LoadingOutlined,
	},
	data() {
		return {
			card: "",
			intentToken:
				"seti_1IvfrFKl6A9Ix8PFbygQZcoX_secret_JYnSwJqG881f5NsiL6gRfspMY4NIqjS",
			fullName: "Shadman Ahmed",
			name: "",
			country: "",
			city: "",
			postCode: "",
			payment_method: null,
      		loading: false
		};
	},
    created() {
		// setTimeout(() => {
		//   let cardElement = elements.getElement('card');
		//   if(cardElement) {
		//     self.card = "";
		//     self.card = elements.getElement('card');
		//     self.card.mount(self.$refs.card);
		//   } else {
		//     self.card = elements.create("card", style);
		//     self.card.mount(self.$refs.card);
		//   }
		// }, 500);
	},
	mounted() {
		this.card = elements.create("card", style);
		this.card.mount(this.$refs.card);
		//location.reload();
		// this.card = elements?.create("card", style);
		// this.card.mount(this.$refs.card);
	},
	unmounted() {
		try{
			this.card.destroy(this.$refs.card);
		} catch(e) {
			console.log(e);
		}
	},
	beforeDestroy() {
		try {
			this.card.destroy(this.$refs.card);
		} catch (e) {
			console.log(e);
		}
	},
	methods: {
		setValidationFalse() {
			this.payment_method = false;
			const self = this;
			setTimeout(() => {
				self.card = "";
				self.card = elements.getElement('card');
				self.card.mount(self.$refs.card);
			}, 1000);
		},
		submitPayment() {
			this.loading = true;
			stripe
				.confirmCardSetup(this.clientSecret, {
					payment_method: {
						card: this.card,
						billing_details: {
							name: this.name,
							address: {
								city: this.city,
								country: this.country,
								postal_code: this.postCode,
							},
						},
					},
				})
				.then(function (result) {
					this.loading = false;
					if (result.error) {
						console.log(result.error);
						//alert(result.error.message);
						this.$error({
							title: "Card Validation Error",
							content: result.error.message,
							centered: true,
						});
					} else {
						console.log(result);
						console.log(result.setupIntent.payment_method);
						this.payment_method = result.setupIntent.payment_method;
						console.log(this.payment_method);
						this.$emit("get-payment-method", this.payment_method);
						this.$store.state.user.payment_method = this.payment_method;
						this.card.clear();
						try {
							this.card.destroy(this.$refs.card);
						} catch (e) {
							console.log(e);
						}
					}
				}.bind(this));
		},
	},
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";

.card-input {
	.form-group {
		margin-bottom: 5px;
	}
	.custom-select {
		border-radius: 25px;
		font-size: 12px;
    height: 38px;
    border: none !important;
    &:focus {
      box-shadow: none !important;
      outline: none !important;
      border: none !important;
    }
	}
}

.check-card-btn {
	font-size: 16px;
	margin-top: 30px;
	height: 40px;
	width: 100%;
	align-items: center;
	display: flex;
	justify-content: center;
	background: $color-white;
	color: $color-success;
	border: 1px solid $color-success;
	border-radius: 25px;

	&:hover {
		background: $color-success;
		color: $color-white;
		border: 1px solid $color-success;
	}
	
	@media (min-width: 768px) {
		height: 50px !important;
		font-size: 1.2rem !important;
	}

}
.br-30 {
  border-radius: 30px;
}
.cspt-9 {
  padding-top: 9px;
}
input {
  border: none !important;
}
input:focus{
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
  border: none !important;
}
input:active{
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
  border: none !important;
}
.input-round {
  border-radius: 40px;
}
@media (max-width: 768px) {
	.mobile-margin {
		margin-top: -15px !important;
	}
	label {
		margin-bottom: .2rem !important;
	}
	.mobile-screen-label {
		margin-top: 0px !important;
	}
	.check-card-btn {
		margin-top: 60px !important;
	}
	.successful-validation-text {
		font-size: 16px;
		margin-top: 150px;
	}
	.form-group {
		.col-md-6 {
			padding: 8px 7px !important;
		}
	}
}
.form-control {
	height: 38px !important;
}
</style>
