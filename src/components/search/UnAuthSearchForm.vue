<template>
  <div :class="cardBorder">
    <div class="advanced-search font-poppins" :class="{ 'p-3': useFor == 'home' }">
      <div class="title-wrapper">
        <h3 class="heading-title font-elsie">Find Your Match</h3>
        <p class="sub-title">I am looking for</p>
      </div>
      <div class="gender-wrapper flex justify-content-between align-items-center">
        <button
          :class="{ selected: searchModel.gender == 1 }"
          @click="onSelectedGender(1)"
          class="btn gender-outline-primary btn-round focus-design mr-2"
        >
          <img src="@/assets/icon/male_colorized.svg" alt="male" class="male-icon" :class="{'img-selected': searchModel.gender == 1}" />
          Male
        </button>
        <span class="color-primary fs-16">or</span>
        <button
          :class="{ selected: searchModel.gender == 2 }"
          @click="onSelectedGender(2)"
          class="btn gender-outline-primary btn-round focus-design ml-2"
        >
          <img src="@/assets/icon/female_colorized.svg" alt="female" class="female-icon" :class="{'img-selected': searchModel.gender == 2}" />
          Female
        </button>
      </div>
      <div class="my-4">
        <SelectGroup
          class="age-group"
          @selected="onDropdownChange"
          :uniqueNames="['min_age', 'max_age']"
          :size="'large'"
          :options="ageTV"
          :placeholder="['Min Age', 'Max Age']"
          :width="'120'"
          :suffixIcon="true"
          :min="[18, 24]"
          :values="[searchModel.min_age, searchModel.max_age]"
        />
        <h6 v-if="(!searchModel.min_age || !searchModel.max_age) && trying" class="text-danger fs-12 text-left pt-2 pl-2">Minimum and maximum age is required</h6>
      </div>

      <div class="my-4" v-if="useFor != 'home'">
        <SelectGroup
          @selected="onDropdownChange"
          :values="[searchModel.heightMin, searchModel.heightMax]"
          :uniqueNames="['heightMin', 'heightMax']"
          size="default"
          :options="getHeights"
          :placeholder="['Min Height', 'Max Height']"
          :size="'large'"
          :width="'120'"
          :suffixIcon="true"
          class="search-flex"
        />
        <h6 v-if="(!searchModel.heightMin || !searchModel.heightMax) && trying" class="text-danger fs-12 text-left pt-2 pl-2">Minimum and maximum height is required</h6>
      </div>

      <div class="my-4">
        <a-select
          id="country"
          v-model:value="searchModel.country"
          show-search
          size="large"
          :placeholder="'Select a country'"
          :options="countriesTV"
          :fieldNames="{ label: 'name', value: 'id' }"
          option-filter-prop="children"
          :filter-option="filterOption"
          style="width: 100%"
          notFoundContent="Country not found"
        >
          <template #suffixIcon>
            <img src="@/assets/select-arrow-big.png" alt="icon" />
          </template>
        </a-select>
        <h6 v-if="!searchModel.country && trying" class="text-danger fs-12 text-left pt-2 pl-2">Country is required</h6>
      </div>

      <div class="my-4">
        <a-select
          id="religion"
          :value="searchModel.religion"
          show-search
          size="large"
          :placeholder="'Select a religion'"
          option-filter-prop="children"
          :options="religionTV"
          :fieldNames="{ label: 'name', value: 'id' }"
          :filter-option="filterOption"
          style="width: 100%"
          notFoundContent="Religion not found"
        >
          <a-select-option
            v-for="r in religionTV"
            :value="r.id"
            :key="r.id"
          >
            {{ r.name }}
          </a-select-option>
          <template #suffixIcon>
            <img src="@/assets/select-arrow-big.png" alt="icon" />
          </template>
        </a-select>
        <h6 v-if="!searchModel.religion && trying" class="text-danger fs-12 text-left pt-2 pl-2">Religion is required</h6>
      </div>
      <div>
        <button
          @click="handleSearch"
          size="large"
          class="btn btn-block btn-round color-outline-primary h-40btn br-40"
        >
          <img src="@/assets/icon/search-love-secondary.svg" alt="search" class="search-icon" />
          <span class="ml-3 fs-20"> Search </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SelectGroup from "@/components/ui/selects/SelectGroup.vue";

import { AGES, HEIGHTS } from "@/models/data";
import ApiService from "@/services/api.service";

