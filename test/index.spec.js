'use strict';
//could come back and check strict equality to original objects, ensure not mutating
var 
    expect = require('chai').expect,
    sinon = require('sinon'),
    lodown = require('../index'),
    customers = require('./fixtures/customers.json');


describe('lodown', function() {
    describe('identity', function() {
        it('should return the same value that is input for a number', function() {
            var result = lodown.identity(5);
            expect(result).equal(5);
        });
        it('should return the same object if object input', function(){
            var result2 = lodown.identity({a: "one", b: 2, c: true});
            expect(result2).eql({a: "one", b: 2, c: true});
        });
        it('should return undefined if undefined is passed in', function() {
            var result3 = lodown.identity(undefined);
            expect(result3).equal(undefined);
        });
    });
});


describe('lodown', function() {
    describe('typeOf', function() {
        it('should return "array" for an Array', function() {
            var result = lodown.typeOf([]);
            expect(result).equal("array");
        });
        it('should return "object" for an object', function() {
            var result = lodown.typeOf({});
            expect(result).equal("object");
        });
        it('should return "null" for null', function(){
            var result2 = lodown.typeOf(null);
            expect(result2).eql("null");
        });
        it('should return function for a Function', function() {
            var result3 = lodown.typeOf(function(){});
            expect(result3).equal("function");
        });
    });
});


describe('lodown', function() {
    describe('first', function() {
        it('should return [] if input array is not an array', function() {
            var result = lodown.first({}, 5);
            expect(result).eql([]);
        });
        it('should return first element if array is input but number is NaN', function(){
            var result2 = lodown.first(['dog', 'cat', 5], "cat");
            expect(result2).eql(["dog"]);
        });    
        it('should return first element if array is input but number not input', function(){
            var result2 = lodown.first(["dog", "cat", "elephant"]);
            expect(result2).eql(["dog"]);
        });
        it('should return [] if number is negative array index', function(){
            var result2 = lodown.first(["dog", "cat", "elephant"], -2);
            expect(result2).eql([]);
        });
        it('should return first three elements if array and number 3 input', function() {
            var result3 = lodown.first(["dog", "cat", 5, "elephant", true, null], 3);
            expect(result3).eql(["dog", "cat", 5]);
        });
        it('should return all elements if number greater than array length', function() {
            var result3 = lodown.first(["dog", "cat", 5, "elephant", true, null], 20);
            expect(result3).eql(["dog", "cat", 5, "elephant", true, null]);
        });
    });
});


describe('lodown', function() {
    describe('last', function() {
        it('should return [] if input array is not an array', function() {
            var result = lodown.last({}, 5);
            expect(result).eql([]);
        });
        it('should return last element if array is input but number is NaN', function(){
            var result2 = lodown.last(['dog', 'cat', 5], "cat");
            expect(result2).eql([5]);
        });    
        it('should return last element if array is input but number not input', function(){
            var result2 = lodown.last(["dog", "cat", "elephant"]);
            expect(result2).eql(["elephant"]);
        });
        it('should return [] if number is negative array index', function(){
            var result2 = lodown.last(["dog", "cat", "elephant"], -2);
            expect(result2).eql([]);
        });
        it('should return last three elements if array and number 3 input', function() {
            var result3 = lodown.last(["dog", "cat", 5, "elephant", true, null], 3);
            expect(result3).eql(["elephant", true, null]);
        });
        it('should return all elements if number greater than array length', function() {
            var result3 = lodown.last(["dog", "cat", 5, "elephant", true, null], 20);
            expect(result3).eql(["dog", "cat", 5, "elephant", true, null]);
        });
    });
});

describe('lodown', function() {
    describe('each', function() {
        it('should iterate an Array, applying action to each element, index of the element, and the collection', function() {
            var action = sinon.spy();
            lodown.each(customers, action);
            expect(action.callCount).to.equal(customers.length);
            customers.forEach(function(customer, index){
               expect(action.calledWith(customer, index, customers)).to.be.true;
            });
        });
   
        it('should iterate an Object, applying action for each value, key of value, and Object', function() {
            var action = sinon.spy();
            var customer = customers[0];
            lodown.each(customer, action);
            expect(action.callCount).to.equal(Object.keys(customer).length);
            for(var key in customer) {
              expect(action.calledWith(customer[key], key, customer)).to.be.true;
            }
        });
    });
});


//check mutation of array
//how check that they didn't do [].indexOf??
describe('lodown', function() {
    describe('indexOf', function() {
        it('should return -1 if value is not in the array', function() {
            var result = lodown.indexOf([undefined, true, "zebra"], 3);
            expect(result).equal(-1);
        });    
        it('should return first occurrance of an element if value in array multiple times', function(){
            var result2 = lodown.indexOf(["dog", "cat", "elephant", "dog", "elephant"], "dog");
            expect(result2).equal(0);
        });
        it('should return [] if number is negative array index', function(){
            var result2 = lodown.indexOf(["dog", "cat", "elephant", "dog", "elephant"], "elephant");
            expect(result2).equal(2);
        });
    });
});

