angular.module('common')
  .component('emailBlock', {
    templateUrl: 'app/common/emailEditor/emailBlock/emailBlock.template.html',
    bindings: {
      email: '<',
      onDelete: '&'
    },
    controller: function () {
      this.delete = () => this.onDelete({email: this.email})
    }
  });