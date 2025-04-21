import uvicorn
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from app.api.router import router as router_api

app = FastAPI()

app.mount('/static', StaticFiles(directory='static'), 'static')

app.include_router(router_api)

if __name__ == '__main__':
    uvicorn.run('main:app', reload=True)