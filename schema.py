# schema.py
"""
This file contains the schema for the posts table.
"""
from pydantic import BaseModel

class PostBase(BaseModel):
    filename: str

class CreatePost(PostBase):
    pass
