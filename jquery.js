/*!
 * jQuery JavaScript Library v2.2.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:23Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var arr = [];

var document = window.document;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "2.2.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isPlainObject: function( obj ) {
		var key;

		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		// Not own constructor property must be Object
		if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype || {}, "isPrototypeOf" ) ) {
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {

			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf( "use strict" ) === 1 ) {
				script = document.createElement( "script" );
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {

				// Otherwise, avoid the DOM node creation, insertion
				// and removal by using an indirect global eval

				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if iod �.  �#  �#   �    _nc_check_termtype ��#  �#  $  $  .   �!   _nc_check_termtype2 �/$  �#  colorpair_t yH$  &�^  '�   �n$  (M_XTERM )M_NONE   MouseType �M$  '
  ��$  )MF_X10  )MF_SGR1006  MouseFormat ��$  �%  hashval ��   oldcount ��   newcount ��   %�^  ��   newindex ��    HASHMAP ��$  ��%  ent_text ��   form_text ��  ent_x ��   dirty ��  visible ��  
  �addch_x *�   �addch_y +�   � f+  �  ,  	\   NCURSES_GLOBALS ��(  _nc_globals �,  * �d-  allocated �d-   use_env �.  filter_mode �.  previous_attr �C  %c^  �j-  rsp �z-  Htparm_state �H(  Lsaved_tty ��-  �$,^  �.  �_outch ��  �real_acs_map ��-  �_LINES ��   �_COLS ��   �$�^  ��   �$�^  ��   �_cur_term ��&  �$B^  �.  � �  m&  z-  	\   m&  s  �  NCURSES_PRESCREEN �1,  _nc_prescreen �-  �
��  __count ��    __value �%   _mbstate_t �e  _flock_t ��  �  char 
  2  ,  �    2  !  �  H  	Y   _impure_ptr   _global_impure_ptr    suboptarg c�  time_t (�   _timezone ��   _daylight ��   �  �  	Y    _tzname ��  !daylight 	__daylight �   !timezone 	!__timezone �  �  
�
�
�   #B
 `  TRIES `  chtype ��  mmask_t ��  SCREEN ��  screen $G  _ifd �    _ofd �   _ofp �-  out_buffer �  out_limit �   out_inuse �   _filtered &  _prescreen &  _use_env &  _checkfd �   _term �&   _saved_tty k  $_lines �   P_columns �   T_lines_avail �   X_topstolen �   \_curscr !�  `_newscr "�  d_stdscr #�  h_keytry )�-  l_key_ok *�-  p_tried +&  t_keypad_on ,&  u_called_wgetch .&  v_fifo /�-  x_fifohead 0}  �_fifotail 1}  �_fifopeek 2}  �_fifohold 3}  �_endwin 5�   �_current_attr 6�  �_coloron 7�   �_color_defs 8�   �_cursor 9�   �_cursrow :�   �_curscol ;�   �_notty <&  �_nl =�   �_raw >�   �_cbreak ?�   �_echo A�   �_use_meta B�   �_slk C�-  �$�_  D�   �$'_  G&  �_char_padding I�   �_cr_cost J�   �_cup_cost K�   �_home_cost L�   �_ll_cost M�   �_cub1_cost R�   �_cuf1_cost S�   �_cud1_cost T�    _cuu1_cost U�   _cub_cost V�   _cuf_cost W�   _cud_cost X�   _cuu_cost Y�   _hpa_cost Z�   _vpa_cost [�   _ed_cost ]�    _el_cost ^�   $_el1_cost _�   (_dch1_cost `�   ,_ich1_cost a�   0_dch_cost b�   4_ich_cost c�   8_ech_cost d�   <_rep_cost e�   @_hpa_ch_cost f�   D_cup_ch_cost g�   H_cuf_ch_cost h�   L_inline_cost i�   P_smir_cost j�   T_rmir_cost k�   X_ip_cost l�   \_address_cursor n�  `_scrolling p�   d_color_table s�-  h_color_count t�   l$�_  u�-  p_pair_count v�   t_pair_limit w�   x_assumed_color y&  |_default_color z&  }_has_sgr_39_49 {&  ~_default_fg |�   �_default_bg }�   �_default_pairs ~�   �_ok_attributes ��  �_xmc_suppress ��  �_xmc_triggers ��  �_acs_map �~-  �_screen_acs_map ��-  �_use_rmso �&  �_use_rmul �&  �_use_ritm �&  �_nc_sp_idlok �&  �_nc_sp_idcok �&  �_mouse_initialized �&  �_mouse_type �f$  �_maxclick ��   �_mouse_event ��-  �_mouse_inline ��-  �_mouse_parse �.  �_mouse_resume �".  �_mouse_wrap �".  �_mouse_fd ��   �_mouse_active �&  �_mouse_mask ��  �_mouse_mask2 ��  �_mouse_bstate ��  �_mouse_format ��$  �_mouse_xtermcap ��  �_mouse_events �(.  �_mouse_eventp �8.  �_resize �W.  �_ungetch ��  �_panelHook ��  �_sig_winch �&  �_next_screen ��  �oldhash �].  �newhash �].  �hashtab �c.  �hashtab_len ��   �_oldnum_list ��!  �_oldnum_size ��   �_outch ��  �_legacy_coding ��   �_ttytype �i.  �$�_  ��   �$�_  ��   �_LINES ��   �_COLS ��   �jump �  �$Q_  b-  �rsp 	r-  $=_  &  _screen_acs_fix &  _screen_unicode &  _ordered_pairs �  _pairs_used �   _recent_pair �     WINDOW �V  _win_st ��@  _cury ��    _curx ��   _maxy ��   _maxx ��   _begy ��   _begx ��   _flags �}  _attrs �@  _bkgd ��   _notimeout �&  $_clear �&  %_leaveok �&  &_scroll �&  '_idlok �&  (_idcok �&  )_immed �&  *_sync �&  +_use_keypad �&  ,_delay ��   0_line �~  4_regtop ��   8_regbottom ��   <_parx ��   @_pary ��   D_parent ��  H_pad ��  L_yoffset ��   d_bkgrnd ��  h_color ��   | attr_t ��  ��  attr �@   chars ��  ext_color ��      �  	Y   cchar_t �O  pdat �&  _pad_y ��    _pad_x ��   _pad_top ��   _pad_left ��   _pad_bottom ��   _pad_right ��    _Bool ldat �~  text ��   firstchar ��   lastchar ��   %u_  ��    /  G  NCURSES_OUTC K�  �  �   �  �    �  NCURSES_OUTC_sp ��  �  �   �  �  �    _nc_wacs 7�  �  �J  id �}   x ��   y ��   z ��   bstate ��   MEVENT �  G�  red I�    green I�   blue I�   r J�   g J�   b J�   init K�    color_t MY  panelhook 5"  top_panel 7)   bottom_panel 8)  stdscr_pseudo_panel 9)   panel "  cc_t �l  tcflag_t �  speed_t    /  k  	Y   termios ,   c_iflag ;   c_oflag ;  c_cflag ;  c_lflag ;  c_line �  c_cc [  c_ispeed K  $c_ospeed K  ( termtype (��   %_  ��   %3_  ��  %H_  ��  Numbers ��   Strings �j
r9#  name s�   link t9#  line u�   M"  ENTRY_USES v	#  ?#  a#  	Y   9#  q#  	Y    _nc_head �9#   _nc_tail �9#   _nc_user_definable �&   _nc_disable_period �&  �#  �#   �    _nc_check_termtype ��#  �#  $  $  &   �!   _nc_check_termtype2 �'$  �#  colorpair_t y@$  &�_  '�   �f$  (M_XTERM )M_NONE   MouseType �E$  '  ��$  )MF_X10  )MF_SGR1006  MouseFormat �x$  �%  hashval ��   oldcount ��   newcount ��   %u_  ��   newindex ��    HASHMAP ��$  �|%  ent_text ��   form_text ��  ent_x ��   dirty ��  visible ��  
��  __count ��    __value �)   _mbstate_t �i  _flock_t ��  �  char 
      �  �  �      
  �    �  �  �    �  
�
�
�   #F
 d  TRIES d  chtype ��  mmask_t ��  SCREEN ��  screen $K  _ifd �    _ofd �   _ofp �-  out_buffer �  out_limit �   out_inuse �   _filtered *  _prescreen *  _use_env *  _checkfd �   _term �&   _saved_tty o  $_lines �   P_columns �   T_lines_avail �   X_topstolen �   \_curscr !�  `_newscr "�  d_stdscr #�  h_keytry )�-  l_key_ok *�-  p_tried +*  t_keypad_on ,*  u_called_wgetch .*  v_fifo /�-  x_fifohead 0�  �_fifotail 1�  �_fifopeek 2�  �_fifohold 3�  �_endwin 5�   �_current_attr 6  �_coloron 7�   �_color_defs 8�   �_cursor 9�   �_cursrow :�   �_curscol ;�   �_notty <*  �_nl =�   �_raw >�   �_cbreak ?�   �_echo A�   �_use_meta B�   �_slk C�-  �$�`  D�   �$
`  G*  �_char_padding I�   �_cr_cost J�   �_cup_cost K�   �_home_cost L�   �_ll_cost M�   �_cub1_cost R�   �_cuf1_cost S�   �_cud1_cost T�    _cuu1_cost U�   _cub_cost V�   _cuf_cost W�   _cud_cost X�   _cuu_cost Y�   _hpa_cost Z�   _vpa_cost [�   _ed_cost ]�    _el_cost ^�   $_el1_cost _�   (_dch1_cost `�   ,_ich1_cost a�   0_dch_cost b�   4_ich_cost c�   8_ech_cost d�   <_rep_cost e�   @_hpa_ch_cost f�   D_cup_ch_cost g�   H_cuf_ch_cost h�   L_inline_cost i�   P_smir_cost j�   T_rmir_cost k�   X_ip_cost l�   \_address_cursor n�  `_scrolling p�   d_color_table s�-  h_color_count t�   l$y`  u�-  p_pair_count v�   t_pair_limit w�   x_assumed_color y*  |_default_color z*  }_has_sgr_39_49 {*  ~_default_fg |�   �_default_bg }�   �_default_pairs ~�   �_ok_attributes ��  �_xmc_suppress ��  �_xmc_triggers ��  �_acs_map ��-  �_screen_acs_map ��-  �_use_rmso �*  �_use_rmul �*  �_use_ritm �*  �_nc_sp_idlok �*  �_nc_sp_idcok �*  �_mouse_initialized �*  �_mouse_type �j$  �_maxclick ��   �_mouse_event ��-  �_mouse_inline ��-  �_mouse_parse �.  �_mouse_resume �&.  �_mouse_wrap �&.  �_mouse_fd ��   �_mouse_active �*  �_mouse_mask ��  �_mouse_mask2 ��  �_mouse_bstate ��  �_mouse_format ��$  �_mouse_xtermcap ��  �_mouse_events �,.  �_mouse_eventp �<.  �_resize �[.  �_ungetch ��  �_panelHook ��  �_sig_winch �*  �_next_screen ��  �oldhash �a.  �newhash �a.  �hashtab �g.  �hashtab_len ��   �_oldnum_list ��!  �_oldnum_size ��   �_outch ��  �_legacy_coding ��   �_ttytype �m.  �$o`  ��   �$�`  ��   �_LINES ��   �_COLS ��   �jump �  �$4`  f-  �rsp 	v-  $ `  *  _screen_acs_fix *  _screen_unicode *  _ordered_pairs �  _pairs_used �   _recent_pair �     WINDOW �Z  _win_st ��D  _cury ��    _curx ��   _maxy ��   _maxx ��   _begy ��   _begx ��   _flags ��  _attrs �D  _bkgd ��   _notimeout �*  $_clear �*  %_leaveok �*  &_scroll �*  '_idlok �*  (_idcok �*  )_immed �*  *_sync �*  +_use_keypad �*  ,_delay ��   0_line ��  4_regtop ��   8_regbottom ��   <_parx ��   @_pary ��   D_parent ��  H_pad ��  L_yoffset ��   d_bkgrnd ��  h_color ��   | attr_t ��  ��  attr �D   chars ��  ext_color ��      �  	]   cchar_t �S  pdat �*  _pad_y ��    _pad_x ��   _pad_top ��   _pad_left ��   _pad_bottom ��   _pad_right ��    _Bool ldat ��  text �   firstchar ��   lastchar ��   %X`  ��    3  K  NCURSES_OUTC K�  �  �   �  �    �  NCURSES_OUTC_sp ��  �  �   �  �  �    _nc_wacs 7  �  �N  id ��   x ��   y ��   z ��   bstate ��   MEVENT �  G�  red I�    green I�   blue I�   r J�   g J�   b J�   init K�    color_t M]  panelhook 5&  top_panel 7-   bottom_panel 8-  stdscr_pseudo_panel 9-   panel &  cc_t �p  tcflag_t �  speed_t    3  o  	]   termios ,   c_iflag ?   c_oflag ?  c_cflag ?  c_lflag ?  c_line �  c_cc _  c_ispeed O  $c_ospeed O  ( termtype (��   %�_  ��   %`  ��  %+`  ��  Numbers ��   Strings �n
r=#  name s�   link t=#  line u�   Q"  ENTRY_USES v
$  
$  *   �!   _nc_check_termtype2 �+$  �#  colorpair_t yD$  &y`  '�   �j$  (M_XTERM )M_NONE   MouseType �I$  '  ��$  )MF_X10  )MF_SGR1006  MouseFormat �|$  �%  hashval ��   oldcount ��   newcount ��   %X`  ��   newindex ��    HASHMAP ��$  ��%  ent_text ��   form_text ��  ent_x ��   dirty ��  visible ��  
`  �*  �_outch ��  �real_acs_map ��-  �_LINES ��   �_COLS ��   �$�`  ��   �$o`  ��   �_cur_term ��&  �$ `  �*  � �  i&  v-  	]   i&  o  �  NCURSES_PRESCREEN �-,  _nc_prescreen �-  �
_   sizetype ��  __count ��    __value �+   _mbstate_t �k  _flock_t ��  
_    __tm $7�  __tm_sec 9�    __tm_min :�   __tm_hour ;�   __tm_mday <�   __tm_mon =�   __tm_year >�   __tm_wday ?�   __tm_yday @�   __tm_isdst A�     �`  JQ  _fnargs KQ   _dso_handle LQ  �_fntypes N�   _is_cxa Q�   	�  a  
_   _atexit �]�  _next ^�   _ind _�   _fns a�  �`  b�  � 
_   
  4__sdidinit I�   8__cleanup K  <_result N8  @_result_k O�   D_p5s P8  H_freelist Q!  L_cvtlen T�   P_cvtbuf U�  T_new x�  X_atexit |�  H_atexit0 }a  L_sig_func �2  �__sglue �	  �__sf �>  � 
_   	r  Q  
_    __sFILE64 p��  _p ��   _r ��   _w ��   _flags �  _file �  _bf ��  _lbfsize ��   _data �  _cookie ��   _read ��  $_write ��  (_seek   ,_close +  0_ub �  4_up �  <_ur �   @_ubuf 1  D_nbuf A  G_lb �  H_blksize �   P_flags2 �   T_offset �  X_seek64 �  `_lock �  d_mbstate �  h �  �    �  �  �    
_   �YI  _unused_rand [   _strtok_last \�  _asctime_buf ]I  _localtime_buf ^N  $_gamma_signgam _�   H_rand_next `�  P_r48 aN	  X_mblen_state b�  h_mbtowc_state c�  p_wctomb_state d�  x_l64a_buf eY  �_signal_buf fi  �_getdate_err g�   �_mbrlen_state h�  �_mbrtowc_state i�  �_mbsrtowcs_state j�  �_wcrtomb_state k�  �_wcsrtombs_state l�  �_h_errno m�   � 	�  Y  
_   	�  i  
_   	�  y  
_   �r�  _nextf u�   _nmalloc v�  x 	�  �  
_   	  �  
_   �W�  _reent n�	  _unused wy   	�  �  
_   __locale_t 
_   _impure_ptr   _global_impure_ptr    suboptarg c�  time_t (�   _timezone ��   _daylight ��   	�  �  
_    _tzname ��  !daylight 	__daylight �   !timezone 	!__timezone �  	�  
�
�
�   #H
 
_   cchar_t �U  �  pdat �1  _pad_y ��    _pad_x ��   _pad_top ��   _pad_left ��   _pad_bottom ��   _pad_right ��    _Bool ldat ��  text �   firstchar ��   lastchar ��   %Wa  ��    
_   termios ,   c_iflag F   c_oflag F  c_cflag F  c_lflag F  c_line �  c_cc f  c_ispeed V  $c_ospeed V  ( termtype (��   %�`  ��   %�a  ��  %a  ��  Numbers ��   Strings �p
_   	D#  |#  
_    _nc_head �D#   _nc_tail �D#   _nc_user_definable �1   _nc_disable_period �1  �#  �#   
_   	�   K(  
_   TPARM_STATE Fd'  k�(  name l�   value m�   ITERATOR_VARS n_(  �sI+  have_sigtstp t\
_   	�(  i+  
_   _win_list �#�+  next $�+   screen %�  win &M  addch_work (�.  �addch_used )  �addch_x *�   �addch_y +�   � 
_   NCURSES_GLOBALS ��(  _nc_globals �,  * �g-  allocated �g-   use_env �1  filter_mode �1  previous_attr �F  %(a  �m-  rsp �}-  Htparm_state �K(  Lsaved_tty ��-  �$�`  �1  �_outch ��  �real_acs_map ��-  �_LINES ��   �_COLS ��   �$va  ��   �$�a  ��   �_cur_term ��&  �$�`  �1  � 
_   
_  � 
_   
_  � _nc_screen_chain  �  _nc_have_sigwinch !\
_  H _nc_oldnums ��!  SP ��  +wins_nwstr g�   "�mn  �n0  ,win g�  � ,wstr gn0  �-n g�   �� .code i�   �� /�3  \0  .cp un0  }� .sp v�  �� .oy w�   �� .ox x�   
��  __count ��    __value �%   _mbstate_t �e  _flock_t ��  �  char 
  2  ,  �    2  !  �  H  	Y   _impure_ptr   _global_impure_ptr    suboptarg c�  time_t (�   _timezone ��   _daylight ��   �  �  	Y    _tzname ��  !daylight 	__daylight �   !timezone 	!__timezone �  �  
�
�
�   #B
 `  TRIES `  chtype ��  mmask_t ��  SCREEN ��  screen $G  _ifd �    _ofd �   _ofp �-  out_buffer �  out_limit �   out_inuse �   _filtered &  _prescreen &  _use_env &  _checkfd �   _term �&   _saved_tty k  $_lines �   P_columns �   T_lines_avail �   X_topstolen �   \_curscr !�  `_newscr "�  d_stdscr #�  h_keytry )�-  l_key_ok *�-  p_tried +&  t_keypad_on ,&  u_called_wgetch .&  v_fifo /�-  x_fifohead 0}  �_fifotail 1}  �_fifopeek 2}  �_fifohold 3}  �_endwin 5�   �_current_attr 6�  �_coloron 7�   �_color_defs 8�   �_cursor 9�   �_cursrow :�   �_curscol ;�   �_notty <&  �_nl =�   �_raw >�   �_cbreak ?�   �_echo A�   �_use_meta B�   �_slk C�-  �$�b  D�   �$
r9#  name s�   link t9#  line u�   M"  ENTRY_USES v	#  ?#  a#  	Y   9#  q#  	Y    _nc_head �9#   _nc_tail �9#   _nc_user_definable �&   _nc_disable_period �&  �#  �#   �    _nc_check_termtype ��#  �#  $  $  &   �!   _nc_check_termtype2 �'$  �#  colorpair_t y@$  &|b  '�   �f$  (M_XTERM )M_NONE   MouseType �E$  '  ��$  )MF_X10  )MF_SGR1006  MouseFormat �x$  �%  hashval ��   oldcount ��   newcount ��   %[b  ��   newindex ��    HASHMAP ��$  �|%  ent_text ��   form_text ��  ent_x ��   dirty ��  visible ��  
��  __count ��    __value �'   _mbstate_t �g  _flock_t ��  �  char 
�
�
�   #D
 b  TRIES b  chtype ��  mmask_t ��  SCREEN ��  screen $I  _ifd �    _ofd �   _ofp �-  out_buffer �  out_limit �   out_inuse �   _filtered (  _prescreen (  _use_env (  _checkfd �   _term �&   _saved_tty m  $_lines �   P_columns �   T_lines_avail �   X_topstolen �   \_curscr !�  `_newscr "�  d_stdscr #�  h_keytry )�-  l_key_ok *�-  p_tried +(  t_keypad_on ,(  u_called_wgetch .(  v_fifo /�-  x_fifohead 0  �_fifotail 1  �_fifopeek 2  �_fifohold 3  �_endwin 5�   �_current_attr 6�  �_coloron 7�   �_color_defs 8�   �_cursor 9�   �_cursrow :�   �_curscol ;�   �_notty <(  �_nl =�   �_raw >�   �_cbreak ?�   �_echo A�   �_use_meta B�   �_slk C�-  �$�c  D�   �$�b  G(  �_char_padding I�   �_cr_cost J�   �_cup_cost K�   �_home_cost L�   �_ll_cost M�   �_cub1_cost R�   �_cuf1_cost S�   �_cud1_cost T�    _cuu1_cost U�   _cub_cost V�   _cuf_cost W�   _cud_cost X�   _cuu_cost Y�   _hpa_cost Z�   _vpa_cost [�   _ed_cost ]�    _el_cost ^�   $_el1_cost _�   (_dch1_cost `�   ,_ich1_cost a�   0_dch_cost b�   4_ich_cost c�   8_ech_cost d�   <_rep_cost e�   @_hpa_ch_cost f�   D_cup_ch_cost g�   H_cuf_ch_cost h�   L_inline_cost i�   P_smir_cost j�   T_rmir_cost k�   X_ip_cost l�   \_address_cursor n�  `_scrolling p�   d_color_table s�-  h_color_count t�   l$�b  u�-  p_pair_count v�   t_pair_limit w�   x_assumed_color y(  |_default_color z(  }_has_sgr_39_49 {(  ~_default_fg |�   �_default_bg }�   �_default_pairs ~�   �_ok_attributes ��  �_xmc_suppress ��  �_xmc_triggers ��  �_acs_map �{-  �_screen_acs_map ��-  �_use_rmso �(  �_use_rmul �(  �_use_ritm �(  �_nc_sp_idlok �(  �_nc_sp_idcok �(  �_mouse_initialized �(  �_mouse_type �h$  �_maxclick ��   �_mouse_event ��-  �_mouse_inline ��-  �_mouse_parse �.  �_mouse_resume �.  �_mouse_wrap �.  �_mouse_fd ��   �_mouse_active �(  �_mouse_mask ��  �_mouse_mask2 ��  �_mouse_bstate ��  �_mouse_format ��$  �_mouse_xtermcap ��  �_mouse_events �%.  �_mouse_eventp �5.  �_resize �T.  �_ungetch ��  �_panelHook ��  �_sig_winch �(  �_next_screen ��  �oldhash �Z.  �newhash �Z.  �hashtab �`.  �hashtab_len ��   �_oldnum_list ��!  �_oldnum_size ��   �_outch ��  �_legacy_coding ��   �_ttytype �f.  �$kc  ��   �$uc  ��   �_LINES ��   �_COLS ��   �jump �  �$'c  _-  �rsp 	o-  $c  (  _screen_acs_fix (  _screen_unicode (  _ordered_pairs �  _pairs_used �   _recent_pair �     WINDOW �X  _win_st ��B  _cury ��    _curx ��   _maxy ��   _maxx ��   _begy ��   _begx ��   _flags �  _attrs �B  _bkgd ��   _notimeout �(  $_clear �(  %_leaveok �(  &_scroll �(  '_idlok �(  (_idcok �(  )_immed �(  *_sync �(  +_use_keypad �(  ,_delay ��   0_line ��  4_regtop ��   8_regbottom ��   <_parx ��   @_pary ��   D_parent ��  H_pad ��  L_yoffset ��   d_bkgrnd ��  h_color ��   | attr_t ��  ��  attr �B   chars ��  ext_color ��      �  	[   cchar_t �Q  pdat �(  _pad_y ��    _pad_x ��   _pad_top ��   _pad_left ��   _pad_bottom ��   _pad_right ��    _Bool ldat ��  text ��   firstchar ��   lastchar ��   %Tc  ��    1  I  NCURSES_OUTC K�  �  �   �  �    �  NCURSES_OUTC_sp ��  �  �   �  �  �    _nc_wacs 7�  �  �L  id �   x ��   y ��   z ��   bstate ��   MEVENT �  G�  red I�    green I�   blue I�   r J�   g J�   b J�   init K�    color_t M[  panelhook 5$  top_panel 7+   bottom_panel 8+  stdscr_pseudo_panel 9+   panel $  cc_t �n  tcflag_t �	  speed_t  	  1  m  	[   termios ,   c_iflag =   c_oflag =  c_cflag =  c_lflag =  c_line �  c_cc ]  c_ispeed M  $c_ospeed M  ( termtype (��   %�b  ��   %	c  ��  %c  ��  Numbers ��   Strings �l
r;#  name s�   link t;#  line u�   O"  ENTRY_USES v#  A#  c#  	[   ;#  s#  	[    _nc_head �;#   _nc_tail �;#   _nc_user_definable �(   _nc_disable_period �(  �#  �#   �    _nc_check_termtype ��#  �#  $  $  (   �!   _nc_check_termtype2 �)$  �#  colorpair_t yB$  &�b  '�   �h$  (M_XTERM )M_NONE   MouseType �G$  '	  ��$  )MF_X10  )MF_SGR1006  MouseFormat �z$  �%  hashval ��   oldcount ��   newcount ��   %Tc  ��   newindex ��    HASHMAP ��$  �~%  ent_text ��   form_text ��  ent_x ��   dirty ��  visible ��  
 GNU C11 6.4.0 20170704 (Fedora Cygwin 6.4.0-1) -mtune=generic -march=i686 -g -O2 --param max-inline-insns-single=1200 ../../ncurses/widechar/lib_pecho_wchar.c /builddir/build/BUILD/ncurses-6.0-20170617/build_32bit/ncurses 0%�mp   47 int size_t �  unsigned int wchar_t H,  short unsigned int long long int long double signed char unsigned char short int long long unsigned int long unsigned int _LOCK_T �  long int _off64_t ^B  _fpos_t r�  _fpos64_t x�  _ssize_t ��   wint_t e  �N  __wch �  __wchb �N   q  ^  	^   sizetype 
��  __count ��    __value �*   _mbstate_t �j  _flock_t ��  �  char 
�
�
�   #G
 e  TRIES e  chtype ��  mmask_t ��  SCREEN ��  screen $L  _ifd �    _ofd �   _ofp �-  out_buffer �  out_limit �   out_inuse �   _filtered 0  _prescreen 0  _use_env 0  _checkfd �   _term �&   _saved_tty u  $_lines �   P_columns �   T_lines_avail �   X_topstolen �   \_curscr !�  `_newscr "�  d_stdscr #�  h_keytry )�-  l_key_ok *�-  p_tried +0  t_keypad_on ,0  u_called_wgetch .0  v_fifo /�-  x_fifohead 0�  �_fifotail 1�  �_fifopeek 2�  �_fifohold 3�  �_endwin 5�   �_current_attr 6  �_coloron 7�   �_color_defs 8�   �_cursor 9�   �_cursrow :�   �_curscol ;�   �_notty <0  �_nl =�   �_raw >�   �_cbreak ?�   �_echo A�   �_use_meta B�   �_slk C�-  �$�d  D�   �$�c  G0  �_char_padding I�   �_cr_cost J�   �_cup_cost K�   �_home_cost L�   �_ll_cost M�   �_cub1_cost R�   �_cuf1_cost S�   �_cud1_cost T�    _cuu1_cost U�   _cub_cost V�   _cuf_cost W�   _cud_cost X�   _cuu_cost Y�   _hpa_cost Z�   _vpa_cost [�   _ed_cost ]�    _el_cost ^�   $_el1_cost _�   (_dch1_cost `�   ,_ich1_cost a�   0_dch_cost b�   4_ich_cost c�   8_ech_cost d�   <_rep_cost e�   @_hpa_ch_cost f�   D_cup_ch_cost g�   H_cuf_ch_cost h�   L_inline_cost i�   P_smir_cost j�   T_rmir_cost k�   X_ip_cost l�   \_address_cursor n�  `_scrolling p�   d_color_table s�-  h_color_count t�   l$id  u�-  p_pair_count v�   t_pair_limit w�   x_assumed_color y0  |_default_color z0  }_has_sgr_39_49 {0  ~_default_fg |�   �_default_bg }�   �_default_pairs ~�   �_ok_attributes ��  �_xmc_suppress ��  �_xmc_triggers ��  �_acs_map ��-  �_screen_acs_map ��-  �_use_rmso �0  �_use_rmul �0  �_use_ritm �0  �_nc_sp_idlok �0  �_nc_sp_idcok �0  �_mouse_initialized �0  �_mouse_type �p$  �_maxclick ��   �_mouse_event �.  �_mouse_inline �.  �_mouse_parse �.  �_mouse_resume �,.  �_mouse_wrap �,.  �_mouse_fd ��   �_mouse_active �0  �_mouse_mask ��  �_mouse_mask2 ��  �_mouse_bstate ��  �_mouse_format ��$  �_mouse_xtermcap ��  �_mouse_events �2.  �_mouse_eventp �B.  �_resize �a.  �_ungetch ��  �_panelHook ��  �_sig_winch �0  �_next_screen ��  �oldhash �g.  �newhash �g.  �hashtab �m.  �hashtab_len ��   �_oldnum_list ��!  �_oldnum_size ��   �_outch ��  �_legacy_coding ��   �_ttytype �s.  �$_d  ��   �$vd  ��   �_LINES ��   �_COLS ��   �jump �  �$$d  l-  �rsp 	|-  $d  0  _screen_acs_fix 0  _screen_unicode 0  _ordered_pairs �  _pairs_used �   _recent_pair �     WINDOW �[  _win_st ��E  _cury ��    _curx ��   _maxy ��   _maxx ��   _begy ��   _begx ��   _flags ��  _attrs �E  _bkgd ��   _notimeout �0  $_clear �0  %_leaveok �0  &_scroll �0  '_idlok �0  (_idcok �0  )_immed �0  *_sync �0  +_use_keypad �0  ,_delay ��   0_line ��  4_regtop ��   8_regbottom ��   <_parx ��   @_pary ��   D_parent ��  H_pad ��  L_yoffset ��   d_bkgrnd ��  h_color ��   | attr_t ��  ��  attr �E   chars ��  ext_color ��      �  	^   cchar_t �T  
rC#  name s�   link tC#  line u�   W"  ENTRY_USES v#  I#  k#  	^   C#  {#  	^    _nc_head �C#   _nc_tail �C#   _nc_user_definable �0   _nc_disable_period �0  �#  �#   �    _nc_check_termtype ��#  �#  $  $  0   �!   _nc_check_termtype2 �1$   $  colorpair_t yJ$  &id  '�   �p$  (M_XTERM )M_NONE   MouseType �O$  '  ��$  )MF_X10  )MF_SGR1006  MouseFormat ��$  �%  hashval ��   oldcount ��   newcount ��   %Hd  ��   newindex ��    HASHMAP ��$  ��%  ent_text ��   form_text ��  ent_x ��   dirty ��  visible ��  
`   sizetype ��  __count ��    __value �,   _mbstate_t �l  _flock_t ��  
`    __tm $7�  __tm_sec 9�    __tm_min :�   __tm_hour ;�   __tm_mday <�   __tm_mon =�   __tm_year >�   __tm_wday ?�   __tm_yday @�   __tm_isdst A�     �d  JR  _fnargs KR   _dso_handle LR  �_fntypes N�   _is_cxa Q�   	�  b  
`   _atexit �]�  _next ^�   _ind _�   _fns a�  �d  b�  � 
`   
`   	s  R  
`    __sFILE64 p��  _p ��   _r ��   _w ��   _flags �  _file �  _bf ��  _lbfsize ��   _data �  _cookie ��   _read ��  $_write ��  (_seek   ,_close ,  0_ub �  4_up �  <_ur �   @_ubuf 2  D_nbuf B  G_lb �  H_blksize �   P_flags2 �   T_offset �  X_seek64 �  `_lock �  d_mbstate �  h �  �    �  �  �    
`   �YJ  _unused_rand [	   _strtok_last \�  _asctime_buf ]J  _localtime_buf ^O  $_gamma_signgam _�   H_rand_next `�  P_r48 aO	  X_mblen_state b�  h_mbtowc_state c�  p_wctomb_state d�  x_l64a_buf eZ  �_signal_buf fj  �_getdate_err g�   �_mbrlen_state h�  �_mbrtowc_state i�  �_mbsrtowcs_state j�  �_wcrtomb_state k�  �_wcsrtombs_state l�  �_h_errno m�   � 	�  Z  
`   	�  j  
`   	�  z  
`   �r�  _nextf u�   _nmalloc v�  x 	�  �  
`   		  �  
`   �W�  _reent n�	  _unused wz   	�  �  
`   __locale_t 
`   _impure_ptr   _global_impure_ptr    suboptarg c�  time_t (�   _timezone ��   _daylight ��   	�  �  
`    _tzname ��  !daylight 	__daylight �   !timezone 	!__timezone �  	�  
�
�
�   #I
 
`   cchar_t �g  pdat �>  _pad_y ��    _pad_x ��   _pad_top ��   _pad_left ��   _pad_bottom ��   _pad_right ��    _Bool ldat ��  text �   firstchar ��   lastchar ��   %@e  ��    
`   termios ,   c_iflag S   c_oflag S  c_cflag S  c_lflag S  c_line �  c_cc s  c_ispeed c  $c_ospeed c  ( termtype (��   %�d  ��   %�d  ��  %e  ��  Numbers ��   Strings �q
`   	Q#  �#  
`    _nc_head �Q#   _nc_tail �Q#   _nc_user_definable �>   _nc_disable_period �>  �#  �#   
`   	�   X(  
`   TPARM_STATE Fq'  k�(  name l�   value m�   ITERATOR_VARS nl(  �sV+  have_sigtstp t]
`   	�(  v+  
`   _win_list �#�+  next $�+   screen %�  win &N  addch_work (�.  �addch_used )	  �addch_x *�   �addch_y +�   � 
`   NCURSES_GLOBALS ��(  _nc_globals �,  * �t-  allocated �t-   use_env �>  filter_mode �>  previous_attr �G  %e  �z-  rsp ��-  Htparm_state �X(  Lsaved_tty ��-  �$�d  �>  �_outch ��  �real_acs_map ��-  �_LINES ��   �_COLS ��   �$xe  ��   �$ae  ��   �_cur_term ��&  �$�d  �>  � 
`   
`  � 
`   
`  � _nc_screen_chain  �  _nc_have_sigwinch !]
`  H _nc_oldnums ��!  SP ��  +slk_wset .�   �%�m�   �@0  ,i .�   � ,astr .@0  �,format .�   �-result 0�   R� .str 1@0  �T.state 2V  �X/(4  -arglen 7�   � 0@4  0  -mystr =�  �� 1	&�mF0  �/  2t 02tw 10&�mQ0  �/  2t s 2t�T2tw 2tu  1Q&�m\0  0  2t � 2ts 2t� 3[&�mp0  2t s   3�%�mQ0  2t 02tv 2t02tu    
  unsigned int wchar_t H/    short unsigned int long long int long double signed char unsigned char short int long long unsigned int long unsigned int _LOCK_T �  long int _off64_t ^E  _fpos_t r�  _fpos64_t x�  _ssize_t ��   wint_t e
  �Q  __wch �  __wchb �Q   	t  a  
a   sizetype ��  __count ��    __value �-   _mbstate_t �m  _flock_t ��  
a    __tm $7�  __tm_sec 9�    __tm_min :�   __tm_hour ;�   __tm_mday <�   __tm_mon =�   __tm_year >�   __tm_wday ?�   __tm_yday @�   __tm_isdst A�     �e  JS  _fnargs KS   _dso_handle LS  �_fntypes N�   _is_cxa Q�   	�  c  
a   _atexit �]�  _next ^�   _ind _�   _fns a�  �e  b�  � 
a   
a   	t  S  
a    __sFILE64 p��  _p ��   _r ��   _w ��   _flags �  _file �  _bf ��  _lbfsize ��   _data �  _cookie ��   _read ��  $_write ��  (_seek   ,_close -  0_ub �  4_up �  <_ur �   @_ubuf 3  D_nbuf C  G_lb �  H_blksize �   P_flags2 �   T_offset �  X_seek64 �  `_lock �  d_mbstate �  h �  �    �  �  �    
a   �YK  _unused_rand [
   _strtok_last \�  _asctime_buf ]K  _localtime_buf ^P  $_gamma_signgam _�   H_rand_next `�  P_r48 aP	  X_mblen_state b�  h_mbtowc_state c�  p_wctomb_state d�  x_l64a_buf e[  �_signal_buf fk  �_getdate_err g�   �_mbrlen_state h�  �_mbrtowc_state i�  �_mbsrtowcs_state j�  �_wcrtomb_state k�  �_wcsrtombs_state l�  �_h_errno m�   � 	�  [  
a   	�  k  
a   	�  {  
a   �r�  _nextf u�   _nmalloc v�  x 	�  �  
a   	
  �  
a   �W�  _reent n�	  _unused w{   	�     
a   __locale_t 
a   _impure_ptr   _global_impure_ptr    suboptarg c�  time_t (�   _timezone ��   _daylight ��   	�  �  
a    _tzname ��  !daylight 	__daylight �   !timezone 	!__timezone �  	�   
�
�
�   #J
 
a   cchar_t �h  pdat �?  _pad_y ��    _pad_x ��   _pad_top ��   _pad_left ��   _pad_bottom ��   _pad_right ��    _Bool ldat ��  text �   firstchar ��   lastchar ��   %-f  ��    
  speed_t  
  	H  �  
a   termios ,   c_iflag T   c_oflag T  c_cflag T  c_lflag T  c_line �  c_cc t  c_ispeed d  $c_ospeed d  ( termtype (��   %�e  ��   %�e  ��  % f  ��  Numbers ��   Strings �r
  (uses {j#  ,ncrosslinks |�   �crosslinks }z#  �cstart ~�  �cend �  �startline ��  �next �R#  �last �R#    rR#  name s�   link tR#  line u�   
a   	R#  �#  
a    _nc_head �R#   _nc_tail �R#   _nc_user_definable �?   _nc_disable_period �?  �#  �#   
  ��$  )MF_X10  )MF_SGR1006  MouseFormat ��$  �'%  hashval ��   oldcount ��   newcount ��   %-f  ��   newindex ��    HASHMAP ��$  ��%  ent_text ��   form_text ��  ent_x ��   dirty ��  visible ��  
a   	�   Y(  
a   TPARM_STATE Fr'  k�(  name l�   value m�   ITERATOR_VARS nm(  �sW+  have_sigtstp t^
a   	�(  w+  
a   _win_list �# ,  next $ ,   screen %�  win &O  addch_work (�.  �addch_used )
  �addch_x *�   �addch_y +�   � 
a   NCURSES_GLOBALS ��(  _nc_globals �,  * �u-  allocated �u-   use_env �?  filter_mode �?  previous_attr �H  %	f  �{-  rsp ��-  Htparm_state �Y(  Lsaved_tty ��-  �$�e  �?  �_outch ��  �real_acs_map ��-  �_LINES ��   �_COLS ��   �$bf  ��   �$Kf  ��   �_cur_term ��&  �$�e  �?  � 
a   
a  � 
a   
a  � _nc_screen_chain  �  _nc_have_sigwinch !^
a  H _nc_oldnums ��!  SP ��  +unget_wch n�   �'�m   �9/  ,wch n*  � -�'�m9/  .t� �
��  +unget_wch_sp D�    '�m�   �a0  ,sp D�  � ,wch D*  �/result F�   �� 0state GW  �X/length H�   �� 1D'�me   B0  /string Q�  � 1R'�mW   -0  /n T�   =� 2o'�mi1  0  .t v .tu .ts  2�'�m|1  0  .t w  -�'�m�1  .t v   -L'�m�1  .t �L#  -8'�ma0  .t 0.tu .ts   +_nc_wcrtomb 1�   p&�m�   �M1  ,target 1�  � ,source 1  �,state 1M1  �/result 3�   [� 1�&�m4   1  0temp 6S1  �l0tempp 7c1  �h-�&�m�1  .t 0.t�h.t0.t�  2�&�mi1  C1  .t � .t��
��.t� 3�&�m�1   
a   
��  __count ��    __value �'   _mbstate_t �g  _flock_t ��  �  char 
�
�
�   #D
 b  TRIES b  chtype ��  mmask_t ��  SCREEN ��  screen $I  _ifd �    _ofd �   _ofp �-  out_buffer �  out_limit �   out_inuse �   _filtered (  _prescreen (  _use_env (  _checkfd �   _term �&   _saved_tty m  $_lines �   P_columns �   T_lines_avail �   X_topstolen �   \_curscr !�  `_newscr "�  d_stdscr #�  h_keytry )�-  l_key_ok *�-  p_tried +(  t_keypad_on ,(  u_called_wgetch .(  v_fifo /�-  x_fifohead 0  �_fifotail 1  �_fifopeek 2  �_fifohold 3  �_endwin 5�   �_current_attr 6�  �_coloron 7�   �_color_defs 8�   �_cursor 9�   �_cursrow :�   �_curscol ;�   �_notty <(  �_nl =�   �_raw >�   �_cbreak ?�   �_echo A�   �_use_meta B�   �_slk C�-  �$�g  D�   �$�f  G(  �_char_padding I�   �_cr_cost J�   �_cup_cost K�   �_home_cost L�   �_ll_cost M�   �_cub1_cost R�   �_cuf1_cost S�   �_cud1_cost T�    _cuu1_cost U�   _cub_cost V�   _cuf_cost W�   _cud_cost X�   _cuu_cost Y�   _hpa_cost Z�   _vpa_cost [�   _ed_cost ]�    _el_cost ^�   $_el1_cost _�   (_dch1_cost `�   ,_ich1_cost a�   0_dch_cost b�   4_ich_cost c�   8_ech_cost d�   <_rep_cost e�   @_hpa_ch_cost f�   D_cup_ch_cost g�   H_cuf_ch_cost h�   L_inline_cost i�   P_smir_cost j�   T_rmir_cost k�   X_ip_cost l�   \_address_cursor n�  `_scrolling p�   d_color_table s�-  h_color_count t�   l${g  u�-  p_pair_count v�   t_pair_limit w�   x_assumed_color y(  |_default_color z(  }_has_sgr_39_49 {(  ~_default_fg |�   �_default_bg }�   �_default_pairs ~�   �_ok_attributes ��  �_xmc_suppress ��  �_xmc_triggers ��  �_acs_map �v-  �_screen_acs_map ��-  �_use_rmso �(  �_use_rmul �(  �_use_ritm �(  �_nc_sp_idlok �(  �_nc_sp_idcok �(  �_mouse_initialized �(  �_mouse_type �h$  �_maxclick ��   �_mouse_event ��-  �_mouse_inline ��-  �_mouse_parse �	.  �_mouse_resume �.  �_mouse_wrap �.  �_mouse_fd ��   �_mouse_active �(  �_mouse_mask ��  �_mouse_mask2 ��  �_mouse_bstate ��  �_mouse_format ��$  �_mouse_xtermcap ��  �_mouse_events � .  �_mouse_eventp �0.  �_resize �O.  �_ungetch ��  �_panelHook ��  �_sig_winch �(  �_next_screen ��  �oldhash �U.  �newhash �U.  �hashtab �[.  �hashtab_len ��   �_oldnum_list ��!  �_oldnum_size ��   �_outch ��  �_legacy_coding ��   �_ttytype �a.  �$�g  ��   �$�g  ��   �_LINES ��   �_COLS ��   �jump �  �$'g  Z-  �rsp 	j-  $�f  (  _screen_acs_fix (  _screen_unicode (  _ordered_pairs �  _pairs_used �   _recent_pair �     WINDOW �X  _win_st ��B  _cury ��    _curx ��   _maxy ��   _maxx ��   _begy ��   _begx ��   _flags �  _attrs �B  _bkgd ��   _notimeout �(  $_clear �(  %_leaveok �(  &_scroll �(  '_idlok �(  (_idcok �(  )_immed �(  *_sync �(  +_use_keypad �(  ,_delay ��   0_line ��  4_regtop ��   8_regbottom ��   <_parx ��   @_pary ��   D_parent ��  H_pad ��  L_yoffset ��   d_bkgrnd ��  h_color ��   | attr_t ��  ��  attr �B   chars ��  ext_color ��      �  	[   cchar_t �Q  pdat �(  _pad_y ��    _pad_x ��   _pad_top ��   _pad_left ��   _pad_bottom ��   _pad_right ��    _Bool ldat ��  text ��   firstchar ��   lastchar ��   %Kg  ��    1  I  NCURSES_OUTC K�  �  �   �  �    �  NCURSES_OUTC_sp ��  �  �   �  �  �    _nc_wacs 7�  �  �L  id �   x ��   y ��   z ��   bstate ��   MEVENT �  G�  red I�    green I�   blue I�   r J�   g J�   b J�   init K�    color_t M[  panelhook 5$  top_panel 7+   bottom_panel 8+  stdscr_pseudo_panel 9+   panel $  cc_t �n  tcflag_t �	  speed_t  	  1  m  	[   termios ,   c_iflag =   c_oflag =  c_cflag =  c_lflag =  c_line �  c_cc ]  c_ispeed M  $c_ospeed M  ( termtype (��   %�f  ��   %�f  ��  %g  ��  Numbers ��   Strings �l
r;#  name s�   link t;#  line u�   O"  ENTRY_USES v#  A#  c#  	[   ;#  s#  	[    _nc_head �;#   _nc_tail �;#   _nc_user_definable �(   _nc_disable_period �(  �#  �#   �    _nc_check_termtype ��#  �#  $  $  (   �!   _nc_check_termtype2 �)$  �#  colorpair_t yB$  &{g  '�   �h$  (M_XTERM )M_NONE   MouseType �G$  '	  ��$  )MF_X10  )MF_SGR1006  MouseFormat �z$  �%  hashval ��   oldcount ��   newcount ��   %Kg  ��   newindex ��    HASHMAP ��$  �~%  ent_text ��   form_text ��  ent_x ��   dirty ��  visible ��  
  unsigned int wchar_t H*  short unsigned int long long int long double signed char unsigned char short int long long unsigned int long unsigned int _LOCK_T �  long int _off64_t ^@  _fpos_t r�  _fpos64_t x�  _ssize_t ��   wint_t e
  �L  __wch �  __wchb �L   o  \  	\   sizetype 
��  __count ��    __value �(   _mbstate_t �h  _flock_t ��  �  char 
   _strtok_last \�  _asctime_buf ]F  _localtime_buf ^K  $_gamma_signgam _�   H_rand_next `�  P_r48 aK	  X_mblen_state b�  h_mbtowc_state c�  p_wctomb_state d�  x_l64a_buf eV  �_signal_buf ff  �_getdate_err g�   �_mbrlen_state h�  �_mbrtowc_state i�  �_mbsrtowcs_state j�  �_wcrtomb_state k�  �_wcsrtombs_state l�  �_h_errno m�   � �  V  	\   �  f  	\   �  v  	\   �r�  _nextf u�   _nmalloc v�  x �  �  	\   
  �  	\   �W�  _reent n�	  _unused wv   �  �  	\   __locale_t �       
�
�
�   #E
 c  TRIES c  chtype ��  mmask_t ��  SCREEN ��  screen $J  _ifd �    _ofd �   _ofp �-  out_buffer �  out_limit �   out_inuse �   _filtered .  _prescreen .  _use_env .  _checkfd �   _term �&   _saved_tty s  $_lines �   P_columns �   T_lines_avail �   X_topstolen �   \_curscr !�  `_newscr "�  d_stdscr #�  h_keytry )�-  l_key_ok *�-  p_tried +.  t_keypad_on ,.  u_called_wgetch ..  v_fifo /�-  x_fifohead 0�  �_fifotail 1�  �_fifopeek 2�  �_fifohold 3�  �_endwin 5�   �_current_attr 6  �_coloron 7�   �_color_defs 8�   �_cursor 9�   �_cursrow :�   �_curscol ;�   �_notty <.  �_nl =�   �_raw >�   �_cbreak ?�   �_echo A�   �_use_meta B�   �_slk C�-  �$�h  D�   �$h  G.  �_char_padding I�   �_cr_cost J�   �_cup_cost K�   �_home_cost L�   �_ll_cost M�   �_cub1_cost R�   �_cuf1_cost S�   �_cud1_cost T�    _cuu1_cost U�   _cub_cost V�   _cuf_cost W�   _cud_cost X�   _cuu_cost Y�   _hpa_cost Z�   _vpa_cost [�   _ed_cost ]�    _el_cost ^�   $_el1_cost _�   (_dch1_cost `�   ,_ich1_cost a�   0_dch_cost b�   4_ich_cost c�   8_ech_cost d�   <_rep_cost e�   @_hpa_ch_cost f�   D_cup_ch_cost g�   H_cuf_ch_cost h�   L_inline_cost i�   P_smir_cost j�   T_rmir_cost k�   X_ip_cost l�   \_address_cursor n�  `_scrolling p�   d_color_table s�-  h_color_count t�   l$�h  u�-  p_pair_count v�   t_pair_limit w�   x_assumed_color y.  |_default_color z.  }_has_sgr_39_49 {.  ~_default_fg |�   �_default_bg }�   �_default_pairs ~�   �_ok_attributes ��  �_xmc_suppress ��  �_xmc_triggers ��  �_acs_map ��-  �_screen_acs_map ��-  �_use_rmso �.  �_use_rmul �.  �_use_ritm �.  �_nc_sp_idlok �.  �_nc_sp_idcok �.  �_mouse_initialized �.  �_mouse_type �n$  �_maxclick ��   �_mouse_event ��-  �_mouse_inline ��-  �_mouse_parse �.  �_mouse_resume �*.  �_mouse_wrap �*.  �_mouse_fd ��   �_mouse_active �.  �_mouse_mask ��  �_mouse_mask2 ��  �_mouse_bstate ��  �_mouse_format ��$  �_mouse_xtermcap ��  �_mouse_events �0.  �_mouse_eventp �@.  �_resize �_.  �_ungetch ��  �_panelHook ��  �_sig_winch �.  �_next_screen ��  �oldhash �e.  �newhash �e.  �hashtab �k.  �hashtab_len ��   �_oldnum_list ��!  �_oldnum_size ��   �_outch ��  �_legacy_coding ��   �_ttytype �q.  �$�h  ��   �$�h  ��   �_LINES ��   �_COLS ��   �jump �  �$Fh  j-  �rsp 	z-  $%h  .  _screen_acs_fix .  _screen_unicode .  _ordered_pairs �  _pairs_used �   _recent_pair �     WINDOW �Y  _win_st ��C  _cury ��    _curx ��   _maxy ��   _maxx ��   _begy ��   _begx ��   _flags ��  _attrs �C  _bkgd ��   _notimeout �.  $_clear �.  %_leaveok �.  &_scroll �.  '_idlok �.  (_idcok �.  )_immed �.  *_sync �.  +_use_keypad �.  ,_delay ��   0_line ��  4_regtop ��   8_regbottom ��   <_parx ��   @_pary ��   D_parent ��  H_pad ��  L_yoffset ��   d_bkgrnd ��  h_color ��   | attr_t ��  ��  attr �C   chars ��  ext_color ��      �  	\   cchar_t �R  
  speed_t  
  7  s  	\   termios ,   c_iflag C   c_oflag C  c_cflag C  c_lflag C  c_line �  c_cc c  c_ispeed S  $c_ospeed S  ( termtype (��   %�g  ��   %h  ��  %0h  ��  Numbers ��   Strings �m
  (uses {Y#  ,ncrosslinks |�   �crosslinks }i#  �cstart ~�  �cend �  �startline ��  �next �A#  �last �A#    
rA#  name s�   link tA#  line u�   U"  ENTRY_USES v#  G#  i#  	\   A#  y#  	\    _nc_head �A#   _nc_tail �A#   _nc_user_definable �.   _nc_disable_period �.  �#  �#   �    _nc_check_termtype ��#  �#  $  $  .   �!   _nc_check_termtype2 �/$  �#  colorpair_t yH$  &�h  '�   �n$  (M_XTERM )M_NONE   MouseType �M$  '
  ��$  )MF_X10  )MF_SGR1006  MouseFormat ��$  �%  hashval ��   oldcount ��   newcount ��   %uh  ��   newindex ��    HASHMAP ��$  ��%  ent_text ��   form_text ��  ent_x ��   dirty ��  visible ��  
  �addch_x *�   �addch_y +�   � f+  �  ,  	\   NCURSES_GLOBALS ��(  _nc_globals �,  * �d-  allocated �d-   use_env �.  filter_mode �.  previous_attr �C  %Fh  �j-  rsp �z-  Htparm_state �H(  Lsaved_tty ��-  �$h  �.  �_outch ��  �real_acs_map ��-  �_LINES ��   �_COLS ��   �$�h  ��   �$�h  ��   �_cur_term ��&  �$%h  �.  � �  m&  z-  	\   m&  s  �  NCURSES_PRESCREEN �1,  _nc_prescreen �-  �
��  __count ��    __value �#   _mbstate_t �c  _flock_t ��  �  char 
�
�
�   #@
 ^  TRIES ^  chtype ��  mmask_t ��  SCREEN ��  screen $E  _ifd �    _ofd �   _ofp .  out_buffer �  out_limit �   out_inuse �   _filtered $  _prescreen $  _use_env $  _checkfd �   _term 9'   _saved_tty i  $_lines �   P_columns �   T_lines_avail �   X_topstolen �   \_curscr !�  `_newscr "�  d_stdscr #�  h_keytry ).  l_key_ok *.  p_tried +$  t_keypad_on ,$  u_called_wgetch .$  v_fifo /.  x_fifohead 0{  �_fifotail 1{  �_fifopeek 2{  �_fifohold 3{  �_endwin 5�   �_current_attr 6�  �_coloron 7�   �_color_defs 8�   �_cursor 9�   �_cursrow :�   �_curscol ;�   �_notty <$  �_nl =�   �_raw >�   �_cbreak ?�   �_echo A�   �_use_meta B�   �_slk C,.  �$�i  D�   �$
i  G$  �_char_padding I�   �_cr_cost J�   �_cup_cost K�   �_home_cost L�   �_ll_cost M�   �_cub1_cost R�   �_cuf1_cost S�   �_cud1_cost T�    _cuu1_cost U�   _cub_cost V�   _cuf_cost W�   _cud_cost X�   _cuu_cost Y�   _hpa_cost Z�   _vpa_cost [�   _ed_cost ]�    _el_cost ^�   $_el1_cost _�   (_dch1_cost `�   ,_ich1_cost a�   0_dch_cost b�   4_ich_cost c�   8_ech_cost d�   <_rep_cost e�   @_hpa_ch_cost f�   D_cup_ch_cost g�   H_cuf_ch_cost h�   L_inline_cost i�   P_smir_cost j�   T_rmir_cost k�   X_ip_cost l�   \_address_cursor n�  `_scrolling p�   d_color_table s2.  h_color_count t�   l$�i  u8.  p_pair_count v�   t_pair_limit w�   x_assumed_color y$  |_default_color z$  }_has_sgr_39_49 {$  ~_default_fg |�   �_default_bg }�   �_default_pairs ~�   �_ok_attributes ��  �_xmc_suppress ��  �_xmc_triggers ��  �_acs_map ��-  �_screen_acs_map �>.  �_use_rmso �$  �_use_rmul �$  �_use_ritm �$  �_nc_sp_idlok �$  �_nc_sp_idcok �$  �_mouse_initialized �$  �_mouse_type ��$  �_maxclick ��   �_mouse_event �S.  �_mouse_inline �S.  �_mouse_parse �m.  �_mouse_resume �~.  �_mouse_wrap �~.  �_mouse_fd ��   �_mouse_active �$  �_mouse_mask ��  �_mouse_mask2 ��  �_mouse_bstate ��  �_mouse_format ��$  �_mouse_xtermcap ��  �_mouse_events ��.  �_mouse_eventp ��.  �_resize ��.  �_ungetch ��  �_panelHook ��  �_sig_winch �$  �_next_screen ��  �oldhash ��.  �newhash ��.  �hashtab ��.  �hashtab_len ��   �_oldnum_list ��!  �_oldnum_size ��   �_outch ��  �_legacy_coding ��   �_ttytype ��.  �$~i  ��   �$�i  ��   �_LINES ��   �_COLS ��   �jump �  �$4i  �-  �rsp 	�-  $ i  $  _screen_acs_fix $  _screen_unicode $  _ordered_pairs �  _pairs_used �   _recent_pair �     WINDOW �T  _win_st ��>  _cury ��    _curx ��   _maxy ��   _maxx ��   _begy ��   _begx ��   _flags �{  _attrs �>  _bkgd ��   _notimeout �$  $_clear �$  %_leaveok �$  &_scroll �$  '_idlok �$  (_idcok �$  )_immed �$  *_sync �$  +_use_keypad �$  ,_delay ��   0_line �|  4_regtop ��   8_regbottom ��   <_parx ��   @_pary ��   D_parent ��  H_pad ��  L_yoffset ��   d_bkgrnd ��  h_color ��   | attr_t ��  ��  attr �>   chars ��  ext_color ��      �  	W   cchar_t �M  pdat �$  _pad_y ��    _pad_x ��   _pad_top ��   _pad_left ��   _pad_bottom ��   _pad_right ��    _Bool ldat �|  text ��   firstchar ��   lastchar ��   %Xi  ��    -  E  NCURSES_OUTC K�  �  �   �  �    �  NCURSES_OUTC_sp ��  �  �   �  �  �    _nc_wacs 7�  �  �H  id �{   x ��   y ��   z ��   bstate ��   MEVENT �  G�  red I�    green I�   blue I�   r J�   g J�   b J�   init K�    color_t MW  panelhook 5   top_panel 7'   bottom_panel 8'  stdscr_pseudo_panel 9'   panel    cc_t �j  tcflag_t �  speed_t    -  i  	W   termios ,   c_iflag 9   c_oflag 9  c_cflag 9  c_lflag 9  c_line �  c_cc Y  c_ispeed I  $c_ospeed I  ( termtype (��   %�h  ��   %i  ��  %+i  ��  Numbers ��   Strings �h
r�#  name s�   link t�#  line u�   �"  ENTRY_USES ve#  �#  �#  	W   �#  �#  	W    _nc_head ��#   _nc_tail ��#   _nc_user_definable �$   _nc_disable_period �$  ,$  ,$   �    _nc_check_termtype �L$  !$  b$  b$  $   �!   _nc_check_termtype2 ʃ$  R$  colorpair_t y�$  (�i  )�   ��$  *M_XTERM 'M_NONE   MouseType ��$  )  ��$  'MF_X10  'MF_SGR1006  MouseFormat ��$  �j%  hashval ��   oldcount ��   newcount ��   %Xi  ��   newindex ��    HASHMAP �%  ��%  ent_text ��   form_text ��  ent_x ��   dirty ��  visible ��  
i  �$  �_outch ��  �real_acs_map ��-  �_LINES ��   �_COLS ��   �$�i  ��   �$~i  ��   �_cur_term �9'  �$ i  �$  � �  �&  �-  	W   �&  i  �  NCURSES_PRESCREEN ��,  _nc_prescreen �-  �
+�/  map ,   value -b0   
��  __count ��    __value �&   _mbstate_t �f  _flock_t ��  �  char 
�
�
�   #C
 a  TRIES a  chtype ��  mmask_t ��  SCREEN ��  screen $H  _ifd �    _ofd �   _ofp �-  out_buffer �  out_limit �   out_inuse �   _filtered '  _prescreen '  _use_env '  _checkfd �   _term �&   _saved_tty l  $_lines �   P_columns �   T_lines_avail �   X_topstolen �   \_curscr !�  `_newscr "�  d_stdscr #�  h_keytry )�-  l_key_ok *�-  p_tried +'  t_keypad_on ,'  u_called_wgetch .'  v_fifo /�-  x_fifohead 0~  �_fifotail 1~  �_fifopeek 2~  �_fifohold 3~  �_endwin 5�   �_current_attr 6�  �_coloron 7�   �_color_defs 8�   �_cursor 9�   �_cursrow :�   �_curscol ;�   �_notty <'  �_nl =�   �_raw >�   �_cbreak ?�   �_echo A�   �_use_meta B�   �_slk C�-  �$�j  D�   �$j  G'  �_char_padding I�   �_cr_cost J�   �_cup_cost K�   �_home_cost L�   �_ll_cost M�   �_cub1_cost R�   �_cuf1_cost S�   �_cud1_cost T�    _cuu1_cost U�   _cub_cost V�   _cuf_cost W�   _cud_cost X�   _cuu_cost Y�   _hpa_cost Z�   _vpa_cost [�   _ed_cost ]�    _el_cost ^�   $_el1_cost _�   (_dch1_cost `�   ,_ich1_cost a�   0_dch_cost b�   4_ich_cost c�   8_ech_cost d�   <_rep_cost e�   @_hpa_ch_cost f�   D_cup_ch_cost g�   H_cuf_ch_cost h�   L_inline_cost i�   P_smir_cost j�   T_rmir_cost k�   X_ip_cost l�   \_address_cursor n�  `_scrolling p�   d_color_table s�-  h_color_count t�   l$�j  u�-  p_pair_count v�   t_pair_limit w�   x_assumed_color y'  |_default_color z'  }_has_sgr_39_49 {'  ~_default_fg |�   �_default_bg }�   �_default_pairs ~�   �_ok_attributes ��  �_xmc_suppress ��  �_xmc_triggers ��  �_acs_map �-  �_screen_acs_map ��-  �_use_rmso �'  �_use_rmul �'  �_use_ritm �'  �_nc_sp_idlok �'  �_nc_sp_idcok �'  �_mouse_initialized �'  �_mouse_type �g$  �_maxclick ��   �_mouse_event ��-  �_mouse_inline ��-  �_mouse_parse �.  �_mouse_resume �#.  �_mouse_wrap �#.  �_mouse_fd ��   �_mouse_active �'  �_mouse_mask ��  �_mouse_mask2 ��  �_mouse_bstate ��  �_mouse_format ��$  �_mouse_xtermcap ��  �_mouse_events �).  �_mouse_eventp �9.  �_resize �X.  �_ungetch ��  �_panelHook ��  �_sig_winch �'  �_next_screen ��  �oldhash �^.  �newhash �^.  �hashtab �d.  �hashtab_len ��   �_oldnum_list ��!  �_oldnum_size ��   �_outch ��  �_legacy_coding ��   �_ttytype �j.  �$�j  ��   �$�j  ��   �_LINES ��   �_COLS ��   �jump �  �$-j  c-  �rsp 	s-  $j  '  _screen_acs_fix '  _screen_unicode '  _ordered_pairs �  _pairs_used �   _recent_pair �     WINDOW �W  _win_st ��A  _cury ��    _curx ��   _maxy ��   _maxx ��   _begy ��   _begx ��   _flags �~  _attrs �A  _bkgd ��   _notimeout �'  $_clear �'  %_leaveok �'  &_scroll �'  '_idlok �'  (_idcok �'  )_immed �'  *_sync �'  +_use_keypad �'  ,_delay ��   0_line �  4_regtop ��   8_regbottom ��   <_parx ��   @_pary ��   D_parent ��  H_pad ��  L_yoffset ��   d_bkgrnd ��  h_color ��   | attr_t ��  ��  attr �A   chars ��  ext_color ��      �  	Z   cchar_t �P  pdat �'  _pad_y ��    _pad_x ��   _pad_top ��   _pad_left ��   _pad_bottom ��   _pad_right ��    _Bool ldat �  text ��   firstchar ��   lastchar ��   %]j  ��    0  H  NCURSES_OUTC K�  �  �   �  �    �  NCURSES_OUTC_sp ��  �  �   �  �  �    _nc_wacs 7�  �  �K  id �~   x ��   y ��   z ��   bstate ��   MEVENT �  G�  red I�    green I�   blue I�   r J�   g J�   b J�   init K�    color_t MZ  panelhook 5#  top_panel 7*   bottom_panel 8*  stdscr_pseudo_panel 9*   panel #  cc_t �m  tcflag_t �  speed_t    0  l  	Z   termios ,   c_iflag <   c_oflag <  c_cflag <  c_lflag <  c_line �  c_cc \  c_ispeed L  $c_ospeed L  ( termtype (��   %�i  ��   %j  ��  %$j  ��  Numbers ��   Strings �k
#  tterm y�!   nuses z  (uses {R#  ,ncrosslinks |�   �crosslinks }b#  �cstart ~�  �cend �  �startline ��  �next �:#  �last �:#    
r:#  name s�   link t:#  line u�   N"  ENTRY_USES v
#  @#  b#  	Z   :#  r#  	Z    _nc_head �:#   _nc_tail �:#   _nc_user_definable �'   _nc_disable_period �'  �#  �#   �    _nc_check_termtype ��#  �#  $  $  '   �!   _nc_check_termtype2 �($  �#  colorpair_t yA$  &�j  '�   �g$  (M_XTERM )M_NONE   MouseType �F$  '  ��$  )MF_X10  )MF_SGR1006  MouseFormat �y$  �%  hashval ��   oldcount ��   newcount ��   %]j  ��   newindex ��    HASHMAP ��$  �}%  ent_text ��   form_text ��  ent_x ��   dirty ��  visible ��  
��  __count ��    __value �   _mbstate_t �W  _flock_t ��  �  char 

��  sys_siglist 
��  sig_atomic_t 
�   #4
 R  TRIES R  chtype ��  mmask_t ��  SCREEN ��  screen $9  _ifd �    _ofd �   _ofp �-  out_buffer �  out_limit �   out_inuse �   _filtered   _prescreen   _use_env   _checkfd �   _term �&   _saved_tty ]  $_lines �   P_columns �   T_lines_avail �   X_topstolen �   \_curscr !v  `_newscr "v  d_stdscr #v  h_keytry )�-  l_key_ok *�-  p_tried +  t_keypad_on ,  u_called_wgetch .  v_fifo /�-  x_fifohead 0o  �_fifotail 1o  �_fifopeek 2o  �_fifohold 3o  �_endwin 5�   �_current_attr 6�  �_coloron 7�   �_color_defs 8�   �_cursor 9�   �_cursrow :�   �_curscol ;�   �_notty <  �_nl =�   �_raw >�   �_cbreak ?�   �_echo A�   �_use_meta B�   �_slk C�-  �$�k  D�   �$(k  G  �_char_padding I�   �_cr_cost J�   �_cup_cost K�   �_home_cost L�   �_ll_cost M�   �_cub1_cost R�   �_cuf1_cost S�   �_cud1_cost T�    _cuu1_cost U�   _cub_cost V�   _cuf_cost W�   _cud_cost X�   _cuu_cost Y�   _hpa_cost Z�   _vpa_cost [�   _ed_cost ]�    _el_cost ^�   $_el1_cost _�   (_dch1_cost `�   ,_ich1_cost a�   0_dch_cost b�   4_ich_cost c�   8_ech_cost d�   <_rep_cost e�   @_hpa_ch_cost f�   D_cup_ch_cost g�   H_cuf_ch_cost h�   L_inline_cost i�   P_smir_cost j�   T_rmir_cost k�   X_ip_cost l�   \_address_cursor n�  `_scrolling p�   d_color_table s�-  h_color_count t�   l$�k  u�-  p_pair_count v�   t_pair_limit w�   x_assumed_color y  |_default_color z  }_has_sgr_39_49 {  ~_default_fg |�   �_default_bg }�   �_default_pairs ~�   �_ok_attributes ��  �_xmc_suppress ��  �_xmc_triggers ��  �_acs_map �p-  �_screen_acs_map ��-  �_use_rmso �  �_use_rmul �  �_use_ritm �  �_nc_sp_idlok �  �_nc_sp_idcok �  �_mouse_initialized �  �_mouse_type �X$  �_maxclick ��   �_mouse_event ��-  �_mouse_inline ��-  �_mouse_parse �.  �_mouse_resume �.  �_mouse_wrap �.  �_mouse_fd ��   �_mouse_active �  �_mouse_mask ��  �_mouse_mask2 ��  �_mouse_bstate ��  �_mouse_format ��$  �_mouse_xtermcap ��  �_mouse_events �.  �_mouse_eventp �*.  �_resize �I.  �_ungetch ��  �_panelHook ��  �_sig_winch �  �_next_screen ��  �oldhash �O.  �newhash �O.  �hashtab �U.  �hashtab_len ��   �_oldnum_list ��!  �_oldnum_size ��   �_outch ��  �_legacy_coding ��   �_ttytype �[.  �$�k  ��   �$�k  ��   �_LINES ��   �_COLS ��   �jump |  �$Rk  T-  �rsp 	d-  $>k    _screen_acs_fix   _screen_unicode   _ordered_pairs �  _pairs_used �   _recent_pair �     WINDOW �H  _win_st ��2  _cury ��    _curx ��   _maxy ��   _maxx ��   _begy ��   _begx ��   _flags �o  _attrs �2  _bkgd ��   _notimeout �  $_clear �  %_leaveok �  &_scroll �  '_idlok �  (_idcok �  )_immed �  *_sync �  +_use_keypad �  ,_delay ��   0_line �p  4_regtop ��   8_regbottom ��   <_parx ��   @_pary ��   D_parent �v  H_pad ��  L_yoffset ��   d_bkgrnd ��  h_color ��   | attr_t ��  �{  attr �2   chars �{  ext_color ��    	  �  	K   cchar_t �A  pdat �  _pad_y ��    _pad_x ��   _pad_top ��   _pad_left ��   _pad_bottom ��   _pad_right ��    _Bool ldat �p  text ��   firstchar ��   lastchar ��   %vk  ��    !  9  NCURSES_OUTC K�  �  �   �  �    �  NCURSES_OUTC_sp ��  �  �   �  �  �    _nc_wacs 7�  �  �<  id �o   x ��   y ��   z ��   bstate ��   MEVENT ��  G�  red I�    green I�   blue I�   r J�   g J�   b J�   init K�    color_t MK  panelhook 5  top_panel 7   bottom_panel 8  stdscr_pseudo_panel 9   panel   cc_t �^  tcflag_t ��   speed_t  �   !  ]  	K   termios ,�  c_iflag -   c_oflag -  c_cflag -  c_lflag -  c_line �  c_cc M  c_ispeed =  $c_ospeed =  ( termtype (��   %k  ��   %4k  ��  %Ik  ��  Numbers ��   Strings �\
r+#  name s�   link t+#  line u�   ?"  ENTRY_USES v�"  1#  S#  	K   +#  c#  	K    _nc_head �+#   _nc_tail �+#   _nc_user_definable �   _nc_disable_period �  �#  �#   �    _nc_check_termtype ��#  �#  �#  �#     �!   _nc_check_termtype2 �$  �#  colorpair_t y2$  &�k  '�   �X$  (M_XTERM )M_NONE   MouseType �7$  '�   ��$  )MF_X10  )MF_SGR1006  MouseFormat �j$  � %  hashval ��   oldcount ��   newcount ��   %vk  ��   newindex ��    HASHMAP ��$  �n%  ent_text ��   form_text ��  ent_x ��   dirty ��  visible ��  
&  �&  sequence �   last_used   fix_sgr0 �  last_bufp �  last_term �&   ."  TGETENT_CACHE h&  +
��  __count ��    __value �$   _mbstate_t �d  _flock_t ��  �  char 
  
  ,_close $  0_ub �  4_up �  <_ur �   @_ubuf *  D_nbuf :  G_lb �  H_blksize �   P_flags2 �   T_offset �  X_seek64 �  `_lock �  d_mbstate �  h �  �  
�
�
�   #A
 _  TRIES _  chtype ��  mmask_t ��  SCREEN ��  screen $F  _ifd �    _ofd �   _ofp �-  out_buffer �  out_limit �   out_inuse �   _filtered %  _prescreen %  _use_env %  _checkfd �   _term �&   _saved_tty j  $_lines �   P_columns �   T_lines_avail �   X_topstolen �   \_curscr !�  `_newscr "�  d_stdscr #�  h_keytry )�-  l_key_ok *�-  p_tried +%  t_keypad_on ,%  u_called_wgetch .%  v_fifo /�-  x_fifohead 0|  �_fifotail 1|  �_fifopeek 2|  �_fifohold 3|  �_endwin 5�   �_current_attr 6�  �_coloron 7�   �_color_defs 8�   �_cursor 9�   �_cursrow :�   �_curscol ;�   �_notty <%  �_nl =�   �_raw >�   �_cbreak ?�   �_echo A�   �_use_meta B�   �_slk C�-  �$�l  D�   �$l  G%  �_char_padding I�   �_cr_cost J�   �_cup_cost K�   �_home_cost L�   �_ll_cost M�   �_cub1_cost R�   �_cuf1_cost S�   �_cud1_cost T�    _cuu1_cost U�   _cub_cost V�   _cuf_cost W�   _cud_cost X�   _cuu_cost Y�   _hpa_cost Z�   _vpa_cost [�   _ed_cost ]�    _el_cost ^�   $_el1_cost _�   (_dch1_cost `�   ,_ich1_cost a�   0_dch_cost b�   4_ich_cost c�   8_ech_cost d�   <_rep_cost e�   @_hpa_ch_cost f�   D_cup_ch_cost g�   H_cuf_ch_cost h�   L_inline_cost i�   P_smir_cost j�   T_rmir_cost k�   X_ip_cost l�   \_address_cursor n�  `_scrolling p�   d_color_table s�-  h_color_count t�   l$zl  u�-  p_pair_count v�   t_pair_limit w�   x_assumed_color y%  |_default_color z%  }_has_sgr_39_49 {%  ~_default_fg |�   �_default_bg }�   �_default_pairs ~�   �_ok_attributes ��  �_xmc_suppress ��  �_xmc_triggers ��  �_acs_map �}-  �_screen_acs_map ��-  �_use_rmso �%  �_use_rmul �%  �_use_ritm �%  �_nc_sp_idlok �%  �_nc_sp_idcok �%  �_mouse_initialized �%  �_mouse_type �e$  �_maxclick ��   �_mouse_event ��-  �_mouse_inline ��-  �_mouse_parse �.  �_mouse_resume �!.  �_mouse_wrap �!.  �_mouse_fd ��   �_mouse_active �%  �_mouse_mask ��  �_mouse_mask2 ��  �_mouse_bstate ��  �_mouse_format ��$  �_mouse_xtermcap ��  �_mouse_events �'.  �_mouse_eventp �7.  �_resize �V.  �_ungetch ��  �_panelHook ��  �_sig_winch �%  �_next_screen ��  �oldhash �\.  �newhash �\.  �hashtab �b.  �hashtab_len ��   �_oldnum_list ��!  �_oldnum_size ��   �_outch ��  �_legacy_coding ��   �_ttytype �h.  �$pl  ��   �$�l  ��   �_LINES ��   �_COLS ��   �jump �  �$5l  a-  �rsp 	q-  $!l  %  _screen_acs_fix %  _screen_unicode %  _ordered_pairs �  _pairs_used �   _recent_pair �     WINDOW �U  _win_st ��?  _cury ��    _curx ��   _maxy ��   _maxx ��   _begy ��   _begx ��   _flags �|  _attrs �?  _bkgd ��   _notimeout �%  $_clear �%  %_leaveok �%  &_scroll �%  '_idlok �%  (_idcok �%  )_immed �%  *_sync �%  +_use_keypad �%  ,_delay ��   0_line �}  4_regtop ��   8_regbottom ��   <_parx ��   @_pary ��   D_parent ��  H_pad ��  L_yoffset ��   d_bkgrnd ��  h_color ��   | attr_t ��  ��  attr �?   chars ��  ext_color ��      �  	X   cchar_t �N  pdat �%  _pad_y ��    _pad_x ��   _pad_top ��   _pad_left ��   _pad_bottom ��   _pad_right ��    _Bool ldat �}  text ��   firstchar ��   lastchar ��   %Yl  ��    .  F  NCURSES_OUTC K�  �  �   �  �    �  NCURSES_OUTC_sp ��  �  �   �  �  �    _nc_wacs 7�  �  �I  id �|   x ��   y ��   z ��   bstate ��   MEVENT �  G�  red I�    green I�   blue I�   r J�   g J�   b J�   init K�    color_t MX  panelhook 5!  top_panel 7(   bottom_panel 8(  stdscr_pseudo_panel 9(   panel !  cc_t �k  tcflag_t �  speed_t    .  j  	X   termios ,   c_iflag :   c_oflag :  c_cflag :  c_lflag :  c_line �  c_cc Z  c_ispeed J  $c_ospeed J  ( termtype (��   %�k  ��   %l  ��  %,l  ��  Numbers ��   Strings �i
r8#  name s�   link t8#  line u�   L"  ENTRY_USES v#  >#  `#  	X   8#  p#  	X    _nc_head �8#   _nc_tail �8#   _nc_user_definable �%   _nc_disable_period �%  �#  �#   �    _nc_check_termtype ��#  �#  $  $  %   �!   _nc_check_termtype2 �&$  �#  colorpair_t y?$  &zl  '�   �e$  (M_XTERM )M_NONE   MouseType �D$  '  ��$  )MF_X10  )MF_SGR1006  MouseFormat �w$  �
��  __count ��    __value �#   _mbstate_t �c  _flock_t ��  �  char 
�
�
�   #@
 ^  TRIES ^  chtype ��  mmask_t ��  SCREEN ��  screen $E  _ifd �    _ofd �   _ofp �-  out_buffer �  out_limit �   out_inuse �   _filtered $  _prescreen $  _use_env $  _checkfd �   _term �&   _saved_tty i  $_lines �   P_columns �   T_lines_avail �   X_topstolen �   \_curscr !�  `_newscr "�  d_stdscr #�  h_keytry )�-  l_key_ok *�-  p_tried +$  t_keypad_on ,$  u_called_wgetch .$  v_fifo /�-  x_fifohead 0{  �_fifotail 1{  �_fifopeek 2{  �_fifohold 3{  �_endwin 5�   �_current_attr 6�  �_coloron 7�   �_color_defs 8�   �_cursor 9�   �_cursrow :�   �_curscol ;�   �_notty <$  �_nl =�   �_raw >�   �_cbreak ?�   �_echo A�   �_use_meta B�   �_slk C�-  �$�m  D�   �$�l  G$  �_char_padding I�   �_cr_cost J�   �_cup_cost K�   �_home_cost L�   �_ll_cost M�   �_cub1_cost R�   �_cuf1_cost S�   �_cud1_cost T�    _cuu1_cost U�   _cub_cost V�   _cuf_cost W�   _cud_cost X�   _cuu_cost Y�   _hpa_cost Z�   _vpa_cost [�   _ed_cost ]�    _el_cost ^�   $_el1_cost _�   (_dch1_cost `�   ,_ich1_cost a�   0_dch_cost b�   4_ich_cost c�   8_ech_cost d�   <_rep_cost e�   @_hpa_ch_cost f�   D_cup_ch_cost g�   H_cuf_ch_cost h�   L_inline_cost i�   P_smir_cost j�   T_rmir_cost k�   X_ip_cost l�   \_address_cursor n�  `_scrolling p�   d_color_table s�-  h_color_count t�   l$xm  u�-  p_pair_count v�   t_pair_limit w�   x_assumed_color y$  |_default_color z$  }_has_sgr_39_49 {$  ~_default_fg |�   �_default_bg }�   �_default_pairs ~�   �_ok_attributes ��  �_xmc_suppress ��  �_xmc_triggers ��  �_acs_map �|-  �_screen_acs_map ��-  �_use_rmso �$  �_use_rmul �$  �_use_ritm �$  �_nc_sp_idlok �$  �_nc_sp_idcok �$  �_mouse_initialized �$  �_mouse_type �d$  �_maxclick ��   �_mouse_event ��-  �_mouse_inline ��-  �_mouse_parse �.  �_mouse_resume � .  �_mouse_wrap � .  �_mouse_fd ��   �_mouse_active �$  �_mouse_mask ��  �_mouse_mask2 ��  �_mouse_bstate ��  �_mouse_format ��$  �_mouse_xtermcap ��  �_mouse_events �&.  �_mouse_eventp �6.  �_resize �U.  �_ungetch ��  �_panelHook ��  �_sig_winch �$  �_next_screen ��  �oldhash �[.  �newhash �[.  �hashtab �a.  �hashtab_len ��   �_oldnum_list ��!  �_oldnum_size ��   �_outch ��  �_legacy_coding ��   �_ttytype �g.  �$nm  ��   �$�m  ��   �_LINES ��   �_COLS ��   �jump �  �$)m  `-  �rsp 	p-  $
m  $  _screen_acs_fix $  _screen_unicode $  _ordered_pairs �  _pairs_used �   _recent_pair �     WINDOW �T  _win_st ��>  _cury ��    _curx ��   _maxy ��   _maxx ��   _begy ��   _begx ��   _flags �{  _attrs �>  _bkgd ��   _notimeout �$  $_clear �$  %_leaveok �$  &_scroll �$  '_idlok �$  (_idcok �$  )_immed �$  *_sync �$  +_use_keypad �$  ,_delay ��   0_line �|  4_regtop ��   8_regbottom ��   <_parx ��   @_pary ��   D_parent ��  H_pad ��  L_yoffset ��   d_bkgrnd ��  h_color ��   | attr_t ��  ��  attr �>   chars ��  ext_color ��      �  	W   cchar_t �M  pdat �$  _pad_y ��    _pad_x ��   _pad_top ��   _pad_left ��   _pad_bottom ��   _pad_right ��    _Bool ldat �|  text ��   firstchar ��   lastchar ��   %Wm  ��    -  E  NCURSES_OUTC K�  �  �   �  �    �  NCURSES_OUTC_sp ��  �  �   �  �  �    _nc_wacs 7�  �  �H  id �{   x ��   y ��   z ��   bstate ��   MEVENT �  G�  red I�    green I�   blue I�   r J�   g J�   b J�   init K�    color_t MW  panelhook 5   top_panel 7'   bottom_panel 8'  stdscr_pseudo_panel 9'   panel    cc_t �j  tcflag_t �  speed_t    -  i  	W   termios ,   c_iflag 9   c_oflag 9  c_cflag 9  c_lflag 9  c_line �  c_cc Y  c_ispeed I  $c_ospeed I  ( termtype (��   %�l  ��   % m  ��  %�m  ��  Numbers ��   Strings �h
r7#  name s�   link t7#  line u�   K"  ENTRY_USES v#  =#  _#  	W   7#  o#  	W    _nc_head �7#   _nc_tail �7#   _nc_user_definable �$   _nc_disable_period �$  �#  �#   �    _nc_check_termtype ��#  �#  $  $  $   �!   _nc_check_termtype2 �%$  �#  colorpair_t y>$  &xm  '�   �d$  (M_XTERM )M_NONE   MouseType �C$  '  ��$  )MF_X10  )MF_SGR1006  MouseFormat �v$  �%  hashval ��   oldcount ��   newcount ��   %Wm  ��   newindex ��    HASHMAP ��$  �z%  ent_text ��   form_text ��  ent_x ��   dirty ��  visible ��  
m  �$  � �  c&  p-  	W   c&  i  �  NCURSES_PRESCREEN �',  _nc_prescreen �-  �
��  __count ��    __value �!   _mbstate_t �a  _flock_t ��  �  char 
  
  �  �  �      
  _reent @9�  _errno ;�    _stdin @>	  _stdout @>	  _stderr @>	  _inc B�   _emergency C�  _unspecified_locale_info F�   0_locale G   4__sdidinit I�   8__cleanup K  <_result N.  @_result_k O�   D_p5s P.  H_freelist Q  L_cvtlen T�   P_cvtbuf U�  T_new x�  X_atexit |�  H_atexit0 }W  L_sig_func �(  �__sglue ��  �__sf �4  � �    �  
  �  �  �    �  
  �  �  �    �  �   !  
  �   
  _cookie ��   _read ��  $_write ��  (_seek   ,_close !  0_ub �  4_up �  <_ur �   @_ubuf '  D_nbuf 7  G_lb �  H_blksize �   P_flags2 �   T_offset �  X_seek64 �  `_lock �  d_mbstate �  h �  �  
  �  �  �    �  __FILE G  _glue #8	  _next %8	   _niobs &�   _iobs '>	   �  �  _rand48 ?�	  _seed @�	   _mult A�	  _add B#   #  �	  	U   �Y?  _unused_rand [   _strtok_last \�  _asctime_buf ]?  _localtime_buf ^D  $_gamma_signgam _�   H_rand_next `�  P_r48 aD	  X_mblen_state b�  h_mbtowc_state c�  p_wctomb_state d�  x_l64a_buf eO  �_signal_buf f_  �_getdate_err g�   �_mbrlen_state h�  �_mbrtowc_state i�  �_mbsrtowcs_state j�  �_wcrtomb_state k�  �_wcsrtombs_state l�  �_h_errno m�   � �  O  	U   �  _  	U   �  o  	U   �r�  _nextf u�   _nmalloc v�  x �  �  	U     �  	U   �W�  _reent n�	  _unused wo   �  �  	U   __locale_t �    
     .  (  �    .    �  D  	U   _impure_ptr 
  _global_impure_ptr    suboptarg c�  time_t (�   _timezone ��   _daylight ��   �  �  	U    _tzname ��  !daylight 	__daylight �   !timezone 	!__timezone �  �  
�	
�	
�   #>
 \  TRIES \  chtype ��  mmask_t ��  SCREEN ��  screen $C  _ifd �    _ofd �   _ofp �-  out_buffer �  out_limit �   out_inuse �   _filtered "  _prescreen "  _use_env "  _checkfd �   _term �&   _saved_tty g  $_lines �   P_columns �   T_lines_avail �   X_topstolen �   \_curscr !�  `_newscr "�  d_stdscr #�  h_keytry )�-  l_key_ok *�-  p_tried +"  t_keypad_on ,"  u_called_wgetch ."  v_fifo /�-  x_fifohead 0y  �_fifotail 1y  �_fifopeek 2y  �_fifohold 3y  �_endwin 5�   �_current_attr 6�  �_coloron 7�   �_color_defs 8�   �_cursor 9�   �_cursrow :�   �_curscol ;�   �_notty <"  �_nl =�   �_raw >�   �_cbreak ?�   �_echo A�   �_use_meta B�   �_slk C�-  �$�n  D�   �$n  G"  �_char_padding I�   �_cr_cost J�   �_cup_cost K�   �_home_cost L�   �_ll_cost M�   �_cub1_cost R�   �_cuf1_cost S�   �_cud1_cost T�    _cuu1_cost U�   _cub_cost V�   _cuf_cost W�   _cud_cost X�   _cuu_cost Y�   _hpa_cost Z�   _vpa_cost [�   _ed_cost ]�    _el_cost ^�   $_el1_cost _�   (_dch1_cost `�   ,_ich1_cost a�   0_dch_cost b�   4_ich_cost c�   8_ech_cost d�   <_rep_cost e�   @_hpa_ch_cost f�   D_cup_ch_cost g�   H_cuf_ch_cost h�   L_inline_cost i�   P_smir_cost j�   T_rmir_cost k�   X_ip_cost l�   \_address_cursor n�  `_scrolling p�   d_color_table s�-  h_color_count t�   l$tn  u�-  p_pair_count v�   t_pair_limit w�   x_assumed_color y"  |_default_color z"  }_has_sgr_39_49 {"  ~_default_fg |�   �_default_bg }�   �_default_pairs ~�   �_ok_attributes ��  �_xmc_suppress ��  �_xmc_triggers ��  �_acs_map �z-  �_screen_acs_map ��-  �_use_rmso �"  �_use_rmul �"  �_use_ritm �"  �_nc_sp_idlok �"  �_nc_sp_idcok �"  �_mouse_initialized �"  �_mouse_type �b$  �_maxclick ��   �_mouse_event ��-  �_mouse_inline ��-  �_mouse_parse �
r5#  name s�   link t5#  line u�   I"  ENTRY_USES v#  ;#  ]#  	U   5#  m#  	U    _nc_head �5#   _nc_tail �5#   _nc_user_definable �"   _nc_disable_period �"  �#  �#   �    _nc_check_termtype ��#  �#  $  $  "   �!   _nc_check_termtype2 �#$  �#  colorpair_t y<$  &tn  '�   �b$  (M_XTERM )M_NONE   MouseType �A$  '  ��$  )MF_X10  )MF_SGR1006  MouseFormat �t$  �
%  hashval ��   oldcount ��   newcount ��   %Sn  ��   newindex ��    HASHMAP ��$  �x%  ent_text ��   form_text ��  ent_x ��   dirty ��  visible ��  
%  �  u.  	U  � _nc_screen_chain  �  _nc_have_sigwinch !R
C�m2  .t s �\"  2__errno __errno 3�m  �m  �4tparm tparm o2strlen strlen )2malloc malloc h5memcpy memcpy 2write write �2sleep sleep �2free free ]2strcpy strcpy & %6   X) GNU C11 6.4.0 20170704 (Fedora Cygwin 6.4.0-1) -mtune=generic -march=i686 -g -O2 --param max-inline-insns-single=1200 ../../ncurses/base/new_pair.c /builddir/build/BUILD/ncurses-6.0-20170617/build_32bit/ncurses @C�ml  0U int size_t �  unsigned int wchar_t H!  short unsigned int long long int long double signed char unsigned char short int long long unsigned int long unsigned int _LOCK_T �  long int _off64_t ^7  _fpos_t r�  _fpos64_t x�  _ssize_t ��   wint_t e  �C  __wch �  __wchb �C   f  S  	S   sizetype 
��  __count ��    __value �   _mbstate_t �_  _flock_t ��  �  char 
�
�
�   $C
 a  TRIES a  chtype ��  mmask_t ��  SCREEN ��  screen $H  _ifd �    _ofd �   _ofp 0.  out_buffer �  out_limit �   out_inuse �   _filtered '  _prescreen '  _use_env '  _checkfd �   _term Y'   _saved_tty l  $_lines �   P_columns �   T_lines_avail �   X_topstolen �   \_curscr !�  `_newscr "�  d_stdscr #�  h_keytry )6.  l_key_ok *6.  p_tried +'  t_keypad_on ,'  u_called_wgetch .'  v_fifo /<.  x_fifohead 0w  �_fifotail 1w  �_fifopeek 2w  �_fifohold 3w  �_endwin 5�   �_current_attr 6�  �_coloron 7�   �_color_defs 8�   �_cursor 9�   �_cursrow :�   �_curscol ;�   �_notty <'  �_nl =�   �_raw >�   �_cbreak ?�   �_echo A�   �_use_meta B�   �_slk CL.  �%�o  D�   �%�n  G'  �_char_padding I�   �_cr_cost J�   �_cup_cost K�   �_home_cost L�   �_ll_cost M�   �_cub1_cost R�   �_cuf1_cost S�   �_cud1_cost T�    _cuu1_cost U�   _cub_cost V�   _cuf_cost W�   _cud_cost X�   _cuu_cost Y�   _hpa_cost Z�   _vpa_cost [�   _ed_cost ]�    _el_cost ^�   $_el1_cost _�   (_dch1_cost `�   ,_ich1_cost a�   0_dch_cost b�   4_ich_cost c�   8_ech_cost d�   <_rep_cost e�   @_hpa_ch_cost f�   D_cup_ch_cost g�   H_cuf_ch_cost h�   L_inline_cost i�   P_smir_cost j�   T_rmir_cost k�   X_ip_cost l�   \_address_cursor n�  `_scrolling p�   d_color_table sR.  h_color_count t�   l%So  uX.  p_pair_count v�   t_pair_limit w�   x_assumed_color y'  |_default_color z'  }_has_sgr_39_49 {'  ~_default_fg |�   �_default_bg }�   �_default_pairs ~�   �_ok_attributes ��  �_xmc_suppress ��  �_xmc_triggers ��  �_acs_map ��-  �_screen_acs_map �^.  �_use_rmso �'  �_use_rmul �'  �_use_ritm �'  �_nc_sp_idlok �'  �_nc_sp_idcok �'  �_mouse_initialized �'  �_mouse_type ��$  �_maxclick ��   �_mouse_event �s.  �_mouse_inline �s.  �_mouse_parse ��.  �_mouse_resume ��.  �_mouse_wrap ��.  �_mouse_fd ��   �_mouse_active �'  �_mouse_mask ��  �_mouse_mask2 ��  �_mouse_bstate ��  �_mouse_format �%  �_mouse_xtermcap ��  �_mouse_events ��.  �_mouse_eventp ��.  �_resize ��.  �_ungetch ��  �_panelHook ��  �_sig_winch �'  �_next_screen ��  �oldhash ��.  �newhash ��.  �hashtab ��.  �hashtab_len ��   �_oldnum_list ��!  �_oldnum_size ��   �_outch ��  �_legacy_coding ��   �_ttytype ��.  �%;o  ��   �%`o  ��   �_LINES ��   �_COLS ��   �jump �  �%o  �-  �rsp 	�-  %�n  '  _screen_acs_fix '  _screen_unicode '  _ordered_pairs �  _pairs_used �   _recent_pair �     WINDOW �W  _win_st ��A  _cury ��    _curx ��   _maxy ��   _maxx ��   _begy ��   _begx ��   _flags �w  _attrs �A  _bkgd ��   _notimeout �'  $_clear �'  %_leaveok �'  &_scroll �'  '_idlok �'  (_idcok �'  )_immed �'  *_sync �'  +_use_keypad �'  ,_delay ��   0_line �  4_regtop ��   8_regbottom ��   <_parx ��   @_pary ��   D_parent ��  H_pad ��  L_yoffset ��   d_bkgrnd ��  h_color ��   | attr_t ��  ��  attr �A   chars ��  ext_color ��      �  	S   cchar_t �P  pdat �'  _pad_y ��    _pad_x ��   _pad_top ��   _pad_left ��   _pad_bottom ��   _pad_right ��    _Bool ldat �  text ��   firstchar ��   lastchar ��   &2o  ��    0  H  NCURSES_OUTC K�  �  �   �  �    �  NCURSES_OUTC_sp ��  �  �   �  �  �    _nc_wacs 7�  �  �K  id �w   x ��   y ��   z ��   bstate ��   MEVENT �  G�  red I�    green I�   blue I�   r J�   g J�   b J�   init K�    color_t MZ  panelhook 5#  top_panel 7*   bottom_panel 8*  stdscr_pseudo_panel 9*   panel #  cc_t �f  tcflag_t �  speed_t    0  l  	S   termios ,   c_iflag <   c_oflag <  c_cflag <  c_lflag <  c_line �  c_cc \  c_ispeed L  $c_ospeed L  ( termtype (��   &�n  ��   &�n  ��  &uo  ��  Numbers ��   Strings �k
#  tterm y�!   nuses z  (uses {R#  ,ncrosslinks |�   �crosslinks }b#  �cstart ~�  �cend �  �startline ��  �next �:#  �last �:#    
r:#  name s�   link t:#  line u�   N"  ENTRY_USES v
#  @#  b#  	S   :#  r#  	S   !_nc_head �:#  !_nc_tail �:#  !_nc_user_definable �'  !_nc_disable_period �'  �#  �#   �   !_nc_check_termtype ��#  �#  $  $  '   �!  !_nc_check_termtype2 �($  �#  '�   P_$  (cpKEEP )cpFREE  )cpINIT )cpAUTO  *So  W�$  fg Y�    bg Z�   mode \�   prev ]�   next ^�    colorpair_t a_$  
��  __count ��    __value �!   _mbstate_t �a  _flock_t ��  �  char 
  
  �  �  �      
  _reent @9�  _errno ;�    _stdin @>	  _stdout @>	  _stderr @>	  _inc B�   _emergency C�  _unspecified_locale_info F�   0_locale G   4__sdidinit I�   8__cleanup K  <_result N.  @_result_k O�   D_p5s P.  H_freelist Q  L_cvtlen T�   P_cvtbuf U�  T_new x�  X_atexit |�  H_atexit0 }W  L_sig_func �(  �__sglue ��  �__sf �4  � �    �  
  �  �  �    �  
  �  �  �    �  �   !  
  �   
  _cookie ��   _read ��  $_write ��  (_seek   ,_close !  0_ub �  4_up �  <_ur �   @_ubuf '  D_nbuf 7  G_lb �  H_blksize �   P_flags2 �   T_offset �  X_seek64 �  `_lock �  d_mbstate �  h �  �  
  �  �  �    �  __FILE G  _glue #8	  _next %8	   _niobs &�   _iobs '>	   �  �  _rand48 ?�	  _seed @�	   _mult A�	  _add B#   #  �	  	U   �Y?  _unused_rand [   _strtok_last \�  _asctime_buf ]?  _localtime_buf ^D  $_gamma_signgam _�   H_rand_next `�  P_r48 aD	  X_mblen_state b�  h_mbtowc_state c�  p_wctomb_state d�  x_l64a_buf eO  �_signal_buf f_  �_getdate_err g�   �_mbrlen_state h�  �_mbrtowc_state i�  �_mbsrtowcs_state j�  �_wcrtomb_state k�  �_wcsrtombs_state l�  �_h_errno m�   � �  O  	U   �  _  	U   �  o  	U   �r�  _nextf u�   _nmalloc v�  x �  �  	U     �  	U   �W�  _reent n�	  _unused wo   �  �  	U   __locale_t �    
     .  (  �    .    �  D  	U   _impure_ptr 
  _global_impure_ptr    suboptarg c�  time_t (�   _timezone ��   _daylight ��   �  �  	U    _tzname ��  !daylight 	__daylight �   !timezone 	!__timezone �  �  
�	
�	
�   #>
 \  TRIES \  chtype ��  mmask_t ��  SCREEN ��  screen $C  _ifd �    _ofd �   _ofp �-  out_buffer �  out_limit �   out_inuse �   _filtered "  _prescreen "  _use_env "  _checkfd �   _term �&   _saved_tty g  $_lines �   P_columns �   T_lines_avail �   X_topstolen �   \_curscr !�  `_newscr "�  d_stdscr #�  h_keytry )�-  l_key_ok *�-  p_tried +"  t_keypad_on ,"  u_called_wgetch ."  v_fifo /�-  x_fifohead 0y  �_fifotail 1y  �_fifopeek 2y  �_fifohold 3y  �_endwin 5�   �_current_attr 6�  �_coloron 7�   �_color_defs 8�   �_cursor 9�   �_cursrow :�   �_curscol ;�   �_notty <"  �_nl =�   �_raw >�   �_cbreak ?�   �_echo A�   �_use_meta B�   �_slk C�-  �$p  D�   �$�p  G"  �_char_padding I�   �_cr_cost J�   �_cup_cost K�   �_home_cost L�   �_ll_cost M�   �_cub1_cost R�   �_cuf1_cost S�   �_cud1_cost T�    _cuu1_cost U�   _cub_cost V�   _cuf_cost W�   _cud_cost X�   _cuu_cost Y�   _hpa_cost Z�   _vpa_cost [�   _ed_cost ]�    _el_cost ^�   $_el1_cost _�   (_dch1_cost `�   ,_ich1_cost a�   0_dch_cost b�   4_ich_cost c�   8_ech_cost d�   <_rep_cost e�   @_hpa_ch_cost f�   D_cup_ch_cost g�   H_cuf_ch_cost h�   L_inline_cost i�   P_smir_cost j�   T_rmir_cost k�   X_ip_cost l�   \_address_cursor n�  `_scrolling p�   d_color_table s�-  h_color_count t�   l$Lq  u�-  p_pair_count v�   t_pair_limit w�   x_assumed_color y"  |_default_color z"  }_has_sgr_39_49 {"  ~_default_fg |�   �_default_bg }�   �_default_pairs ~�   �_ok_attributes ��  �_xmc_suppress ��  �_xmc_triggers ��  �_acs_map �z-  �_screen_acs_map ��-  �_use_rmso �"  �_use_rmul �"  �_use_ritm �"  �_nc_sp_idlok �"  �_nc_sp_idcok �"  �_mouse_initialized �"  �_mouse_type �b$  �_maxclick ��   �_mouse_event ��-  �_mouse_inline ��-  �_mouse_parse �
r5#  name s�   link t5#  line u�   I"  ENTRY_USES v#  ;#  ]#  	U   5#  m#  	U    _nc_head �5#   _nc_tail �5#   _nc_user_definable �"   _nc_disable_period �"  �#  �#   �    _nc_check_termtype ��#  �#  $  $  "   �!   _nc_check_termtype2 �#$  �#  colorpair_t y<$  &Lq  '�   �b$  (M_XTERM )M_NONE   MouseType �A$  '  ��$  )MF_X10  )MF_SGR1006  MouseFormat �t$  �
%  hashval ��   oldcount ��   newcount ��   %}p  ��   newindex ��    HASHMAP ��$  �x%  ent_text ��   form_text ��  ent_x ��   dirty ��  visible ��  