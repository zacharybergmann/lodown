'use strict';

// YOU KNOW WHAT TO DO //

/**
 * identity: Designed to return the value passed to the Function unaltered. Works
 * with any data type.
 * 
 * @param {Number | Null | Boolean | String | Undefined | Function | Object | Array} value 
 * The value to be passed back unaltered.
 * @return {Number | Null | Boolean | String | Undefined | Function | Object | Array} identity
 * returns the value that is input to the Function, unaltered.
 */
function identity(value) {
    return value;
}
module.exports.identity = identity;


/**
 * typeOf: Takes any type of js data and returns the data type as a string - "number", "null", 
 * "boolean", "string", "undefined", "function", "object", "array"
 * 
 * @param {Number | Null | Boolean | String | Undefined | Function | Object | Array} data 
 * Any piece of data to determine the data type of.
 * @return {String} typeOf returns a string specifying the data type. Data types identified by 
 * this function are: "number", "null", "boolean", "string", "undefined", "function", "object",
 * "array"
 */
function typeOf(data) {
    if(typeof data ==="string" || typeof data ==="function" || typeof data ==="number" || typeof data ==="undefined" || typeof data ==="boolean") {
        return typeof(data);
    }
    else {
        if(Array.isArray(data)) {
            return "array";
        } else if(data === null) {
            return "null";
        } else {
            return "object";
        }
    }
}
module.exports.typeOf = typeOf;


/**
 * first: Designed to return the first Number of values from an input Array in an Array. If Array input
 * is not an Array, the Function returns []. If the Number is NaN or not given, first returns the first 
 * element of Array in an Array. If Number is greater than Array length, the whole Array is returned.
 * 
 * @param {Array} arr The Array to have the first Number of values extracted from
 * @param {Number} num The Number of elements from the start of Array to return from the Function in
 * a separate Array.
 * @return {Array} first returns an Array with the first Number values of Array. 
 */
function first(arr, num) {
    if(!Array.isArray(arr)) return [];
    if(typeof num !== 'number') return [arr[0]];
    if(num < 0) {
        return [];
    } else if(num > arr.length) {
        num = arr.length;
    }
    let output = [];
    for(let i = 0; i < num ; i++) {
        output.push(arr[i]);
    }
    return output;
}
module.exports.first = first;


/**
 * last: Designed to return the last Number of values from an input Array in an Array. If Array input
 * is not an Array, the Function returns []. If the Number is NaN or not given, last returns the last 
 * element of Array in an Array. If Number is greater than Array length, the whole Array is returned.
 * 
 * @param {Array} arr The Array to have the last <Number> of values extracted from
 * @param {Number} num The Number of elements at the end of Array to return from the Function in a separate
 * Array.
 * @return {Array} last returns an Array with the last Number values of Array. 
 */
function last(arr, num) {
    if(!Array.isArray(arr)) return [];
    if(typeof num !== 'number') return [arr[arr.length - 1]];
    if(num < 0) {
        return [];
    } else if(num > arr.length) {
        num = arr.length;
    }
    let output = [];
    for(let i = arr.length - 1 ; num > 0 ; num-- , i--) {
        output.unshift(arr[i]);
    }
    return output;
}
module.exports.last = last;


/**
 * each: Designed to loop over a <collection>, Array or Object, and applies the <action>
 * Function to each value in the <collection>.
 * 
 * @param {Array | Object} collection The collection over which to iterate.
 * @param {Function} action The Function to be applied to each value in the collection.
 */
function each(collection, action) {
    if(Array.isArray(collection)) {
        for(var i = 0; i < collection.length; i++) {
            action(collection[i], i, collection);
        }
    } else {
        for (var key in collection) {
            action(collection[key], key, collection);
        }
    }
}
module.exports.each = each;

/**
 * indexOf: Designed to loop forward through an Array and return the index where a
 * specified value is first found.
 * 
 * @param {Array} arr The Array to loop forward through.
 * @param {Number} val The value to search for within Array.
 * @return {Number} indexOf returns the index where the first occurrance of the value
 * is found in the Array or -1 if not found.
 */
