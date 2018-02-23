'use strict';

// Declare app level module which depends on views, and components
angular.module('app')
  .controller('main', function ($scope) {

    let generateRandomEmail = () => {
      let chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
      let string = '';
      let length = Math.floor(Math.random() * 10) + 3;
      for(let i=0; i<length; i++){
        string += chars[Math.floor(Math.random() * chars.length)];
      }
      return string + '@dom.com'
    };

    this.emails = [];
    this.addEmail = () => $scope.$broadcast('addEmail', generateRandomEmail());
    this.showCount = () => alert(this.emails.length)
  });




