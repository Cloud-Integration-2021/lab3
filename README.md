# Cloud-Integration - Lab 3

React application for other labs

## 🛠️ Installation Steps

### 🐳 Option 1: Run from Docker run

```bash
# Run the container
$ docker run \
  -v /etc/localtime:/etc/localtime:ro \
  -e "BACKEND_ENDPOINT=http://localhost:8080" \
  --restart always \
  --name lab3 \
  -p 3000:3000 \
  thomaslacaze/lab3
```

### 🐳 Option 2: Run from Docker-compose

**See [here](https://github.com/Cloud-Integration-2021/lab3/blob/main/docker-compose.yml)** 

### 💻 Option 3: Run from source
#### Prerequisites
* NodeJS, yarn.

1. Clone the repository

```bash
git clone https://github.com/Cloud-Integration-2021/lab3.git
```

2. Change the working directory

```bash
cd lab3
```

3. Setup environnement variables

| Environment Variable | Default                 | Description             |
| -------------------- | ----------------------- | ----------------------- |
| `BACKEND_ENDPOINT`   | `http://localhost:8080` | BackendEndpoint of lab1 |

4. Run the app

```bash
$ yarn install --pure-lockfile
$ yarn start
```


🌟 You are all set!

## Dockerfile
<a href="https://github.com/Cloud-Integration-2021/lab3/blob/main/Dockerfile">Dockerfile</a>

## License
<a href="https://github.com/Cloud-Integration-2021/lab3/blob/main/LICENSE">MIT</a>