# Minimal C++ to WebAssembly example

Goals:

- No build system. Just a bash script.
- No emscripten. 
- No external dependencies. 100% self contained. Including the compiler and web server (Mac only for now).
- Zero setup (tradeoff: Mac only for now).
- Stripped down to the bare minimum. Every line of code has a purpose.

There are a few precedents (listed below) but didn't find any that ticks all the boxes above.

## Compiler

https://releases.llvm.org/download.html

Clang and wasm-ld binaries copied from (Arm64 / Darwin): https://github.com/llvm/llvm-project/releases/tag/llvmorg-15.0.7

## Web Server

https://github.com/rif/spark

## Prior work

http://schellcode.github.io/wajic-how-and-why

https://github.com/ern0/howto-wasm-minimal/tree/master

https://github.com/robrohan/wefx/blob/main/Makefile

https://github.com/Aransentin/wasmdemo/blob/master/build.sh

https://github.com/schellingb/wajic

## Tools

I found interesting and sometime useful (for debugging) looking at the text representation of WASM.
With the link below you can easily convert the wasm binary file ot human readable text.

https://webassembly.github.io/wabt/demo/wasm2wat/