function indexOf(arr, val) {
    let instances = [];
    each(arr, function(value, position, collection) {
        if(val === value) {
            instances.push(position);
        }});
    if(instances.length > 0) return instances[0];
    return -1;
}
module.exports.indexOf = indexOf;


/**
 * filter: Designed to loop through an Array and perform some test on each value.
 * If the value passes the test, it is added to an Array, otherwise it is not. filter
 * then returns the Array of values that passed.
 * 
 * @param {Array} arr The Array to loop through and access each value.
 * @param {Function} test The test to apply to each value in the Array. test returns
 * a Boolean value.
 * @return {Array} filter returns an Array of the values from arr that passed the test
 * or were coerced to Boolean true.
 */
function filter(arr, test) {
    let output = [];
    each(arr, function(value, position, collection) { 
        if (!!test(value, position, collection)) {
            output.push(value);
        }
    });
    return output;
}
module.exports.filter = filter;


/**
 * reject: Designed to loop through an Array and perform some test on each value.
 * If the value fails the test, it is added to an Array, otherwise it is not. reject
 * then returns the Array of values that failed the test.
 * 
 * @param {Array} arr The Array to loop through and access each value.
 * @param{Function} test The test to apply to each value in the Array. test returns 
 * a Boolean value.
 * @return {Array} reject returns an Array of values from arr that failed the test or
 * were coerced to Boolean false.
 */
function reject(arr, test) {
    return filter(arr, function(value, position, collection){
        return !test(value, position, collection);
    });
}
module.exports.reject = reject;


/**
 * partition: Designed to return an Array that contains two Arrays. The first Array is
 * the values that evaluated to true when a test is run and the second Array is the values
 * that evaluated to false when the test was run.
 * 
 * @param {Array} arr The Array of values to loop through
 * @param {Function} test The test to run on each of the values in the Array.
 * @return {Array} partition returns and Array that contains two Arrays. The first contained
 * Array is the values from the input Array that evaluated to true while the second Array is
 * the values from the input Array that evaluated to false.
 */
function partition(arr, test) {
    let output = [];
    output.push(filter(arr, test));
    output.push(reject(arr, test));
    return output;
}
module.exports.partition = partition;


/**
 * unique: Designed to take an Array as input and return an Array with no repeated values.
 * 
 * @param {Array} arr The Array to iterate through.
 * @return {Array} unique returns an Array of values without any repeated values.
 */
function unique(arr) {
    let output = filter(arr, function(value, position, collection) {
        return indexOf(arr, value) === position;
    });
    return output;
}
module.exports.unique = unique;


/**
 * map: Designed to call a Function on every element in an Array and returns a new
 * Array with the return value from each Function call.
 * 
 * @param {Array | Object} collection The collection to iterate through
 * @param {Function} action The action to perform on every element in the Array
 * @return {Array} map returns an Array of return values from the Function call
 * on each element in the input Array.
 */
function map(collection, action) {
    let output = [];
    each(collection, function(value, position, collection) {
        output.push(action(value, position, collection));
    });
    return output;
}
module.exports.map = map;


/**
 * pluck: Designed to take an Array of Objects and a property name. pluck returns
 * an Array that contains the value of all Object's property name.
 * 
 * @param {Array} arr The Array of Objects to iterate through.
 * @param {String} propName A String containing a property name.
 * @return {Array} pluck returns an Array containing the value associated with
 * the specified property for all of the Objects in the Array.
 */
function pluck(arr, propName) {
    return map(arr, function(obj, position, collection) {
        return obj[propName];
    });
}
module.exports.pluck = pluck;


/**
 * contains: Designed to take an Array and a value. If the value is in the Array, contains
 * returns true, otherwise it returns false.
 * 
 * @param {Array} arr The Array to iterate through.
 * @param {String | Number | Boolean | null | undefined} value The value to be searched for within the Array.
 * @return {Boolean} contains returns true of the value is in the Array, otherwise false.
 */
