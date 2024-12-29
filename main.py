from fastapi import FastAPI, HTTPException
import uvicorn
from pydantic import BaseModel

app = FastAPI()

books = [
    {
        'id': 1,
        'title': 'Три мушкетера',
        'author': 'А.Дюма'
    },
    {
        'id': 2,
        'title': 'Остров сокровищ',
        'author': 'Л.Стивенсон'
    }
]

@app.get('/books', 
         summary='Получить все книги', 
         tags=['Книги'])
async def read_book():
    return books


@app.get('/books/{book_id}', 
         summary='Получить определенную книгу', 
         tags=['Книги'])
async def get_book(book_id: int):
    for i in books:
        if i['id'] == book_id:
            return i
    raise HTTPException(status_code=404, detail='Книга не найдена')

class NewBook(BaseModel):
    title: str
    author: str

@app.post('/books',  
         summary='Добавить книгу', 
         tags=['Книги'])
async def create_book(new_book: NewBook):
    books.append(
        {
            'id': len(books) + 1,
            'title': new_book.title,
            'author': new_book.author
        }
    )
    return books


if __name__ == '__main__':
    uvicorn.run('main:app', reload=True)
    