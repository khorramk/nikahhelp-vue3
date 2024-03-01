<template>
	<div class="feature section-padding position-relative">
		<div class="container">
			<div class="feature-inner">
				<h2 class="mb-0 text-center color-brand mb-4">User friendly features</h2>
				<div class="row">
					<div class="col-6 col-md-4">
						<a-tooltip placement="top">
							<template slot="title">
								<span>Bring family members on board & take adavantage of collective wisdom</span>
							</template>
							<div class="item">
								<div class="feature-icon">
									<img src="@/assets/Icons/team.svg" alt="Icon" />
								</div>

								<p class="mt-4 fs-18 color-brand">Teams</p>
							</div>
						</a-tooltip>
					</div>
					<div class="col-6 col-md-4">
						<a-tooltip placement="top">
							<template slot="title">
								<span>Create short-lists  of suitable profiles for discussion</span>
							</template>
							<div class="item">
								<div class="feature-icon">
									<img src="@/assets/Icons/match search.svg" alt="Icon" />

								</div>
								<p class="mt-4 fs-18 color-brand">Search & Shortlist</p>
							</div>
						</a-tooltip>
					</div>
					<div class="col-6 col-md-4">
						<a-tooltip placement="top">
							<template slot="title">
								<span>Send a request to link with another team </span>
							</template>
							<div class="item">
								<div class="feature-icon">
									<img src="@/assets/Icons/connection.svg" alt="Icon" />
								</div>
								<p class="mt-4 fs-18 color-brand">Connection</p>
							</div>
						</a-tooltip>
					</div>
					<div class="col-6 col-md-4">
						<a-tooltip placement="top">
							<template slot="title">
								<span>Once connected, instantly chat with prospect & their team</span>
							</template>
							<div class="item">
								<div class="feature-icon">
									<img src="@/assets/Icons/chat.svg" alt="Icon" />
								</div>
								<p class="mt-4 fs-18 color-brand">Team Chat</p>
							</div>
						</a-tooltip>
					</div>
					
					<div class="col-6 col-md-4">
						<a-tooltip placement="top">
							<template slot="title">
								<span>See how many people are viewing a profile</span>
							</template>
							<div class="item">
								<div class="feature-icon">
									<img src="@/assets/Icons/perfomance.svg" alt="Icon" />
								</div>
								<p class="mt-4 fs-18 color-brand">Profile Performance</p>
							</div>
						</a-tooltip>
					</div>
					<div class="col-6 col-md-4">
						<a-tooltip placement="top">
							<template slot="title">
								<span>You decide the information & images that are shared with others</span>
							</template>
							<div class="item">
								<div class="feature-icon">
									<img
										src="@/assets/Icons/privacy.svg"
										alt="Icon"
										class="ml-3"
										style="margin-bottom: -30px;"
									/>
								</div>
								<p class="mt-4 fs-18 color-brand" style="margin-left: 20px;">Privacy Control</p>
							</div>
						</a-tooltip>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.feature {
	.feature-inner {
		width: 70%;
		margin: auto;
		@media (max-width: 767px) {
			width: 100%;
		}
		.item {
			text-align: center;
			padding: 25px;
			cursor: pointer;
			@media (max-width: 767px) {
				margin-bottom: 15px;
				padding: 12px;
			}
			.feature-icon {
				display: inline-block;
				margin: 0 auto;
				width: 85px;
				height: 65px;

				img {
					width: 100px;
					height: 42px;
				}

				@media (max-width: 767px) {
					width: 66px;
					height: 40px;
				}
			}
			p {
				margin-top: 10px;
				text-align: center;
			}
		}
	}
}
.bg-layer-1 {
  top: 30px;
  right: 30px;
  width: 7%;
}
.bg-layer-1-1 {
  top: 28px;
  right: 32px;
  width: 7%;
}
</style>
