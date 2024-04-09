<template>
  <v-card class="p-3" style="height: 100%">
    <table>
      <TableRow
        title="Name"
        textClass="text-subtitle-1"
        :value="data.first_name + ' ' + data.last_name"
      />
      <TableRow
        title="Screen Name"
        textClass="text-subtitle-1"
        :value="data.screen_name"
      />
      <template v-if="routeName === 'Profile'">
        <!-- <TableRow
          title="Address Line 1"
          textClass="text-subtitle-1"
          :value="contact.address_1"
        />
        <TableRow
          title="Address Line 2"
          textClass="text-subtitle-1"
          :value="contact.address_2"
        />
        <TableRow
          title="City"
          textClass="text-subtitle-1"
          :value="contact.per_permanent_city"
        /> -->

        <TableRow
          title="Mobile"
          textClass="text-subtitle-1"
          :value="personal.mobile_number"
        />
      </template>

      <TableRow
        title="Gender"
        textClass="text-subtitle-1"
        :value="personal.per_gender == 2 ? 'Female' : 'Male'"
      />
      <TableRow
        title="Age"
        textClass="text-subtitle-1"
        :value="getAge(personal.dob)"
      />
      <TableRow
        title="Height"
        textClass="text-subtitle-1"
        :value="getPersonalHeight"
      />
      <TableRow
        title="Employment Status"
        textClass="text-subtitle-1"
        :value="personal.per_employment_status"
      />
      <TableRow
        title="Occupation"
        textClass="text-subtitle-1"
        :value="essential.per_occupation"
      />
      <TableRow
        title="Education"
        textClass="text-subtitle-1"
        :value="essential.per_education_level"
      />
      <TableRow
        title="Religion"
        textClass="text-subtitle-1"
        :value="essential.per_religion"
      />
      <TableRow
        title="Ethnicity"
        textClass="text-subtitle-1"
        :value="personal.per_ethnicity"
      />
      <TableRow
        title="Mother Tongue"
        textClass="text-subtitle-1"
        :value="personal.per_mother_tongue"
      />
      <TableRow
        title="Nationality"
        textClass="text-subtitle-1"
        :value="
          $store.state.candidateInfo.countries.find(
            (c) => c.id === personal.per_nationality
          )
            ? $store.state.candidateInfo.countries.find(
                (c) => c.id === personal.per_nationality
              ).name
            : ''
        "
      />
      <TableRow
        title="Country of Birth"
        textClass="text-subtitle-1"
        :value="personal.per_country_of_birth"
      />
      <!-- <TableRow 
                title="Current Residence"
                textClass="text-subtitle-1"
                :value="personal.per_current_residence"
            /> -->
      <template>
        <TableRow
          title="Permanent Country"
          textClass="text-subtitle-1"
          :value="contact.per_permanent_country_name"
        />

	      <TableRow
			      title="Permanent City"
			      textClass="text-subtitle-1"
			      :value="contact.per_permanent_city"
	      />
      </template>
      <!-- <tr>
                <td class="text--disabled text-subtitle-1" style="width: 160px">Mobile No</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1"></td>
            </tr>
            <tr>
                <td class="text--disabled text-subtitle-1" style="width: 160px">Email</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1"></td>
            </tr> -->

      <!-- <tr>
                <td class="text--disabled text-subtitle-1" style="width: 50px">Age</td>
                <td class="text-subtitle-1" style="width: 20px ">:</td>
                <td class="text--secondary text-subtitle-1">{{personal.per_age}}</td>
            </tr> -->
    </table>
  </v-card>
</template>

<script>
import { HEIGHTS } from "@/models/data";
import TableRow from "@/components/atom/TableRow.vue";

export default {
  name: "PersonalInfoTable",
  components: {
    TableRow,
  },
  data: () => ({
    HEIGHTS,
  }),
  props: {
    data: {
      type: Object,
    },
  },
  computed: {
    routeName() {
      return this.$route.name;
    },
    personal() {
      return this.data?.personal ? this.data.personal : {};
    },
    contact() {
      return this.data?.contact ? this.data.contact : {};
    },
    essential() {
      return this.data?.essential ? this.data.essential : {};
    },
    getPersonalHeight() {
      return this.personal.per_height
        ? this.HEIGHTS[this.personal.per_height - 1].name
        : "";
    }
  },
  methods: {
    getAge(dateString) {
      var now = new Date();
      // var today = new Date(now.getYear(),now.getMonth(),now.getDate());

      var yearNow = now.getYear();
      var monthNow = now.getMonth();
      var dateNow = now.getDate();

      var dob = new Date(dateString);

      var yearDob = dob.getYear();
      var monthDob = dob.getMonth();
      var dateDob = dob.getDate();
      var age = {};
      var ageString = "";
      var yearString = "";
      var monthString = "";
      var dayString = "";

      let yearAge = yearNow - yearDob;

      if (monthNow >= monthDob) var monthAge = monthNow - monthDob;
      else {
        yearAge--;
        var monthAge = 12 + monthNow - monthDob;
      }

      if (dateNow >= dateDob) var dateAge = dateNow - dateDob;
      else {
        monthAge--;
        var dateAge = 31 + dateNow - dateDob;

        if (monthAge < 0) {
          monthAge = 11;
          yearAge--;
        }
      }

      age = {
        years: yearAge,
        months: monthAge,
        days: dateAge,
      };

      if (age.years > 1) yearString = " years";
      else yearString = " year";
      if (age.months > 1) monthString = " months";
      else monthString = " month";
      if (age.days > 1) dayString = " days";
      else dayString = " day";

      if (age.years > 0 && age.months > 0 && age.days > 0)
        ageString = age.years + yearString + ", " + age.months + monthString;
      else if (age.years == 0 && age.months == 0 && age.days > 0)
        ageString = "Only " + age.days + dayString + " old!";
      else if (age.years > 0 && age.months == 0 && age.days == 0)
        ageString = age.years + yearString;
      else if (age.years > 0 && age.months > 0 && age.days == 0)
        ageString = age.years + yearString + " and " + age.months + monthString;
      else if (age.years == 0 && age.months > 0 && age.days > 0)
        ageString = age.months + monthString;
      else if (age.years > 0 && age.months == 0 && age.days > 0)
        ageString = age.years + yearString;
      else if (age.years == 0 && age.months > 0 && age.days == 0)
        ageString = age.months + monthString;
      else ageString = "--";

      return ageString;
    },
  },
};
</script>

<style scoped>
table {
  table-layout: fixed;
  width: 100%;
}
td {
  vertical-align: top;
}
</style>
