# rift
> File transfer via rifts.

**Really instant file transfer** (<strong>rift</strong>) is a peer-to-peer file transfer command line tool. It requires minimal setup and does not involve the inconveniences of file size limits or authentication procedures. As a bonus, you receive the benefits of tab completion and integration with the CLI tool belt.

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

#### I/O Redirection

```console
$ cat main.c | rift create
Token: 2eb6b5a66d7fb653aeb4d4f83cfb77de
Copied to clipboard!
```

### Usage

    Usage: rift [command] [options]

    Commands:

      create [path]                 create a rift to send file(s)
      collect [token]               get file(s) from an associated token

    Options:

      -h, --help                    output usage information
      -P, --password [password]     encrypt/decrypt data with password
      -p, --port [port]             access port [8080]
      -r, --ridiculous              output flavorfully
      -t, --timeout [seconds]       timeout rift in [60] seconds
      -v, --verbose                 output extraneously



## Disclaimer

rift sacrifices some security for ease of use. Therefore, rift should *not* be used to transport sensitive data.

## License
Copyright (c) 2013 Brian Le and Alex Freska

Licensed under the MIT license.