//how to ensure that each is called in the function???
//how to check original array is not mutated
describe('lodown', function() {
    describe('filter', function() {
        it('should return array of values passing the test if array and T/F function passed in', function() {
            var result = lodown.filter([1, 5, 7, 8, 10, 12], function(value){return value % 2 === 0});
            expect(result).eql([8, 10, 12]);
        });
        it('should return array of values passing the test if array and T/F function passed in, numbers', function() {
            var result = lodown.filter([true, false, 7, undefined, true, 12], function(value){return value % 2 !== 0});
            expect(result).eql([true, 7, undefined, true]);
        });
        it('should return array of values passing the test if array and T/F function passed in, strings', function() {
            var result = lodown.filter(["dog", "cat", "elephant", "dog", "elephant"], function(value){return value === "elephant"});
            expect(result).eql(["elephant", "elephant"]);
        });
        it('should coerce values to true/false if function does not do so', function() {
            var result = lodown.filter(["dog", "cat", "elephant", "dog", "elephant", 0, false, null], function(value){ return value});
            expect(result).eql(["dog", "cat", "elephant", "dog", "elephant"]);
        });
    });
});


describe('lodown', function() {
    describe('reject', function() {
        it('should return array of values failing the test if array and T/F function passed in', function() {
            var result = lodown.reject([1, 5, 7, 8, 10, 12], function(value){return value % 2 === 0});
            expect(result).eql([1, 5, 7]);
        });
        it('should return array of values failing the test if array and T/F function passed in, numbers', function() {
            var result = lodown.reject([true, false, 7, undefined, true, 12], function(value){return value % 2 !== 0});
            expect(result).eql([false, 12]);
        });
        it('should return array of values failing the test if array and T/F function passed in, strings', function() {
            var result = lodown.reject(["dog", "cat", "elephant", "dog", "elephant"], function(value){return value === "elephant"});
            expect(result).eql(["dog", "cat", "dog"]);
        });
        it('should coerce values to true/false if function does not do so', function() {
            var result = lodown.reject(["dog", "cat", "elephant", "dog", "elephant", 0, false, null], function(value){ return value});
            expect(result).eql([0, false, null]);
        });
    });
});


describe('lodown', function() {
    describe('partition', function() {
        it('should return array of 2 arrays with true values in one, false in the other, numbers', function() {
            var result = lodown.partition([1, 5, 7, 8, 10, 12], function(value){return value % 2 === 0});
            expect(result).eql([[8, 10, 12],[1, 5, 7]]);
        });
        it('should return array of values failing the test if array and T/F function passed in, numbers', function() {
            var result = lodown.partition([true, false, 7, undefined, true, 12], function(value){return value % 2 !== 0});
            expect(result).eql([[true, 7, undefined, true],[false, 12]]);
        });
        it('should return array of values failing the test if array and T/F function passed in, strings', function() {
            var result = lodown.partition(["dog", "cat", "elephant", "dog", "elephant"], function(value){return value === "elephant"});
            expect(result).eql([["elephant", "elephant"],["dog", "cat", "dog"]]);
        });
        it('should coerce values to true/false if function does not do so', function() {
            var result = lodown.partition(["dog", "cat", "elephant", "dog", "elephant", "", 0, false, null], function(value){ return value});
            expect(result).eql([["dog", "cat", "elephant", "dog", "elephant"],["",0, false, null]]);
        });
    });
});


//how to ensure either filter, reject, each is used, not for loop
//is correct for checking array equality for mutation of inputs???
//how to check if indexOf is used in this? regex on unique?
describe('lodown', function() {
    describe('unique', function() {
        it('should take array and return a new array with no repeats, numbers', function() {
            var input = [1, 5, 7, 8, 10, 12, 1, 7, 5, 5, 5, 1, 8];
            var result = lodown.unique(input);
            expect(result).eql([1, 5, 7, 8, 10, 12]);
            expect(result).to.not.equal(input);
        });
        it('should take array, return array with no repeats, random data', function() {
            var result = lodown.unique([true, 0, undefined, null, Date(), null, undefined, "cat", 37]);
            expect(result).eql([true, 0, undefined, null, Date(), "cat", 37]);
        });
    });
});


describe('lodown', function() {
    describe('map', function() {
        it('should take array and return a new array with action performed', function() {
            var result = lodown.map([1, 5, 7, 8, 10, 12], function(value){return value * 4;});
            expect(result).eql([4, 20, 28, 32, 40, 48]);
        });
        it('should take object and return a new object with action performed', function() {
            var result = lodown.map({a: "one", b: "three", c: "five", d: 7}, function(value, key){return value + " " + key});
            expect(result).eql(["one a", "three b", "five c", "7 d"]);
        });
    });
});


describe('lodown', function() {
    describe('pluck', function() {
        it('should take array and return a new array with value for associated property for each object', function() {
            var result = lodown.pluck([{name: "Mr. Biggles", species: "cat"}, {name: "Phred", species: "dog"}], "name");
            expect(result).eql(["Mr. Biggles", "Phred"]);
        });
        it('should take object and return a new object with action performed', function() {
            var result = lodown.pluck([{name: "Katty", species: "cat"}, {name: "Ben", species: "dog"}, {name: "Flippy"}], "species");
            expect(result).eql(["cat", "dog", undefined]);
        });
    });
});


