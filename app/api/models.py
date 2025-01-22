from enum import Enum
from pydantic import BaseModel, Field


# class StartEnum(str, Enum):
#     length = "length"
#     mass = "mass"


#class TargetEnum(str, Enum):
    #length = 'cm' | 'km' | 'm' | 'mm' | 'mile' | 'yard' | 'foot' | 'inch'
    #mass = 'kg' | 'g' | 'mg' | 'ton' | 'pound' | 'ounce'


class RequestData(BaseModel):
    request_type: str #= Field(..., description="Вариант length или mass")
    target: str #= Field(..., description="Вариант величины")
    data_int_float: int | float