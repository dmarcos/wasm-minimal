#include <wasm.h>

// Define functions in Javascript that can be called from C.
IMPORT_JS(void, printString, (char const* str))
IMPORT_JS(void, addNumbers, (int a, int b))

// Define a C function that can be called from JavaScript.
EXPORT_C(add) int add(int a, int b)
{
	return a + b;
}

// This function is called at startup
EXPORT_C(wasmMain) void wasmMain()
{
	char const *str = "HELLO WORLD\0";
	printString(str);
	addNumbers(30, 12);
}