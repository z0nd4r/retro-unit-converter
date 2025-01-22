from fastapi import APIRouter, Request, HTTPException, Depends
from fastapi.templating import Jinja2Templates
from app.api.models import RequestData
from app.static.converter import Converter

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
        print('ssss')
        if request_type:
            print('aaaaaaa')
            result = Converter(request_type, target, data_int_float)
        else:
            print('sfffffff')
            raise ValueError("Unsupported start type")
        return {"request_string": result[0]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
