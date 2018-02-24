
angular.module('common')
  .component('emailEditor', {
    templateUrl: 'app/common/emailEditor/emailEditor.template.html',
    bindings: {
      emails: "="
    },
    controller: function ($scope, Email) {
      this.reset = () => this.current = '';
      this.reset();

      $scope.$on('addEmail', (e, data) => this.addEmail(data));
      $scope.$on('showCount', (e) => console.log(e));

      this.deleteEmail = (email) => {
        this.emails = this.emails.filter(e => e.toString() !== email.toString())
      };

      this.addEmail = (email) => {
        if (!email) return;
        if (this.emails.find(e => e.toString() === email)) return;
        this.emails.push(new Email(email))
      };

      this.onBlur = (event) => {
        this.addEmail(this.current);
        this.reset();
      };

      this.onPaste = (event) => {
        event.preventDefault();
        event.clipboardData.getData('text/plain').split(/\s+/g).forEach(e => this.addEmail(e));
        this.reset();
      };

      this.onKeyDown = (event : KeyboardEvent) => {

        let addCurrent = () => {
          this.addEmail(this.current);
          this.reset();
        };

        let deleteLast = () => this.emails.pop();

        let conditions = [
          {condition: () => event.keyCode === 13, action: addCurrent}, // enter key pressed
          {condition: () => [','].indexOf(event.key) !== -1, action: addCurrent}, // comma char is entered
          {condition: () => event.keyCode === 8 && !this.current.length, action: deleteLast}, // backspace with empty input
          {condition: () => event.keyCode === 32 && !this.current.length, action: null}  // prevent space char on line start
        ];

        let triggered = conditions.find(c => c.condition());
        if (triggered) {
          event.preventDefault();
          triggered.action && triggered.action();
        }
      }
    }
  })
;