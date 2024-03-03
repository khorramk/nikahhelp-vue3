<template>
  <div class="dialog-container">
    <v-dialog v-model="dialog" :width="500">
      <v-card>
        <div class="p-5">
          <!-- <div>
            <img src="/assets/images/coming-soon.svg" alt="" />
          </div> -->
          <div>
            <p style="color: #6158a7" class="text-h5 text-3xl">
              {{title}}
            </p>
            <p style="color: #6158a7; margin-top: -10px">Coming soon...</p>
            <ButtonComponent
              @onClickButton="dialog = false"
              title="close"
              :isBlock="false"
            />
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ButtonComponent from "@/components/atom.vue";
export default {
  components: {
    ButtonComponent,
  },
  methods: {
    openDiag()  {
      this.dialog = true
    }
  },
  data: () => ({
    dialog: false
  }),
  props: {
    title: {
      type: String
    }
  }
};
</script>