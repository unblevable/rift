# rift.io
> File transfer via rifts.

**Really instant file transfer** (<strong>rift.io</strong>) is a peer-to-peer file transfer command line tool. It requires minimal setup and does not involve the inconveniences of file size limits or authentication procedures. As a bonus, you receive the benefits of tab completion and integration with the CLI tool belt.

## Command Line

### Install
    $ npm install -g rift.io

### Getting Started

```console
$ rift create graphic.psd
Token: b97bab5e1449f9fc7b859583776503aa
Copied to clipboard!
```

```console
$ rift collect b97bab5e1449f9fc7b859583776503aa
Transfer successful!
```

### Usage

    Usage: rift [options] [command]

    Commands:

      create [path]                 create a rift to send file(s)
      collect [token]               get file(s) from an associated token
      destroy                       cancel all outgoing file transfers

    Options:

      -h, --help                    output usage information
      -P, --password [password]     encrypt/decrypt data with password
      -p, --port [port]             access port [8080]
      -r, --ridiculous              output more flavorfully
      -t, --timeout [seconds]       timeout rift in [60] seconds
      -v, --verbose                 output extraneously

### Examples

```console
$ rift create photos/ manual.pdf --patch guess.me1
Token: 6a204bd89f3c8348afd5c77c717a097a
Copied to clipboard!
```

```console
$ rift -vt 90 collect 29b1446ded652e41a94b527db789cc61
Waiting on rift for 90 seconds...
5692 kb received.
Transfer completed in 0.11 seconds!
```

```console
$ rift --help collect
Get file(s) from an associated token.
```

#### I/O Redirection

```console
$ cat main.c | rift create
```

## Disclaimer

rift.io sacrifices some security for ease of use. Therefore, rift.io should *not* be used to transport sensitive data.

## License
Copyright (c) 2013 Brian Le and Alex Freska
Licensed under the MIT license.
