from datetime import date
from pydantic import BaseModel, Field

class User(BaseModel):
    id: int
    name: str
    dob: date = Field(title='Date of Birth')