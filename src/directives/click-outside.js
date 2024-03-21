export default {
  bind(el, binding) {
    setTimeout(()=> {
      el.addEventListener('click', e => e.stopPropagation());
      document.body.addEventListener('click', binding.value);
    }, 0)
  },
  unbind(el, binding) {
    document.body.removeEventListener('click', binding.value);
  }
};