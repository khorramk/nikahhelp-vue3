<template>
  <div
    class="
      select-group-container
      d-flex
      align-items-center
      justify-content-center
      select-group
    "
  >
    <!-- <v-select
      class="style-chooser"
      label="name"
      :placeholder="placeholder"
      :id="uniqueNames[0]"
      v-model="values[0]"
      :options="options"
      @select="onSelect"
    ></v-select> -->
    <a-select
      :style="{ maxWidth: width + 'px', width: width + 'px' }"
      :id="uniqueNames[0]"
      v-model="values[0]"
      @select="onSelectMin"
      :show-search="true"
      :size="size"
      dropdownClassName="first_one"
      :placeholder="placeholder[0]"
      :dropdownMatchSelectWidth="false"
      :data-unique="uniqueNames[0]"
    >
      <a-select-option
        :value="option.value"
        v-for="option in options"
        :key="`${uniqueNames[0]}=${option.value}`"
      >
        <div v-html="option.label"></div>
      </a-select-option>
      <template v-if="suffixIcon" #suffixIcon>
        <img src="@/assets/select-arrow-big.png" alt="" />
      </template>
    </a-select>
    <div class="mx-2 customize-color" style="color: #7e7e7e">To</div>
    <!-- <v-select
      class="style-chooser"
      label="name"
      :placeholder="placeholder"
      :id="uniqueNames[1]"
      v-model="values[1]"
      :options="options"
      @select="onSelect"
    ></v-select> -->
    <a-select
      v-model="values[1]"
      :style="{ maxWidth: width + 'px', width: width + 'px' }"
      @select="onSelectMax"
      :size="size"
      :show-search="true"
      dropdownClassName="second_one"
      :dropdownMatchSelectWidth="false"
      :placeholder="placeholder[1]"
      :data-unique="uniqueNames[1]"
      :id="uniqueNames[1]"
    >
      <a-select-option
        :value="option.value"
        v-for="option in optionsMax || options"
        :key="`${uniqueNames[1]}=${option.value}`"
      >
        <div v-html="option.label"></div>
      </a-select-option>
      <template v-if="suffixIcon" #suffixIcon>
        <img src="@/assets/select-arrow-big.png" alt="" />
      </template>
    </a-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      optionsMax: null,
    };
  },

  props: {
    placeholder: {
      type: Array,
    },
    options: {
      type: Array,
    },
    uniqueNames: {
      type: Array,
    },
    width: {
      type: String,
    },
    values: {
      type: Array,
    },
    size: {
      type: String,
      default: "large",
    },
    suffixIcon: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    values: {
      handler(val, o) {
        let data = this.options.find((o) => o.value == val[0]);
        if (data) {
          this.optionsMax = this.options.filter(
            (o) => o.serialNo > data.serialNo
          );
        } else {
          this.optionsMax = [...this.options];
        }
      },
      deep: true,
    },
    
  },

  methods: {
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].data.domProps.innerHTML
          .toLowerCase()
          .indexOf(input?.toLowerCase()) >= 0
      );
    },
    onSearch(searchText) {
      this.dataSource = !searchText
        ? []
        : [searchText, searchText.repeat(2), searchText.repeat(3)];
    },
    onSelectMin(value, option) {
      setTimeout(() => {
        this.$emit("selected", {
          value: value,
          name: option.key.substring(0, option.key.indexOf("=")),
        });
        console.log("selected", {
          value: value,
          name: option.key.substring(0, option.key.indexOf("=")),
        });
      }, 100);
    },
    onSelectMax(value, option) {
      setTimeout(() => {
        this.$emit("selected", {
          value: value,
          name: option.key.substring(0, option.key.indexOf("=")),
        });
        console.log("selected", {
          value: value,
          name: option.key.substring(0, option.key.indexOf("=")),
        });
      }, 200);
    },
  },
};
</script>

<style  lang="scss">
@import "@/styles/base/_variables.scss";
.select-group-container {
  .select_group_wrapper {
    position: relative;
  }
  .dropdown_area {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .dropdown {
      padding: 4px 6px;
      border: 1px solid $color-primary;
      border-radius: 4px;
      position: relative;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 19px;
    }

    .dropdown__left {
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
    }

    .dropdown__right {
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
    }
  }

  .options_wrapper {
    position: absolute;
    left: -130px;
    bottom: -40px;
    background: #fff;
  }
  p {
    //width: 140px;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }
}
</style>