export default {
  name: "UnAuthSearchForm",

  data() {
    return {
      searchModel: {
        gender: 1,
        country: undefined,
        religion: undefined,
        min_age: undefined,
        max_age: undefined,
        heightMin: undefined,
        heightMax: undefined,
      },
      religionTV: [],
      countriesTV: [],
      ageTV: AGES,
      heightTv: HEIGHTS,

      showActiveTeamModal: false,
      candidateActiveTeam: null,
      activeTeamId: null,
      heightUnit: false,
      minHeightFt: null,
      maxHeightFt: null,
      trying: false
    };
  },

  components: {
    SelectGroup,
  },

  props: {
    useFor: {
      type: String,
      default: "home",
      validator: (value) => ["home", "search"].includes(value),
    },
  },

  computed: {
    cardBorder() {
      return this.useFor == "home" ? "homeCardBorder" : "searchCardBorder";
    },
    getHeights() {
      return HEIGHTS;
    },
    filterExists() {
      return (
        this.searchModel.gender &&
        this.searchModel.country &&
        this.searchModel.religion
      );
    },
  },
  created() {
    this.getCandidateInitialInfo();
    if(this.$route.params && this.$route.params.url) {
      let splitedString = this.$route.params.url.split('&');
      if(splitedString.length > 0) {
        splitedString.forEach(item => {
          let itemArray = item.split('=');
          if(itemArray.length > 0) {
            this.searchModel[itemArray[0]] = parseInt(itemArray[1]);
          }
        });
      }
    }
  },

  methods: {
    async getCandidateInitialInfo() {
      const response = await ApiService.get("v1/initial-dropdowns");
      if (response.status === 200) {
        this.countriesTV = response.data.data.countries;
        this.religionTV = response.data.data.religions;
      }
    },

    onDropdownChange({ name, value }) {
      this.searchModel[name] = value;
    },

    onSelectedGender(gender) {
      this.searchModel.gender = gender;
    },

    handleSearch() {
      this.trying = true;
      if(this.filterExists) {
        let _payload = `min_age=${this.searchModel.min_age}&max_age=${this.searchModel.max_age}`;
        if (this.searchModel.gender > 0) {
          _payload += `&gender=${this.searchModel.gender}`;
        }
        if (this.searchModel.country) {
          _payload += `&country=${this.searchModel.country}`;
        }
        if (this.searchModel.religion) {
          _payload += `&religion=${this.searchModel.religion}`;
        }
        if(this.searchModel.heightMin) {
          _payload += `&min_height=${this.searchModel.heightMin}`
        }
        if(this.searchModel.heightMax) {
          _payload += `&max_height=${this.searchModel.heightMax}`
        }
        this.$emit("handleSearch", _payload);
      }
    },

    onAfterChangeSlider(value) {
      this.age = value;
    },
    filterOption(input, option) {
      return option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    }
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.selected {
  background-color: #411883;
  color: #FFFFFF !important;
}
.gender-wrapper {
  button {
    width: 115px;
    font-size: 15px;
    opacity: 0.8;
  }
}
.advanced-search {
  background-color: #fff;
  border-radius: 15px;
  position: relative;
  transform: rotate(-5deg);
  z-index: -2;
  .title-wrapper {
    text-align: center;
    .title {
      //font-family: "Elsie Swash Caps";
      font-size: 32px;
      margin-bottom: 5px;
      color: $color-primary;
    }
    .sub-title {
      color: $color-primary;
      font-family: "gabriola";
      font-size: 30px;
      margin-bottom: 5px;
      font-weight: 100;
    }
  }
  .select-box {
    margin-bottom: 15px;
  }
}

.homeCardBorder {
  background: transparent;
  border: 3px solid #411883;
  border-radius: 10px;
  transform: rotate(5deg);
}

.searchCardBorder {
  background: transparent;
  border-radius: 10px;
  transform: rotate(5deg);
}
.btn-outline-primary, .color-outline-primary, .gender-outline-primary {
  color: $color-primary;
  border-color: $border-primary;
  &:hover {
    background: $bg-secondary;
    color: $color-white;
    text-decoration: none;
    img {
      filter: brightness(0) invert(1);
    }
  }
  &:focus {
    outline: none;
    box-shadow: none;
  }
}
.gender-outline-primary:hover {
  color: #FFFFFF;
  background: #411883;
  &:focus {
    outline: none !important;
    box-shadow: none !important;
  }
  &:hover {
    background: $bg-secondary;
    color: $color-white;
    text-decoration: none;
    img {
      filter: brightness(0) invert(1);
    }
  }
}
.male-icon {
  width: 14px;
}
.female-icon {
  width: 10px;
}
.br-40 {
  border-radius: 40px !important;
}
.h-40btn {
  height: 40px;
  padding-top: 3px;
}
.gender-outline-primary:focus, .gender-outline-primary:active {
  outline: none;
  box-shadow: none;
}
.img-selected {
  filter: brightness(0) invert(1);
}
.search-icon {
  width: 24px;
}
.heading-title {
  margin-bottom: 5px;
  color: #6159a7;
  font-size: 2rem;
  font-weight: 500;
  letter-spacing: .0125em;
  line-height: 2rem;

  @media (max-width: 400px) {
    font-size: 1.8rem;
  }
}
.search-flex {
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (min-width: 768px) {
    flex-direction: row;
  }
}

.age-group {
  .customize-color {
    color: $bg-primary !important;
  }
}
</style>