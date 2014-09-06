console.clear();

(function() {
    'use strict';

    var _type = 'default type';
    
    var oProto = function oProto() {
        Object.defineProperties( this , {
            'nameProto' : {
                configurable : true ,
                enumerable : true ,
                writable : true , 
                value : 'default name proto'
            } , 
            'secretNameProto' : {
                configurable : false ,
                enumerable : false ,
                writable : false , 
                value : 'secret name proto'
            } ,
            'getDataProto' : {
                configurable : true ,
                enumerable : true ,
                writable : true , 
                value: function() {
                    return 'nameProto : ' + this.nameProto;                
                }
            }
        });
    };

    Object.defineProperties( oProto.prototype , {
        'nameProtoProto' : {
            configurable : true ,
            enumerable : true ,
            writable : true , 
            value : 'default name proto proto'
        } , 
        'secretNameProtoProto' : {
            configurable : false ,
            enumerable : false ,
            writable : false , 
            value : 'secret name proto proto'
        } ,
        'getDataProtoProto' : {
            configurable : true ,
            enumerable : true ,
            writable : true , 
            value: function() {
                return 'nameProto : ' + this.nameProtoProto;                
            }
        }
    });

    var o = Object.create( new oProto() /* oProto.prototype */ /* Object.prototype */ , {
        'name' : {
            configurable : true ,
            enumerable : true ,
            writable : true , 
            value : 'default name'
        } , 
        'secretName' : {
            configurable : false ,
            enumerable : false ,
            writable : false , 
            value : 'secret name'
        } ,
        'type' : {
            configurable : true ,
            enumerable : true ,
            get : function getType() {
                return _type;                
            } ,
            set : function setType( value ) {
                _type = value;
            }
        } ,
        'getData' : {
            configurable : true ,
            enumerable : true ,
            writable : true , 
            value: function() {
                return 'name : ' + this.name + ' , type : ' + this.type;                
            }
        }
    });  

    function getDescriptor( obj , prop ) {
        // walk prototype chain if necessary to find descriptor
        do {
            if ( obj.hasOwnProperty( prop ) ) {
                return Object.getOwnPropertyDescriptor( obj , prop );        
            }            
        } while ( obj = Object.getPrototypeOf( obj ) );       
    }
    
    function getPropertyName( obj , prop ) {
        var descriptor = getDescriptor( obj , prop );
        if ( descriptor && typeof descriptor.value === 'function' ) {
            return prop + '()';
        }
        return prop;        
    }

    console.dir( o );
    console.log('');

    console.log( '"name" in o:' , 'name' in o );
    console.log( '"secretName" in o:' , 'secretName' in o );
    console.log( '"nameProto" in o:' , 'nameProto' in o );
    console.log( '"nameProtoProto" in o:' , 'nameProtoProto' in o );
    console.log( '"toString()" in o:' , 'toString' in o );
    console.log('');

    for (var prop in o) {
        console.log( 'for: [ %s ]\n  descriptor: %O' , 
          getPropertyName( o , prop ) , 
          getDescriptor( o , prop ) 
        );
    }
    console.log('');

    Object.keys( o ).forEach( function ( prop ) {
        console.log( 'Object.keys: [ %s ]\n  descriptor: %O' , 
          getPropertyName( o , prop ) , 
          getDescriptor( o , prop ) 
        );
    });
    console.log('');

    Object.getOwnPropertyNames( o ).forEach( function ( prop ) {
        console.log( 'Object.getOwnPropertyNames: [ %s ]\n  descriptor: %O' , 
          getPropertyName( o , prop ) , 
          getDescriptor( o , prop ) 
        );
    });
    console.log('');
})();