# Welcome to your workspace fastapi-krakend-next!

## Reproduce:

- install `codefly`
https://codefly-dev.github.io/docs/getting-started/installation/

- create the workspace
```shell
codefly init workspace fastapi-krakend-next
```

and pick a flat layout, it creates a top level module also called `fastapi-krakend-next`.

- create the `python` service
```shell
codefly add service server --agent=python-fastapi
```

Run the service like this:
```shell
codefly run service server
```
The port is a function of the name of workspace and service. It will be in the logs:
```
fastapi-krakend-next/server >> will run on http://localhost:32582
```
as well as the `fastapi` logs:
```
fastapi-krakend-next/server >> INFO:     Uvicorn running on http://0.0.0.0:32582 (Press CTRL+C to quit)
```

You can test the service with curl:
```shell
curl http://localhost:32582/version
```

- create the `nextjs` service
```shell
codefly add service web --agent=nextjs
```

Run the service like this:
```shell
codefly run service web
```

- add a dependency from `server` to `web`
```shell
codefly add dependency web
```
Now run the `web` service again:
```shell
codefly run service web
```
and check out the `Endpoints` tab in the `web` service. You should see the `/version` endpoint from the `server` service.

You can even call the `/version` endpoint from the `web` service. The page also shows how you would get the endpoint to call.

- adding the API gateway
```shell
codefly add service gateway --agent=krakend
```

Add a dependency from `web` to `gateway` and from `server` to `gateway`.

```shell
codefly add dependency gateway
```

```shell
codefly add dependency web
```

And sync the gateway:
```shell
codefly sync service gateway
```

Pick non-authenticated for now.

Now run the `web` service again and check the endpoints:
```shell
codefly run service web
```

And you should see the route for the `/version` endpoint proxied through the gateway.

## Next steps

- add authentication

Right now, we only support Auth0. At the root of the workspace, in `configurations/local`, add a file `auth.yaml` for authentications:

```
type: auth0
jwt:
  audience: [REDACTED]
  url: [REDACTED]
auth0:
  audience: [REDACTED] 
  domain: [REDACTED]
  client_id: [REDACTED]
  client_secret: [REDACTED]
```

Now in the `web` and `gateway` services, add a workspace configuration dependency (CLI doesn't do that yet): in `service.codefly.yaml`, add:

```yaml
workspace-configuration-dependencies:
    - auth
```

Now, you can change the access of the `gateway` route to the server `/version` to require authentication. Change `protected: false` to `protected: true` in the `gateway` service in `services/gateway/routing/rest/fastapi-krakend-next/server/version.rest.codefly.yaml`.


