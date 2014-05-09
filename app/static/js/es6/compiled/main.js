(function() {
  'use strict';
  $(document).ready(init);
  function init() {
    $('.task input[type=checkbox]').click(submitForm);
  }
  function submitForm() {
    $(this).closest('form').submit();
  }
})();

//# sourceMappingURL=main.map
