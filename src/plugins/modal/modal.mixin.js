
export const MODAL_DEFAULT_MEDIUM = 762;
export const MODAL_DEAULT_SMALL = 400;
export const MODAL_DEFAULT_LARGE = 1200;

export const createModalMixin = (key = '', aliases = [], {
  modalQueryKey = 'modal'
} = {}) => {
  const routeKey = toSnakeCase(key);
  const matchRoutes = [routeKey, ...aliases];
  return {
    components: {

    },
    data: function () {
      return {
        [`${key}ModalContainer`]: false,
        [`${key}Modal`]: false,
      }
    },
    watch: {
      '$route': {
        immediate: true,
        handler: function (to, from) {

          if (to && matchRoutes.includes(to.query[modalQueryKey])) {
            if (aliases.length == 0) {
              this[`${key}ModalContainer`] = true;
              setTimeout(() => {
                this[`${key}Modal`] = true;
              }, 1);
            } else { 
              this[`${key}ModalContainer`] = false;
              this[`${key}Modal`] = false;

              setTimeout(() => {
                this[`${key}ModalContainer`] = true;
                setTimeout(() => {
                  this[`${key}Modal`] = true;
                }, 1);
              }, 1);
            }
          } else if (from && matchRoutes.includes(from.query[modalQueryKey]) && !matchRoutes.includes(to.query[modalQueryKey])) {
            this[`${key}Modal`] = false;
            waitForAnimation(() => {
              this[`${key}ModalContainer`] = false;
            })
          }
        }
      }
    },
  }
}

export const watchQueryModal = (modalQuery, containerKey, modalKey) => (to, from, component) => {
  if (to && to.query.modal === modalQuery) {
    component[containerKey] = true;
    waitForAnimation(() => {
      component[modalKey] = true;
    });
  } else if (from && from.query.modal === modalQuery && to.query.modal !== modalQuery) {
    component[modalKey] = false;
    waitForAnimation(() => {
      component[containerKey] = false;
    })
  }
}

export const ModalContainer = ({ props }) => {
  return (
    <div>
      {props.modalContainerFlag && <VDialog
        vModel={props.modalFlag}
        persistent={true}
        width="800"
      >
      </VDialog>}
    </div>
  );
}


export const openModalRoute = (component, modalKey, openModalQuery = {}) => {
  component.$router.push({
    ...component.$route,
    query: {
      ...component.$route.query,
      modal: modalKey,
      ...openModalQuery,
    }
  });
}

export const closeModalRoute = (component, modalCloseQuery = {}) => {
  component.$router.push({
    ...component.$route,
    query: {
      ...Object.assign({}, component.$route.query),
      modal: undefined,
      ...modalCloseQuery
    }
  })
}






export const toSnakeCase = (string) => {
  return string && string.replace(/([A-Z])/g, e => `_${e.toLowerCase()}`)
}
export function waitForAnimation(f, delay = 1) {
  setTimeout(f, delay);
}