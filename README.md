
# jsHash v0.2

Non-asynchronous hash function in Javascript.

### Details

Takes an object of any size, and returns a pseudorandom 16-digit hexadecimal string.


### Usage

    import {hash} from "https://jbwx.github.io/jsHash/jsHash.js";
    hash("Hello, world!");
    
### Notes

This is not proven in any way to be mathematically sound. There is no guarantee that all outputs are equally likely, or that every output is possible. The output appears to be random from the limited tests I’ve done, although it’s unlikely there isn’t some sort of underlying pattern. Do not use this in any security-critical application.