function contains(arr, value){
    return indexOf(arr, value) !== -1 ? true : false;
}
module.exports.contains = contains;


/**
 * every: Designed to take an Object or Array and a Function. every calls the Function on
 * every element in the Object or Array and returns true if every element evaluates to 
 * true, otherwise returns false. If no Function is input, every will coerce the Array
 * values to Booleans and then return if every value is true, otherwise false.
 * 
 * @param {Array | Object} collection The collection to be iterated through.
 * @param {Function} test The test to be performed on each value in the collection.
 * @return {Boolean} every returns true if the result of every Function call is true, 
 * otherwise returns false. If no Function is given, every coerces the each value to
 * true or false and then returns true only if all values coerced to true, otherwise 
 * false.
 */
function every(collection, test) {
    if(test === undefined) {
        test = identity;
    }
    return reject(collection, test).length > 0 ? false : true;
}
module.exports.every = every;


/**
 * some: Designed to take an Array or Object and a Function to perform on each value
 * in the Array or Object. If any of the values evaluates to true when the Function is
 * called upon it, return true. Otherwise return false. If no Function is input, each
 * value in the Array or Object is coerced to a Boolean. If any are true, some returns
 * true. Otherwise false is returned.
 * 
 * @param {Array | Object} collection The collection to iterate through.
 * @param {Function} test The test that should be performed on each value in the collection.
 * @return {Boolean} some returns true if any value evaluates to true when Function is 
 * called upon it, otherwise false. If no Function is input, each collection value is 
 * coerced to a Boolean and if any of them are true, true is returned. Otherwise, false 
 * is returned.
 */
function some(collection, test) {
    if(test === undefined) {
        test = identity;
    }
    return filter(collection, test).length > 0 ? true : false;
} 
module.exports.some = some;


/**
 * reduce: Designed to take an Array, a Function, and a seed value. The Function is 
 * called with the previous result, element, and index as parameters. If no previous
 * result is available yet, the seed is used. If no seed is input, the first value 
 * in the Array is used as the seed and the first value that the Function is called on
 * is the second value in the Array. The previous result input to each Function is the
 * returned value from the Function call on the previous element. reduce returns the 
 * return value from the Function call on the final element.
 * 
 * @param {Array} arr The Array to iterate through.
 * @param {Function} action The Function to perform on every value in the Array.
 * @param {Number | String | Boolean | Array | Object} seed The seed is a starting 
 * value and is used as the previous result for the function call on the first element
 * in the Array.
 * @return {Number | String | Boolean | Array | Object} reduce returns the return value 
 * from the function call on the final element of the Array.
 */
function reduce(arr, action, seed) {
    var rollingResult;
    if(seed === undefined) {
        rollingResult = arr[0];
        each(arr, function(value, index, collection) {
            index === 0 ? rollingResult = rollingResult : rollingResult = action(rollingResult, value, index);
        });
    } else {
        rollingResult = seed;
        each(arr, function(value, index, collection){
            rollingResult = action(rollingResult, value, index);
        });
    }
    return rollingResult;    
}
module.exports.reduce = reduce;


/**
 * extend: Designed to take two or more Objects and add all key-value pairs from every 
 * Object to the first argument Object. This Object is then returned.
 * 
 * @param {Object} obj1 The Object to have all property name and value pairs added to.
 * @param {Object} obj2 The Object that will have properties copied from.
 * @param {Object} .... Other Objects that will have properties copied from.
 * @return {Object} extend returns the first argument Object once all of the key-value
 * pairs from all other Objects have been added to it. 
 */
function extend(obj1, obj2) {
    each(arguments, function(obj, index, objs) {
        each(obj, function(val, key, obj) {
            obj1[key] = val;
        });
    });
   return obj1; 
}
module.exports.extend = extend;