describe('lodown', function() {
    describe('contains', function() {
        it('should return true if value is in the given array (seen once)', function() {
            var result = lodown.contains([1, 2, 3, true, null, undefined, "cat"], "cat");
            expect(result).equal(true);
        });
        it('should return true if value is in the given array (seen multiple times)', function() {
            var result = lodown.contains([1, 2, 3, true, null, undefined, "cat", 1], 1);
            expect(result).equal(true);
        });
        it('should return false if value is not in the given array', function() {
           var result = lodown.contains([1, 2, 6, "three", null, undefined, false], 0);
           expect(result).to.equal(false);
        });
    });
});


describe('lodown', function() {
    describe('every', function() {
        it('should take an array and return false unless every element in the array evaluates to true', function() {
            var result = lodown.every([1, 2, 3, 4, 5, 6, 7], function(value){return lodown.typeOf(value) === "number"});
            expect(result).equal(true);
        });
        it('should take an array and return false unless every element in array evals to true', function() {
            var result = lodown.every([1, 2, 3, true, null, undefined, "cat", 1], function(value){return lodown.typeOf(value) === "number"});
            expect(result).equal(false);
        });
        it('should take an object and return false unless every value evaluates to true', function() {
            var result = lodown.every({a: "One", name:"Doggie"}, function(value){return value[0] === 'D'});
            expect(result).equal(false);
        });
        it('should take an object and return false unless every value evaluates to true', function() {
            var result = lodown.every({a: "Dog", name:"Doggie"}, function(value){return value[0] === 'D'});
            expect(result).equal(true);
        });
        it('should coerce values to true/false if no function is given, return false unless all values are truthy', function() {
            var result = lodown.every({a: "Dog", name:"Doggie"});
            expect(result).equal(true);
        });
        it('should coerce values to true/false if no function is given, return false unless all values are truthy', function() {
            var result = lodown.every({a: 0, name:"Doggie"});
            expect(result).equal(false);
        });
    });
});


describe('lodown', function() {
    describe('some', function() {
        it('should take an array and true if any value evaluates to true, else false', function() {
            var result = lodown.some([1, "dog", 3, false, 5, "cat", 7], function(value){return lodown.typeOf(value) === "number"});
            expect(result).equal(true);
        });
        it('should take an array and true if any value evaluates to true, else false', function() {
            var result = lodown.some([false, "", null], function(value){return lodown.typeOf(value) === "number"});
            expect(result).equal(false);
        });
        it('should take an object and return true unless every value evaluates to false', function() {
            var result = lodown.some({a: "One", name:"Doggie"}, function(value){return value[0] === 'D'});
            expect(result).equal(true);
        });
        it('should take an object and return true unless every value evaluates to false', function() {
            var result = lodown.some({a: "what", name:"Neil"}, function(value){return value[0] === 'D'});
            expect(result).equal(false);
        });
        it('should coerce values to true/false if no function is given, return true unless all values are falsy', function() {
            var result = lodown.some({a: 0, name:"Doggie"});
            expect(result).equal(true);
        });
        it('should coerce values to true/false if no function is given, return true unless all values are falsy', function() {
            var result = lodown.some({a: 0, name:""});
            expect(result).equal(false);
        });
    });
});


describe('lodown', function() {
    describe('reduce', function() {
        it('should take an array, action, and seed value and return correct value --number', function() {
            var result = lodown.reduce([1, 3, 5, 7], function(rollResult, curVal, curIndex){return rollResult + curVal}, 2);
            expect(result).equal(18);
        });
        it('should take an array, action, and seed value and return correct value --string', function() {
            var result = lodown.reduce(["The", "dog", "ate", "the", "cat"], function(rollResult, curVal, curIndex){return rollResult + " " + curVal}, "1.");
            expect(result).equal("1. The dog ate the cat");
        });
        it('should take an array, action, and no seed value and return correct value --number', function() {
            var result = lodown.reduce([1, 3, 5, 7], function(rollResult, curVal, curIndex){return rollResult + curVal});
            expect(result).equal(16);
        });
        it('should take an array, action, and no seed value and return correct value --string', function() {
            var result = lodown.reduce(["The", "dog", "ate", "the", "cat"], function(rollResult, curVal, curIndex){return rollResult + " " + curVal});
            expect(result).equal("The dog ate the cat");
        });
    });
});


describe('lodown', function() {
    describe('extend', function() {
        it('should take objects and add all property-value pairs to the first object', function() {
            var result = lodown.extend({a: "one", b:"two"}, {c: "three", d: "five"}, {f: "twelve", h: "eighteen"});
            expect(result).eql({a:"one", b:"two", c:"three", d:"five", f:"twelve", h:"eighteen"});
        });
        it('should take objects and add all property-value pairs to the first object', function() {
            var result = lodown.extend({a: "one", b:"two"}, {a:"two", c:"two"});
            expect(result).eql({a:"two", b:"two", c:"two"});
        });
    });
});






