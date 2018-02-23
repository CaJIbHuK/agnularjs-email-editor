angular
  .module('common')
  .factory('Email', function() {

    class Email {
      public value: string;
      public is_valid: boolean;

      // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email
      // https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
      static EMAIL_REGEXP = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;


      constructor(email: string) {
        this.value = email;
        this.is_valid = Email.validate(email);
      }

      public static validate(value: string): boolean {
        return Email.EMAIL_REGEXP.test(value);
      }

      toString() {
        return this.value;
      }
    }

    return Email
  })
;