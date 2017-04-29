## Simple File Server

Replace the `favicon.ico` and it's (hopefully) good to go.

#### run on local device
```
$ node index.js /path/to/server/root PORT
```

#### run with docker
```
$ build -t sfs .
$ docker run -it -p 80:8000 -v /path/to/server/root:/data sfs
```