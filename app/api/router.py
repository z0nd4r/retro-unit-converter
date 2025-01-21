from fastapi import APIRouter, Request, HTTPException, Depends
from fastapi.templating import Jinja2Templates
from curl_fetch2py import CurlFetch2Py
from app.api.models import RequestData

router = APIRouter(prefix='', tags=['API'])
templates = Jinja2Templates(directory='app/templates')


@router.get('/')
async def get_main_page(request: Request):
    return templates.TemplateResponse(name='index.html', context={'request': request})


@router.post('/api', summary='Основной API метод')
async def main_logic(request_body: RequestData):
    request_type = request_body.request_type
    target = request_body.target
    data_int_float = request_body.data_int_float

    try:
        if request_type == 'length':
            if target == 'cm_to':
                km = data_int_float / 1000
                dm = data_int_float / 10
                return  f'Km: {km}, Dm: {dm}'
            if target == 'km_to':
                cm = data_int_float * 1000
                dm = data_int_float * 100
                return  f'Cm: {cm}, Dm: {dm}'
        elif request_type == 'weight':
            pass
        else:
            raise ValueError("Unsupported start type")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))