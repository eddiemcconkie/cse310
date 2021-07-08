(As administrator)
```
choco install mkcert
```

(Normal)

`cd` into the `cert` folder
```
mkcert -install
mkcert -cert-file ./cert.pem -key-file ./key.pem localhost
```
I installed it to the project and put the files in the `.gitignore` - (`cert/*.pem`), but you can save the files somewhere else to use them for other projects.
