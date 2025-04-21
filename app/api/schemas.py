from pydantic import BaseModel, Field

class RequestData(BaseModel):
    request_type: str
    target: str
    data_int_float: int | float