import { Component, Watch, Prop } from 'vue-property-decorator';
import './modal.scss';
@Component
export default class Modal {
  @Prop({ required: true }) id;
  @Prop({ default: false }) loadingFlag;

  mounted() {
    setTimeout(() => {
      this.$el.focus();
    }, 1);
  }

  onKeyup(event) {
    if (event.code === "Escape") {
      this.cancel();
    }
  }

  cancel() {
    this.$emit('cancelled', true);
  }

  render(createElement) {
    return (
      <div
        class={`dt-modal ${this.id} ${this.loadingFlag ? 'dt-loading shell--v2' : ''}`}
        onKeyup={this.onKeyup}
        tabindex="0"
        style="height:100%"
      >
        {/* <div>
          <div class="dt-icon-container">
            <img
              src="@/assets/icon/close.svg"
              class="dt-icon v5 s2"
              onClick={this.cancel}
              alt="Close Modal"
              title="Close Modal"
            />
          </div>
        </div> */}
        <div class="dt-modal--header">
          {this.$slots.header}
        </div>
        <div class="dt-modal--body">
          {this.$slots.body}
        </div>
        <div class="dt-modal--options">
          {this.$slots.options}
        </div>
      </div>
    );
  }
}