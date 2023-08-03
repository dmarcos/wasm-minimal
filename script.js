var loadFile = function loadFile (name) {
  var promise = new Promise((ok, nope) => {
    fetch( name ).then(resp => {
      resp.arrayBuffer().then(arr => ok( arr ));
    });
  });
  return promise;
};

var Uint8WASMMemoryView;
// Reads a string from the wasm memory heap to JavaScript (decoded as UTF8)
var getStringfromWASMHeap = function (ptr, length)
{
  if (length === 0 || !ptr) { return ''; };
  // If length not passed looks for the null character '\0' used to terminate
  // C / C++ strings.
  if (!length) { 
    for (length = 0; length != ptr + Uint8WASMMemoryView.length && Uint8WASMMemoryView[ptr+length]; length++); 
  }
  return new TextDecoder().decode(Uint8WASMMemoryView.subarray(ptr, ptr+length));
};

window.onload = async function () {
  // Load WASM binary file.
  var wasmBinary = loadFile('hello-world.wasm');
  wasmBinary = await wasmBinary;
  
  // Initialize WASM memory.
  var wasmMemory = new WebAssembly.Memory({initial:32});
  // Unsigned byte view of the WASM memory. Used to extract strings.  
  Uint8WASMMemoryView = new Uint8Array(wasmMemory['buffer']);

  // Object to pass JS functions to C / C++.
  var JS =
  {
    printString: (str) => { console.log('Print String (JS code called from C): ' + getStringfromWASMHeap(str)); },
    addNumbers: function(a, b) { console.log('Add numbers (JS code called from C): ' + a + ' + ' + b + ' Result: ' + (a + b)); }
  };

  var wasmImports = {
    JS: JS,
    env: {memory: wasmMemory}
  };
  
  var wasmProgram = await WebAssembly.instantiate(wasmBinary, wasmImports);
  var wasmInstance = wasmProgram.instance;
  var wasmExports = wasmInstance.exports;
      
  wasmExports.wasmMain();
  var a = 3;
  var b = 4;
  console.log('Add numbers (C code called from JS): ' + a + ' + ' + b + ' Result: ' + wasmExports.add(3, 4));
  
}
