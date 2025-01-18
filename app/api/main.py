from datetime import date

from fastapi import FastAPI, HTTPException
import uvicorn
import asyncio
from app.api.models import User

app = FastAPI()

users = [
    User(id=1, name='John', dob=date(1990, 1, 1)),
    User(id=2, name='Jack', dob=date(1991, 1, 1)),
    User(id=3, name='Jill', dob=date(1992, 1, 1)),
    User(id=4, name='Jane', dob=date(1993, 1, 1)),
]

@app.get('/home', summary='Домашная страница')
async def home():
    return {'message': 'Домашная страница'}

@app.get('/about_us', summary='Страница о нас')
async def abous_us():
    return {'message': 'Страница о нас'}

@app.get('/contacts', summary='Контакты')
async def contacts():
    return {'message': 'Контакты'}

@app.get("/api/", response_model=FastUI, response_model_exclude_none=True)
def users_table() -> list[AnyComponent]:
    """
    Show a table of four users, `/api` is the endpoint the frontend will connect to
    when a user visits `/` to fetch components to render.
    """
    return [
        c.Page(  # Page provides a basic container for components
            components=[
                c.Heading(text='Users', level=2),  # renders `<h2>Users</h2>`
                c.Table(
                    data=users,
                    # define two columns for the table
                    columns=[
                        # the first is the users, name rendered as a link to their profile
                        DisplayLookup(field='name', on_click=GoToEvent(url='/user/{id}/')),
                        # the second is the date of birth, rendered as a date
                        DisplayLookup(field='dob', mode=DisplayMode.date),
                    ],
                ),
            ]
        ),
    ]

if __name__ == '__main__':
    uvicorn.run('main:app', reload = True)


