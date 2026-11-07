---
title: Feather OS
subtitle: Hobby operating system for x86-64 and AArch64
permalink: /projects/feather-os
type: main
order: 2
---

A hobby operating system I build to learn how an operating system, and especially a kernel, works. It runs on x86-64 and AArch64 (64-bit ARM) from the same source: the kernel shares as much as it can, and only CPU entry, exceptions, interrupts, page tables, context switching and the user-space interface are written per architecture.

## Features

- **Boot and memory:** boots with [Limine](https://github.com/limine-bootloader/limine). Physical page allocator, and four-level paging on x86-64 or translation tables on AArch64.
- **Processes:** ELF64 programs run in user mode, each in its own address space, with a preemptive scheduler on multiple CPUs.
- **Storage:** a virtual file system over a read-only initramfs and a writable disk that keeps its files across reboots.
- **Networking:** a TCP/IP stack in the kernel with IPv4 and IPv6, UDP and TCP, and BSD sockets for programs. It's enough for DHCP, ping, NTP and a small HTTP server.
- **Shell:** an `init` that starts and restarts services, and a shell with line editing, history, pipelines and job control: Ctrl+C, Ctrl+Z, `jobs`, `fg` and `bg`. Programs include `ls`, `cat`, `grep`, `top`, `vi` and more.
- **Terminals:** four virtual consoles (Alt+F1 to Alt+F4), each with its own shell, plus pseudo-terminals and sessions as on Unix.
- **Swift programs:** besides C++, user programs can be written in Embedded Swift, with `async`/`await`, tasks and actors, `Codable` and JSON, and C++ headers imported into Swift. The Game of Life and the `json` tool in the screenshots are Swift.
- **Written in:** C++23, C and assembly for the kernel, built with CMake, and tested in QEMU on both architectures.

## Usage

Build everything and run it in QEMU:

```bash
./build.sh --arch x86_64 all
```

Run it again without rebuilding:

```bash
./build.sh --arch x86_64 run
```

Use `--arch aarch64` for the ARM build. It boots to a shell: type `help` to see the commands. For more options, see `./build.sh -h`.

## Screenshots

{% include image-gallery.html folder="images/FeatherOS" wide=true %}

## Links

* [Source code on GitHub](https://github.com/marksinkovics/FeatherOS)
* [Roadmap](https://github.com/marksinkovics/FeatherOS/blob/main/docs/roadmap.md)
* [Development documentation](https://github.com/marksinkovics/FeatherOS/blob/main/docs/development.md)
