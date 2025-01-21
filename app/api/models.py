from enum import Enum
from pydantic import BaseModel, Field


class StartEnum(str, Enum):
    length = "length"
    weight = "weight"


#class TargetEnum(str, Enum):
    #length = 'cm' | 'km' | 'm' | 'mm' | 'mile' | 'yard' | 'foot' | 'inch'
    #weight = 'kg' | 'g' | 'mg' | 'ton' | 'pound' | 'ounce'


class RequestData(BaseModel):
    request_type: StartEnum = Field(..., description="Вариант length или weight")
    target: str = Field(..., description="Вариант величины")
    data_int_float: int | float