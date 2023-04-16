---
layout: page
title: Compressor
header_title: Compressor
permalink: /projects/compressor
type: main
---

I was interesting in how lossless compressions works, and as a hobby project I implemented a [Huffman coding](https://en.wikipedia.org/wiki/Huffman_coding) based compressor, with the necessary command line tools in C++.

The project is developed and tested on macOS environment by used Xcode and Clang.

## Usage

Compress data:

```bash
./compressor_app encode --input path/to/raw_data --output /path/to/decoded_data
```

Decompress data:

```bash
./compressor_app decode --input path/to/decoded_data --output /path/to/encoded_data
```

For more information, please check the help `compressor_app -h`

## Links

* [Project page](https://github.com/marksinkovics/compressor/)
* [Development documentation](https://github.com/marksinkovics/compressor/blob/master/docs/development.md)